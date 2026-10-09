# Deployment

## Build

```bash
npm ci
npm run check
```

La directory pubblicabile è `dist`.

## Variabile richiesta

Configura `VITE_GOOGLE_SCRIPT_URL` nell’ambiente della piattaforma usando l’URL `/exec` del deployment Apps Script. Ogni nuova build incorpora questo valore nel client e nel fallback statico.

## Routing

La landing usa `BrowserRouter`. [`vercel.json`](../vercel.json) riscrive le richieste come `/privacy` verso `index.html`; Vercel continua a servire direttamente asset e file reali. Gli URL sconosciuti mostrano la pagina 404 dell’app.

## Vercel

Il progetto Vercel è collegato alla repository GitHub `alessandrobottone2005-crypto/luminalista1`:

1. Lavora su un branch e fai push: Vercel crea un deployment **Preview** con un URL dedicato.
2. Controlla la Preview con la checklist qui sotto.
3. Unisci in `main` e fai push: Vercel pubblica in **Production** su [luminalista1.vercel.app](https://luminalista1.vercel.app).

Configura `VITE_GOOGLE_SCRIPT_URL` sia per Production sia per Preview. Se il valore cambia, esegui un nuovo deployment perché Vite lo incorpora durante la build.

[`.vercelignore`](../.vercelignore) esclude dal caricamento `.agents/`, `assets/source/`, `docs/`, `dist/`, i file `.blend` e `.docx`: gli asset pubblicati sono già in `public/`.

## Controllo dopo il rilascio

1. Apri home, `/gallery`, `/privacy` e un URL inesistente tramite link diretto.
2. Verifica l’hero a schermo intero: primo fotogramma immediato, loop senza flash, logo intero su telefono.
3. Scorri fino in fondo: manifesto che si accende, sette proposte, sticker trascinabili, riga finale “© 2026 LUMINA · PRIVACY”.
4. Controlla countdown e data delle elezioni.
5. Invia un’idea di test chiaramente etichettata e verifica la conferma.
6. Controlla la riga nel Foglio Lumina.
7. Verifica mobile 320, 360 e 430 px, tablet e desktop.

## Gallery

La versione finale 2.0.0 comprende tutte le 274 foto dei cinque giorni di propaganda (5–9 ottobre 2026). Gli asset `public/media/gallery/`, il manifesto `src/config/gallery.json` e `gallery/index.html` sono già generati e tracciati nel repository. Gli originali non sono richiesti su Vercel. Le riscritture per `/gallery` e `/gallery/` precedono quella generale. Verifica accesso diretto, ricaricamento, versione senza JavaScript e navigazione dalla home. Vedi [`GALLERY.md`](GALLERY.md).
