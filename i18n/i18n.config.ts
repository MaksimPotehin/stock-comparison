import { en, ua } from './messages'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  datetimeFormats: {
    en: {
      short: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }
    },
    ua: {
      short: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }
    }
  },

  messages: {
    en,
    ua
  }
}))
