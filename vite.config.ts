import { defineConfig } from "vitest/config";
import type { Plugin, PreviewServer, ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// Lo stesso ingresso HTML viene servito in dev, preview e su Vercel.
function galleryRewrite(server: ViteDevServer | PreviewServer) {
  server.middlewares.use((request, _response, next) => {
    const url = new URL(request.url || "/", "http://localhost");
    if (url.pathname === "/gallery" || url.pathname === "/gallery/") {
      request.url = `/gallery/index.html${url.search}`;
    }
    next();
  });
}
const galleryEntry: Plugin = {
  name: "gallery-html-entry",
  configureServer: galleryRewrite,
  configurePreviewServer: galleryRewrite,
};
export default defineConfig({
  plugins: [react(), galleryEntry],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        gallery: fileURLToPath(
          new URL("./gallery/index.html", import.meta.url),
        ),
      },
    },
  },
  server: { port: 4174, strictPort: true },
  test: {
    exclude: ["**/node_modules/**", "**/dist/**", "**/._*"],
  },
});
