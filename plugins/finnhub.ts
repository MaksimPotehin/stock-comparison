// plugins/finnhub.ts
import { defineNuxtPlugin } from '#app'
import { ApiClient, DefaultApi } from 'finnhub'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  // Ініціалізація клієнта Finnhub
  const apiClient = ApiClient.instance

  // Переконайтеся, що ключ аутентифікації існує
  const apiKeyAuth = apiClient.authentications.api_key

  if (!apiKeyAuth) {
    console.error('Authentication for API key is not defined.')
    return
  }

  // Призначення вашого API ключа
  apiKeyAuth.apiKey = config.public.finnhubApiKey // Використовуйте API ключ з конфігурації

  // Створення клієнта Finnhub
  const finnhubClient = new DefaultApi(apiClient) // Передайте apiClient в конструктор

  return {
    provide: {
      finnhubClient // Доступ до клієнта через this.$finnhubClient
    }
  }
})
