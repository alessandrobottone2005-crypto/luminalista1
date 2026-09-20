# LUMINA — LISTA 1
## Mobile Landing Page Project Brief

> Landing page **mobile-only** per presentare *Lumina — Lista 1* del Liceo Gentileschi di Napoli.
>
> Obiettivo: creare un'esperienza visiva editoriale, contemporanea e memorabile in cui **la luce è il linguaggio principale dell'interfaccia**. Testi, immagini, candidati e contenuti emergono progressivamente dal buio alla luce durante lo scroll.

---

## 1. Visione del progetto

**Concept principale:** `FROM DARKNESS TO LIGHT`

Lumina non deve essere semplicemente una landing nera con elementi gialli. La luce deve diventare una vera **metafora visiva e funzionale** dell'intera esperienza.

La pagina deve iniziare quasi completamente al buio e diventare progressivamente più luminosa man mano che l'utente scorre.

La luce serve a:

- rivelare il logo;
- rivelare testi;
- illuminare le fotografie dei candidati;
- mettere a fuoco i punti del programma;
- creare transizioni tra le sezioni;
- dare enfasi al countdown;
- simulare flash fotografici per i gadget;
- accompagnare l'utente verso il form finale.

### Arco visivo generale

```text
BLACK
  ↓
FIRST LIGHT
  ↓
LOGO REVEAL
  ↓
CANDIDATES
  ↓
COUNTDOWN
  ↓
MANIFESTO
  ↓
PROGRAM
  ↓
GADGETS
  ↓
FULL LIGHT
  ↓
IDEA FORM
```

La landing deve quindi raccontare una trasformazione:

> **Buio → rivelazione → persone → idee → luce piena.**

---

# 2. Target device

Il progetto nasce **solo per mobile**.

Non progettare prima il desktop per poi ridurlo.

### Frame principale

```text
390 × 844 px
```

### Breakpoint da verificare

```text
320 px
360 px
390 px
430 px
```

### Regole mobile

- niente horizontal scroll involontario;
- touch target minimo: circa `44 × 44 px`;
- body text minimo: `16px` quando è testo funzionale;
- evitare hover come interazione necessaria;
- tutte le animazioni devono essere pensate per touch + scroll;
- evitare sezioni bloccate su `100vh` se creano problemi su Safari mobile;
- usare preferibilmente layout fluidi e contenuto che determina l'altezza;
- ottimizzare tutto per una singola colonna narrativa.

---

# 3. Design System

## Palette

### Black

```css
--black: #000000;
```

### Soft Black / Surface

```css
--black-soft: #080808;
--black-surface: #111111;
--black-border: #242424;
```

### White

```css
--white: #FFFFFF;
```

### Muted White

```css
--white-muted: rgba(255, 255, 255, 0.64);
```

### Lumina Yellow

```css
--yellow: #FFCF02;
```

Il giallo deve essere usato come **fonte luminosa / accento**, non come colore dominante in ogni elemento.

Usarlo soprattutto per:

- luce;
- numerazione;
- micro-label;
- linee;
- elementi attivi;
- countdown;
- reveal;
- focus state;
- piccoli dettagli del brand.

---

# 4. Typography

## Primary Display Font

**DX Playhigh Expanded**

Usi:

- hero;
- titoli principali;
- grandi numeri;
- numeri candidati;
- countdown;
- manifesto;
- statement editoriali.

Il font deve essere trattato in maniera molto grafica.

### Range indicativo mobile

```text
Hero title: 54–76px
Section title: 42–60px
Candidate name: 36–52px
Huge numbers: 64–110px
```

Il valore finale deve essere responsive tramite `clamp()`.

Esempio:

```css
font-size: clamp(3rem, 14vw, 5rem);
```

---

## Secondary Font

**Poppins**

Usi:

- body;
- label;
- classe candidato;
- descrizioni;
- navigation;
- form;
- microcopy;
- countdown labels.

### Range indicativo

```text
Body: 16–18px
Small text: 12–14px
Micro label: 10–12px
```

---

# 5. Grid & spacing

