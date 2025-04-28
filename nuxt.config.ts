import { localesConfig } from './i18n/locales.config'

export default defineNuxtConfig({
  ssr: true,
  runtimeConfig: {
    public: {
      finnhubApiKey: process.env.FINNHUB_API_KEY,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://investing-space.tech'
    }
  },

  css: [
    '@/assets/styles/main.scss'
  ],

  app: {
    head: {
      htmlAttrs: {
        lang: 'uk'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        // Default meta tags
        { name: 'description', content: 'Безкоштовний онлайн калькулятор для планування інвестицій. Розрахуйте майбутню вартість ваших вкладень з урахуванням реінвестування та регулярних внесків.' },
        { name: 'keywords', content: 'інвестиційний калькулятор, калькулятор складних відсотків, інвестиції, фінансове планування' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Інвестиційний калькулятор | Розрахунок складних відсотків' },
        { property: 'og:description', content: 'Безкоштовний онлайн калькулятор для планування інвестицій' },
        { property: 'og:image', content: '/og-image.jpg' },
        { property: 'og:site_name', content: 'Investing Space' },
        { property: 'og:url', content: 'https://investing-space.tech' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Інвестиційний калькулятор' },
        { name: 'twitter:description', content: 'Розрахуйте майбутню вартість ваших інвестицій' },
        { name: 'twitter:image', content: '/og-image.jpg' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://investing-space.tech' }
      ],
      script: [
        // Google Analytics
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-BK379KJZQW',
          async: true
        },
        {
          children: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BK379KJZQW');
          `
        }
      ]
    }
  },

  modules: [
    '@vueuse/nuxt',
    ['@nuxtjs/tailwindcss', { viewer: false }],
    ['@element-plus/nuxt', { importStyle: false }],
    ['@nuxtjs/i18n', {
      ...localesConfig,
      vueI18n: './i18n/i18n.config.ts'
    }],
    'unplugin-icons/nuxt'
  ],

  build: {
    transpile: ['element-plus']
  }
})
