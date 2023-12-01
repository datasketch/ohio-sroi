import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), sitemap()],
  site: 'https://lucent-bunny-643535.netlify.app',
  build: {
    assetsPrefix: process.env.PREFIX_ASSETS === 'yes' ? 'https://lucent-bunny-643535.netlify.app' : ''
  }
});