Usare idealmente una griglia mobile a **4 colonne**.

### Side padding

```text
18–20px
```

### Column gap

```text
10–12px
```

### Vertical rhythm

```text
Small: 8px
Medium: 16px
Section internal: 24–40px
Section separation: 72–120px
```

Il sito deve avere molto spazio negativo.

Non riempire ogni zona dello schermo.

---

# 6. Visual Language

La direzione estetica deve unire:

- editorial design;
- brutalism controllato;
- school campaign poster;
- dark cinematic UI;
- fotografia;
- luce volumetrica;
- motion minimal ma molto presente.

### Da evitare

- glassmorphism generico;
- card molto arrotondate;
- gradienti colorati casuali;
- effetto gaming neon eccessivo;
- glow su ogni cosa;
- UI SaaS standard;
- troppe icone;
- animazioni decorative scollegate dal concept;
- caroselli desktop adattati male al telefono.

### Border radius

Tendenzialmente minimo.

```text
0px – 8px
```

Preferire composizioni squadrate/editoriali.

---

# 7. Motion Design System

La motion deve sembrare parte dell'identità Lumina.

## Principio principale

Non usare semplici `fade-in` per tutto.

Il contenuto dovrebbe apparire perché una fonte luminosa:

- attraversa;
- illumina;
- mette a fuoco;
- rivela;
- accende.

---

## 7.1 Light Sweep

Un fascio luminoso attraversa orizzontalmente o diagonalmente l'elemento.

Possibili tecniche:

- pseudo-elemento;
- CSS mask;
- radial-gradient;
- linear-gradient;
- blend mode;
- clip-path;
- WebGL solo se realmente necessario.

Esempio concettuale:

```text
hidden
→ light enters
→ mask follows light
→ content becomes readable
→ glow disappears
→ content remains visible
```

---

## 7.2 Text Reveal

Il testo è inizialmente molto scuro / quasi invisibile.

Durante il reveal:

```text
color: #111
→ yellow highlight
→ white
```

Oppure una mask luminosa attraversa le lettere.

Durata consigliata:

```text
700–1200ms
```

Easing:

```css
cubic-bezier(0.16, 1, 0.3, 1)
```

---

## 7.3 Image Reveal

La foto deve emergere dal buio.

Possibile sequenza:

```text
brightness(0.15)
contrast(1.1)
opacity(.6)
blur(4px)
```

poi:

```text
brightness(1)
opacity(1)
blur(0)
```

La zona illuminata può essere sincronizzata con una CSS mask radiale.

---

## 7.4 Focus Reveal

Per i punti del programma:

```text
blur(10–14px)
opacity(.15)
translateY(16px)
```

quando il contenuto entra nella zona centrale dello viewport:

```text
blur(0)
opacity(1)
translateY(0)
```

---

## 7.5 Flash

Usare un flash breve solamente nella sezione gadget / fotografia.

Durata:

```text
100–220ms
```

Non abusarne.

---

# 8. Reduced Motion

Obbligatorio supportare:

```css
@media (prefers-reduced-motion: reduce)
```

In reduced motion:

- disabilitare parallax;
- disabilitare loop continui;
- mostrare subito i contenuti;
- conservare il concept tramite contrasto e layout;
- evitare flash.

---

# 9. Architettura Landing Page

Ordine consigliato:

```text
01. Header / Hero
02. Intro Statement
03. Candidates
04. Election Countdown
05. Manifesto Statement
06. Program / Lista punti
07. Gadgets / Campaign Visuals
08. Idea Form
09. Footer
```

---

# 10. HEADER / HERO

## Obiettivo

La prima schermata deve introdurre immediatamente il mondo Lumina.

L'utente deve percepire prima il buio e successivamente vedere il brand emergere dalla luce.

---

## Navigation

Header minimale.

Possibile struttura:

```text
LUMINA / LISTA 01               SCOPRI ↓
```

oppure:

```text
[mini logo]                PROGRAMMA ↓
```

La CTA deve portare a contenuti informativi della lista, ad esempio candidati o programma.

### Sticky

Può diventare sticky dopo la hero.

