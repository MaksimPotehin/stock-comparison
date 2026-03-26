// no import needed

export default defineNuxtPlugin(() => {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Investing Space',
    url: 'https://www.investing-space.tech',
    logo: 'https://www.investing-space.tech/favicon/android-chrome-512x512.png',
    description: 'Free online investment calculator for financial planning and compound interest calculations',
    sameAs: []
  }

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Investing Space',
    url: 'https://www.investing-space.tech',
    description: 'Free online investment calculator for compound interest and financial planning',
    inLanguage: ['en-US', 'uk-UA']
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(organizationSchema)
      },
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(webSiteSchema)
      }
    ]
  })
})
