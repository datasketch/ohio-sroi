import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  site: 'https://ousroi.datasketch.co/',
  outDir: './dist/',
  base: '/',
  build: {
    assetsPrefix: process.env.PREFIX_ASSETS === 'yes' ? 'https://ousroi.datasketch.co/' : ''
  }
});