Durante lo scroll:

- background nero semi-solido;
- thin border bottom;
- altezza contenuta;
- logo piccolo;
- nessuna navbar desktop compressa.

---

# 11. HERO — 3D LOGO LIGHTING

Questo è uno degli elementi principali del progetto.

Il logo Lumina deve essere rappresentato come un **oggetto 3D scuro**.

### Materiale suggerito

- dark chrome;
- black metallic;
- roughness medio-bassa;
- highlight giallo;
- ambiente quasi completamente nero.

---

## Stato iniziale

Il logo deve essere quasi invisibile.

L'utente inizialmente percepisce solamente:

- silhouette;
- riflesso minimo;
- piccoli bordi.

---

## Accensione

Sequenza hero indicativa:

```text
0.0s — black screen
0.4s — very subtle ambient light
0.8s — logo edges visible
1.2s — yellow light starts behind logo
1.6s — light sweep crosses logo
2.0s — logo becomes readable
2.3s — title appears
2.6s — supporting copy appears
```

---

## Movimento logo

NON creare una rotazione 360° continua.

Preferire:

```text
rotateY(-5deg → +5deg)
rotateX(-2deg → +2deg)
```

Movimento lento e quasi impercettibile.

Possibile micro-parallax con lo scroll.

---

## Implementazione 3D

Possibili opzioni:

### Option A — Pre-rendered 3D

Render video/WebM/AVIF sequence del logo già illuminato.

**Pro:**

- performance prevedibile;
- rendering consistente;
- qualità alta.

**Contro:**

- meno interattivo.

### Option B — Three.js / React Three Fiber

Logo GLB/GLTF con luce dinamica.

**Pro:**

- vera illuminazione;
- interazione con scroll;
- risultato premium.

**Contro:**

- più pesante;
- ottimizzazione mobile necessaria.

### Raccomandazione

Usare il vero 3D solo se il modello può essere mantenuto molto leggero.

Budget ideale del modello:

```text
< 1–2 MB compressi
```

Usare Draco / Meshopt quando possibile.

---

# 12. HERO COPY

Struttura consigliata:

```text
LUMINA
LISTA 01
```

Micro label:

```text
Liceo Gentileschi · Napoli
```

Possibile statement concettuale:

```text
DAL BUIO
PRENDE FORMA
UNA NUOVA IDEA.
```

La copy finale può essere sostituita dal team con quella ufficiale.

---

# 13. INTRO STATEMENT

Breve sezione di transizione.

Layout molto minimale.

Esempio:

```text
LA LUCE
RENDE VISIBILI
LE IDEE.
```

Reveal parola per parola.

### Motion

1. testo quasi nero;
2. light sweep;
3. keyword gialla;
4. resto bianco;
5. keyword mantiene piccolo glow.

---

# 14. CANDIDATES SECTION

Titolo:

```text
I CANDIDATI
```

Ogni candidato occupa quasi una schermata.

Non usare una normale grid di card.

---

## Candidate Component

Placeholder dati:

```ts
{
  id: 1,
  name: "NOME COGNOME",
  className: "5X",
  quote: "Frase personale del candidato.",
  image: "/candidates/candidate-01.webp"
}
```

---

## Layout Candidate

Possibile composizione:

```text
01

        [PORTRAIT]

NOME
COGNOME

Classe 5X

“Frase personale...”
```

Il grande numero può stare dietro la foto.

---

## Reveal Candidate

Quando la card entra nello viewport:

### Step 1

Fotografia quasi completamente scura.

### Step 2

Una luce laterale attraversa il volto.

### Step 3

La foto viene rivelata attraverso una mask.

### Step 4

Compare il numero candidato.

### Step 5

Compare nome.

### Step 6

Classe + frase.

---

## Alternanza

Non ripetere esattamente la stessa composizione per tutti.

Esempio:

```text
Candidate 01 → portrait right
Candidate 02 → portrait full width
Candidate 03 → portrait left
Candidate 04 → yellow background accent
```

La struttura dati deve comunque usare un unico componente riutilizzabile.

---

# 15. COUNTDOWN ELEZIONI

