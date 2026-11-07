// Scénario : réponse au stress aiguë.
// Données pures (format JSON) assignées à une variable globale pour que la page
// s'ouvre par simple double-clic (fetch() est bloqué en file://).
window.INK_SCENARIO = {
  "id": "stress-aigu",
  "title": "La réponse au stress aiguë",
  "subtitle": "Des millisecondes à l'heure qui suit",

  "evidenceLevels": {
    "meta-analyse":   { "label": "Méta-analyse",   "rank": 5 },
    "essai-randomise":{ "label": "Essai randomisé","rank": 4 },
    "revue":          { "label": "Revue",          "rank": 4 },
    "consensus":      { "label": "Consensus",      "rank": 4 },
    "modele-animal":  { "label": "Modèle animal",  "rank": 2 },
    "etude-limitee":  { "label": "Étude limitée",  "rank": 2 },
    "temoignage":     { "label": "Témoignage",     "rank": 1 }
  },

  "messengers": {
    "nerf":          { "label": "Signal nerveux",  "color": "#e8e4dc", "speed": 1.6 },
    "noradrenaline": { "label": "Noradrénaline",   "color": "#ffb020", "speed": 1.2 },
    "adrenaline":    { "label": "Adrénaline",      "color": "#ff4d4d", "speed": 0.8 },
    "crh":           { "label": "CRH",             "color": "#b07cff", "speed": 0.5 },
    "acth":          { "label": "ACTH",            "color": "#4da3ff", "speed": 0.35 },
    "cortisol":      { "label": "Cortisol",        "color": "#2fd6b5", "speed": 0.25 },
    "vague":         { "label": "Nerf vague",      "color": "#9be15d", "speed": 0.9 }
  },

  "_note_positions": "Positions schématiques (y = haut/bas, z = avant/arrière). Pas une anatomie à l'échelle.",
  "structures": [
    { "id": "stimulus",     "label": "Stimulus",               "pos": [0, 1.4, 3.6],   "size": 0.18, "kind": "monde" },
    { "id": "thalamus",     "label": "Thalamus",               "pos": [0, 1.0, 0],     "size": 0.28 },
    { "id": "cortex",       "label": "Cortex sensoriel",       "pos": [0, 2.3, -0.6],  "size": 0.4 },
    { "id": "pfc",          "label": "Cortex préfrontal",      "pos": [0, 1.9, 1.7],   "size": 0.42 },
    { "id": "amygdale",     "label": "Amygdale",               "pos": [1.0, 0.3, 0.6], "size": 0.22 },
    { "id": "hippocampe",   "label": "Hippocampe",             "pos": [1.2, 0.5, -0.5],"size": 0.26 },
    { "id": "hypothalamus", "label": "Hypothalamus",           "pos": [0, 0.25, 0.5],  "size": 0.22 },
    { "id": "hypophyse",    "label": "Hypophyse",              "pos": [0, -0.35, 0.7], "size": 0.14 },
    { "id": "tronc",        "label": "Tronc cérébral",         "pos": [0, -0.8, -0.7], "size": 0.26, "detail": "Locus coeruleus, noyaux du nerf vague" },
    { "id": "medullo",      "label": "Médullosurrénale",       "pos": [0, -3.2, 0],    "size": 0.16, "kind": "corps" },
    { "id": "cortico",      "label": "Corticosurrénale",       "pos": [0, -3.2, 0],    "size": 0.32, "kind": "corps", "shell": true },
    { "id": "corps",        "label": "Cœur & corps",           "pos": [-1.6, -2.4, 0.4],"size": 0.36, "kind": "corps" }
  ],

  "pathways": [
    { "id": "p-stim-thal",   "from": "stimulus",     "to": "thalamus",     "messenger": "nerf" },
    { "id": "p-thal-amy",    "from": "thalamus",     "to": "amygdale",     "messenger": "nerf" },
    { "id": "p-thal-ctx",    "from": "thalamus",     "to": "cortex",       "messenger": "nerf" },
    { "id": "p-ctx-amy",     "from": "cortex",       "to": "amygdale",     "messenger": "nerf" },
    { "id": "p-amy-hyp",     "from": "amygdale",     "to": "hypothalamus", "messenger": "nerf" },
    { "id": "p-amy-tronc",   "from": "amygdale",     "to": "tronc",        "messenger": "nerf" },
    { "id": "p-lc-ctx",      "from": "tronc",        "to": "cortex",       "messenger": "noradrenaline" },
    { "id": "p-lc-pfc",      "from": "tronc",        "to": "pfc",          "messenger": "noradrenaline" },
    { "id": "p-hyp-med",     "from": "hypothalamus", "to": "medullo",      "messenger": "nerf", "via": [0.4, -1.8, -0.4] },
    { "id": "p-med-corps",   "from": "medullo",      "to": "corps",        "messenger": "adrenaline" },
    { "id": "p-hyp-hypo",    "from": "hypothalamus", "to": "hypophyse",    "messenger": "crh" },
    { "id": "p-hypo-cort",   "from": "hypophyse",    "to": "cortico",      "messenger": "acth", "via": [-0.6, -1.8, 0.8] },
    { "id": "p-cort-hip",    "from": "cortico",      "to": "hippocampe",   "messenger": "cortisol", "via": [1.6, -1.4, 0] },
    { "id": "p-cort-pfc",    "from": "cortico",      "to": "pfc",          "messenger": "cortisol", "via": [0.9, -0.6, 2.2] },
    { "id": "p-cort-amy",    "from": "cortico",      "to": "amygdale",     "messenger": "cortisol", "via": [1.4, -1.2, 0.9] },
    { "id": "p-cort-corps",  "from": "cortico",      "to": "corps",        "messenger": "cortisol" },
    { "id": "p-cort-hyp",    "from": "cortico",      "to": "hypothalamus", "messenger": "cortisol", "via": [0.5, -1.4, 0.6] },
    { "id": "p-cort-hypo",   "from": "cortico",      "to": "hypophyse",    "messenger": "cortisol", "via": [-0.3, -1.6, 1.1] },
    { "id": "p-tronc-corps", "from": "tronc",        "to": "corps",        "messenger": "vague" }
  ],

  "steps": [
    {
      "id": "detection",
      "title": "Détection",
      "time": "~ 0,1 seconde",
      "t": 0.1,
      "structures": ["stimulus", "thalamus", "cortex", "amygdale"],
      "pathways": ["p-stim-thal", "p-thal-amy", "p-thal-ctx", "p-ctx-amy"],
      "text": "Une information arrive par les sens : un bruit, un message, un regard. Le thalamus la relaie vers le cortex et vers l'amygdale, qui évalue sa pertinence : est-ce important ? est-ce une menace ?",
      "simplification": "L'amygdale n'est pas « le centre de la peur » : elle signale ce qui est saillant, et le ressenti conscient de peur implique d'autres circuits. La voie directe thalamus → amygdale est bien établie chez le rat, débattue chez l'humain.",
      "evidence": ["revue", "modele-animal"],
      "sources": ["ledoux-pine-2016"]
    },
    {
      "id": "alerte",
      "title": "Alerte : la voie rapide",
      "time": "quelques secondes",
      "t": 3,
      "structures": ["amygdale", "hypothalamus", "tronc", "cortex", "medullo", "corps"],
      "pathways": ["p-amy-hyp", "p-amy-tronc", "p-lc-ctx", "p-hyp-med", "p-med-corps"],
      "text": "L'amygdale active l'hypothalamus et le tronc cérébral. Le locus coeruleus diffuse de la noradrénaline dans le cerveau : la vigilance augmente. Par le système nerveux sympathique, la médullosurrénale libère de l'adrénaline dans le sang : cœur plus rapide, pression artérielle en hausse, glucose mobilisé.",
      "evidence": ["consensus", "revue"],
      "sources": ["ulrich-lai-herman-2009"]
    },
    {
      "id": "prefrontal",
      "title": "Le préfrontal décroche",
      "time": "secondes → minutes",
      "t": 40,
      "structures": ["tronc", "pfc"],
      "pathways": ["p-lc-pfc"],
      "text": "Un niveau élevé de noradrénaline et de dopamine modifie le fonctionnement du cortex préfrontal : la mémoire de travail et le raisonnement flexible se dégradent, au profit de réactions plus rapides et plus automatiques. Utile face à un danger immédiat, moins face à un problème complexe.",
      "simplification": "Mécanisme décrit surtout chez l'animal. Chez l'humain, les effets existent mais varient selon les tâches et les personnes. L'idée d'un basculement vers les habitudes est débattue (résultats de réplication mitigés).",
      "evidence": ["revue", "modele-animal"],
      "sources": ["arnsten-2009"]
    },
    {
      "id": "cascade",
      "title": "La cascade hormonale : la voie lente",
      "time": "minutes",
      "t": 900,
      "structures": ["hypothalamus", "hypophyse", "cortico"],
      "pathways": ["p-hyp-hypo", "p-hypo-cort"],
      "text": "L'hypothalamus libère la CRH, qui stimule l'hypophyse. L'hypophyse libère l'ACTH dans le sang. Arrivée aux glandes surrénales, l'ACTH déclenche la production de cortisol par la corticosurrénale. Le cortisol culmine environ 20 à 40 minutes après le début du stress.",
      "insight": "Les situations qui font le plus monter le cortisol combinent deux ingrédients : l'absence de contrôle et le jugement social (méta-analyse de 208 études).",
      "evidence": ["consensus", "meta-analyse"],
      "sources": ["ulrich-lai-herman-2009", "dickerson-kemeny-2004"]
    },
    {
      "id": "cortisol",
      "title": "Le cortisol agit",
      "time": "minutes → heures",
      "t": 2100,
      "structures": ["cortico", "hippocampe", "pfc", "amygdale", "corps"],
      "pathways": ["p-cort-hip", "p-cort-pfc", "p-cort-amy", "p-cort-corps"],
      "text": "Le cortisol mobilise l'énergie et module l'immunité. Il entre dans le cerveau et se fixe sur deux types de récepteurs (MR et GR), nombreux dans l'hippocampe et le cortex préfrontal. Ses effets sont plus lents et plus durables que ceux de l'adrénaline, notamment sur la mémorisation de l'événement.",
      "evidence": ["revue"],
      "sources": ["de-kloet-2005"]
    },
    {
      "id": "retour",
      "title": "Retour au calme",
      "time": "~ 1 heure",
      "t": 4000,
      "structures": ["cortico", "hypothalamus", "hypophyse", "hippocampe", "tronc", "corps"],
      "pathways": ["p-cort-hyp", "p-cort-hypo", "p-cort-hip", "p-tronc-corps"],
      "text": "Le cortisol freine sa propre production : en se fixant sur ses récepteurs dans l'hypothalamus, l'hypophyse et l'hippocampe, il réduit la libération de CRH et d'ACTH (rétrocontrôle négatif). Le parasympathique, via le nerf vague, ralentit le cœur. En laboratoire, le cortisol revient en général vers son niveau de base dans l'heure qui suit la fin du stress.",
      "toVerify": "Durées exactes de récupération dans Dickerson & Kemeny (2004) : à confirmer dans le texte intégral.",
      "evidence": ["consensus", "meta-analyse"],
      "sources": ["de-kloet-2005", "dickerson-kemeny-2004"]
    },
    {
      "id": "au-dela",
      "title": "Au-delà de « combat ou fuite »",
      "time": "",
      "t": null,
      "structures": [],
      "pathways": [],
      "text": "La réponse au stress ne se résume pas à combattre ou fuir. Elle peut aussi prendre la forme d'une sidération (freeze), ou d'une recherche de lien et de soutien : le « tend-and-befriend ».",
      "simplification": "Le « tend-and-befriend » est une hypothèse théorique influente, encore discutée.",
      "evidence": ["revue"],
      "sources": ["taylor-2000"]
    }
  ],

  "sources": {
    "ulrich-lai-herman-2009": {
      "cite": "Ulrich-Lai & Herman (2009). Neural regulation of endocrine and autonomic stress responses. Nature Reviews Neuroscience.",
      "url": "https://doi.org/10.1038/nrn2647", "level": "revue"
    },
    "arnsten-2009": {
      "cite": "Arnsten (2009). Stress signalling pathways that impair prefrontal cortex structure and function. Nature Reviews Neuroscience.",
      "url": "https://doi.org/10.1038/nrn2648", "level": "revue"
    },
    "dickerson-kemeny-2004": {
      "cite": "Dickerson & Kemeny (2004). Acute stressors and cortisol responses. Psychological Bulletin.",
      "url": "https://doi.org/10.1037/0033-2909.130.3.355", "level": "meta-analyse"
    },
    "de-kloet-2005": {
      "cite": "de Kloet, Joëls & Holsboer (2005). Stress and the brain: from adaptation to disease. Nature Reviews Neuroscience.",
      "url": "https://doi.org/10.1038/nrn1683", "level": "revue"
    },
    "ledoux-pine-2016": {
      "cite": "LeDoux & Pine (2016). Using neuroscience to help understand fear and anxiety: a two-system framework. American Journal of Psychiatry.",
      "url": "https://doi.org/10.1176/appi.ajp.2016.16030353", "level": "revue"
    },
    "taylor-2000": {
      "cite": "Taylor et al. (2000). Biobehavioral responses to stress in females: tend-and-befriend, not fight-or-flight. Psychological Review.",
      "url": "https://doi.org/10.1037/0033-295X.107.3.411", "level": "revue"
    }
  }
};
