import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  site: 'https://ousroi.datasketch.co/passion-works',
  outDir: './dist/passion-works',
  base: '/passion-works',
  build: {
    assetsPrefix: process.env.PREFIX_ASSETS === 'yes' ? 'https://ousroi.datasketch.co/passion-works' : ''
  }
});