La data deve essere configurabile.

Esempio:

```ts
const electionDate = "2026-10-XXT08:00:00+02:00";
```

Non hardcodare la data direttamente dentro il componente UI.

---

## Layout

Possibile struttura:

```text
GIORNO DELLE ELEZIONI

08 : 14 : 32 : 09
GG   HH   MM   SS

XX OTTOBRE 2026
```

Numeri molto grandi.

---

## Countdown animation

Ogni unità può accendersi leggermente in sequenza.

```text
Days
→ Hours
→ Minutes
→ Seconds
```

Glow controllato.

Non creare un classico countdown da template SaaS.

---

# 16. MANIFESTO / PROPAGANDA STATEMENT

Questa deve essere una pausa grafica forte.

Può essere una sezione quasi esclusivamente tipografica.

Possibile direzione informativa:

```text
OGNI IDEA
MERITA DI
ESSERE VISTA.
```

oppure una frase ufficiale fornita dal team.

---

## Layout

Testo enorme.

Possibile cambio temporaneo:

```text
background: #FFCF02
text: #000
```

Questo momento serve per rompere il ritmo visivo.

---

# 17. PROGRAM / LISTA PUNTI

Titolo:

```text
IL PROGRAMMA
```

Non usare bullet standard.

---

## Program Item

```text
01
TITOLO PROPOSTA
Breve descrizione della proposta.
```

Ogni punto occupa molto spazio verticale.

---

## Suggested data structure

```ts
const programPoints = [
  {
    number: "01",
    title: "TITOLO PROPOSTA",
    description: "Descrizione breve e concreta."
  },
  {
    number: "02",
    title: "TITOLO PROPOSTA",
    description: "Descrizione breve e concreta."
  }
];
```

---

## Animation

Quando il punto raggiunge circa il centro dello viewport:

```text
blur → sharp
low opacity → full opacity
yellow line → crosses item
```

Metafora:

> la luce mette a fuoco ciò che conta.

---

# 18. GADGETS / CAMPAIGN VISUALS

Titolo possibile:

```text
LUMINA IRL.
```

Questa sezione mostra fotografie di eventuali:

- sticker;
- poster;
- spille;
- braccialetti;
- magliette;
- volantini;
- altri materiali ufficiali.

---

## Layout

Non usare gallery uniforme.

Preferire un collage editoriale.

Esempio:

```text
[ large photo ]
            [ small photo ]
[ rotated photo ]
```

Rotazioni leggere:

```text
-4deg
+2deg
+4deg
```

---

## Animation

Quando una fotografia appare:

```text
brief flash
→ photo reveal
→ settle
```

Niente loop continuo.

---

# 19. IDEA FORM

Questa sezione rappresenta l'arrivo alla **luce piena**.

La UI può passare da nero a bianco.

### Background

```text
#FFFFFF
```

### Text

```text
#000000
```

---

## Heading

```text
ORA METTI
IN LUCE
LA TUA IDEA.
```

---

## Intro

```text
Cosa vorresti aggiungere, cambiare o migliorare nella tua scuola?
```

---

## Fields

### Idea

Required.

```text
textarea
```

Placeholder:

```text
Scrivi qui la tua idea...
```

### Nome

Optional.

```text
input text
```

### Classe

Optional.

```text
input text
```

---

## Submit

CTA:

```text
INVIA LA TUA IDEA →
```

Dopo invio:

```text
IDEA RICEVUTA ✓
```

---

# 20. Form Backend

Il front-end deve essere separato dal provider.

Possibili implementazioni:

- Supabase;
- Firebase;
- Formspree;
- serverless API;
- custom endpoint.

Creare un wrapper tipo:

```ts
submitIdea(data)
```

in modo che il provider possa essere sostituito facilmente.

---

# 21. Form Validation

Minimo necessario:

```text
idea required
idea min length
idea max length
```

Nome e classe opzionali.

Mostrare gli errori inline.

Non usare alert JS.

---

# 22. Privacy

Se il form salva dati personali:

