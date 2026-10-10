import { defineConfig, presetMini, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [
    presetMini(),
  ],

  transformers: [
    transformerDirectives(),
  ],

  theme: {
    colors: {
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      linkPrimary: 'var(--link-primary)',
      linkActive: 'var(--link-active)',
      linkVisited: 'var(--link-visited)',
      bgPage: 'var(--bg-page)',
      bgAside: 'var(--bg-aside)',
      bgMain: 'var(--bg-main)',
      borderMain: 'var(--border-main)',
    },
    boxShadow: {
      main: 'var(--box-shadow-primary)',
    },
  },
})
