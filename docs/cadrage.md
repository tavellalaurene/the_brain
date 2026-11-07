# Cadrage — visualisation « encre » des mécanismes du cerveau

## Intention

Restituer des connaissances sur le cerveau sous forme d'une expérience 3D
interactive, artistique et scientifiquement rigoureuse, pour comprendre un
mécanisme, voir comment agir dessus, et trouver des ressources pour aller plus loin.

Objectifs d'apprentissage : **3D web** et **architecture orientée données**.

## Règles de travail

- Livrer par petites versions testables ; feedback avant de continuer.
- Résultat rapide et montrable plutôt que long et complet.
- Rien n'est ajouté sans accord explicite.
- Aucun compromis scientifique : toute simplification est signalée et sourcée.
- Signaler tout point douteux (scientifique, éthique, moral).
- **Aucune information personnelle dans le dépôt.** Jamais.

## Décisions

| Sujet | Décision |
|---|---|
| Premier scénario | Réponse au stress aiguë (secondes → minutes → heures) |
| Scénario suivant (pressenti) | Anxiété d'anticipation (s'appuie sur le premier) |
| Interaction | Scénario joué étape par étape. Plus tard : paramètres modifiables. Bonus : exploration libre |
| Rôle de la 3D | Montrer la **profondeur** (structures superficielles / profondes) et le **temps** |
| Direction artistique | Encre noire sur papier, lavis (esprit sumi-e) |
| Rigueur | Chaque affirmation liée à une source, avec un niveau de preuve |

## L'encre comme langage

| Biologie | Rendu |
|---|---|
| Voie rapide (sympathique, adrénaline — secondes) | Trait de pinceau net et rapide |
| Voie lente (axe HHS, cortisol — pic ~20–30 min) | Encre qui diffuse dans le papier |
| Retour au calme (rétrocontrôle) | Encre qui sèche et pâlit |
| Profondeur anatomique | Perspective du lavis : proche = sombre, lointain = pâle |
| Niveau de preuve | Netteté du trait : solide = franc, fragile = estompé |

## Niveaux de preuve

`meta-analyse` · `essai-randomise` · `etude-limitee` · `consensus` · `temoignage`

## Jalon 1 — définition de « fini »

On peut dérouler le scénario du stress aigu étape par étape ; chaque étape est
sourcée avec son niveau de preuve ; la scène 3D est simple (formes, lumière,
mouvement), **sans effet encre**.

## Modèle de données (ébauche)

- **structures** — régions / systèmes (ex. amygdale, hypothalamus, surrénales)
- **messagers** — molécules (ex. noradrénaline, adrénaline, CRH, ACTH, cortisol)
- **mécanismes** — qui agit sur quoi, avec quel délai
- **scénarios** — suite d'étapes activant des mécanismes
- **leviers** — ce qui modifie la réaction
- **sources** — référence, lien, niveau de preuve

La scène lit les données ; ajouter une connaissance = ajouter une entrée sourcée.

## Questions ouvertes

- Ce projet vit-il à côté de la carte existante (`index.html`) ou la remplace-t-il à terme ?
- Choix technique 3D : Three.js « nu » ou React Three Fiber ?
- Ce qui plaît précisément dans chaque référence visuelle.
