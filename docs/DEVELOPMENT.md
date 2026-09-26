# Sviluppo

## Avvio

```bash
npm install
cp .env.example .env.local
npm run dev
```

Apri `http://localhost:4174`.

## Comandi

| Comando                | Scopo                                                  |
| ---------------------- | ------------------------------------------------------ |
| `npm run dev`          | Avvia Vite e rigenera il fallback statico.             |
| `npm test`             | Esegue i test del client e del ricevitore Apps Script. |
| `npm run typecheck`    | Controlla TypeScript senza produrre file.              |
| `npm run media:header` | Renderizza il file Blender e rigenera i frame web.     |
| `npm run media:hero`   | Rigenera i frame WebP dai PNG in `assets/source`.      |
| `npm run build`        | Genera la build in `dist`.                             |
| `npm run check`        | Esegue formato, tipi, test e build.                    |

## Workflow concentrato

1. Scegli una sola sezione o responsabilità.
2. Modifica il file più vicino alla funzione richiesta.
3. Esegui il controllo più piccolo utile.
4. Esegui `npm run check` prima del commit.
5. Scrivi il prossimo passo nel messaggio di commit o nella pull request.

## Convenzioni

Componenti e tipi usano PascalCase; funzioni e file non-componenti usano camelCase. Gli import interni preferiscono l’alias `@/`. Il formatter è Prettier e la compilazione TypeScript usa controlli strict.
