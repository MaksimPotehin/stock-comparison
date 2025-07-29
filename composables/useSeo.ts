import { useI18n } from 'vue-i18n'

export const useSeo = (pageKey: 'home' | 'calculator' | 'faq') => {
  const { locale } = useI18n()

  const titles = {
    home: {
      en: 'Investment Calculator | Compound Interest and Investment Returns Calculator',
      ua: 'Інвестиційний калькулятор | Розрахунок складних відсотків та доходності інвестицій'
    },
    calculator: {
      en: 'Compound Interest Calculator | Investment and Passive Income Planning',
      ua: 'Калькулятор складних відсотків | Планування інвестицій та пасивного доходу'
    },
    faq: {
      en: 'FAQ | Investment Calculator | Compound Interest Planning',
      ua: 'Часті запитання | Інвестиційний калькулятор | Планування складних відсотків'
    }
  }

  const descriptions = {
    home: {
      en: 'Free online calculator for investment planning. Calculate the future value of your investments with reinvestment and regular contributions.',
      ua: 'Безкоштовний онлайн калькулятор для планування інвестицій. Розрахуйте майбутню вартість ваших вкладень з урахуванням реінвестування та регулярних внесків.'
    },
    calculator: {
      en: 'Calculate potential investment returns with various parameters: initial deposit, regular contributions, interest rate, and investment period. Free compound interest calculator with charts and tables.',
      ua: 'Розрахуйте потенційний дохід від інвестицій з різними параметрами: початковий внесок, регулярні поповнення, відсоткова ставка та період інвестування. Безкоштовний калькулятор складних відсотків з графіками та таблицями.'
    },
    faq: {
      en: 'Frequently asked questions about investment calculator, compound interest, and financial planning for your investments. Learn investment basics and calculator usage.',
      ua: 'Часті запитання про інвестиційний калькулятор, складні відсотки та фінансове планування ваших інвестицій. Дізнайтеся основи інвестування та використання калькулятора.'
    }
  }

  const keywords = {
    en: 'investment calculator, compound interest calculator, investment returns calculator, financial planning, passive income, profit reinvestment, annual interest rate, regular contributions, long-term investments, financial independence, portfolio growth, retirement planning',
    ua: 'інвестиційний калькулятор, калькулятор складних відсотків, калькулятор доходності інвестицій, фінансове планування, пасивний дохід, реінвестування прибутку, річна відсоткова ставка, регулярні внески, довгострокові інвестиції, фінансова незалежність, зростання портфеля, планування пенсії'
  }

  const currentLocale = locale.value === 'en' ? 'en' : 'ua'
  const baseUrl = 'https://www.investing-space.tech'
  const canonicalUrl = `${baseUrl}/${currentLocale === 'ua' ? 'ua/' : ''}${pageKey === 'home' ? '' : pageKey}`

  // Структуровані дані
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': pageKey === 'calculator' ? 'WebApplication' : 'WebPage',
    name: titles[pageKey][currentLocale],
    description: descriptions[pageKey][currentLocale],
    url: canonicalUrl,
    inLanguage: currentLocale === 'ua' ? 'uk-UA' : 'en-US',
    publisher: {
      '@type': 'Organization',
      name: 'Investing Space',
      url: baseUrl
    },
    ...(pageKey === 'calculator' && {
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }),
    ...(pageKey === 'faq' && {
      mainEntity: {
        '@type': 'FAQPage'
      }
    })
  }

  useHead({
    title: titles[pageKey][currentLocale],
    htmlAttrs: {
      lang: currentLocale === 'ua' ? 'uk' : 'en'
    },
    meta: [
      {
        name: 'description',
        content: descriptions[pageKey][currentLocale]
      },
      {
        name: 'keywords',
        content: keywords[currentLocale]
      },
      // Open Graph
      {
        property: 'og:title',
        content: titles[pageKey][currentLocale]
      },
      {
        property: 'og:description',
        content: descriptions[pageKey][currentLocale]
      },
      {
        property: 'og:url',
        content: canonicalUrl
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:image',
        content: `${baseUrl}/og-image.jpg`
      },
      {
        property: 'og:image:width',
        content: '1200'
      },
      {
        property: 'og:image:height',
        content: '630'
      },
      {
        property: 'og:site_name',
        content: 'Investing Space'
      },
      {
        property: 'og:locale',
        content: currentLocale === 'ua' ? 'uk_UA' : 'en_US'
      },
      // Twitter Card
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'twitter:title',
        content: titles[pageKey][currentLocale]
      },
      {
        name: 'twitter:description',
        content: descriptions[pageKey][currentLocale]
      },
      {
        name: 'twitter:image',
        content: `${baseUrl}/og-image.jpg`
      }
    ],
    link: [
      {
        rel: 'canonical',
        href: canonicalUrl
      },
      {
        rel: 'alternate',
        hreflang: 'uk',
        href: `${baseUrl}/ua/${pageKey === 'home' ? '' : pageKey}`
      },
      {
        rel: 'alternate',
        hreflang: 'en',
        href: `${baseUrl}/${pageKey === 'home' ? '' : pageKey}`
      },
      {
        rel: 'alternate',
        hreflang: 'x-default',
        href: `${baseUrl}/${pageKey === 'home' ? '' : pageKey}`
      }
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(structuredData)
      }
    ]
  })
}
