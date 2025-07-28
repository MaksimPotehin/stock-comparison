// no import needed

export default defineNuxtPlugin(() => {
  // Simplified schema.org plugin
  const isClient = typeof window !== 'undefined'
  if (isClient) {
    try {
      // const route = useRoute()

      const baseSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Investment Calculator',
        applicationCategory: 'FinanceApplication',
        description: 'Free online investment calculator with compound interest',
        url: 'https://www.investing-space.tech'
      }

      useHead({
        script: [{
          type: 'application/ld+json',
          innerHTML: JSON.stringify(baseSchema)
        }]
      })
    } catch (error) {
      // Ignore schema errors on server
    }
  }
})
