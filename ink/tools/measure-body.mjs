// Mesure la statue (GLB) et écrit ses repères dans data/bodies/<id>.measured.json.
//
//   node tools/measure-body.mjs <fichier.glb> <id>
//
// Repère du modèle : z = hauteur (mm), -y = avant, +x = gauche du sujet.
// Pour chaque tranche de hauteur, on garde : la médiane des x (milieu du corps,
// robuste aux moignons de bras), l'avant (y min) et l'arrière (y max).
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const [file, id] = process.argv.slice(2);
if (!file || !id) { console.error('usage : node tools/measure-body.mjs <fichier.glb> <id>'); process.exit(1); }

const buf = readFileSync(file);
const jsonLen = buf.readUInt32LE(12);
const gltf = JSON.parse(buf.subarray(20, 20 + jsonLen));
const bin = buf.subarray(20 + jsonLen + 8);
const acc = gltf.accessors[gltf.meshes[0].primitives[0].attributes.POSITION];
const view = gltf.bufferViews[acc.bufferView];
const stride = (view.byteStride || 12) / 4;
const f = new Float32Array(bin.buffer, bin.byteOffset + (view.byteOffset || 0) + (acc.byteOffset || 0), (acc.count - 1) * stride + 3);

const top = acc.max[2], STEP = 20, sections = [];
for (let h = Math.round(top * .45); h <= top; h += STEP) {
  const xs = []; let front = Infinity, back = -Infinity;
  for (let i = 0; i < acc.count; i++) {
    const z = f[i * stride + 2];
    if (z < h - STEP / 2 || z >= h + STEP / 2) continue;
    xs.push(f[i * stride]); front = Math.min(front, f[i * stride + 1]); back = Math.max(back, f[i * stride + 1]);
  }
  if (xs.length < 8) continue;
  xs.sort((a, b) => a - b);
  sections.push({ h, xMid: Math.round(xs[xs.length >> 1]), front: Math.round(front), back: Math.round(back) });
}
const out = { id, generatedBy: 'tools/measure-body.mjs', unit: 'mm', axes: 'z = hauteur, -y = avant, +x = gauche du sujet',
  top: Math.round(top), sections };
const path = join(dirname(fileURLToPath(import.meta.url)), '..', 'data', 'bodies', `${id}.measured.json`);
writeFileSync(path, JSON.stringify(out, null, 1) + '\n');
console.log(`✓ ${sections.length} tranches → ${path}`);
