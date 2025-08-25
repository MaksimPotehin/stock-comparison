import { useI18n } from 'vue-i18n'

export const useSeo = (pageKey: 'home' | 'calculator' | 'faq') => {
  const { locale } = useI18n()

  const titles = {
    home: {
      en: 'Free Investment Calculator | Compound Interest Calculator with Monthly Contributions',
      ua: 'Інвестиційний калькулятор | Розрахунок складних відсотків та доходності інвестицій'
    },
    calculator: {
      en: 'Free Compound Interest Calculator | Investment Calculator with Regular Deposits',
      ua: 'Калькулятор складних відсотків | Планування інвестицій та пасивного доходу'
    },
    faq: {
      en: 'Investment Calculator FAQ | Compound Interest Planning Questions',
      ua: 'Часті запитання | Інвестиційний калькулятор | Планування складних відсотків'
    }
  }

  const descriptions = {
    home: {
      en: 'Free online investment calculator for compound interest planning. Calculate investment returns with monthly contributions, reinvestment options, and interactive charts. No registration required.',
      ua: 'Безкоштовний онлайн калькулятор для планування інвестицій. Розрахуйте майбутню вартість ваших вкладень з урахуванням реінвестування та регулярних внесків.'
    },
    calculator: {
      en: 'Free compound interest calculator with monthly contributions. Calculate investment returns with regular deposits, reinvestment, and multiple time periods. View results in charts and tables.',
      ua: 'Розрахуйте потенційний дохід від інвестицій з різними параметрами: початковий внесок, регулярні поповнення, відсоткова ставка та період інвестування. Безкоштовний калькулятор складних відсотків з графіками та таблицями.'
    },
    faq: {
      en: 'Investment calculator FAQ: Learn about compound interest, investment planning, and how to use our free online calculator. Get answers about regular contributions and long-term investing.',
      ua: 'Часті запитання про інвестиційний калькулятор, складні відсотки та фінансове планування ваших інвестицій. Дізнайтеся основи інвестування та використання калькулятора.'
    }
  }

  const keywords = {
    en: 'investment calculator, compound interest calculator, investment returns calculator, financial planning, passive income, profit reinvestment, annual interest rate, regular contributions, long-term investments, financial independence, portfolio growth, retirement planning, free investment calculator, online investment calculator, compound interest calculator with monthly contributions, investment calculator with regular deposits, compound interest calculator online, investment growth calculator, financial calculator compound interest, investment planning calculator, compound interest calculator with reinvestment, investment calculator with charts, compound interest calculator with table view, investment calculator for long term planning, compound interest calculator with weekly monthly yearly options',
    ua: 'інвестиційний калькулятор, калькулятор складних відсотків, калькулятор доходності інвестицій, фінансове планування, пасивний дохід, реінвестування прибутку, річна відсоткова ставка, регулярні внески, довгострокові інвестиції, фінансова незалежність, зростання портфеля, планування пенсії, безкоштовний інвестиційний калькулятор, онлайн інвестиційний калькулятор, калькулятор складних відсотків з щомісячними внесками, калькулятор інвестицій з регулярними внесками, калькулятор складних відсотків онлайн, калькулятор зростання інвестицій, фінансовий калькулятор складні відсотки, калькулятор планування інвестицій, калькулятор складних відсотків з реінвестуванням, інвестиційний калькулятор з графіками, калькулятор складних відсотків з таблицею, інвестиційний калькулятор для довгострокового планування'
  }

  const currentLocale = locale.value === 'en' ? 'en' : 'ua'
  const baseUrl = 'https://www.investing-space.tech'

  // Fixed canonical URL logic
  let canonicalPath = ''
  if (pageKey === 'home') {
    // Home is now /calculator
    canonicalPath = currentLocale === 'ua' ? '/ua/calculator' : '/calculator'
  } else {
    canonicalPath = currentLocale === 'ua' ? `/ua/${pageKey}` : `/${pageKey}`
  }
  const canonicalUrl = `${baseUrl}${canonicalPath}`

  // Structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': (pageKey === 'calculator' || pageKey === 'home') ? 'WebApplication' : 'WebPage',
    name: titles[pageKey][currentLocale],
    description: descriptions[pageKey][currentLocale],
    url: canonicalUrl,
    inLanguage: currentLocale === 'ua' ? 'uk-UA' : 'en-US',
    publisher: {
      '@type': 'Organization',
      name: 'Investing Space',
      url: baseUrl
    },
    ...((pageKey === 'calculator' || pageKey === 'home') && {
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
      {
        name: 'language',
        content: currentLocale === 'ua' ? 'uk' : 'en'
      },
      {
        'http-equiv': 'content-language',
        content: currentLocale === 'ua' ? 'uk' : 'en'
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
        content: `${baseUrl}/og-image.svg`
      },
      {
        property: 'og:image:secure_url',
        content: `${baseUrl}/og-image.svg`
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
        property: 'og:image:alt',
        content: 'Free Investment Calculator'
      },
      {
        property: 'og:site_name',
        content: 'Investing Space'
      },
      {
        property: 'og:locale',
        content: currentLocale === 'ua' ? 'uk_UA' : 'en_US'
      },
      // Locale alternates for OG
      {
        property: 'og:locale:alternate',
        content: currentLocale === 'ua' ? 'en_US' : 'uk_UA'
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
        content: `${baseUrl}/og-image.svg`
      }
    ],
    link: [
      {
        rel: 'canonical',
        href: canonicalUrl
      },
      // Fixed hreflang links
      {
        rel: 'alternate',
        hreflang: 'uk',
        href: `${baseUrl}${pageKey === 'home' ? '/ua/calculator' : `/ua/${pageKey}`}`
      },
      {
        rel: 'alternate',
        hreflang: 'en',
        href: `${baseUrl}${pageKey === 'home' ? '/calculator' : `/${pageKey}`}`
      },
      {
        rel: 'alternate',
        hreflang: 'x-default',
        href: `${baseUrl}${pageKey === 'home' ? '/calculator' : `/${pageKey}`}`
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
