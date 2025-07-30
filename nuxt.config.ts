import { localesConfig } from './i18n'

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-07-25',
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.investing-space.tech'
    }
  },

  nitro: {
    preset: process.env.VERCEL ? 'vercel' : undefined,
    routeRules: {
      '/': { redirect: '/calculator' },
      // SEO та performance оптимізації
      '/calculator': {
        headers: { 'cache-control': 's-maxage=31536000' },
        prerender: true
      },
      '/faq': {
        headers: { 'cache-control': 's-maxage=31536000' },
        prerender: true
      },

      '/ua/calculator': {
        headers: { 'cache-control': 's-maxage=31536000' },
        prerender: true
      },
      '/ua/faq': {
        headers: { 'cache-control': 's-maxage=31536000' },
        prerender: true
      }
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
        { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
        { name: 'author', content: 'Investing Space' },
        { name: 'theme-color', content: '#00bff5' },
        { name: 'googlebot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
        { rel: 'apple-touch-icon', href: '/favicon/apple-touch-icon.png' },
        { rel: 'manifest', href: '/favicon/site.webmanifest' }
      ],
      script: [
        // Google Analytics
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-BK379KJZQW',
          async: true
        },
        {
          innerHTML: `
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
    'unplugin-icons/nuxt',
    ['@nuxtjs/sitemap', {
      hostname: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.investing-space.tech',
      gzip: true,
      routes: [
        '/calculator',
        '/faq',
        '/ua/calculator',
        '/ua/faq'
      ],
      defaults: {
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString()
      }
    }]
  ],

  build: {
    transpile: ['element-plus']
  }
})
