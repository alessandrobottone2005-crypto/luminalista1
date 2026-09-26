# Sviluppo

## Avvio

```bash
npm install
cp .env.example .env.local
npm run dev
```

Apri `http://localhost:4174` (porta fissa, esposta anche in rete locale).

## Comandi

| Comando                     | Scopo                                                                                              |
| --------------------------- | -------------------------------------------------------------------------------------------------- |
| `npm run dev`               | Rigenera il fallback statico in `index.html` e avvia Vite.                                         |
| `npm run build`             | Rigenera il fallback statico, controlla i tipi e genera la build in `dist`.                        |
| `npm run preview`           | Serve la build di `dist` in locale.                                                                |
| `npm test`                  | Esegue i test Vitest: client del modulo, ricevitore Apps Script, countdown, trascinamento sticker. |
| `npm run typecheck`         | Controlla TypeScript senza produrre file.                                                          |
| `npm run format`            | Formatta sorgenti, script, configurazione e Markdown con Prettier.                                 |
| `npm run format:check`      | Verifica il formato senza modificare file.                                                         |
| `npm run check`             | Esegue formato, tipi, test e build.                                                                |
| `npm run media:hero:render` | Renderizza il file Blender in PNG e rigenera i frame web dell’hero.                                |
| `npm run media:hero`        | Rigenera i frame WebP e `heroFrames.ts` dai PNG in `assets/source/RenderHero`.                     |
| `npm run media:stickers`    | Rigenera sticker, sfondo e `stickerWall.ts` da `assets/source/stickers`.                           |

`predev` e `prebuild` eseguono automaticamente [`scripts/static-page.mjs`](../scripts/static-page.mjs), che legge `src/content/site.ts` e `VITE_GOOGLE_SCRIPT_URL`.

## Workflow concentrato

1. Scegli una sola sezione o responsabilità.
2. Modifica il file più vicino alla funzione richiesta.
3. Esegui il controllo più piccolo utile.
4. Esegui `npm run check` prima del commit.
5. Scrivi il prossimo passo nel messaggio di commit o nella pull request.

## Convenzioni

Componenti e tipi usano PascalCase; funzioni e file non-componenti usano camelCase. Gli import interni preferiscono l’alias `@/` (verso `src/`). Lo stile è CSS semplice in `src/styles`, senza framework. Il formatter è Prettier e la compilazione TypeScript usa controlli strict. I file in `src/config` sono generati: si cambiano rilanciando lo script `media:*` corrispondente.