- indicare chiaramente cosa viene raccolto;
- evitare dati non necessari;
- aggiungere informativa privacy appropriata;
- non richiedere nome o classe se non necessari;
- preferire raccolta anonima se compatibile con il progetto.

---

# 23. FOOTER

Minimal.

Possibile struttura:

```text
LUMINA
LISTA 01

Liceo Gentileschi · Napoli

Instagram
TikTok

01
```

Grande `01` giallo sul fondo.

---

# 24. Component Architecture

Possibile struttura React / Next.js:

```text
src/
│
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── LuminaLogo3D.tsx
│   ├── LightReveal.tsx
│   ├── TextReveal.tsx
│   ├── SectionLabel.tsx
│   ├── CandidateSection.tsx
│   ├── CandidateCard.tsx
│   ├── Countdown.tsx
│   ├── Manifesto.tsx
│   ├── ProgramSection.tsx
│   ├── ProgramItem.tsx
│   ├── GadgetGallery.tsx
│   ├── IdeaForm.tsx
│   └── Footer.tsx
│
├── data/
│   ├── candidates.ts
│   ├── program.ts
│   └── site.ts
│
├── hooks/
│   ├── useReducedMotion.ts
│   ├── useScrollProgress.ts
│   └── useIntersectionReveal.ts
│
├── lib/
│   └── submitIdea.ts
│
└── styles/
    └── globals.css
```

---

# 25. Reusable LightReveal Component

Uno dei componenti centrali dovrebbe essere qualcosa del tipo:

```tsx
<LightReveal
  direction="left-to-right"
  intensity="medium"
  color="#FFCF02"
>
  <h2>...</h2>
</LightReveal>
```

Possibili props:

```ts
type LightRevealProps = {
  children: React.ReactNode;
  direction?: "left-to-right" | "right-to-left" | "top-to-bottom";
  intensity?: "soft" | "medium" | "strong";
  delay?: number;
  duration?: number;
  once?: boolean;
};
```

---

# 26. Scroll Animations

Preferire animazioni legate all'ingresso nello viewport invece di animare costantemente tutto.

Possibili strumenti:

### Preferred

- GSAP + ScrollTrigger;

oppure

- Motion / Framer Motion;

oppure

- IntersectionObserver + CSS transitions.

---

## Recommendation

Se le animazioni sono relativamente semplici:

```text
IntersectionObserver + CSS
```

Se si vuole una regia precisa della luce:

```text
GSAP + ScrollTrigger
```

Per il logo 3D:

```text
Three.js / React Three Fiber
```

solo se realmente necessario.

---

# 27. Performance Budget

Questo progetto è mobile-first: la performance è prioritaria.

### Target

```text
LCP < 2.5s
CLS < 0.1
INP < 200ms
```

---

## Images

Usare:

```text
AVIF
WebP
```

E dimensioni responsive.

Le fotografie non devono essere caricate a risoluzione desktop enorme.

---

## Lazy Loading

Lazy load per:

- candidati sotto la fold;
- gadget;
- video secondari;
- eventuali asset 3D non immediatamente necessari.

---

## Animation Performance

Animare preferibilmente:

```text
transform
opacity
filter con moderazione
```

Evitare animazioni continue su proprietà che causano reflow.

---

# 28. 3D Performance

Se viene usato WebGL:

- limitare polygon count;
- comprimere texture;
- massimo 1 canvas principale;
- evitare post-processing pesante;
- evitare bloom esagerato;
- sospendere rendering quando canvas non è visibile se possibile;
- usare DPR limitato su mobile.

Esempio:

```js
dpr={Math.min(window.devicePixelRatio, 1.5)}
```

---

# 29. Accessibility

La landing deve rimanere leggibile anche senza motion.

### Obbligatorio

- contrasto sufficiente;
- alt text per foto candidati;
- label reali per form;
- focus visible;
- semantic HTML;
- heading order coerente;
- `prefers-reduced-motion`;
- CTA e link con testo esplicito;
- nessuna informazione disponibile esclusivamente tramite animazione.

---

# 30. SEO / Metadata

Preparare almeno:

