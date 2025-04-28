import { useRoute } from 'vue-router'
import { useHead, useI18n } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  // Default schema for prerendering
  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Investment Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0'
    }
  }

  // Додаємо schema.org структуровані дані в залежності від сторінки
  const addSchemaOrg = () => {
    try {
      const route = useRoute()

      // Use useI18n composable instead of accessing i18n through nuxtApp
      const i18n = useI18n()
      const currentLocale = i18n.locale.value

      if (!route) {
        throw new Error('Route not available')
      }

      const path = route.path
      let schema: any = {}

      if (path.includes('/calculator')) {
        schema = {
          '@context': 'https://schema.org',
          '@type': 'FinancialProduct',
          name: currentLocale === 'en' ? 'Investment Calculator' : 'Інвестиційний калькулятор',
          description: currentLocale === 'en'
            ? 'Free online calculator for investment planning with compound interest.'
            : 'Безкоштовний онлайн калькулятор для планування інвестицій зі складними відсотками.',
          category: 'Financial Tool',
          url: `https://investing-space.tech/${currentLocale}/calculator`,
          provider: {
            '@type': 'Organization',
            name: 'Your Company Name',
            url: 'https://investing-space.tech'
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
              name: currentLocale === 'en' ? 'What is compound interest?' : 'Що таке складні відсотки?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: currentLocale === 'en'
                  ? 'Compound interest is interest calculated not only on the initial principal but also on the accumulated interest. This significantly accelerates the growth of your investments over time.'
                  : 'Складні відсотки — це нарахування відсотків не тільки на початкову суму, але й на вже накопичені відсотки. Це значно прискорює зростання ваших інвестицій з часом.'
              }
            },
            {
              '@type': 'Question',
              name: currentLocale === 'en' ? 'How to use the calculator?' : 'Як використовувати калькулятор?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: currentLocale === 'en'
                  ? 'Enter the initial amount, regular contribution, interest rate, and investment period. Choose the frequency of contributions and the period unit. Enable or disable reinvestment as needed.'
                  : 'Введіть початкову суму, регулярний внесок, відсоткову ставку та період інвестування. Виберіть частоту внесків та одиницю виміру періоду. Увімкніть або вимкніть реінвестування за потреби.'
              }
            },
            {
              '@type': 'Question',
              name: currentLocale === 'en' ? 'How does reinvestment differ from regular interest calculation?' : 'Чим відрізняється реінвестування від звичайного нарахування відсотків?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: currentLocale === 'en'
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
          name: currentLocale === 'en' ? 'Investment Calculator' : 'Інвестиційний калькулятор',
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
    } catch (e) {
      // During prerendering, use default schema
      useHead({
        script: [
          {
            type: 'application/ld+json',
            innerHTML: JSON.stringify(defaultSchema)
          }
        ]
      })
    }
  }

  // Додаємо слухач для зміни маршруту
  if (process.client) {
    nuxtApp.hook('page:finish', () => {
      addSchemaOrg()
    })
  }

  // Виклик при ініціалізації
  addSchemaOrg()
})
