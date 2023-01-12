import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import { presetUno, presetIcons } from 'unocss'
import vue from '@astrojs/vue'
import netlify from '@astrojs/netlify/functions'

// https://astro.build/config
export default defineConfig({
  integrations: [
    UnoCSS({
      presets: [
        presetIcons({
          scale: 1.4,
          cdn: 'https://esm.sh'
        }),
        presetUno({
          dark: 'media'
        })
      ]
    }),
    vue()
  ],
  output: 'server',
  adapter: netlify()
})
