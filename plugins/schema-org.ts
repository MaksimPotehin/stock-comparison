import { useRoute } from 'vue-router'

export default defineNuxtPlugin((nuxtApp) => {
  const route = useRoute()
  const i18n = nuxtApp.vueApp.config.globalProperties.$i18n

  // Додаємо schema.org структуровані дані в залежності від сторінки
  const addSchemaOrg = () => {
    const path = route.path
    let schema: any = {}

    if (path.includes('/calculator')) {
      schema = {
        '@context': 'https://schema.org',
        '@type': 'FinancialProduct',
        name: i18n.locale === 'en' ? 'Investment Calculator' : 'Інвестиційний калькулятор',
        description: i18n.locale === 'en'
          ? 'Free online calculator for investment planning with compound interest.'
          : 'Безкоштовний онлайн калькулятор для планування інвестицій зі складними відсотками.',
        category: 'Financial Tool',
        url: `https://yourdomain.com/${i18n.locale}/calculator`,
        provider: {
          '@type': 'Organization',
          name: 'Your Company Name',
          url: 'https://yourdomain.com'
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock'
        }
      }
    } else if (path.includes('/faq')) {
      schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: i18n.locale === 'en' ? 'What is compound interest?' : 'Що таке складні відсотки?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: i18n.locale === 'en'
                ? 'Compound interest is interest calculated not only on the initial principal but also on the accumulated interest. This significantly accelerates the growth of your investments over time.'
                : 'Складні відсотки — це нарахування відсотків не тільки на початкову суму, але й на вже накопичені відсотки. Це значно прискорює зростання ваших інвестицій з часом.'
            }
          },
          {
            '@type': 'Question',
            name: i18n.locale === 'en' ? 'How to use the calculator?' : 'Як використовувати калькулятор?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: i18n.locale === 'en'
                ? 'Enter the initial amount, regular contribution, interest rate, and investment period. Choose the frequency of contributions and the period unit. Enable or disable reinvestment as needed.'
                : 'Введіть початкову суму, регулярний внесок, відсоткову ставку та період інвестування. Виберіть частоту внесків та одиницю виміру періоду. Увімкніть або вимкніть реінвестування за потреби.'
            }
          },
          {
            '@type': 'Question',
            name: i18n.locale === 'en' ? 'How does reinvestment differ from regular interest calculation?' : 'Чим відрізняється реінвестування від звичайного нарахування відсотків?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: i18n.locale === 'en'
                ? 'With reinvestment, earned interest is added to the principal and also earns interest. Without reinvestment, interest is calculated only on the initial amount.'
                : 'При реінвестуванні зароблені відсотки додаються до основної суми і також приносять дохід. Без реінвестування відсотки нараховуються лише на початкову суму.'
            }
          }
        ]
      }
    } else {
      // Домашня сторінка
      schema = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: i18n.locale === 'en' ? 'Investment Calculator' : 'Інвестиційний калькулятор',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0'
        }
      }
    }

    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(schema)
        }
      ]
    })
  }

  // Додаємо слухач для зміни маршруту
  nuxtApp.hook('page:finish', () => {
    addSchemaOrg()
  })

  // Виклик при ініціалізації
  addSchemaOrg()
})
