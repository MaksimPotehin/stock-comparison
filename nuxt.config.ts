import { localesConfig } from './i18n'
import { BLOG_POSTS } from './content/blog/posts'

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-07-25',
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.investing-space.tech'
  },
  runtimeConfig: {
    twelveDataApiKey: process.env.NUXT_TWELVE_DATA_API_KEY || '',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.investing-space.tech',
      gscVerificationContent: process.env.NUXT_PUBLIC_GSC_VERIFICATION || ''
    }
  },

  nitro: {
    preset: process.env.VERCEL ? 'vercel' : undefined,
    prerender: {
      routes: ['/sitemap.xml', '/sitemap_index.xml']
    },
    routeRules: {
      '/': { redirect: '/calculator' },
      '/ua': { redirect: '/ua/calculator' },
      // SEO and performance optimizations
      '/calculator': {
        headers: { 'cache-control': 's-maxage=31536000' },
        prerender: true
      },
      '/faq': {
        headers: { 'cache-control': 's-maxage=31536000' },
        prerender: true
      },
      '/blog': {
        headers: { 'cache-control': 's-maxage=86400' },
        prerender: true
      },

      '/ua/calculator': {
        headers: { 'cache-control': 's-maxage=31536000' },
        prerender: true
      },
      '/ua/faq': {
        headers: { 'cache-control': 's-maxage=31536000' },
        prerender: true
      },
      '/ua/blog': {
        headers: { 'cache-control': 's-maxage=86400' },
        prerender: true
      },

      '/stock-comparison': { ssr: true },
      '/ua/stock-comparison': { ssr: true }
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
        lang: 'en'
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
        { rel: 'manifest', href: '/favicon/site.webmanifest' },
        { rel: 'preconnect', href: 'https://www.googletagmanager.com', crossorigin: '' },
        { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' },
        { rel: 'preconnect', href: 'https://ipapi.co' },
        { rel: 'dns-prefetch', href: 'https://ipapi.co' }
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

  hooks: {
    'pages:extend': (pages) => {
      // Remove component pages from routing
      for (let i = pages.length - 1; i >= 0; i--) {
        if (pages[i].path?.includes('/components/')) {
          pages.splice(i, 1)
        }
      }
    },
    'nitro:config': (nitroConfig) => {
      // Ensure components are excluded from sitemap
      if (!nitroConfig.prerender) nitroConfig.prerender = {}
      if (!nitroConfig.prerender.ignore) nitroConfig.prerender.ignore = []
      nitroConfig.prerender.ignore.push('/calculator/components/**', '/ua/calculator/components/**')
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
    '@nuxtjs/sitemap'
  ],

  sitemap: {
    xsl: false,
    urls: [
      '/calculator',
      '/faq',
      '/blog',
      ...BLOG_POSTS.map(p => ({ loc: `/blog/${p.slug}`, lastmod: p.publishedAt })),
      '/stock-comparison',
      '/ua/stock-comparison',
      '/ua/calculator',
      '/ua/faq',
      '/ua/blog',
      ...BLOG_POSTS.map(p => ({ loc: `/ua/blog/${p.slug}`, lastmod: p.publishedAt }))
    ],
    exclude: [
      '/404',
      '/_nuxt/**',
      '**/components/**'
    ],
    defaults: {
      changefreq: 'weekly',
      priority: 0.8
    }
  },

  build: {
    transpile: ['element-plus']
  }
})
