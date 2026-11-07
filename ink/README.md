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
  bodies/            le corps affiché : repères mesurés et conversions
    venus-de-milo.json           repères (tête, colonne, ligne médiane) et hypothèses
    venus-de-milo.measured.json  GÉNÉRÉ par tools/measure-body.mjs (tranches du modèle)
  schema/            JSON Schema de chaque fichier (la forme attendue, documentée)
  bundle.js          FICHIER GÉNÉRÉ, lu par la page
tools/build.mjs      valide, convertit l'anatomie en positions de scène, puis assemble
tools/measure-body.mjs  mesure un modèle GLB par tranches de hauteur
```

## Positions anatomiques

Les structures ne sont pas placées à la main. Chacune porte une `anatomy` :

- `mni` : coordonnées cérébrales standard (mm, origine à la commissure antérieure) ;
- `spine` : niveau vertébral, profondeur dans le tronc, décalage latéral.

Le build les convertit en positions de scène grâce aux repères du corps. Chaque position a un statut
(`source`, `a-verifier`, `conventionnel`) ; le build liste celles qui restent à vérifier.

## Commandes

```bash
npm install          # une fois
npm run validate     # vérifie la forme (schémas) et la cohérence (identifiants cités)
npm run build        # vérifie puis régénère data/bundle.js
```

Toute modification d'un JSON doit être suivie de `npm run build`.

## Crédits

Vénus de Milo : scan du moulage en plâtre du SMK, National Gallery of Denmark, licence CC0.
