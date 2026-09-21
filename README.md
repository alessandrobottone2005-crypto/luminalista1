# Lumina — Lista 1

Landing page mobile-first, animata e interattiva per la campagna studentesca Lumina del Liceo Gentileschi di Napoli.

**Sito pubblico:** [luminalista1.vercel.app](https://luminalista1.vercel.app)

La direzione creativa segue un percorso dal buio alla luce: l’animazione originale realizzata in Blender apre il racconto, i contenuti emergono durante lo scroll e il percorso termina con un modulo collegato al Foglio Google Lumina.

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

## Struttura

```text
src/
├── app/                 router
├── pages/               composizione delle pagine
├── components/
│   ├── brand/           accesso centralizzato agli asset
│   ├── layout/          header, footer e rail desktop
│   ├── motion/          wrapper di presentazione
│   ├── sections/        sezioni narrative
│   └── ui/              primitive shadcn/ui
├── content/             contenuti modificabili
├── features/ideas/      modulo e trasporto dati
├── motion/              GSAP, ScrollTrigger e Lenis
└── styles/              token e stile globale
```

## Stack

React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Lucide React, Motion, React Router, Lenis, GSAP, Three.js e React Three Fiber.

## Contenuti provvisori

Citazioni, programma e gadget sono ancora dimostrativi. Aggiornali in [`src/content/site.ts`](src/content/site.ts) seguendo [`docs/CONTENT-GUIDE.md`](docs/CONTENT-GUIDE.md).

## Animazione dell’header

La sorgente approvata è [`LogoLumina_Animazione.blend`](LogoLumina_Animazione.blend). Il video ottimizzato e il poster si rigenerano seguendo [`docs/HEADER-ANIMATION.md`](docs/HEADER-ANIMATION.md).

## Documentazione

L’indice completo è in [`docs/README.md`](docs/README.md). Le regole operative per agenti e collaboratori sono in [`AGENTS.md`](AGENTS.md); la skill locale ricavata dal brief è in [`.agents/skills/lumina-project/SKILL.md`](.agents/skills/lumina-project/SKILL.md).

## Modulo Google

L’endpoint è configurato con `VITE_GOOGLE_SCRIPT_URL`. Il ricevitore vive in [`google-apps-script/Code.gs`](google-apps-script/Code.gs); dettagli e procedura di verifica sono in [`docs/FORM-AND-DATA.md`](docs/FORM-AND-DATA.md).
