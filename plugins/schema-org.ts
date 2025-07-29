// no import needed

export default defineNuxtPlugin(() => {
  // Глобальні структуровані дані для організації
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Investing Space',
    url: 'https://www.investing-space.tech',
    logo: 'https://www.investing-space.tech/favicon/android-chrome-512x512.png',
    description: 'Free online investment calculator for financial planning and compound interest calculations',
    sameAs: []
  }

  // Хлібні крихти для кращої навігації
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.investing-space.tech'
      }
    ]
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(organizationSchema)
      },
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(breadcrumbSchema)
      }
    ]
  })
})
