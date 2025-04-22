import { localesConfig } from './i18n'

export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: 'static'
  },
  runtimeConfig: {
    public: {
      finnhubApiKey: process.env.FINNHUB_API_KEY
    }
  },

  // Add redirect rule
  nitro: {
    routeRules: {
      '/': { redirect: '/calculator' }
    }
  },

  css: [
    '@/assets/styles/main.scss'
  ],

  experimental: {
    typedPages: true
  },

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
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Інвестиційний калькулятор' },
        { name: 'twitter:description', content: 'Розрахуйте майбутню вартість ваших інвестицій' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://yourdomain.com' }
      ],
      script: [
        // Google Analytics
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX',
          async: true
        },
        {
          children: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `
        }
        // TODO: Implement Google AdSense
        // {
        //   src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX',
        //   async: true,
        //   crossorigin: 'anonymous'
        // }
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
    'unplugin-icons/nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],

  sitemap: {
    hostname: 'https://yourdomain.com',
    gzip: true,
    exclude: ['/404'],
    routes: [
      '/',
      '/calculator',
      '/faq',
      '/en',
      '/en/calculator',
      '/en/faq'
    ]
  },

  robots: {
    UserAgent: '*',
    Allow: '/calculator',
    Sitemap: 'https://yourdomain.com/sitemap.xml'
  }
})