```text
title
meta description
Open Graph image
favicon
social preview
```

Esempio placeholder:

```text
Lumina — Lista 1 | Liceo Gentileschi Napoli
```

---

# 31. Assets necessari

Prima della versione definitiva procurare:

### Brand

- [ ] logo Lumina SVG;
- [ ] logo Lumina 3D oppure file vettoriale da estrudere;
- [ ] font DX Playhigh Expanded con licenza web;
- [ ] Poppins;

### Candidates

- [ ] nome candidato 01;
- [ ] classe candidato 01;
- [ ] frase candidato 01;
- [ ] foto candidato 01;
- [ ] nome candidato 02;
- [ ] classe candidato 02;
- [ ] frase candidato 02;
- [ ] foto candidato 02;
- [ ] nome candidato 03;
- [ ] classe candidato 03;
- [ ] frase candidato 03;
- [ ] foto candidato 03;
- [ ] eventuale candidato 04;

### Election

- [ ] data ufficiale elezioni;
- [ ] ora di apertura countdown;

### Program

- [ ] elenco definitivo punti;
- [ ] descrizione breve per ogni punto;

### Visuals

- [ ] foto gadget;
- [ ] foto poster;
- [ ] eventuali mockup;

### Form

- [ ] destinazione dati;
- [ ] privacy copy;

### Social

- [ ] Instagram;
- [ ] TikTok;
- [ ] eventuali altri link ufficiali.

---

# 32. Data-first approach

Non scrivere i contenuti direttamente dentro i componenti.

Usare file dati separati.

## candidates.ts

```ts
export const candidates = [
  {
    id: "01",
    name: "NOME COGNOME",
    className: "5X",
    quote: "Frase personale del candidato.",
    image: "/images/candidates/01.webp"
  }
];
```

## program.ts

```ts
export const programPoints = [
  {
    id: "01",
    title: "TITOLO",
    description: "Descrizione."
  }
];
```

## site.ts

```ts
export const siteConfig = {
  school: "Liceo Gentileschi",
  city: "Napoli",
  listName: "Lumina",
  listNumber: "01",
  electionDate: "TODO"
};
```

---

# 33. Suggested Page Flow

## Screen 01

Dark hero.

3D logo slowly ignites.

```text
LUMINA
LISTA 01
```

---

## Screen 02

Large text reveal.

```text
DAL BUIO
PRENDE FORMA
UNA NUOVA IDEA.
```

---

## Screen 03+

Candidate portraits individually revealed by moving light.

---

## Screen after candidates

Yellow countdown moment.

---

## Next

Black manifesto.

Typography dominates.

---

## Next

Program points progressively brought into focus.

---

## Next

Campaign visual / gadget photography with flash reveal.

---

## Final main section

Background transitions toward white.

Idea form.

```text
ORA METTI
IN LUCE
LA TUA IDEA.
```

---

# 34. Background progression

Il background può cambiare progressivamente.

Esempio:

```text
Hero           #000000
Candidates     #050505
Countdown      #FFCF02
Manifesto      #000000
Program        #080808
Gadgets        #111111
Form           #FFFFFF
```

Questo permette di far percepire visivamente il viaggio dalla notte alla luce.

---

# 35. Microinteractions

Usare pochissime microinteraction, ma curate.

### Buttons

Tap:

```text
background yellow
→ black
```

oppure breve inversione colore.

### Program item

Tap opzionale per espandere una descrizione più lunga.

### Candidate

Tap opzionale per mostrare la frase completa se troppo lunga.

### Form button

Durante submit:

```text
INVIO...
```

Success:

```text
IDEA RICEVUTA ✓
```

---

# 36. Loading Experience

Evitare loader generico con spinner.

Se necessario:

```text
small yellow light
→ pulse
→ page reveal
```

Ma il sito dovrebbe mostrare contenuto utile il prima possibile.

---

# 37. Technical Stack — Suggested

Una possibile stack:

```text
Next.js
TypeScript
Tailwind CSS oppure CSS Modules
GSAP + ScrollTrigger
Three.js / React Three Fiber solo per logo
Supabase / Formspree per form
```

