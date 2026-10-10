// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/seo',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@unocss/nuxt',
    '@nuxt/icon',
    '@nuxt/image',
    '@vueuse/nuxt',
    'nuxt-studio',
    '@nuxt/scripts',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  css: ['~/assets/global.scss'],
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },
  scripts: {
    registry: {
      googleAnalytics: {
        id: 'G-***',
        trigger: 'onNuxtReady',
        defaultConsent: {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          analytics_storage: 'denied',
          wait_for_update: 500,
        },
      },
    },
  },
  site: {
    url: 'https://eita.ptmi.jp',
    name: '小林栄太のポートフォリオサイト',
  },
  sitemap: {
    sources: [
      '/api/__sitemap__/urls',
    ],
  },
  studio: {
    repository: {
      provider: 'github',
      owner: 'otusoa',
      repo: 'my-site',
      branch: 'main',
    },
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            // Default theme (same as single string)
            default: 'github-dark',
            // Theme used if `html.dark`
            dark: 'github-dark',
            // Theme used if `html.sepia`
            sepia: 'monokai',
          },
        },
      },
    },
  },
})
