# Lumina — Lista 1

Landing page animata e interattiva per la campagna studentesca Lumina del Liceo Gentileschi di Napoli.

La versione attuale usa contenuti provvisori dichiarati come tali. Include navigazione responsive, animazioni accessibili, scena 3D, pagina privacy e un modulo collegato a Google Sheets tramite Google Apps Script.

## Stack

- React e TypeScript
- Vite e Tailwind CSS
- shadcn/ui e Lucide React
- Motion, GSAP e Lenis
- Three.js e React Three Fiber
- React Router
- Vitest

## Avvio locale

```bash
npm install
cp .env.example .env.local
npm run dev
```

Il server di sviluppo usa `http://localhost:4174`.

## Verifica e build

```bash
npm test
npm run build
npm run preview
```

## Raccolta delle idee

Il client invia le proposte all'URL definito in `VITE_GOOGLE_SCRIPT_URL`. Il ricevitore è disponibile in [`google-apps-script/Code.gs`](google-apps-script/Code.gs) e salva ogni invio nel foglio `Idee`, con validazione, honeypot, protezione dalle formule, limite di frequenza e ID idempotente.

Il modulo può essere usato senza nome e classe. Non aggiungere credenziali Google o file `.env.local` al repository.
