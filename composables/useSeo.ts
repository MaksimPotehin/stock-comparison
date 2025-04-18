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
        name: 'description',
        content: descriptions[pageKey][currentLocale]
      },
      {
        name: 'keywords',
        content: keywords[currentLocale]
      }
    ],
    link: [
      {
        rel: 'alternate',
        hreflang: 'uk',
        href: `https://yourdomain.com/ua/${pageKey === 'home' ? '' : pageKey}`
      },
      {
        rel: 'alternate',
        hreflang: 'en',
        href: `https://yourdomain.com/en/${pageKey === 'home' ? '' : pageKey}`
      },
      {
        rel: 'alternate',
        hreflang: 'x-default',
        href: `https://yourdomain.com/${pageKey === 'home' ? '' : pageKey}`
      }
    ]
  })
}
