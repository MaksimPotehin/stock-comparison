import { useI18n } from 'vue-i18n'

export const useSeo = (pageKey: 'home' | 'calculator' | 'faq' | 'blog' | 'stock-comparison' | 'news') => {
  const { locale } = useI18n()

  const titles = {
    home: {
      en: 'Free Investment Calculator | Compound Interest',
      ua: 'Інвестиційний калькулятор | Складні відсотки'
    },
    calculator: {
      en: 'Free Compound Interest Calculator | Plan Returns',
      ua: 'Калькулятор складних відсотків | Безкоштовно'
    },
    faq: {
      en: 'Investment Calculator FAQ | Compound Interest',
      ua: 'FAQ: Інвестиційний калькулятор | Відповіді'
    },
    blog: {
      en: 'Investing Blog | Compound Interest & Finance',
      ua: 'Блог про інвестиції | Фінансова грамотність'
    },
    'stock-comparison': {
      en: 'Stock Comparison Chart | Compare Stocks Side by Side',
      ua: 'Порівняння акцій | Графік порівняння двох акцій'
    },
    news: {
      en: 'Financial News | Investing Space',
      ua: 'Фінансові новини | Investing Space'
    }
  }

  const descriptions = {
    home: {
      en: 'Free online investment calculator for compound interest planning. Calculate investment returns with monthly contributions, reinvestment options, and interactive charts. No registration required.',
      ua: 'Безкоштовний онлайн калькулятор для планування інвестицій. Розрахуйте майбутню вартість ваших вкладень з урахуванням реінвестування та регулярних внесків.'
    },
    calculator: {
      en: 'Free compound interest calculator with monthly contributions, reinvestment options, and interactive charts. See exactly how your money grows — no signup required.',
      ua: 'Безкоштовний калькулятор складних відсотків з щомісячними внесками, реінвестуванням та графіками. Розрахуйте дохідність інвестицій — без реєстрації.'
    },
    faq: {
      en: 'Investment calculator FAQ: Learn about compound interest, investment planning, and how to use our free online calculator. Get answers about regular contributions and long-term investing.',
      ua: 'Часті запитання про інвестиційний калькулятор, складні відсотки та фінансове планування ваших інвестицій. Дізнайтеся основи інвестування та використання калькулятора.'
    },
    blog: {
      en: 'Articles on investing, financial literacy, compound interest, and practical guides for using our investment calculator effectively.',
      ua: 'Статті про інвестування, фінансову грамотність, складні відсотки та практичні гіди з ефективного використання нашого інвестиційного калькулятора.'
    },
    'stock-comparison': {
      en: 'Compare any two stocks on a normalized chart. Analyze return %, volatility, and max drawdown over 1M, 3M, 6M, YTD, 1Y, and 5Y periods. Free, no signup needed.',
      ua: 'Порівнюйте будь-які дві акції на графіку. Аналізуйте прибутковість, волатильність та просадку за 1М, 3М, 6М, 1Р та 5Р. Безкоштовно, без реєстрації.'
    },
    news: {
      en: 'Latest stock market news, company updates, and financial events. Follow market trends and stay informed about your investments.',
      ua: 'Актуальні новини фондового ринку, оновлення компаній та фінансові події. Стежте за ринковими трендами та своїми інвестиціями.'
    }
  }

  const keywords: Record<typeof pageKey, { en: string; ua: string }> = {
    home: {
      en: 'investment calculator, compound interest calculator, free investment calculator, monthly contributions calculator, investment returns calculator, financial planning, passive income, long-term investments',
      ua: 'інвестиційний калькулятор, калькулятор складних відсотків, безкоштовний калькулятор інвестицій, щомісячні внески, фінансове планування, пасивний дохід'
    },
    calculator: {
      en: 'compound interest calculator, free investment calculator, investment returns calculator, monthly contributions calculator, reinvestment calculator, annual interest rate, long-term investment calculator, compound interest with monthly deposits',
      ua: 'калькулятор складних відсотків, безкоштовний інвестиційний калькулятор, калькулятор доходності інвестицій, щомісячні внески, реінвестування, річна відсоткова ставка, довгостроковий калькулятор інвестицій'
    },
    'stock-comparison': {
      en: 'stock comparison tool, compare stocks side by side, stock performance chart, stock return calculator, CAGR calculator, max drawdown, stock volatility, compare ETF stocks, free stock comparison, normalized stock chart',
      ua: 'порівняння акцій, порівняти акції онлайн, графік акцій, прибутковість акцій, калькулятор CAGR, максимальне просідання, волатильність акцій, безкоштовне порівняння акцій'
    },
    faq: {
      en: 'investment calculator FAQ, compound interest questions, how to calculate investment returns, investment planning help, compound interest explained',
      ua: 'FAQ інвестиційний калькулятор, складні відсотки запитання, як розрахувати доходність інвестицій, фінансове планування допомога'
    },
    blog: {
      en: 'investing blog, financial literacy, compound interest explained, ETF investing guide, stock analysis for beginners, investment strategies, passive income blog',
      ua: 'блог про інвестиції, фінансова грамотність, складні відсотки пояснення, ETF для початківців, аналіз акцій, інвестиційні стратегії'
    },
    news: {
      en: 'stock market news, financial news, market updates, investing news, company earnings, market trends',
      ua: 'новини фондового ринку, фінансові новини, ринкові оновлення, новини інвестицій'
    }
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
    '@type': (pageKey === 'calculator' || pageKey === 'home' || pageKey === 'stock-comparison') ? 'WebApplication' : (pageKey === 'blog' ? 'Blog' : 'WebPage'),
    name: titles[pageKey][currentLocale],
    description: descriptions[pageKey][currentLocale],
    url: canonicalUrl,
    inLanguage: currentLocale === 'ua' ? 'uk-UA' : 'en-US',
    publisher: {
      '@type': 'Organization',
      name: 'Investing Space',
      url: baseUrl
    },
    ...((pageKey === 'calculator' || pageKey === 'home' || pageKey === 'stock-comparison') && {
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
        content: keywords[pageKey][currentLocale]
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
        content: `${baseUrl}/og-image.png`
      },
      {
        property: 'og:image:secure_url',
        content: `${baseUrl}/og-image.png`
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
        content: `${baseUrl}/og-image.png`
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
