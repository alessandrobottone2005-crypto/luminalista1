# Deployment

## Build

```bash
npm ci
npm run check
```

La directory pubblicabile è `dist`.

## Variabile richiesta

Configura `VITE_GOOGLE_SCRIPT_URL` nell’ambiente della piattaforma usando l’URL `/exec` del deployment Apps Script. Ogni nuova build incorpora questo valore nel client.

## Routing

La landing usa `BrowserRouter`. [`vercel.json`](../vercel.json) riscrive le richieste come `/privacy` verso `index.html`; Vercel continua a servire direttamente asset e file reali.

## Vercel

Il progetto Vercel è collegato alla repository GitHub `alessandrobottone2005-crypto/luminalista1` e usa `main` come branch di produzione. Ogni push completato su `main` avvia automaticamente una nuova build e aggiorna il dominio `vercel.app`.

Dominio di produzione: [luminalista1.vercel.app](https://luminalista1.vercel.app)

Configura `VITE_GOOGLE_SCRIPT_URL` sia per Production sia per Preview. Se il valore cambia, esegui un nuovo deployment perché Vite lo incorpora durante la build.

## Controllo dopo il rilascio

1. Apri home e privacy tramite URL diretto.
2. Verifica hero, riproduzione video, poster e controllo pausa/ripresa.
3. Invia un’idea di test chiaramente etichettata.
4. Controlla la riga nel Foglio Lumina.
5. Verifica mobile 320, 360 e 430 px più desktop.
