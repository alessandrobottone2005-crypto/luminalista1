# Guida ai contenuti

## Dove aggiornare

| Contenuto                                   | File                                                                                   |
| ------------------------------------------- | -------------------------------------------------------------------------------------- |
| Data delle elezioni, candidati, programma   | [`src/content/site.ts`](../src/content/site.ts)                                        |
| Testi e alternative degli sticker           | `stickerSection` in `site.ts`                                                          |
| Riga finale “© 2026 LUMINA · PRIVACY”       | `colophon` in `site.ts`                                                                |
| Titoli di sezione, Intro, Manifesto, modulo | Il componente della sezione in [`src/components/sections`](../src/components/sections) |
| Informativa privacy                         | [`src/pages/PrivacyPage.tsx`](../src/pages/PrivacyPage.tsx)                            |
| Descrizione e titolo per motori e social    | `index.html` (head)                                                                    |

Mantieni la stessa forma degli oggetti per evitare modifiche ai componenti. Il sito non ha navigazione né citazioni dei candidati. La versione senza JavaScript si rigenera da `site.ts` a ogni `dev` e `build`.

Il testo di riferimento consegnato dalla lista è in `assets/source/content/Lumina-testi-sito.docx`.

## Checklist dei contenuti ufficiali

1. Verifica nomi, classi e ritratti dei candidati prima della pubblicazione.
2. Inserisci la data reale delle elezioni con offset di Roma.
3. `programPoints` contiene le otto proposte ufficiali della Lista 1 (forma `{ id, title, text }`); aggiorna qui se il programma cambia.
4. Completa informativa privacy, responsabile e contatti.
5. Rimuovi le etichette “provvisoria” solo dopo la verifica con la lista.

## Immagini

- **Candidati**: WebP 900 × 900 in `public/images/candidates/`, con lo stesso nome file usato in `site.ts`. `position` regola l’inquadratura del volto.
- **Sticker**: sostituisci i PNG in `assets/source/stickers/` (stessa tela dello sfondo) ed esegui `npm run media:stickers`.
- **Hero**: si modifica solo dal file Blender; vedi [`HERO-ANIMATION.md`](HERO-ANIMATION.md).

Usa testi alternativi descrittivi e aggiorna [`assets/source/SOURCES.md`](../assets/source/SOURCES.md) con origine e trasformazioni di ogni sorgente.

## Verità editoriale

Non inventare account social, endorsement, date, risultati o persone. Se un dato non è confermato, mantieni il segnaposto e l’etichetta provvisoria.
