/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KYC_VENDOR?: "onfido" | "persona" | "jumio";
  // Absolute API base for split deploys (e.g. Cloudflare Pages SPA + Render API).
  // When unset, the front-end calls "/api" (same-origin, single-service deploy).
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
