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
5. Controlla la riga nel foglio prima di considerare il rilascio riuscito.

## Limiti

L’attuale rate limit usa `CacheService` ed è condiviso per minuto. Non sostituisce un servizio anti-abuso dedicato. Prima di una pubblicazione ampia, definire anche conservazione dei dati, responsabile e processo di cancellazione.
