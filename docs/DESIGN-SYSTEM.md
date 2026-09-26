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

| Token               | Valore                       | Uso                                      |
| ------------------- | ---------------------------- | ---------------------------------------- |
| `--background`      | `#080808`                    | Superficie principale.                   |
| `--foreground`      | `#F5F4EF`                    | Testo ad alto contrasto.                 |
| `--yellow`          | `#FFCF02`                    | CTA, luce e accento identitario.         |
| `--display`         | DX Playhigh                  | Titoli, numeri e dichiarazioni.          |
| `--body`            | Poppins                      | Testi, controlli e contenuti funzionali. |
| `--motion-standard` | `320ms`                      | Feedback e cambi di stato.               |
| `--motion-slow`     | `720ms`                      | Transizioni narrative in CSS.            |
| `--ease-signature`  | `cubic-bezier(0.2, 0, 0, 1)` | Transizioni UI ricorrenti.               |

I valori eseguibili vivono in [`src/styles/tokens.css`](../src/styles/tokens.css). Questo documento spiega il loro significato; non deve duplicare token alternativi.

## Stili

Lo stile è CSS semplice, senza framework né librerie di componenti. [`src/styles/index.css`](../src/styles/index.css) importa `tokens.css` (token e `@font-face` di DX Playhigh) e `site.css`. `site.css` si apre con un reset in `@layer reset`, così ogni regola del sito lo sovrascrive senza `!important`, e contiene l’utility `.sr-only` per i testi destinati solo ai lettori di schermo. Poppins arriva da `@fontsource/poppins` (pesi 400, 500, 600) importato in `main.tsx`.

## Logo

[`LogoLumina_Animazione.blend`](../LogoLumina_Animazione.blend) è la sorgente canonica dell’hero animato. [`public/Logo.svg`](../public/Logo.svg) resta l’asset statico ufficiale. `favicon.svg` non deriva dal logo: è uno sfondo nero arrotondato con la stella al centro (stessi path di `Stella.svg`).

## Stella

[`public/Stella.svg`](../public/Stella.svg) è l’asset stella canonico del brand. Ha sostituito tre stelle disegnate a mano in CSS in punti diversi del sito: la favicon, `.manifesto-star` in `ManifestoSection.tsx` e `.small-spark` in `IntroSection.tsx`.

## Regole dei componenti

- CTA e controlli mantengono un’area interattiva minima di 44 × 44 px.
- Il raggio resta quasi nullo: la forma è editoriale, non “app card”.
- Tutte le sezioni principali usano lo stesso sfondo `#080808`; la profondità nasce da ritmo, immagini e movimento. Unica eccezione: la sezione sticker (`#irl`) poggia sulla texture fotografica `SfondoStickers` (taglio orizzontale da 900 px in su, verticale al centro su telefono). La texture è ingrandita del 20% e sfuma nel nero `#080808` su tutti i lati, così non ha bordi visibili. La stella che fa da passaggio verso la sezione idea sta dentro la sfumatura inferiore.
- Gli sticker si generano da `assets/source/stickers/` con `npm run media:stickers`, che produce i WebP ritagliati in `public/media/stickers/` e `src/config/stickerWall.ts`. Non vanno posizionati a mano. Su telefono si impilano in diagonale; da 900 px riprendono la composizione della tela originale.
- La pagina non ha navbar né footer: si chiude con la riga `.colophon` “© 2026 LUMINA · PRIVACY”, piccola e grigia, con il link alla privacy.
- Il giallo indica scelta o rivelazione; non riempie superfici decorative senza funzione.
- I testi funzionali rimangono almeno a 16 px sulle viste mobili.
- I contenuti provvisori devono restare esplicitamente riconoscibili.
