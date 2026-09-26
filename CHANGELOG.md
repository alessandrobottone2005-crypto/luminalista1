# Changelog

## Unreleased

- Gli sticker si possono trascinare in tutta la sezione: col mouse basta prenderli e muoverli; col dito si tengono premuti 0,3 s, poi si trascinano. In presa si sollevano (più grandi, illuminati, leggermente ruotati) e al rilascio si riattaccano con un piccolo rimbalzo, restando sopra gli altri. Da tastiera si spostano con le frecce. Ricaricando la pagina tornano alla composizione originale.
- Sezione sticker: la texture è ingrandita e sfuma nel nero verso la sezione programma, verso la sezione idea e ai lati della colonna. La fascia `.daybreak` con la stella è stata rimossa e la stella ora sta nella sfumatura finale della sezione sticker.
- La sezione sticker ("Fai luce. Anche fuori.") ora riprende la composizione di `Esempio.png`: la texture `SfondoStickers` copre tutta la sezione e sopra ci sono i tre sticker ufficiali, ritagliati in WebP da `npm run media:stickers`. Al passaggio del mouse o con il focus da tastiera lo sticker si ingrandisce e si accende di giallo lungo la propria sagoma; su telefono lo stesso effetto parte al tap e si spegne da solo. Gli sticker entrano con un "attacchinaggio" GSAP e su telefono si impilano in diagonale.
- L’hero ora è a schermo intero e immersiva: il nuovo render 1920 × 1080 (108 fotogrammi) gira in loop su canvas come sequenza WebP, con la barra di navigazione trasparente sopra, il logo sempre intero anche su smartphone e un indicatore “Scorri”. Sostituisce il video MP4 960 × 540.
- Rimossi `wordmark.svg`, `social-preview.png` (e il relativo `og:image`) e lo script che lo generava.
- Rimossi microtesti decorativi, note provvisorie e slogan di passaggio per rendere lo scrollytelling più diretto.
- Aggiunta la configurazione Vercel per build Vite, output `dist` e deep link delle route React.
- Uniformato il sito su un unico sfondo nero e introdotto uno scrollytelling continuo con progresso globale e manifesto sticky che si illumina riga per riga.
- Ridisegnata la sezione candidati con ritratti reali ottimizzati, composizione editoriale sfalsata, nomi sovrapposti e reveal coordinato durante lo scroll.
- Sostituita la scena 3D ricostruita con l’animazione originale `LogoLumina_Animazione.blend`, esportata in MP4 con poster WebP e controllo pausa/riproduzione.
- Riorganizzata l’architettura per pagine, layout, sezioni, feature, movimento e media.
- Impostato `public/Logo.svg` come asset statico canonico.
- Allineati GSAP, Lenis e reduced motion; aggiunti token temporali.
- Aggiunta documentazione completa e skill locale del progetto.
- Aggiunti comandi di formato, typecheck e controllo completo.
- Le 8 proposte ufficiali della Lista 1 hanno sostituito i 5 punti dimostrativi del programma; l'accordion è stato rimosso in favore di titolo + testo sempre visibile.
- Aggiunto il quarto candidato (Giulia Bisceglia); le card candidati sono state ridisegnate secondo i design Figma forniti (foto arrotondata con bagliore, nome e classe in un footer nero).
- La sezione sticker ("Lumina IRL") è stata ridisegnata: da un carosello disegnato in CSS a tre sticker fotografici reali ritagliati da un mockup, con bagliore giallo all'hover.
- Tutte le "stelline" del sito (favicon, manifesto, intro) sono state unificate sul vero asset `Stella.svg`; la favicon è stata ridisegnata con sfondo nero e la stella grande al centro.
- Installate localmente tre skill Claude Code in `.agents/skills/` (`design-taste-frontend`, `motion-dev-animations`, `ui-ux-pro-max`), tracciate in `skills-lock.json`.
- **Corretto un bug**: `SiteHeader` e `SiteFooter` non erano mai stati montati in `LandingPage.tsx` dal refactor iniziale (commit `f2c3df6`) — il sito era sempre stato pubblicato senza barra di navigazione né footer. Ora sono correttamente renderizzati. Rimosso anche `DesktopRails.tsx`, un componente mai finito e senza stile CSS corrispondente.
- Aggiunto un `<h1>` mancante nella homepage (era assente: ogni sezione usava `<h2>`, nessuna aveva `<h1>`).
- Rimosse le dipendenze npm inutilizzate `three`, `@react-three/fiber` (retaggio della vecchia scena 3D, sostituita dal video Blender), `@radix-ui/react-accordion`, `@radix-ui/react-slot` (ridondanti col pacchetto unificato `radix-ui` già in uso), `@fontsource/barlow-condensed` (mai caricato) e `@playwright/test` (mai configurato); rimosso `src/components/ui/accordion.tsx`, ormai orfano.
- Ripulita la struttura del progetto: rimossi duplicati residui di un'installazione di skill precedente (`agent/`, `.claude/skills/design-taste-frontend/`), non più necessari accanto alla copia canonica in `.agents/skills/`.
