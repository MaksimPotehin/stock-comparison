import { useRoute } from 'vue-router'

export default defineNuxtPlugin((nuxtApp) => {
  // Simplified schema.org plugin
  if (process.client) {
    try {
      const route = useRoute()
      
      const baseSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Investment Calculator',
        applicationCategory: 'FinanceApplication',
        description: 'Free online investment calculator with compound interest',
        url: 'https://stock-comparison-psi.vercel.app'
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
