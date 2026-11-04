// ─────────────────────────────────────────────────────────────
//  THE BRAIN MAP — content
//  Edit this file to grow your map. Each entry is one node.
//
//  id      unique short name (used in `links`)
//  group   "chemical" | "region" | "mechanism" | "lever"
//  name    what shows on the map
//  tag     one-line summary
//  what    what it is / does (the science, simply)
//  life    how it shows up in my day-to-day
//  counter what I can do about it (for levers: how to use it)
//  links   ids of related nodes (connections are drawn both ways)
//  mine    (optional) MY OWN NOTES, in my words — shown first, as written
//  sketch  (optional) "effortCurve" shows my hand-drawn curve
// ─────────────────────────────────────────────────────────────

window.BRAIN_GROUPS = {
  chemical:  { label: "Chemicals",       hint: "The messengers" },
  region:    { label: "Brain parts",     hint: "Where it happens" },
  mechanism: { label: "Mechanisms",      hint: "The loops I get caught in" },
  lever:     { label: "Levers",          hint: "What I can pull" },
};

window.BRAIN_NODES = [
  // ── CHEMICALS ────────────────────────────────────────────
  {
    id: "dopamine", group: "chemical", name: "Dopamine",
    tag: "Wanting, drive, “go get it”",
    mine: [
      "“Slowly earned” through effort.",
      "Dopamine system:",
      "• Slow dopamine → (10 min?) → accomplishment, satisfaction, productive excitement",
      "• Fast dopamine → addictive → demotivated, depressive symptoms. ↳ exhausts the system",
    ],
    what: "Less about pleasure, more about motivation and anticipation. It spikes when something is better than expected and signals “this is worth effort”. It also sets a baseline: after a big spike, levels dip below where they started.",
    life: "The pull to check my phone. The rush of starting something new, then the flatness after. Feeling unmotivated after a day of easy, fast rewards.",
    counter: "Protect the baseline: fewer cheap spikes (scrolling, sugar, constant novelty). Earn it through effort — reward the effort itself, not only the result. Break goals into small wins so it fires along the way.",
    links: ["reward", "pfc", "habit", "baseline", "smallwins", "cheapdopamine", "exercise", "cold", "light"],
  },
  {
    id: "serotonin", group: "chemical", name: "Serotonin",
    tag: "Steadiness, “I have enough”",
    what: "Involved in mood stability, patience, impulse control, sleep and appetite. Linked to a sense of contentment and social standing rather than excitement.",
    life: "Feeling calm and okay with what is, versus irritable, impatient, or stuck comparing myself to others.",
    counter: "Daylight (especially morning), regular movement, gratitude and savoring, good sleep, regular meals, time in nature.",
    links: ["light", "exercise", "gratitude", "sleep", "melatonin", "nature", "negbias"],
  },
  {
    id: "oxytocin", group: "chemical", name: "Oxytocin",
    tag: "Connection, trust, safety with others",
    what: "Released with touch, closeness, eye contact and trust. It helps bonding and can soften the stress response.",
    life: "The calm after a good hug or real conversation. Loneliness making everything feel heavier.",
    counter: "Hugs, time with people I trust, caring for someone (or a pet), acts of kindness.",
    links: ["social", "amygdala", "cortisol", "stress"],
  },
  {
    id: "endorphins", group: "chemical", name: "Endorphins",
    tag: "The body’s own painkiller",
    what: "Natural opioids released with physical strain, laughter and sometimes music or crying. They dull pain and create a sense of relief and well-being.",
    life: "The lightness after a hard workout, a long laugh, or a good cry.",
    counter: "Sustained exercise, laughing with others, dancing, singing.",
    links: ["exercise", "social", "stress"],
  },
  {
    id: "cortisol", group: "chemical", name: "Cortisol",
    tag: "The stress hormone (not the enemy)",
    what: "Released by the stress system (HPA axis). Naturally high in the morning to wake me up. Helpful in short bursts; harmful when stuck high for weeks — it disrupts sleep, memory and mood.",
    life: "Wired-but-tired. Waking at 4am with a busy mind. Feeling under constant pressure.",
    counter: "Close the stress cycle: move, breathe with long exhales, sleep, connect. Get morning light so the cortisol peak happens early, not at night.",
    links: ["stress", "amygdala", "hippocampus", "sleep", "breathing", "exercise", "light", "rumination"],
  },
  {
    id: "adrenaline", group: "chemical", name: "Adrenaline / Noradrenaline",
    tag: "Alert, fight-or-flight",
    what: "Fast arousal chemicals: heart up, focus narrows, energy rises. Noradrenaline in the brain sharpens attention; too much feels like anxiety.",
    life: "Racing heart before a hard conversation. The focus that kicks in right before a deadline.",
    counter: "Use it: reframe nerves as “my body getting ready”. Calm it: slow exhale breathing. Cold water raises it on purpose.",
    links: ["stress", "amygdala", "breathing", "cold", "procrastination"],
  },
  {
    id: "gaba", group: "chemical", name: "GABA",
    tag: "The brakes",
    what: "The brain’s main calming (inhibitory) messenger. It quiets over-activity.",
    life: "Being able to switch off, versus a mind that won’t stop.",
    counter: "Slow breathing, meditation, yoga, sleep. (Alcohol mimics it short-term, then rebounds into worse anxiety.)",
    links: ["breathing", "meditation", "sleep", "amygdala"],
  },
  {
    id: "melatonin", group: "chemical", name: "Melatonin",
    tag: "The “it’s night” signal",
    what: "Released when it gets dark, telling the body it is time to sleep. Bright light — especially at night — suppresses it.",
    life: "Lying awake after screens late at night. Jet-lag feeling after irregular weekends.",
    counter: "Bright light in the morning, dim warm light in the evening, consistent wake time.",
    links: ["sleep", "light", "serotonin"],
  },

  // ── BRAIN PARTS ──────────────────────────────────────────
  {
    id: "pfc", group: "region", name: "Prefrontal cortex",
    tag: "The planner, the CEO",
    what: "Behind the forehead. Plans, chooses, holds goals in mind, calms emotional reactions. The first part to go offline when I’m tired, stressed or overloaded.",
    life: "Good decisions in the morning, bad ones at midnight. Knowing what to do but not doing it.",
    counter: "Sleep, fewer decisions (routines), write the plan down, name emotions to bring it back online, movement.",
    links: ["amygdala", "dopamine", "habit", "labeling", "sleep", "stress", "procrastination", "meditation"],
  },
  {
    id: "amygdala", group: "region", name: "Amygdala",
    tag: "The smoke detector",
    what: "Scans for threats and triggers the alarm, fast and before thinking. Tuned to be over-sensitive: better a false alarm than a missed danger.",
    life: "Overreacting to an email. That jolt when someone sounds annoyed. Avoiding a task that feels “dangerous”.",
    counter: "Name the feeling (it calms the alarm), slow exhales, ask “am I actually in danger?”. Repeated safe exposure retrains it.",
    links: ["stress", "pfc", "negbias", "labeling", "breathing", "cortisol", "adrenaline", "procrastination", "oxytocin"],
  },
  {
    id: "hippocampus", group: "region", name: "Hippocampus",
    tag: "Memory and context",
    what: "Stores new memories and gives them context (“this was then, this is now”). Sensitive to chronic stress; grows with exercise and is supported by sleep.",
    life: "Forgetting things when overwhelmed. Old memories coloring how I see today.",
    counter: "Exercise, sleep, learning new things, lowering chronic stress.",
    links: ["sleep", "exercise", "cortisol", "plasticity"],
  },
  {
    id: "reward", group: "region", name: "Reward circuit",
    tag: "VTA → nucleus accumbens",
    what: "The dopamine pathway that learns what is worth chasing. It doesn’t care whether the thing is good for me long-term.",
    life: "Cravings. Doing the same thing again and again because it once felt good.",
    counter: "Point it at good targets: make healthy actions immediately rewarding, make bad ones harder to reach.",
    links: ["dopamine", "habit", "baseline", "cheapdopamine", "smallwins"],
  },
  {
    id: "insula", group: "region", name: "Insula",
    tag: "Feeling the body from inside",
    what: "Reads signals from the body (heartbeat, gut, breath) and turns them into feelings. Part of how emotions are “felt”.",
    life: "Butterflies, a knot in the stomach, a tight chest — before I know what I feel.",
    counter: "Body scans and noticing sensations without judgment; the body often knows first.",
    links: ["meditation", "labeling", "breathing"],
  },
  {
    id: "amcc", group: "region", name: "aMCC",
    tag: "Lights up when resisting",
    mine: [
      "Lights up when resisting an addictive behavior / intentionally engaging in a resisting behavior.",
    ],
    links: ["fastdopamine", "pushthrough"],
  },
  {
    id: "dmn", group: "region", name: "Default mode network",
    tag: "The wandering, self-talk mind",
    what: "A set of regions active when I’m not focused on a task: daydreaming, thinking about myself, past and future. Useful for creativity, but it can loop into worry.",
    life: "The inner voice replaying conversations. Mind drifting while doing the dishes.",
    counter: "Absorbing activity (flow), meditation, time in nature, writing thoughts out.",
    links: ["rumination", "meditation", "nature", "journaling"],
  },

  // ── MECHANISMS ───────────────────────────────────────────
  {
    id: "stress", group: "mechanism", name: "Stress response",
    tag: "Alarm → hormones → body ready",
    what: "Amygdala sounds the alarm → adrenaline (seconds) and cortisol via the HPA axis (minutes). Built for short threats. Modern stress rarely ends, so the cycle never “completes”.",
    life: "Carrying tension all day even after the stressful thing is over.",
    counter: "Complete the cycle with the body: movement, a long exhale, a hug, crying, laughing. Stress is not the problem — never recovering from it is.",
    links: ["amygdala", "cortisol", "adrenaline", "exercise", "breathing", "social", "sleep"],
  },
  {
    id: "habit", group: "mechanism", name: "Habit loop",
    tag: "Cue → routine → reward",
    what: "Repeated actions move from the effortful PFC to automatic circuits (basal ganglia). A cue triggers the routine; the reward strengthens it.",
    life: "Picking up the phone the moment I feel bored. Snacking when stressed.",
    counter: "Keep the cue and reward, swap the routine. Make good habits obvious and easy, bad ones invisible and hard. Start tiny.",
    links: ["dopamine", "reward", "pfc", "plasticity", "smallwins", "cheapdopamine"],
  },
  {
    id: "baseline", group: "mechanism", name: "Pleasure–pain balance",
    tag: "Every high has a dip",
    what: "The brain keeps balance: after a big dopamine spike, it pulls below baseline. Repeated spikes lower the baseline itself (hedonic adaptation), so normal life feels dull.",
    life: "Feeling flat and unmotivated after a weekend of bingeing. Needing more to feel the same.",
    counter: "A “dopamine reset”: some days with fewer spikes. Lean into effort-first pleasures (exercise, cold, hard work) which raise the baseline after.",
    links: ["dopamine", "reward", "cheapdopamine", "cold", "exercise"],
  },
  {
    id: "negbias", group: "mechanism", name: "Negativity bias",
    tag: "Bad sticks, good slips",
    what: "The brain registers threats and failures more strongly than good things — useful for survival, unfair for happiness.",
    life: "Remembering one criticism over ten compliments. A good day erased by one bad moment.",
    counter: "Deliberately stay with good moments for 10–20 seconds. Gratitude lists. Notice the good on purpose.",
    links: ["amygdala", "gratitude", "rumination", "serotonin"],
  },
  {
    id: "rumination", group: "mechanism", name: "Rumination loop",
    tag: "Thinking in circles",
    what: "Replaying problems without solving them. Keeps the stress system switched on and the mood low.",
    life: "Lying in bed going over the same conversation.",
    counter: "Write it down, then decide on one next step. Move the body. Shift attention to something absorbing. Meditation trains noticing the loop.",
    links: ["dmn", "cortisol", "negbias", "journaling", "meditation", "exercise"],
  },
  {
    id: "procrastination", group: "mechanism", name: "Procrastination",
    tag: "Avoiding a feeling, not a task",
    what: "Mostly emotion regulation: the task feels threatening or unpleasant (amygdala), so I escape to something that feels better now (reward circuit).",
    life: "Cleaning the kitchen instead of the thing that matters. Guilt making it even harder.",
    counter: "Name the feeling. Shrink the first step to 2 minutes. Self-compassion instead of guilt. Start before you feel ready — motivation follows action.",
    links: ["amygdala", "pfc", "smallwins", "labeling", "adrenaline", "dopamine"],
  },
  {
    id: "slowdopamine", group: "mechanism", name: "Slow dopamine",
    tag: "Slowly earned through effort",
    mine: [
      "Slow dopamine → (10 min?) →",
      "Feelings: accomplishment, satisfaction, productive excitement.",
    ],
    links: ["dopamine", "pushthrough"],
  },
  {
    id: "fastdopamine", group: "mechanism", name: "Fast dopamine",
    tag: "Addictive, exhausts the system",
    mine: [
      "Fast dopamine → addictive →",
      "↳ exhausts the system",
      "Feelings: demotivated, depressive symptoms.",
    ],
    links: ["dopamine", "amcc"],
  },
  {
    id: "pushthrough", group: "mechanism", name: "The first 15 minutes",
    tag: "Need to push through!",
    sketch: "effortCurve",
    mine: [
      "15 min = hardest time, lowest dopamine.",
      "⚠ Need to push through!",
    ],
    links: ["slowdopamine", "amcc"],
  },
  {
    id: "plasticity", group: "mechanism", name: "Neuroplasticity",
    tag: "Neurons that fire together, wire together",
    what: "The brain physically changes with what I repeat. Focus and effort mark what to change; sleep is when much of the rewiring is consolidated.",
    life: "Things that once felt impossible becoming automatic. Also: old patterns that took years to build.",
    counter: "Repetition + attention + rest. Be patient: change is real, but gradual.",
    links: ["habit", "sleep", "hippocampus", "meditation"],
  },

  // ── LEVERS ───────────────────────────────────────────────
  {
    id: "sleep", group: "lever", name: "Sleep",
    tag: "The foundation of everything",
    what: "Clears waste, consolidates memory and resets emotional reactivity. One bad night makes the amygdala more reactive and the PFC weaker.",
    life: "Everything feels harder and more personal after poor sleep.",
    counter: "Same wake time every day, morning light, dim evenings, cool dark room, no caffeine late.",
    links: ["pfc", "amygdala", "hippocampus", "melatonin", "cortisol", "plasticity", "light"],
  },
  {
    id: "light", group: "lever", name: "Morning light",
    tag: "Set the body clock",
    what: "Daylight in the eyes early in the day sets the circadian clock: alertness in the morning, melatonin at night. Supports mood.",
    life: "Groggy mornings, late-night alertness.",
    counter: "10–30 min outside within an hour of waking (longer if cloudy). No sunglasses needed for this, but never stare at the sun.",
    links: ["melatonin", "cortisol", "serotonin", "dopamine", "sleep"],
  },
  {
    id: "exercise", group: "lever", name: "Movement",
    tag: "The closest thing to a miracle drug",
    what: "Raises dopamine, serotonin, endorphins and BDNF (fertilizer for neurons). Burns off stress hormones and completes the stress cycle.",
    life: "Feeling better after a walk even when I didn’t want to go.",
    counter: "Anything counts. A 10-minute walk beats a perfect plan I don’t do.",
    links: ["dopamine", "serotonin", "endorphins", "cortisol", "hippocampus", "stress", "rumination", "baseline"],
  },
  {
    id: "breathing", group: "lever", name: "Long exhale breathing",
    tag: "The fastest off-switch",
    what: "Exhaling longer than inhaling activates the parasympathetic (rest) system and slows the heart. A double inhale + long exhale (“physiological sigh”) works in a few breaths.",
    life: "Pre-meeting panic, anger rising, can’t fall asleep.",
    counter: "Two inhales through the nose, one long exhale through the mouth. Repeat 2–5 times.",
    links: ["stress", "amygdala", "adrenaline", "cortisol", "gaba", "insula"],
  },
  {
    id: "labeling", group: "lever", name: "Name the emotion",
    tag: "“Name it to tame it”",
    what: "Putting a feeling into words (affect labeling) increases PFC activity and reduces amygdala activity.",
    life: "Vague overwhelm becoming “I’m anxious about this deadline” — and suddenly manageable.",
    counter: "Pause: “I notice I’m feeling…”. Be specific: disappointed, lonely, overwhelmed, not just “bad”.",
    links: ["pfc", "amygdala", "insula", "procrastination", "journaling"],
  },
  {
    id: "smallwins", group: "lever", name: "Small wins",
    tag: "Motivation follows action",
    what: "Completing small steps releases dopamine and builds the “I can” loop. Big vague goals give the reward circuit nothing to grab.",
    life: "A to-do list ticked off making the next thing easier.",
    counter: "Make the first step ridiculously small. Track progress visibly. Celebrate tiny completions.",
    links: ["dopamine", "reward", "habit", "procrastination"],
  },
  {
    id: "cheapdopamine", group: "lever", name: "Less cheap dopamine",
    tag: "Guard the baseline",
    what: "Endless feeds, notifications, junk food, constant novelty: big rewards for no effort. They train the reward circuit to want more and lower the baseline.",
    life: "Opening apps without deciding to. Boredom feeling unbearable.",
    counter: "Phone out of the bedroom, notifications off, grayscale screen, set times for social media. Let myself be bored sometimes.",
    links: ["dopamine", "reward", "baseline", "habit"],
  },
  {
    id: "social", group: "lever", name: "Connection",
    tag: "We are built for each other",
    what: "Safe connection releases oxytocin and endorphins and calms the stress system. Loneliness is a real stressor for the body.",
    life: "Lighter after a call with a friend. Heavier after days alone.",
    counter: "Reach out first. Small contacts count (a chat with a neighbor). Hugs. Help someone.",
    links: ["oxytocin", "endorphins", "stress", "amygdala"],
  },
  {
    id: "gratitude", group: "lever", name: "Gratitude & savoring",
    tag: "Train attention toward the good",
    what: "Regularly noticing good things counters the negativity bias and is linked to better mood over time.",
    life: "Ending the day thinking of what went wrong.",
    counter: "Three specific good things each evening. Stay with a good moment for 20 seconds.",
    links: ["negbias", "serotonin", "journaling"],
  },
  {
    id: "meditation", group: "lever", name: "Meditation",
    tag: "Training attention",
    what: "Practicing noticing where attention goes and bringing it back. Over time linked to calmer stress reactions and less mind-wandering rumination.",
    life: "Noticing the loop sooner instead of being swept away by it.",
    counter: "Start with 5 minutes. Focus on breath; when the mind wanders, notice and return. The returning is the exercise.",
    links: ["pfc", "dmn", "rumination", "insula", "gaba", "plasticity"],
  },
  {
    id: "nature", group: "lever", name: "Time in nature",
    tag: "Soft attention",
    what: "Natural environments hold attention gently, letting the focused-attention system rest. Linked to less rumination and lower stress.",
    life: "Clearer head after a walk in the park.",
    counter: "Walks among trees or by water, without the phone if possible.",
    links: ["dmn", "rumination", "serotonin", "exercise"],
  },
  {
    id: "journaling", group: "lever", name: "Writing it out",
    tag: "Get it out of the head",
    what: "Writing thoughts down frees working memory and helps the PFC organize what the emotional brain is shouting.",
    life: "A head full of open loops at night.",
    counter: "Brain-dump before bed. Write the worry, then one next action.",
    links: ["rumination", "labeling", "dmn", "gratitude", "pfc"],
  },
  {
    id: "cold", group: "lever", name: "Cold exposure",
    tag: "Deliberate, short discomfort",
    what: "Cold water triggers a large, lasting rise in noradrenaline and dopamine. Evidence for mood is promising but still limited.",
    life: "Alert and upbeat after a cold shower ending.",
    counter: "End the shower with 30–60 s cold. Optional — skip it if it doesn’t suit you or you have heart issues.",
    links: ["dopamine", "adrenaline", "baseline"],
  },
];
