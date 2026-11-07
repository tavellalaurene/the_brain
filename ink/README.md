# Ink — la réponse au stress aiguë

Visualisation 3D pilotée par les données. Ouvrir `index.html` dans un navigateur.

## Architecture des données

```
data/
  entities/          les briques, partagées entre scénarios
    structures.json    régions du cerveau et organes
    messengers.json    ce qui se déplace (neurotransmetteurs, hormones)
    pathways.json      les flèches : structure → messager → structure, avec un effet
    sources.json       références scientifiques, chacune avec un niveau de preuve
    evidence-levels.json
    gauges.json        courbes schématiques (pas des mesures)
  scenarios/         les histoires : étapes, découpées en temps courts (beats)
    stress-aigu.json
  schema/            JSON Schema de chaque fichier (la forme attendue, documentée)
  bundle.js          FICHIER GÉNÉRÉ, lu par la page
tools/build.mjs      valide puis assemble
```

## Commandes

```bash
npm install          # une fois
npm run validate     # vérifie la forme (schémas) et la cohérence (identifiants cités)
npm run build        # vérifie puis régénère data/bundle.js
```

Toute modification d'un JSON doit être suivie de `npm run build`.

## Crédits

Vénus de Milo : scan du moulage en plâtre du SMK, National Gallery of Denmark, licence CC0.
