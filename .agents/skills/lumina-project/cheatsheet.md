# Lumina cheatsheet

| Se devi…                       | Modifica…                                           | Verifica…                                              |
| ------------------------------ | --------------------------------------------------- | ------------------------------------------------------ |
| Cambiare copy o candidati      | `src/content/site.ts`                               | Etichette provvisorie e layout mobile                  |
| Cambiare un reveal             | `src/motion/useLandingMotion.ts`                    | Reduced motion e cleanup                               |
| Cambiare l’animazione          | `.blend` + `npm run media:hero:render`              | Primo fotogramma, loop, logo intero, pausa             |
| Cambiare gli sticker           | `assets/source/stickers` + `npm run media:stickers` | Trascinamento mouse, dito e tastiera                   |
| Rigenerare la gallery completa | `assets/source/gallery/` + `npm run media:gallery`  | 274 foto, cinque giorni, carosello e fallback senza JS |
| Cambiare il form               | `src/features/ideas` + `IdeaSection.tsx`            | UUID di conferma, errori in italiano, test             |
| Cambiare colori o ritmo        | `src/styles/tokens.css`                             | Contrasto e coerenza Design DNA                        |
