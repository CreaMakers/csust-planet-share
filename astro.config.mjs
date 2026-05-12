import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

import tailwindcss from "@tailwindcss/vite";

const env = loadEnv(process.env.NODE_ENV ?? "production", process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  site: env.PUBLIC_SITE_URL,
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
});
