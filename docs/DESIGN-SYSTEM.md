# Design system e Design DNA

## Tesi visiva

**Dal buio, le idee diventano visibili.** Il progetto usa una composizione editoriale stretta, contrasto netto e luce gialla come segnale di attenzione, scelta e partecipazione.

## Design DNA

| Dimensione | Decisione                                                                                 |
| ---------- | ----------------------------------------------------------------------------------------- |
| Sistema    | Colori misurabili, tipografia ad alto contrasto, spaziatura compatta, geometria quadrata. |
| Stile      | Editoriale, cinematografico, urbano, diretto, con un tono giovane ma non infantile.       |
| Effetti    | Logo 3D, luce reattiva, reveal al scroll, progressivo passaggio dal nero al bianco.       |

## Token principali

| Token              | Valore                       | Uso                                      |
| ------------------ | ---------------------------- | ---------------------------------------- |
| `--background`     | `#080808`                    | Superficie principale.                   |
| `--foreground`     | `#F5F4EF`                    | Testo ad alto contrasto.                 |
| `--yellow`         | `#FFCF02`                    | CTA, luce e accento identitario.         |
| `--display`        | DX Playhigh                  | Titoli, numeri e dichiarazioni.          |
| `--body`           | Poppins                      | Testi, controlli e contenuti funzionali. |
| `--ease-signature` | `cubic-bezier(0.2, 0, 0, 1)` | Transizioni UI ricorrenti.               |

I valori eseguibili vivono in [`src/styles/tokens.css`](../src/styles/tokens.css). Questo documento spiega il loro significato; non deve duplicare token alternativi.

## Logo

[`public/Logo.svg`](../public/Logo.svg) è l’asset canonico caricato dal committente. La scena Three.js legge direttamente questo file. `favicon.svg` e `wordmark.svg` sono derivati per contesti piccoli o orizzontali e non sostituiscono l’originale.

## Regole dei componenti

- CTA e controlli mantengono un’area interattiva minima di 44 × 44 px.
- Il raggio resta quasi nullo: la forma è editoriale, non “app card”.
- Il giallo indica scelta o rivelazione; non riempie superfici decorative senza funzione.
- I testi funzionali rimangono almeno a 16 px sulle viste mobili.
- I contenuti provvisori devono restare esplicitamente riconoscibili.
