# Guida ai contenuti

## Dove aggiornare

Modifica [`src/content/site.ts`](../src/content/site.ts) per candidati, data, programma e navigazione. Mantieni la stessa forma degli oggetti per evitare modifiche ai componenti.

## Checklist dei contenuti ufficiali

1. Completa le citazioni e verifica nomi, classi e ritratti prima della pubblicazione.
2. Inserisci la data reale delle elezioni con offset di Roma.
3. `programPoints` contiene le otto proposte ufficiali della Lista 1 (forma `{ id, title, text }`, senza categoria/teaser); aggiorna qui se il programma cambia.
4. Completa informativa privacy, responsabile e contatti.
5. Rimuovi tutte le etichette “dimostrativo” solo dopo la verifica con la lista.

## Immagini

Usa WebP ottimizzati, dimensioni coerenti e testi alternativi descrittivi. Aggiorna [`public/images/SOURCES.md`](../public/images/SOURCES.md) con origine, licenza e trasformazioni di ogni immagine.

## Verità editoriale

Non inventare account social, endorsement, date, risultati o persone. Se un dato non è confermato, mantieni il segnaposto e l’etichetta provvisoria.
