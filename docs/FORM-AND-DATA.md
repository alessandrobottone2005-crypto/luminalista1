# Modulo e dati

## Flusso

Il browser invia JSON come `text/plain` all’URL `VITE_GOOGLE_SCRIPT_URL`. Apps Script valida, blocca il campo honeypot, neutralizza l’iniezione di formule, evita duplicati tramite UUID e scrive nel foglio `Idee`.

| Colonna | Contenuto          |
| ------- | ------------------ |
| A       | Data e ora         |
| B       | Idea               |
| C       | Nome facoltativo   |
| D       | Classe facoltativa |
| E       | ID invio           |
| F       | Stato              |

## Client

[`submitIdea.ts`](../src/features/ideas/submitIdea.ts) valida i campi (idea 10–2.000 caratteri, nome fino a 80, classe fino a 20), invia con timeout di 20 s e accetta il successo solo se la risposta contiene `ok: true` e lo stesso `submissionId` inviato.

Ogni errore mostrabile è un `SubmitError` con messaggio in italiano; il testo grezzo del browser non arriva mai all’utente.

| Situazione                       | Messaggio                                                                |
| -------------------------------- | ------------------------------------------------------------------------ |
| Endpoint non configurato         | La raccolta delle idee non è ancora attiva…                              |
| Timeout                          | La connessione è troppo lenta. Riprova: la tua idea è ancora nel modulo. |
| Rete assente o CORS              | Connessione non riuscita. Controlla la rete e riprova…                   |
| Risposta HTTP o JSON non valida  | Invio non confermato. Riprova: la tua idea è ancora nel modulo.          |
| Errore restituito da Apps Script | Il messaggio italiano del ricevitore (es. rate limit, campi non validi). |

In [`IdeaSection.tsx`](../src/components/sections/IdeaSection.tsx):

- L’UUID nasce con `crypto.randomUUID` e, fuori dai contesti sicuri (http su rete locale), con un fallback basato su `crypto.getRandomValues`. Si rinnova quando un campo cambia, così un nuovo testo non viene scartato come duplicato.
- Gli errori di campo spariscono appena il valore torna valido; con errori il focus torna sull’idea.
- Un secondo invio mentre il primo è in corso viene ignorato.
- L’errore di invio è annunciato in una regione `aria-live`; il testo resta nel modulo.
- Dopo il successo, Motion sostituisce il modulo con la conferma e il focus passa al titolo “IDEA RICEVUTA.”.
- Senza `VITE_GOOGLE_SCRIPT_URL` compare la nota “Anteprima del modulo · raccolta non ancora attiva.”

## Configurazione locale

```bash
cp .env.example .env.local
npm run dev
```

`.env.local` non deve essere versionato. L’URL Apps Script è pubblico perché viene usato dal browser; non deve contenere credenziali.

## Aggiornare Apps Script

1. Modifica [`google-apps-script/Code.gs`](../google-apps-script/Code.gs).
2. Copia il file nel progetto Apps Script collegato al Foglio Lumina.
3. Crea una nuova versione del deployment Web App, eseguita dal proprietario e accessibile a chiunque.
4. Verifica `GET /exec` e un invio con UUID univoco.
   Se l’URL `/exec` cambia, aggiorna `VITE_GOOGLE_SCRIPT_URL` in `.env.local` e su Vercel (Production e Preview).
5. Controlla la riga nel foglio prima di considerare il rilascio riuscito.

## Limiti

L’attuale rate limit usa `CacheService` ed è condiviso per minuto. Non sostituisce un servizio anti-abuso dedicato. Prima di una pubblicazione ampia, definire anche conservazione dei dati, responsabile e processo di cancellazione.
