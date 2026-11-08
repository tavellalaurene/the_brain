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
- Économiser les tokens (agents légers quand c'est possible).
- **Aucune information personnelle dans le dépôt.** Jamais. Le contenu
  existant reste tel quel ; la règle s'applique à tout nouvel ajout.

## Décisions

| Sujet | Décision |
|---|---|
| Premier scénario | Réponse au stress aiguë (secondes → minutes → heures) |
| Scénario suivant (pressenti) | Anxiété d'anticipation (s'appuie sur le premier) |
| Interaction | Scénario joué étape par étape. Plus tard : paramètres modifiables. Bonus : exploration libre |
| Rôle de la 3D | Montrer la **profondeur** (structures superficielles / profondes) et le **temps** |
| Direction artistique | Hybride : lavis d'encre pour le décor et la profondeur (le *où*) + filaments colorés et pulsants pour les signaux (le *quoi* et le *quand*) |
| Inspirations | Encre sur papier (sumi-e) ; filaments de génériques de séries ; formes mathématiques ; couleurs et pulsations |
| Couleurs | Libres pour ce début de projet |
| Corps | Vénus de Milo (scan du moulage SMK, CC0) rendue en verre : liseré de lumière (Fresnel), dégradé violet → bleu pâle, contre-jour violet ; le corps se dissout sous les hanches. Structures replacées dans la statue (positions approximatives) |
| Cerveau | À repenser. Les faisceaux façon tractographie sont retirés (ils masquaient l'information). Contour de verre conservé |
| Expérience principale | Le mode « Jouer » : une histoire scénarisée qui se déroule seule. Le rythme lent peut devenir un choix contemplatif |
| Emplacement | Dossier à part (`ink/`), la carte existante n'est pas touchée |
| Techno 3D | Three.js seul, sans build (CDN), données en JSON |
| Rigueur | Chaque affirmation liée à une source, avec un niveau de preuve |

## L'encre comme langage

| Biologie | Rendu |
|---|---|
| Voie rapide (sympathique, adrénaline — secondes) | Trait de pinceau net et rapide |
| Voie lente (axe HHS, cortisol — pic ~20–40 min) | Encre qui diffuse dans le papier |
| Retour au calme (rétrocontrôle) | Encre qui sèche et pâlit |
| Profondeur anatomique | Perspective du lavis : proche = sombre, lointain = pâle |
| Niveau de preuve | Netteté du trait : solide = franc, fragile = estompé |
| Voies nerveuses (axones) | Filaments lumineux |
| Influx nerveux / sécrétion pulsatile du cortisol | Pulsations de lumière le long des filaments |
| Dynamique d'un messager (montée, décroissance) | Courbes mathématiques réelles du phénomène |

Premier effet visuel après le jalon 1 : filaments lumineux (lignes + *bloom*),
plus simples que la simulation d'encre.

## Niveaux de preuve

`meta-analyse` · `essai-randomise` · `revue` · `consensus` · `modele-animal` · `etude-limitee` · `temoignage`

Sources : peu nombreuses, uniquement les plus solides. Une source non répliquée est écartée ou signalée.

## Revue à chaque itération

Vérification rapide de : qualité des sources · justesse scientifique ·
compréhensibilité · expérience UX · visuel. Toujours en lien avec le but :
apprendre professionnellement, enrichir le portfolio, restituer l'information.

## Jalon 1 — définition de « fini »

On peut dérouler le scénario du stress aigu étape par étape ; chaque étape est
sourcée avec son niveau de preuve ; la scène 3D est simple (formes, lumière,
mouvement), **sans effet encre**. Leviers hors périmètre. Mention « au-delà de combat ou fuite » incluse.

État : première version dans `ink/` (ouvrir `ink/index.html`).

## Modèle de données (ébauche)

- **structures** — régions / systèmes (ex. amygdale, hypothalamus, surrénales)
- **messagers** — molécules (ex. noradrénaline, adrénaline, CRH, ACTH, cortisol)
- **mécanismes** — qui agit sur quoi, avec quel délai
- **scénarios** — suite d'étapes activant des mécanismes
- **leviers** — ce qui modifie la réaction
- **sources** — référence, lien, niveau de preuve

La scène lit les données ; ajouter une connaissance = ajouter une entrée sourcée.

## Questions ouvertes

- Aucune pour l'instant.

## Plus tard

- Ressources « Aller plus loin » (livres, cours) : pas pour l'instant. Revérifier les numéros d'aide tous les 6 mois (le build avertit).
- Rythme du mode « Jouer » : durée et nombre des pauses « Où agir ici ? ».
- Traduire les données des courbes dans le corps (cœur, cerveau, sang).
- Positions encore à vérifier : niveau vertébral du cœur, proportions de la tête.
- Cerveau : visualisation à repenser.
- Alléger le modèle 3D (gltf-transform).
