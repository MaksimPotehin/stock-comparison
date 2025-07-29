export const useStructuredData = () => {
  const { locale } = useI18n()
  
  const addFAQSchema = (faqItems: Array<{ question: string; answer: string }>) => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    }

    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(faqSchema)
        }
      ]
    })
  }

  const addCalculatorSchema = () => {
    const calculatorSchema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: locale.value === 'ua' ? 'Інвестиційний калькулятор' : 'Investment Calculator',
      description: locale.value === 'ua' 
        ? 'Безкоштовний онлайн калькулятор для розрахунку складних відсотків та планування інвестицій'
        : 'Free online calculator for compound interest calculation and investment planning',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web Browser',
      url: 'https://www.investing-space.tech/calculator',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      featureList: [
        'Compound interest calculation',
        'Investment planning',
        'Regular contribution modeling',
        'Interactive charts and tables',
        'Multiple time periods'
      ]
    }

    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(calculatorSchema)
        }
      ]
    })
  }

  return {
    addFAQSchema,
    addCalculatorSchema
  }
} 