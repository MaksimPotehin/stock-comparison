interface IGeoResponse {
  country_code: string
}

const CACHED_COUNTRY_KEY = 'user_country'
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

export const useGeoLocale = () => {
  const { locale } = useI18n()

  const detectUserCountry = async (): Promise<string | null> => {
    // Check cache
    const nuxtApp = useNuxtApp()
    if (nuxtApp.$client) {
      const cached = localStorage.getItem(CACHED_COUNTRY_KEY)
      if (cached) {
        const { country, timestamp } = JSON.parse(cached)
        if (Date.now() - timestamp < CACHE_DURATION) {
          return country
        }
      }
    }

    try {
      // Use fast and reliable service
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3000)

      const response = await fetch('https://ipapi.co/json/', {
        signal: controller.signal,
        headers: {
          Accept: 'application/json'
        }
      })

      clearTimeout(timeoutId)

      if (!response.ok) throw new Error('API response not ok')

      const data: IGeoResponse = await response.json()
      const country = data.country_code

      // Save to cache
      const nuxtApp = useNuxtApp()
      if (nuxtApp.$client && country) {
        localStorage.setItem(CACHED_COUNTRY_KEY, JSON.stringify({
          country,
          timestamp: Date.now()
        }))
      }

      return country
    } catch (error) {
      console.warn('Geo detection failed:', error)
      return null
    }
  }

  const getPreferredLocale = async (): Promise<'ua' | 'en'> => {
    // 1. Try geolocation
    const country = await detectUserCountry()
    if (country === 'UA') return 'ua'

    // 2. Fallback to browser language
    const nuxtApp = useNuxtApp()
    if (nuxtApp.$client) {
      const browserLang = navigator.language.toLowerCase()
      if (browserLang.startsWith('uk') || browserLang.startsWith('ua')) {
        return 'ua'
      }
    }

    // 3. Default - English
    return 'en'
  }

  const initializeLocale = async () => {
    // Initialize only if not already set by user
    const nuxtApp = useNuxtApp()
    const hasUserPreference = nuxtApp.$client && localStorage.getItem('nuxt-i18n-lang')
    if (hasUserPreference) return

    const preferredLocale = await getPreferredLocale()

    // Change language only if it's different
    if (locale.value !== preferredLocale) {
      const switchLocalePath = useSwitchLocalePath()
      await navigateTo(switchLocalePath(preferredLocale))
    }
  }

  return {
    detectUserCountry,
    getPreferredLocale,
    initializeLocale
  }
}
