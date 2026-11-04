# The Brain Map

A personal map of what I'm learning about my brain — the **chemicals**, **brain parts** and **mechanisms** that shape how I feel, and the **levers** I can pull to feel better, happier and more motivated.

## Open it

Open `index.html` in a browser (no install needed).

- Tap any box to see **what it is**, **how it shows up in my life**, **what helps**, and the lines to everything it's connected to.
- Write in **My notes** on any box — saved in the browser on this device. A ✎ marks boxes with notes.
- **Export my notes** downloads them as Markdown. Save that file into `notes/` and commit it so it's never lost.

## The four layers

| Layer | Question it answers | Examples |
|---|---|---|
| Chemicals | What messengers are involved? | dopamine, serotonin, cortisol, oxytocin |
| Brain parts | Where does it happen? | prefrontal cortex, amygdala, reward circuit |
| Mechanisms | What loops do I get caught in? | habit loop, rumination, procrastination, pleasure–pain balance |
| Levers | What can I actually do? | sleep, morning light, movement, naming emotions, small wins |

The idea: **a lever changes a chemical, which changes how a brain part behaves, which breaks (or builds) a loop.**

## Growing the map

All content lives in [`data.js`](data.js). To add something new, copy an entry and change it:

```js
{
  id: "caffeine", group: "lever", name: "Caffeine timing",
  tag: "Borrowed energy",
  what: "...", life: "...", counter: "...",
  links: ["sleep", "adrenaline"],
},
```

Links only need to be written on one side — the map draws them both ways.

---

*A simplified learning map, not medical advice. If low mood, anxiety or poor sleep lasts more than a couple of weeks, talking to a doctor or therapist is one of the strongest levers there is.*
