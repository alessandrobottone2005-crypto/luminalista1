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

La landing usa `BrowserRouter`. Il provider deve riscrivere le richieste come `/privacy` verso `index.html`; asset e file reali devono continuare a essere serviti direttamente.

## Controllo dopo il rilascio

1. Apri home e privacy tramite URL diretto.
2. Verifica hero, logo 3D e fallback senza WebGL.
3. Invia un’idea di test chiaramente etichettata.
4. Controlla la riga nel Foglio Lumina.
5. Verifica mobile 320, 360 e 430 px più desktop.
