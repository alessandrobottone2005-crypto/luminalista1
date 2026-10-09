# Lumina — Lista 1

Landing page mobile-first, animata e interattiva per la campagna studentesca Lumina del Liceo Gentileschi di Napoli.

**Sito pubblico:** [luminalista1.vercel.app](https://luminalista1.vercel.app)

La direzione creativa segue un percorso dal buio alla luce: l’animazione originale realizzata in Blender apre il racconto a schermo intero, i contenuti emergono durante lo scroll e il percorso termina con un modulo collegato al Foglio Google Lumina.

## Stato finale

Versione **2.0.0 — 9 ottobre 2026**. Il progetto è completo e archiviato come riferimento, non è più in sviluppo attivo e non sono previsti ulteriori lavori. La gallery raccoglie tutte le **274 foto dei cinque giorni di propaganda**, da lunedì 5 a venerdì 9 ottobre 2026. Le istruzioni tecniche restano disponibili per riprodurre il sito e per eventuali interventi esplicitamente richiesti.

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

Il sito non ha navbar, menu né footer. Un pulsante Gallery fisso in alto a destra apre la pagina fotografica dedicata. Le route sono `/`, `/gallery`, `/privacy` e una pagina 404.

## Struttura

```text
src/
├── app/                 router e reset dello scroll tra le route
├── pages/               LandingPage, GalleryPage, PrivacyPage, NotFoundPage
├── components/
│   ├── LightReveal.tsx  wrapper per i reveal di luce
│   └── sections/        sezioni narrative, HeroAnimation e StickerSection
├── config/              heroFrames.ts, stickerWall.ts e gallery.json, generati dagli script
├── content/             site.ts: testi, candidati, programma, sticker
├── features/ideas/      validazione, invio e test del modulo
├── lib/                 countdown e relativi test
├── motion/              useLandingMotion (GSAP, ScrollTrigger, Lenis) e useStickerDrag
└── styles/              index.css, tokens.css, site.css
scripts/                 render Blender, frame hero, sticker, gallery e fallback statici
assets/source/           sorgenti non pubblicate (vedi SOURCES.md)
google-apps-script/      ricevitore del modulo
```

## Stack

Vite 8, React 19, TypeScript, React Router, GSAP con ScrollTrigger e `@gsap/react`, Lenis, Motion (stati del form), Lucide React, Poppins via `@fontsource` e il font locale DX Playhigh. Lo stile è CSS semplice in `src/styles`, con un reset in `@layer reset` all’inizio di `site.css`.

## Contenuti provvisori

Le sette proposte del programma, i quattro candidati e i tre sticker sono contenuti ufficiali. Il countdown è configurato al 14 ottobre 2026 alle 08:00 (`+02:00`) in [`src/content/site.ts`](src/content/site.ts). Per scelta del committente, l’informativa in [`src/pages/PrivacyPage.tsx`](src/pages/PrivacyPage.tsx) resta provvisoria, con il testo e le etichette esistenti. Questa scelta è mantenuta nella versione finale; non è un’attività di sviluppo pianificata. Riferimento: [`docs/CONTENT-GUIDE.md`](docs/CONTENT-GUIDE.md).

## Gallery fotografica

La pagina `/gallery` mostra un carosello fotografico a cascata, con autoplay controllabile, swipe e visualizzatore a schermo intero. Tutte le foto formano una sequenza unica, senza griglia o divisione visibile per giorni.

La raccolta completa comprende 72, 55, 50, 40 e 57 foto rispettivamente per i cinque giorni del 5–9 ottobre 2026, per un totale di **274 foto**. Gli originali sono conservati nelle cinque cartelle `assets/source/gallery/giorno1-…` fino a `giorno5-…`; i due MP4 del quinto giorno restano soltanto nell’archivio sorgente. Gli asset WebP responsive, il manifesto e il fallback statico sono già generati e tracciati. `npm run media:gallery` permette di rigenerarli ed è eseguito anche prima di dev e build. Guida completa in [`docs/GALLERY.md`](docs/GALLERY.md).

## Animazione dell’hero

La sorgente approvata è [`LogoLumina_Animazione.blend`](LogoLumina_Animazione.blend). La sequenza di 108 fotogrammi, riprodotta in loop su canvas a schermo intero, si rigenera seguendo [`docs/HERO-ANIMATION.md`](docs/HERO-ANIMATION.md).

## Documentazione

L’indice completo è in [`docs/README.md`](docs/README.md). Le regole operative per agenti e collaboratori sono in [`AGENTS.md`](AGENTS.md); la skill locale ricavata dal brief è in [`.agents/skills/lumina-project/SKILL.md`](.agents/skills/lumina-project/SKILL.md).

## Modulo Google

L’endpoint è configurato con `VITE_GOOGLE_SCRIPT_URL`. Il ricevitore vive in [`google-apps-script/Code.gs`](google-apps-script/Code.gs); dettagli e procedura di verifica sono in [`docs/FORM-AND-DATA.md`](docs/FORM-AND-DATA.md).
