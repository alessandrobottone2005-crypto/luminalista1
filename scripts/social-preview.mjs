import sharp from "sharp";
import fs from "node:fs/promises";
const logo = await fs.readFile("public/Logo.svg");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#080808"/><image href="data:image/svg+xml;base64,${logo.toString("base64")}" x="405" y="75" width="390" height="390"/><path d="M60 520H1140" stroke="#4b4630"/><text x="60" y="575" fill="#e9e7d5" font-family="sans-serif" font-size="19" letter-spacing="3">LICEO GENTILESCHI · NAPOLI</text><text x="1140" y="575" text-anchor="end" fill="#ffcf02" font-family="sans-serif" font-size="19" letter-spacing="3">LA LUCE RENDE VISIBILI LE IDEE.</text></svg>`;
await sharp(Buffer.from(svg)).png().toFile("public/social-preview.png");
