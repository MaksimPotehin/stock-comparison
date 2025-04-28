import { useI18n } from 'vue-i18n'
import { useHead } from '#imports'

export const useSeo = (pageKey: 'home' | 'calculator' | 'faq') => {
  // Default values for prerendering
  const defaultMeta = {
    title: 'Investment Calculator',
    description: 'Investment Calculator - Calculate compound interest and investment returns'
  }

  // Wrap in try-catch to handle prerendering
  try {
    const { locale } = useI18n()
    if (!locale) {
      throw new Error('i18n not available')
    }

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
        en: 'Calculate potential investment returns with various parameters: initial deposit, regular contributions, interest rate, and investment period.',
        ua: 'Розрахуйте потенційний дохід від інвестицій з різними параметрами: початковий внесок, регулярні поповнення, відсоткова ставка та період інвестування.'
      },
      faq: {
        en: 'Frequently asked questions about investment calculator, compound interest, and financial planning for your investments.',
        ua: 'Часті запитання про інвестиційний калькулятор, складні відсотки та фінансове планування ваших інвестицій.'
      }
    }

    const keywords = {
      en: 'investment calculator, compound interest calculator, investment returns calculator, financial planning, passive income, profit reinvestment, annual interest rate, regular contributions, long-term investments, financial independence',
      ua: 'інвестиційний калькулятор, калькулятор складних відсотків, калькулятор доходності інвестицій, фінансове планування, пасивний дохід, реінвестування прибутку, річна відсоткова ставка, регулярні внески, довгострокові інвестиції, фінансова незалежність'
    }

    const currentLocale = locale.value === 'en' ? 'en' : 'ua'

    useHead({
      title: titles[pageKey][currentLocale],
      meta: [
        {
          key: 'description',
          name: 'description',
          content: descriptions[pageKey][currentLocale]
        },
        {
          key: 'keywords',
          name: 'keywords',
          content: keywords[currentLocale]
        },
        // Open Graph
        {
          key: 'og:title',
          property: 'og:title',
          content: titles[pageKey][currentLocale]
        },
        {
          key: 'og:description',
          property: 'og:description',
          content: descriptions[pageKey][currentLocale]
        },
        {
          key: 'og:type',
          property: 'og:type',
          content: 'website'
        },
        {
          key: 'og:url',
          property: 'og:url',
          content: `https://investing-space.tech/${currentLocale === 'en' ? 'en' : 'ua'}/${pageKey === 'home' ? '' : pageKey}`
        },
        // Twitter
        {
          key: 'twitter:title',
          name: 'twitter:title',
          content: titles[pageKey][currentLocale]
        },
        {
          key: 'twitter:description',
          name: 'twitter:description',
          content: descriptions[pageKey][currentLocale]
        },
        {
          key: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        }
      ],
      link: [
        {
          key: 'uk',
          rel: 'alternate',
          hreflang: 'uk',
          href: `https://investing-space.tech/ua/${pageKey === 'home' ? '' : pageKey}`
        },
        {
          key: 'en',
          rel: 'alternate',
          hreflang: 'en',
          href: `https://investing-space.tech/en/${pageKey === 'home' ? '' : pageKey}`
        },
        {
          key: 'x-default',
          rel: 'alternate',
          hreflang: 'x-default',
          href: `https://investing-space.tech/${pageKey === 'home' ? '' : pageKey}`
        },
        {
          key: 'canonical',
          rel: 'canonical',
          href: `https://investing-space.tech/${currentLocale === 'en' ? 'en' : 'ua'}/${pageKey === 'home' ? '' : pageKey}`
        }
      ]
    })
  } catch (e) {
    // During prerendering, if nuxt instance or i18n is not available, use default values
    useHead({
      title: defaultMeta.title,
      meta: [
        {
          key: 'description',
          name: 'description',
          content: defaultMeta.description
        }
      ]
    })
  }
}
