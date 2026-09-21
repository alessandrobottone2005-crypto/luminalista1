import fs from "node:fs/promises";
import { loadEnv } from "vite";
const source = await fs.readFile(
  new URL("../src/content/site.ts", import.meta.url),
  "utf8",
);
const { candidates, programPoints } = await import(
  "data:text/javascript;base64," + Buffer.from(source).toString("base64")
);
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const env = loadEnv("production", process.cwd(), "VITE_");
const endpoint = env.VITE_GOOGLE_SCRIPT_URL || "";
const page = `<main class="static-page"><header><img src="/Logo.svg" alt="Lumina — Lista 1" width="260"/><p>Liceo Gentileschi · Napoli</p><nav><a href="#static-candidates">Candidati</a> · <a href="#static-program">Programma</a> · <a href="#static-idea">La tua idea</a></nav></header><section><h1>La luce rende visibili le idee.</h1></section><section id="static-candidates"><h2>I candidati</h2>${candidates.map((c) => `<article><img src="${c.image}" alt="Ritratto di ${escape(c.name)} ${escape(c.surname)}" width="300" height="300" loading="lazy"/><h3>${escape(c.name)} ${escape(c.surname)}</h3><p>Classe ${escape(c.className)}</p>${c.quote ? `<p>“${escape(c.quote)}”</p>` : ""}</article>`).join("")}</section><section id="static-program"><h2>Il programma</h2>${programPoints.map((p) => `<article><h3>${p.id}. ${escape(p.title).replace("\n", " ")}</h3><p>${escape(p.description)}</p><p>${escape(p.detail)}</p></article>`).join("")}</section><section id="static-idea"><h2>Ora metti in luce la tua idea.</h2><p>${endpoint ? "Le idee vengono raccolte nel Foglio Google di Lumina." : "La raccolta non è ancora attiva. Il modulo sarà disponibile dopo il collegamento a Google Sheets."}</p><form method="POST" action="${escape(endpoint || "#static-idea")}"><label for="static-text">La tua idea *</label><textarea name="idea" id="static-text" required minlength="10" maxlength="2000" rows="6"></textarea><label for="static-name">Nome (facoltativo)</label><input name="name" id="static-name" maxlength="80"/><label for="static-class">Classe (facoltativa)</label><input name="className" id="static-class" maxlength="20"/><input type="hidden" name="nativeForm" value="1"/><button type="submit" ${endpoint ? "" : "disabled"}>Invia la tua idea</button></form></section><footer>Lumina — Lista 01</footer></main>`;
const file = new URL("../index.html", import.meta.url);
let html = await fs.readFile(file, "utf8");
html = html.replace(
  /<div id="root">[\s\S]*?<\/div><!--static-end-->/,
  `<div id="root">${page}</div><!--static-end-->`,
);
if (!html.includes("<!--static-end-->"))
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${page}</div><!--static-end-->`,
  );
html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, "");
if (!html.includes('id="static-style"'))
  html = html.replace(
    "</head>",
    `<style id="static-style">.static-page{max-width:480px;margin:auto;padding:24px;background:#080808;color:#f5f4ef;font:16px/1.8 sans-serif}.static-page img{max-width:100%;height:auto;object-fit:cover}.static-page header>img{margin:0 auto 30px}.static-page a,.static-page h1,.static-page h2{color:#ffcf02}.static-page section{padding:40px 0;border-top:1px solid #444}.static-page article{margin:32px 0}.static-page label,.static-page input,.static-page textarea,.static-page button{display:block;width:100%;box-sizing:border-box;font:inherit;margin:12px 0}.static-page input,.static-page textarea{padding:12px;background:#fff;color:#111}.static-page button{padding:14px;background:#ffcf02;color:#111}.static-page button:disabled{opacity:.5}.static-page footer{padding:24px 0}</style></head>`,
  );
await fs.writeFile(file, html);
