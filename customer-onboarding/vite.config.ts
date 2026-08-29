import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// In dev, the front-end calls /api which is proxied to the local Express API.
// In production the base URL is configurable (VITE_API_URL) so the SPA can
// talk to a separately-hosted API (e.g. Cloudflare Pages SPA + Render API).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:8787",
    },
  },
});
