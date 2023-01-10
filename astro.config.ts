import { defineConfig } from 'astro/config';
import UnoCSS from 'unocss/astro';
import { presetUno, presetIcons } from 'unocss';
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  integrations: [UnoCSS({
    presets: [presetIcons({
      scale: 1.4,
      cdn: 'https://esm.sh'
    }), presetUno()]
  }), vue()]
});