Non è obbligatoria.

Se il progetto è semplice, anche:

```text
Vite
React
TypeScript
CSS
GSAP
```

è sufficiente.

---

# 38. Important implementation principle

Il progetto deve essere **progressive-enhancement friendly**.

Se JavaScript o WebGL falliscono:

- logo statico visibile;
- candidati visibili;
- programma leggibile;
- form funzionante;
- nessun contenuto essenziale nascosto permanentemente.

---

# 39. Animation hierarchy

Non tutte le sezioni devono avere la stessa intensità.

### HIGH IMPACT

```text
Hero logo
Candidate reveal
Countdown
Final form transition
```

### MEDIUM IMPACT

```text
Manifesto
Program reveal
Gadget flash
```

### LOW IMPACT

```text
Micro labels
Body copy
Footer
Navigation
```

Questo evita che tutto competa per attenzione.

---

# 40. Design Rule

Prima di aggiungere qualsiasi animazione chiedersi:

> **Questa animazione rappresenta la luce, la rivelazione o il focus?**

Se la risposta è no, probabilmente non serve.

---

# 41. Definition of Done

Il progetto può essere considerato pronto quando:

- [ ] funziona perfettamente a 360px;
- [ ] funziona perfettamente a 390px;
- [ ] funziona perfettamente a 430px;
- [ ] nessun horizontal overflow;
- [ ] logo hero ottimizzato;
- [ ] reveal luce fluido;
- [ ] tutti i candidati gestiti da data array;
- [ ] countdown usa una data configurabile;
- [ ] programma usa data array;
- [ ] gadget lazy loaded;
- [ ] form validato;
- [ ] stato success/error form funzionante;
- [ ] reduced motion supportato;
- [ ] immagini ottimizzate;
- [ ] font caricati correttamente;
- [ ] Lighthouse mobile verificato;
- [ ] Safari iOS verificato;
- [ ] Chrome Android verificato;
- [ ] contenuti leggibili senza animazioni;
- [ ] focus keyboard visibile;
- [ ] privacy del form definita;
- [ ] Open Graph configurato.

---

# 42. Codex — First Development Goal

La prima iterazione NON deve implementare subito tutto.

Costruire prima una vertical slice completa:

```text
Header
→ Hero
→ 3D/static logo lighting
→ intro text reveal
→ 1 candidate demo
```

Verificare:

- look & feel;
- performance;
- qualità della luce;
- comportamento mobile;
- tipografia.

Solo dopo estendere il sistema al resto della landing.

---

# 43. Suggested Build Order

```text
01. Project setup
02. Fonts + global tokens
03. Mobile layout foundation
04. Header
05. Hero
06. Logo lighting prototype
07. Reusable LightReveal
08. Candidate prototype
09. Finalize motion language
10. Remaining candidates
11. Countdown
12. Manifesto
13. Program
14. Gadgets
15. Idea form
16. Backend form
17. Footer
18. Accessibility
19. Performance pass
20. Device QA
```

---

# 44. Final Creative Direction

Il risultato non dovrebbe sembrare:

> “una landing scolastica con qualche effetto luminoso”.

Dovrebbe sembrare piuttosto:

> **un'esperienza editoriale mobile costruita attorno al concetto di luce.**

Il brand Lumina viene prima percepito nel buio, poi rivelato, poi utilizzato per mostrare persone e idee.

La luce non è un semplice effetto.

**È l'interfaccia.**

---

# 45. Placeholder content to replace

Prima della pubblicazione sostituire tutti i placeholder:

```text
TODO_CANDIDATE_NAME
TODO_CLASS
TODO_QUOTE
TODO_CANDIDATE_IMAGE
TODO_ELECTION_DATE
TODO_PROGRAM_POINT
TODO_GADGET_IMAGE
TODO_SOCIAL_LINK
TODO_FORM_ENDPOINT
```

Non pubblicare la landing finché questi valori non sono stati controllati.

---

## One-line creative brief

> **Create a mobile-only editorial experience where Lumina emerges from darkness and every candidate, idea and section is progressively revealed through light.**
