# Design system e Design DNA

## Tesi visiva

**Dal buio, le idee diventano visibili.** Il progetto usa una composizione editoriale stretta, contrasto netto e luce gialla come segnale di attenzione, scelta e partecipazione.

## Design DNA

| Dimensione | Decisione                                                                                   |
| ---------- | ------------------------------------------------------------------------------------------- |
| Sistema    | Colori misurabili, tipografia ad alto contrasto, spaziatura compatta, geometria quadrata.   |
| Stile      | Editoriale, cinematografico, urbano, diretto, con un tono giovane ma non infantile.         |
| Effetti    | Logo Blender illuminato, palco nero continuo e contenuti accesi progressivamente in giallo. |

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

[`LogoLumina_Animazione.blend`](../LogoLumina_Animazione.blend) è la sorgente canonica dell’header animato. [`public/Logo.svg`](../public/Logo.svg) resta l’asset statico ufficiale; `wordmark.svg` è derivato per contesti orizzontali e non sostituisce l’originale. `favicon.svg` non deriva dal logo: è uno sfondo nero arrotondato con la stella al centro (stessi path di `Stella.svg`).

## Stella

[`public/Stella.svg`](../public/Stella.svg) è l’asset stella canonico del brand. Ha sostituito tre stelle disegnate a mano in CSS in punti diversi del sito: la favicon, `.manifesto-star` in `ManifestoSection.tsx` e `.small-spark` in `IntroSection.tsx`.

## Regole dei componenti

- CTA e controlli mantengono un’area interattiva minima di 44 × 44 px.
- Il raggio resta quasi nullo: la forma è editoriale, non “app card”.
- Tutte le sezioni principali usano lo stesso sfondo `#080808`; la profondità nasce da ritmo, immagini e movimento.
- Il giallo indica scelta o rivelazione; non riempie superfici decorative senza funzione.
- I testi funzionali rimangono almeno a 16 px sulle viste mobili.
- I contenuti provvisori devono restare esplicitamente riconoscibili.
