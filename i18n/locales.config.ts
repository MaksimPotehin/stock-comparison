export const localesConfig = {
  baseUrl: process.env.BASE_URL,
  strategy: 'prefix_except_default',

  locales: [
    {
      code: 'en',
      language: 'en-US',
      name: 'English'
    },
    {
      code: 'ua',
      language: 'uk-UA',
      name: 'Українська'
    }
  ],
  defaultLocale: 'en',
  fallbackLocale: 'en'
}
