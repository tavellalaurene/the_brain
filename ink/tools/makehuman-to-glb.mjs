// Convertit le maillage de base MakeHuman (base.obj, CC0) en GLB pour la page,
// et exporte les centres des articulations (repères anatomiques).
//
//   curl -LO https://raw.githubusercontent.com/makehumancommunity/makehuman/master/makehuman/data/3dobjs/base.obj
//   node tools/makehuman-to-glb.mjs base.obj makehuman-neutre
//
// Sorties :
//   models/<id>.js                      le GLB encodé en base64 (ouverture directe en file://)
//   data/bodies/<id>.joints.json        centres des articulations (mm, repère du modèle)
//   /tmp/<id>.glb                       le GLB brut (pour tools/measure-body.mjs)
//
// Repère de sortie, identique à la Vénus : mm, z = hauteur (pieds à 0), -y = avant, +x = gauche du sujet.
// MakeHuman : décimètres, y = haut, +z = avant, +x = gauche du sujet.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const [file, id] = process.argv.slice(2);
if (!file || !id) { console.error('usage : node tools/makehuman-to-glb.mjs base.obj <id>'); process.exit(1); }
const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// ── Lecture de l'OBJ : sommets, faces du groupe « body », sommets des groupes « joint-* » ──
const V = [], body = [], joints = {};
let group = '';
for (const line of readFileSync(file, 'utf8').split('\n')) {
  const p = line.trim().split(/\s+/);
  if (p[0] === 'v') V.push([+p[1], +p[2], +p[3]]);
  else if (p[0] === 'g') group = p[1];
  else if (p[0] === 'f') {
    const idx = p.slice(1).map(t => parseInt(t, 10) - 1);
    if (group === 'body') for (let i = 1; i < idx.length - 1; i++) body.push(idx[0], idx[i], idx[i + 1]);   // triangulation
    else if (group.startsWith('joint-')) { const set = (joints[group.slice(6)] ??= new Set()); idx.forEach(i => set.add(i)); }
  }
}
const toModel = ([x, y, z]) => [x * 100, -z * 100, y * 100];   // dm → mm, axes réorientés
const used = [...new Set(body)].sort((a, b) => a - b), remap = new Map(used.map((v, i) => [v, i]));
const pos = used.map(i => toModel(V[i]));
const floor = Math.min(...pos.map(p => p[2]));
pos.forEach(p => { p[2] -= floor; });                            // pieds à z = 0

// ── Normales lissées ──
const nrm = pos.map(() => [0, 0, 0]), tri = body.map(i => remap.get(i));
for (let i = 0; i < tri.length; i += 3) {
  const [a, b, c] = [pos[tri[i]], pos[tri[i + 1]], pos[tri[i + 2]]];
  const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], v = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  const n = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
  for (const k of [tri[i], tri[i + 1], tri[i + 2]]) for (let d = 0; d < 3; d++) nrm[k][d] += n[d];
}
nrm.forEach(n => { const l = Math.hypot(...n) || 1; n[0] /= l; n[1] /= l; n[2] /= l; });

// ── Écriture GLB (positions, normales, indices) ──
const P = new Float32Array(pos.flat()), N = new Float32Array(nrm.flat()), I = new Uint32Array(tri);
const pad = n => (n + 3) & ~3;
const bin = Buffer.alloc(pad(P.byteLength) + pad(N.byteLength) + pad(I.byteLength));
Buffer.from(P.buffer).copy(bin, 0);
Buffer.from(N.buffer).copy(bin, pad(P.byteLength));
Buffer.from(I.buffer).copy(bin, pad(P.byteLength) + pad(N.byteLength));
const min = [0, 1, 2].map(d => Math.min(...pos.map(p => p[d]))), max = [0, 1, 2].map(d => Math.max(...pos.map(p => p[d])));
const gltf = {
  asset: { version: '2.0', generator: 'ink/tools/makehuman-to-glb.mjs',
    extras: { source: 'MakeHuman base mesh (makehumancommunity/makehuman)', license: 'CC0-1.0' } },
  scene: 0, scenes: [{ nodes: [0] }], // glTF attend y = haut : cette matrice (la même que dans le scan de la Vénus) passe de z-haut à y-haut
  nodes: [{ mesh: 0, name: id, matrix: [1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1] }],
  meshes: [{ primitives: [{ attributes: { POSITION: 0, NORMAL: 1 }, indices: 2 }] }],
  buffers: [{ byteLength: bin.length }],
  bufferViews: [
    { buffer: 0, byteOffset: 0, byteLength: P.byteLength, target: 34962 },
    { buffer: 0, byteOffset: pad(P.byteLength), byteLength: N.byteLength, target: 34962 },
    { buffer: 0, byteOffset: pad(P.byteLength) + pad(N.byteLength), byteLength: I.byteLength, target: 34963 }],
  accessors: [
    { bufferView: 0, componentType: 5126, count: pos.length, type: 'VEC3', min, max },
    { bufferView: 1, componentType: 5126, count: pos.length, type: 'VEC3' },
    { bufferView: 2, componentType: 5125, count: I.length, type: 'SCALAR' }],
};
let json = Buffer.from(JSON.stringify(gltf));
json = Buffer.concat([json, Buffer.alloc(pad(json.length) - json.length, 0x20)]);
const header = Buffer.alloc(12), jh = Buffer.alloc(8), bh = Buffer.alloc(8);
header.writeUInt32LE(0x46546C67, 0); header.writeUInt32LE(2, 4); header.writeUInt32LE(12 + 8 + json.length + 8 + bin.length, 8);
jh.writeUInt32LE(json.length, 0); jh.writeUInt32LE(0x4E4F534A, 4);
bh.writeUInt32LE(bin.length, 0); bh.writeUInt32LE(0x004E4942, 4);
const glb = Buffer.concat([header, jh, json, bh, bin]);
writeFileSync(`/tmp/${id}.glb`, glb);
writeFileSync(join(root, 'models', `${id}.js`),
  `// Corps neutre MakeHuman (maillage de base, licence CC0-1.0), converti par tools/makehuman-to-glb.mjs.\n` +
  `window.BODY_GLB_B64 = "${glb.toString('base64')}";\n`);

// ── Centres des articulations (repères) ──
const centers = Object.fromEntries(Object.entries(joints).sort().map(([k, set]) => {
  const pts = [...set].map(i => toModel(V[i])), c = [0, 1, 2].map(d => pts.reduce((s, p) => s + p[d], 0) / pts.length);
  c[2] -= floor; return [k, c.map(v => Math.round(v))];
}));
writeFileSync(join(root, 'data', 'bodies', `${id}.joints.json`),
  JSON.stringify({ id, generatedBy: 'tools/makehuman-to-glb.mjs', unit: 'mm', axes: 'z = hauteur, -y = avant, +x = gauche du sujet', joints: centers }, null, 1) + '\n');
console.log(`✓ ${pos.length} sommets, ${I.length / 3} triangles, taille ${Math.round(max[2])} mm, ${Object.keys(centers).length} articulations`);
