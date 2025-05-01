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
        url: `https://investing-space.tech/${i18n.locale}/calculator`,
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
            name: i18n.locale === 'en' ? 'What is compound interest?' : 'Що таке складні відсотки?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: i18n.locale === 'en'
                ? 'Compound interest is interest calculated on the initial principal and also on the accumulated interest of previous periods.'
                : 'Складні відсотки - це відсотки, які нараховуються на початкову суму вкладу та на накопичені відсотки попередніх періодів.'
            }
          },
          {
            '@type': 'Question',
            name: i18n.locale === 'en' ? 'How to use the investment calculator?' : 'Як користуватися інвестиційним калькулятором?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: i18n.locale === 'en'
                ? 'Enter your initial investment, regular contributions, interest rate, and investment period to calculate potential returns.'
                : 'Введіть початкову суму інвестицій, регулярні внески, відсоткову ставку та період інвестування для розрахунку потенційного доходу.'
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

    // Add breadcrumbs schema
    const breadcrumbsSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@id': 'https://investing-space.tech',
            name: i18n.locale === 'en' ? 'Home' : 'Головна'
          }
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@id': `https://investing-space.tech${path}`,
            name: i18n.locale === 'en'
              ? (path.includes('/calculator') ? 'Calculator' : 'FAQ')
              : (path.includes('/calculator') ? 'Калькулятор' : 'Часті запитання')
          }
        }
      ]
    }

    // Add both schemas to the page
    useHead({
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(schema)
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify(breadcrumbsSchema)
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
