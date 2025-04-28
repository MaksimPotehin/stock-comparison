// plugins/finnhub.ts
import { defineNuxtPlugin } from '#app'
// import { ApiClient, DefaultApi } from 'finnhub'

export default defineNuxtPlugin(() => {
  // Mock finnhub client for SSR safety
  const finnhubClient = {
    // Add mock methods that would be available on the real client
    companyNews: async () => ({ data: [] }),
    earningsCalendar: async () => ({ data: [] }),
    marketNews: async () => ({ data: [] }),
    companyProfile2: async () => ({ data: {} })
  }

  return {
    provide: {
      finnhubClient
    }
  }
})
