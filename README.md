# Lumina — Lista 1

Landing page mobile-first, animata e interattiva per la campagna studentesca Lumina del Liceo Gentileschi di Napoli.

**Sito pubblico:** [luminalista1.vercel.app](https://luminalista1.vercel.app)

La direzione creativa segue un percorso dal buio alla luce: l’animazione originale realizzata in Blender apre il racconto a schermo intero, i contenuti emergono durante lo scroll e il percorso termina con un modulo collegato al Foglio Google Lumina.

## Avvio rapido

```bash
npm install
cp .env.example .env.local
npm run dev
```

Apri `http://localhost:4174`.

## Controllo completo

```bash
npm run check
```

Il comando verifica formato, TypeScript, test e build di produzione.

## Percorso della pagina

Hero (sequenza Blender su canvas) → Intro (unico `h1`) → Candidati → Countdown → Manifesto → Programma → Sticker → La tua idea → riga finale “© 2026 LUMINA · PRIVACY”.

Il sito non ha navbar, menu né footer. Le route sono `/`, `/privacy` e una pagina 404.

## Struttura

```text
src/
├── app/                 router e reset dello scroll tra le route
├── pages/               LandingPage, PrivacyPage, NotFoundPage
├── components/
│   ├── LightReveal.tsx  wrapper per i reveal di luce
│   └── sections/        sezioni narrative, HeroAnimation e StickerSection
├── config/              heroFrames.ts e stickerWall.ts, generati dagli script
├── content/             site.ts: testi, candidati, programma, sticker
├── features/ideas/      validazione, invio e test del modulo
├── lib/                 countdown e relativi test
├── motion/              useLandingMotion (GSAP, ScrollTrigger, Lenis) e useStickerDrag
└── styles/              index.css, tokens.css, site.css
scripts/                 render Blender, frame hero, sticker e fallback statico
assets/source/           sorgenti non pubblicate (vedi SOURCES.md)
google-apps-script/      ricevitore del modulo
```

## Stack

Vite 8, React 19, TypeScript, React Router, GSAP con ScrollTrigger e `@gsap/react`, Lenis, Motion (stati del form), Lucide React, Poppins via `@fontsource` e il font locale DX Playhigh. Lo stile è CSS semplice in `src/styles`, con un reset in `@layer reset` all’inizio di `site.css`.

## Contenuti provvisori

Le otto proposte del programma, i quattro candidati e i tre sticker sono contenuti ufficiali. Restano da verificare la data delle elezioni e da completare l’informativa privacy in [`src/content/site.ts`](src/content/site.ts) e [`src/pages/PrivacyPage.tsx`](src/pages/PrivacyPage.tsx), seguendo [`docs/CONTENT-GUIDE.md`](docs/CONTENT-GUIDE.md).

## Animazione dell’hero

La sorgente approvata è [`LogoLumina_Animazione.blend`](LogoLumina_Animazione.blend). La sequenza di 108 fotogrammi, riprodotta in loop su canvas a schermo intero, si rigenera seguendo [`docs/HERO-ANIMATION.md`](docs/HERO-ANIMATION.md).

## Documentazione

L’indice completo è in [`docs/README.md`](docs/README.md). Le regole operative per agenti e collaboratori sono in [`AGENTS.md`](AGENTS.md); la skill locale ricavata dal brief è in [`.agents/skills/lumina-project/SKILL.md`](.agents/skills/lumina-project/SKILL.md).

## Modulo Google

L’endpoint è configurato con `VITE_GOOGLE_SCRIPT_URL`. Il ricevitore vive in [`google-apps-script/Code.gs`](google-apps-script/Code.gs); dettagli e procedura di verifica sono in [`docs/FORM-AND-DATA.md`](docs/FORM-AND-DATA.md).
