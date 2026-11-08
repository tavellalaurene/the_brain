// Valide les données puis les assemble en un seul fichier pour la page.
//
//   npm run validate   → vérifie seulement (code de sortie 1 en cas d'erreur)
//   npm run build      → vérifie puis écrit data/bundle.js
//
// Deux niveaux de contrôle :
//   1. la forme de chaque fichier (JSON Schema, dans data/schema/)
//   2. la cohérence entre fichiers (chaque identifiant cité doit exister)
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'data');
const read = p => JSON.parse(readFileSync(join(root, p), 'utf8'));
const checkOnly = process.argv.includes('--check');

const ajv = new Ajv2020({ allErrors: true });
for (const f of readdirSync(join(root, 'schema'))) ajv.addSchema(read(`schema/${f}`));

const errors = [];
const validate = (schemaId, data, file) => {
  if (!ajv.validate(schemaId, data))
    for (const e of ajv.errors) errors.push(`${file}${e.instancePath || ''} : ${e.message}`);
};

// ── 1. Forme ──────────────────────────────────────────────────
const entities = {};
for (const name of ['evidence-levels', 'messengers', 'structures', 'pathways', 'sources', 'gauges', 'levers']) {
  entities[name] = read(`entities/${name}.json`);
  validate(`${name}.schema.json`, entities[name], `entities/${name}.json`);
}
const scenarios = {};
for (const f of readdirSync(join(root, 'scenarios')).filter(f => f.endsWith('.json'))) {
  const s = read(`scenarios/${f}`);
  validate('scenario.schema.json', s, `scenarios/${f}`);
  if (s.id !== basename(f, '.json')) errors.push(`scenarios/${f} : l'id "${s.id}" doit correspondre au nom du fichier`);
  scenarios[s.id] = s;
}

// ── 2. Cohérence ──────────────────────────────────────────────
const ids = {
  structure: new Set(entities.structures.map(s => s.id)),
  pathway: new Set(entities.pathways.map(p => p.id)),
  messenger: new Set(Object.keys(entities.messengers)),
  source: new Set(Object.keys(entities.sources)),
  evidence: new Set(Object.keys(entities['evidence-levels'])),
};
const ref = (kind, id, where) => { if (!ids[kind].has(id)) errors.push(`${where} : ${kind} inconnu(e) "${id}"`); };
const unique = (list, where) => {
  const seen = new Set();
  for (const x of list) { if (seen.has(x.id)) errors.push(`${where} : id en double "${x.id}"`); seen.add(x.id); }
};
unique(entities.structures, 'structures'); unique(entities.pathways, 'pathways');

for (const p of entities.pathways) {
  ref('structure', p.from, `pathways/${p.id}.from`); ref('structure', p.to, `pathways/${p.id}.to`);
  ref('messenger', p.messenger, `pathways/${p.id}.messenger`);
}
for (const [id, s] of Object.entries(entities.sources)) ref('evidence', s.level, `sources/${id}.level`);

for (const g of entities.gauges) {
  try { const v = new Function('t', `return ${g.f};`)(60); if (!Number.isFinite(v)) throw 0; }
  catch { errors.push(`gauges/${g.id}.f : expression invalide`); }
}
const used = { source: new Set(), pathway: new Set(), structure: new Set() };
for (const s of entities.structures) if (s.anatomy?.source) { ref('source', s.anatomy.source, `structures/${s.id}.anatomy.source`); used.source.add(s.anatomy.source); }
for (const sc of Object.values(scenarios)) {
  let lastT = 0;
  for (const st of sc.steps) {
    const w = `scenarios/${sc.id}/${st.id}`;
    st.evidence.forEach(e => ref('evidence', e, `${w}.evidence`));
    st.sources.forEach(s => { ref('source', s, `${w}.sources`); used.source.add(s); });
    if (st.gauge && !entities.gauges.some(g => g.id === st.gauge)) errors.push(`${w}.gauge : courbe inconnue "${st.gauge}"`);
    st.beats.forEach((b, i) => {
      b.light.forEach(s => { ref('structure', s, `${w}.beats[${i}].light`); used.structure.add(s); });
      b.show.forEach(p => { ref('pathway', p, `${w}.beats[${i}].show`); used.pathway.add(p); });
      if (b.t < lastT) errors.push(`${w}.beats[${i}].t : le temps recule (${b.t} < ${lastT})`);
      lastT = b.t;
    });
  }
}
const stepIds = new Set(Object.values(scenarios).flatMap(sc => sc.steps.map(s => s.id)));
for (const l of entities.levers) {
  const w = `levers/${l.id}`;
  l.steps.forEach(s => { if (!stepIds.has(s)) errors.push(`${w}.steps : étape inconnue "${s}"`); });
  (l.actsOn.structures || []).forEach(s => ref('structure', s, `${w}.actsOn`));
  (l.actsOn.pathways || []).forEach(p => ref('pathway', p, `${w}.actsOn`));
  l.evidence.forEach(e => ref('evidence', e, `${w}.evidence`));
  l.sources.forEach(s => { ref('source', s, `${w}.sources`); used.source.add(s); });
}
// Avertissements : données présentes mais jamais utilisées (pas bloquant)
const warnings = [];
for (const k of ['source', 'pathway']) for (const id of ids[k]) if (!used[k].has(id)) warnings.push(`${k} jamais utilisé(e) : ${id}`);

