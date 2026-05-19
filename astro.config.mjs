// @ts-check

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import favicons from "astro-favicons";

// https://astro.build/config
export default defineConfig({
  site: "https://diwa-dev.vercel.app",
  adapter: vercel({ isr: false }),
  integrations: [
    react(),
    sitemap(),
    favicons({
      name: "Diwa Prasetyo",
      short_name: "Diwa",
      input: {
        favicons: ["public/favicon.png"],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
