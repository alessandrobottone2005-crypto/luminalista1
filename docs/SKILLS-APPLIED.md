# Skill applicate

## Fonti

- [Three.js Skills](https://github.com/CloudAI-X/threejs-skills) — valutazione di scena, animazione, luci, formati di esportazione e budget GPU.
- [GSAP Skills](https://github.com/greensock/gsap-skills) — `useGSAP`, ScrollTrigger, trasformazioni, refresh e cleanup.
- [Design DNA](https://github.com/zanwei/design-dna) — separazione fra token, stile percepito ed effetti visivi.
- [Motion Design Skill](https://github.com/lottiefiles/motion-design-skill) — intento emotivo, durata, easing e coreografia.
- [Genjutsu](https://github.com/AThevon/genjutsu) — tesi d’interazione, anti-pattern generici e audit finale.
- [i-have-ADHD](https://github.com/ayghri/i-have-adhd) — azione prima, passaggi numerati, stato visibile e un prossimo passo concreto.
- [Book-to-Skill](https://github.com/virgiliojr94/book-to-skill) — estrazione di regole e framework dal brief invece di una semplice sintesi.

## Applicazione nel repository

Il brief è stato trasformato in token, regole operative e una skill locale in [`.agents/skills/lumina-project`](../.agents/skills/lumina-project). Le librerie di animazione hanno responsabilità separate. Le indicazioni Three.js sono state usate per valutare l’esportazione GLB; i materiali Cycles e la nebbia volumetrica hanno portato alla scelta del video renderizzato, che conserva fedelmente il file Blender originale.

## Skill locali vendorizzate

Tre skill Claude Code sono installate localmente in [`.agents/skills/`](../.agents/skills/) e tracciate in [`skills-lock.json`](../skills-lock.json):

- `design-taste-frontend` — audit anti-slop per landing page.
- `motion-dev-animations` — pattern di animazione Motion.dev per React.
- `ui-ux-pro-max` — checklist di priorità UI/UX, installata in versione leggera (solo guida, nessun tooling Python vendorizzato).