// ── Résultat ──────────────────────────────────────────────────
warnings.forEach(w => console.warn('⚠ ', w));
if (errors.length) {
  errors.forEach(e => console.error('✗ ', e));
  console.error(`\n${errors.length} erreur(s). Rien n'a été écrit.`);
  process.exit(1);
}
const counts = `${ids.structure.size} structures, ${ids.pathway.size} voies, ${ids.messenger.size} messagers, ${ids.source.size} sources, ${entities.levers.length} leviers, ${Object.keys(scenarios).length} scénario(s)`;
console.log(`✓ Données valides : ${counts}`);
if (checkOnly) process.exit(0);

// ── 3. Anatomie réelle → positions de scène, pour le corps choisi ──
const settings = read('settings.json');
const body = read(`bodies/${settings.body}.json`);
const measured = read(`bodies/${body.measured}`).sections;
// échelle corps / humain moyen : donnée (modèle à taille humaine) ou déduite de la hauteur de la tête (statue ≈ 1,3)
const k = body.scaleToHuman ?? (read(`bodies/${body.measured}`).top - body.head.chin) / body.head.humanHeadMm;
const lerp1 = (pts, h) => {   // interpolation linéaire dans une liste [[h, v], ...] triée par h
  if (h <= pts[0][0]) return pts[0][1];
  for (let i = 1; i < pts.length; i++) if (h <= pts[i][0]) {
    const [h0, v0] = pts[i - 1], [h1, v1] = pts[i]; return v0 + (v1 - v0) * (h - h0) / (h1 - h0); }
  return pts.at(-1)[1];
};
const toScene = ([x, y, h]) => { const { scale: s, offset: o } = body.scene;
  return [+(x * s + o[0]).toFixed(3), +(h * s + o[1]).toFixed(3), +(-y * s + o[2]).toFixed(3)]; };
// Origine MNI (commissure antérieure) dans le repère de la statue
const ac = [body.head.midX, body.head.front + body.head.acBehindForeheadMm * k, body.head.chin + body.head.acAboveChinMm * k];
// MNI : +x droite du sujet (= -x modèle), +y avant (= -y modèle), +z haut
const fromMni = ([x, y, z]) => [ac[0] - x * k, ac[1] - y * k, ac[2] + z * k];
const fromSpine = a => {
  const n = +a.level.slice(1), seg = body.spine.segmentMm;
  const h = body.spine.c7 - k * (a.level[0] === 'T' ? n * seg.T : 12 * seg.T + n * seg.L);
  const front = lerp1(measured.map(m => [m.h, m.front]), h), back = lerp1(measured.map(m => [m.h, m.back]), h);
  return [lerp1(body.midline.points, h) + a.leftMm * k, front + (back - front) * a.depth, h];
};
for (const s of entities.structures) s.pos = toScene(s.anatomy.space === 'mni' ? fromMni(s.anatomy.mm) : fromSpine(s.anatomy));
const bm = body.brainMni;
const brain = { center: toScene(fromMni(bm.center)), radii: [bm.radii[0], bm.radii[2], bm.radii[1]].map(r => +(r * k * body.scene.scale).toFixed(3)) };
const toVerify = entities.structures.filter(s => s.anatomy.status === 'a-verifier').map(s => s.id);
if (toVerify.length) console.warn(`⚠  positions à vérifier (${toVerify.length}) : ${toVerify.join(', ')}`);

const bundle = { entities, scenarios, body: { ...pickBody(body), brain } };
function pickBody(b) { const { id, label, license, source, model, global, scene, fade } = b; return { id, label, license, source, model, global, scene, fade }; }
writeFileSync(join(root, 'bundle.js'),
  '// FICHIER GÉNÉRÉ par tools/build.mjs : ne pas modifier à la main.\n' +
  '// Source : data/entities/*.json et data/scenarios/*.json\n' +
  `window.INK_DATA = ${JSON.stringify(bundle)};\n`);
console.log('✓ data/bundle.js écrit');
