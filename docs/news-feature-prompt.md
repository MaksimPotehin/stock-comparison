# Завдання: Реалізація сторінки /news для investing-space.tech

## Контекст проекту

Nuxt 3 · Vue 3 Composition API · TypeScript · Tailwind CSS · Element Plus.
Білінгвальний сайт (EN/UA). i18n стратегія: `prefix_except_default` — EN без префіксу, UA через `/ua`.
Деплой на Vercel через SSR.

Перед початком обов'язково прочитай ці файли:
- `server/api/stock/history.get.ts` — патерн серверного роуту з in-memory кешем
- `pages/stock-comparison/stock.service.ts` — патерн сервісного шару
- `composables/useSeo.ts` — повна структура composable, щоб правильно додати `'news'`
- `nuxt.config.ts` — routeRules, runtimeConfig, sitemap
- `i18n/messages/en/index.ts` — як підключаються message-файли
- `i18n/messages/en/stock-comparison.messages.ts` — приклад структури message-файлу
- `layouts/default.vue` — масив navigation
- `pages/stock-comparison/index.vue` — куди додати посилання на /news
- `pages/stock-comparison/constants.ts` — STOCK_COLORS

---

## API: Finnhub

Зареєструватись на finnhub.io, отримати безкоштовний API ключ.

Використовувані endpoints:

**1. Ринкові новини** (без тікера):
```
GET https://finnhub.io/api/v1/news?category=general&token={KEY}
```
Категорії: `general` | `forex` | `crypto` | `merger`

**2. Новини компанії** (з тікером):
```
GET https://finnhub.io/api/v1/company-news?symbol=AAPL&from=2024-01-01&to=2024-12-31&token={KEY}
```
`from` і `to` — обов'язкові, формат `YYYY-MM-DD`.

**3. Sentiment компанії**:
```
GET https://finnhub.io/api/v1/news-sentiment?symbol=AAPL&token={KEY}
```
Повертає: `{ sentiment: { bullishPercent: number, bearishPercent: number }, companyNewsScore: number }`

Finnhub response для новин містить поле `image` (не `imageUrl`) — маппінг відбувається в серверному роуті.

Ліміт безкоштовного плану: 60 req/min.

---

## Порядок реалізації

1. `.env.local` + `runtimeConfig`
2. `/types/news.ts`
3. `/server/api/news/feed.get.ts`
4. `/server/api/news/sentiment.get.ts`
5. `/pages/news/news.service.ts`
6. i18n файли (EN + UA)
7. Компоненти: `NewsSkeleton.vue` → `NewsFilters.vue` → `NewsCard.vue`
8. `/pages/news/index.vue`
9. `nuxt.config.ts` (routeRules, runtimeConfig, sitemap, dns-prefetch)
10. `composables/useSeo.ts` (додати `'news'`)
11. `layouts/default.vue` (навігація)
12. `pages/stock-comparison/index.vue` (посилання)
13. `CLAUDE.md` (оновити структуру проекту)

---

## 1. Змінні середовища

**`.env.local`:**
```
NUXT_FINNHUB_API_KEY=your_key_here
```

**`nuxt.config.ts` → `runtimeConfig`** — додати поряд з `twelveDataApiKey`:
```ts
finnhubApiKey: process.env.NUXT_FINNHUB_API_KEY || '',
```

---

## 2. Типи — `/types/news.ts`

```ts
export interface INewsArticle {
  id: number
  headline: string
  summary: string
  source: string
  url: string
  imageUrl: string
  publishedAt: number  // unix timestamp (секунди)
  symbol: string       // порожній рядок для ринкових новин
  category: string
}

export interface INewsSentiment {
  symbol: string
  bullishPercent: number
  bearishPercent: number
  score: number
}

export type TNewsCategory = 'general' | 'forex' | 'crypto' | 'merger'
```

---

## 3. Серверний роут — `/server/api/news/feed.get.ts`

Патерн — точно такий самий як у `server/api/stock/history.get.ts`:
- `ICacheEntry<T>` interface
- `evictExpired()` функція
- `Map` для кешу

**Query params:**
- `symbols` — тікери через кому: `AAPL,MSFT` (опціонально)
- `category` — `TNewsCategory` (опціонально, default: `'general'`)

**Логіка:**
```ts
// Обчислення дат для company-news (обов'язковий параметр Finnhub)
const to = new Date().toISOString().slice(0, 10)  // YYYY-MM-DD
const from = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)

// Якщо symbols передані → Promise.all по кожному тікеру через company-news
// Якщо ні → один запит market news з category

// Маппінг Finnhub response → INewsArticle (поле image → imageUrl):
const article: INewsArticle = {
  id: item.id,
  headline: item.headline,
  summary: item.summary,
  source: item.source,
  url: item.url,
  imageUrl: item.image ?? '',   // Finnhub повертає "image", не "imageUrl"
  publishedAt: item.datetime,
  symbol: item.related ?? '',
  category: item.category
}

// Після об'єднання результатів:
// - Сортувати за publishedAt DESC
// - Видалити дублікати по id (Set або filter)
// - Повернути не більше 30 статей
```

**Cache key:**
- З тікерами: `symbols:AAPL,MSFT` (сортувати тікери алфавітно для консистентності)
- Без тікерів: `category:general`

**Cache TTL: 15 хвилин**

**Обробка помилок:**
- 400 якщо `category` невалідний
- 503 якщо Finnhub повернув 429
- 502 для інших upstream помилок
- Timeout: `AbortSignal.timeout(5000)`
- Якщо `finnhubApiKey` не заданий: `createError({ statusCode: 500, message: 'API key not configured' })`

---

## 4. Серверний роут — `/server/api/news/sentiment.get.ts`

Query params: `symbol` (required, валідувати на непорожність)

Один запит до Finnhub `/news-sentiment`. Cache TTL: **30 хвилин**.
Cache key: `sentiment:AAPL`

Маппінг:
```ts
const result: INewsSentiment = {
  symbol,
  bullishPercent: json.sentiment?.bullishPercent ?? 0,
  bearishPercent: json.sentiment?.bearishPercent ?? 0,
  score: json.companyNewsScore ?? 0
}
```

---

## 5. Сервісний шар — `/pages/news/news.service.ts`

```ts
import type { INewsArticle, INewsSentiment, TNewsCategory } from '~/types/news'

export async function fetchNewsFeed(params: {
  symbols?: string[]
  category?: TNewsCategory
}): Promise<INewsArticle[]> {
  const query: Record<string, string> = {}
  if (params.symbols?.length) query.symbols = params.symbols.join(',')
  if (params.category) query.category = params.category
  return $fetch('/api/news/feed', { query })
}

export async function fetchNewsSentiment(symbol: string): Promise<INewsSentiment> {
  return $fetch('/api/news/sentiment', { query: { symbol } })
}
```

Тільки ці дві функції. Ніяких прямих URL або `$fetch` в компонентах.

---

## 6. i18n

**Файл: `/i18n/messages/en/news.messages.ts`**

Назва файлу обов'язково з суфіксом `.messages.ts` — такий патерн у всіх існуючих файлах.

```ts
export const newsMessages = {
  pageTitle: 'Financial News',
  pageSubtitle: 'Market updates, company announcements, and economic events',
  categories: {
    general: 'General',
    forex: 'Forex',
    crypto: 'Crypto',
    merger: 'M&A'
  },
  loadMore: 'Load more',
  noNews: 'No news found',
  noNewsSubtitle: 'Try a different category or remove ticker filters',
  readNewsLink: 'Read news for {symbols} →',
  timeAgo: {
    justNow: 'just now',
    minutesAgo: '{n}m ago',
    hoursAgo: '{n}h ago',
    daysAgo: '{n}d ago'
  }
}
```

**Файл: `/i18n/messages/ua/news.messages.ts`** — ідіоматичний переклад, не калька.

**Підключення — `/i18n/messages/en/index.ts`:**
```ts
import { newsMessages as news } from './news.messages'
// додати в об'єкт en:
export const en = {
  // ...існуючі,
  news
}
```
Те саме для `/i18n/messages/ua/index.ts`.

**Навігація:** ключ `navigation.news` вже існує в обох мовах — нічого додавати не треба.

**`stock-comparison.messages.ts` (EN і UA)** — додати:
```ts
readNewsLink: 'Read news for {symbols} →'
// UA: ідіоматичний переклад
```

---

## 7. Компоненти — `/pages/news/components/`

### `NewsSkeleton.vue`

Анімований placeholder без props. Імітує форму `NewsCard`: прямокутник зображення + 3 рядки тексту. `animate-pulse`, `bg-gray-700/40`, `rounded-xl`.

### `NewsFilters.vue`

```
Props:  modelValue: TNewsCategory
Emits:  update:modelValue
```

Горизонтальний список pill-кнопок. Стиль — **ідентичний** period selector в `pages/stock-comparison/index.vue`:
- Активна: `bg-primary text-white`
- Неактивна: `text-gray-400 hover:text-gray-200 hover:bg-gray-700/50`
- Клас кнопки: `px-3 py-1 rounded-lg text-sm font-medium transition-colors`

### `NewsCard.vue`

```
Props: article: INewsArticle, activeSymbols?: string[]
```

Структура:
```
<a :href="article.url" target="_blank" rel="noopener noreferrer">
  ┌────────────────────────────────────┐
  │  Зображення (aspect-16/9)          │  ← <img> з imageUrl або placeholder
  │                                    │
  │  [AAPL]  Reuters  ·  2г тому      │  ← symbol badge + source + timeAgo
  │                                    │
  │  Заголовок (line-clamp-2)         │
  │                                    │
  │  Короткий опис (line-clamp-3)     │  ← text-gray-400, text-sm
  └────────────────────────────────────┘
</a>
```

**Symbol badge:** показувати тільки якщо `article.symbol` непорожній. Колір:
- Якщо `article.symbol` є в `activeSymbols` → брати відповідний колір з `STOCK_COLORS` (імпортувати з `pages/stock-comparison/constants.ts`)
- Інакше → `bg-gray-600 text-gray-300`

**Placeholder для відсутнього зображення:** сірий блок `bg-gray-700/40` з AppIcon (газета або схожа іконка з наявних у `assets/icons/`).

**timeAgo** — реалізувати без dayjs (плагін relativeTime не налаштований у проекті):
```ts
function timeAgo(unixSeconds: number): string {
  const diffMin = Math.floor((Date.now() - unixSeconds * 1000) / 60000)
  if (diffMin < 1) return t('news.timeAgo.justNow')
  if (diffMin < 60) return t('news.timeAgo.minutesAgo', { n: diffMin })
  const diffHrs = Math.floor(diffMin / 60)
  if (diffHrs < 24) return t('news.timeAgo.hoursAgo', { n: diffHrs })
  return t('news.timeAgo.daysAgo', { n: Math.floor(diffHrs / 24) })
}
```

**Стилі картки:** `rounded-xl bg-gray-700/20 overflow-hidden hover:bg-gray-700/40 transition-colors cursor-pointer`

**Structured data мікродата** — НЕ використовувати `itemscope/itemprop`. JSON-LD додається тільки один раз на рівні сторінки.

---

## 8. Сторінка — `/pages/news/index.vue`

### SSR data fetching (критично для SEO)

Дані мають бути в початковому HTML. Використовувати `useAsyncData` — **не** `onMounted`.

```ts
const route = useRoute()
const router = useRouter()
const { locale } = useI18n()
const localePath = useLocalePath()

// Зчитати початкові значення з URL
const category = ref<TNewsCategory>((route.query.category as TNewsCategory) || 'general')
const activeSymbols = ref<string[]>(
  [route.query.s1, route.query.s2].filter(Boolean) as string[]
)

// SSR-сумісний fetch — виконується і на сервері, і при навігації
const { data: articles, pending, error, refresh } = await useAsyncData(
  'news-feed',
  () => fetchNewsFeed({ symbols: activeSymbols.value, category: category.value }),
  { watch: [activeSymbols, category] }
)
```

### Клієнтська пагінація

```ts
const PAGE_SIZE = 9
const visibleCount = ref(PAGE_SIZE)

const visibleArticles = computed(() => articles.value?.slice(0, visibleCount.value) ?? [])
const hasMore = computed(() => (articles.value?.length ?? 0) > visibleCount.value)

function loadMore() {
  visibleCount.value += PAGE_SIZE
}

// Скидати пагінацію при зміні фільтрів
watch([activeSymbols, category], () => { visibleCount.value = PAGE_SIZE })
```

### URL sync

```ts
watch([activeSymbols, category], () => {
  router.replace({
    query: {
      ...(activeSymbols.value[0] && { s1: activeSymbols.value[0] }),
      ...(activeSymbols.value[1] && { s2: activeSymbols.value[1] }),
      ...(category.value !== 'general' && { category: category.value })
    }
  })
})
```

### Template layout

```
┌─────────────────────────────────────────────────────┐
│  H1: {{ $t('news.pageTitle') }}                     │
│  p: {{ $t('news.pageSubtitle') }}                   │
├─────────────────────────────────────────────────────┤
│  <NewsFilters v-model="category" />                 │
│                                                     │
│  Активні тікери (якщо є):                          │
│  [● AAPL ×]  [● MSFT ×]   ← кнопки видалення      │
├─────────────────────────────────────────────────────┤
│  Loading: <NewsSkeleton /> × 6 (grid)               │
│  Error:   повідомлення + кнопка retry               │
│  Empty:   іконка + текст noNews                     │
│  Data:    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
│           <NewsCard v-for="article in visibleArticles" />
│                                                     │
│  <button v-if="hasMore" @click="loadMore">          │
│    {{ $t('news.loadMore') }}                        │
│  </button>                                          │
└─────────────────────────────────────────────────────┘
```

---

## 9. SEO — `composables/useSeo.ts`

Додати `'news'` до union type і до всіх трьох об'єктів:

**Union type:**
```ts
export const useSeo = (pageKey: 'home' | 'calculator' | 'faq' | 'blog' | 'stock-comparison' | 'news') => {
```

**`titles` об'єкт — додати:**
```ts
news: {
  en: 'Financial News | Investing Space',
  ua: 'Фінансові новини | Investing Space'
}
```

**`descriptions` об'єкт — додати:**
```ts
news: {
  en: 'Latest stock market news, company updates, and financial events. Follow market trends and stay informed about your investments.',
  ua: 'Актуальні новини фондового ринку, оновлення компаній та фінансові події. Стежте за ринковими трендами та своїми інвестиціями.'
}
```

**`keywords`** — поточна структура спільна для всіх сторінок, не змінювати. Для `/news` SEO-ключові слова достатньо задаються через title і description.

**Structured data `@type`:** для `'news'` існуюча логіка поверне `'WebPage'` — прийнятно. Додатковий JSON-LD `CollectionPage` додати в `pages/news/index.vue`.

### Динамічний SEO в `pages/news/index.vue`

Після `useSeo('news')` додати:

```ts
useHead(computed(() => {
  if (!activeSymbols.value.length) return {}
  const symbolsStr = activeSymbols.value.join(locale.value === 'ua' ? ' та ' : ' and ')
  return {
    title: locale.value === 'ua'
      ? `Новини ${symbolsStr} | Investing Space`
      : `${symbolsStr} News | Investing Space`,
    meta: [
      {
        name: 'description',
        content: locale.value === 'ua'
          ? `Останні новини та оновлення для ${symbolsStr}. Актуальна фінансова аналітика.`
          : `Latest news and updates for ${symbolsStr}. Real-time financial news and analysis.`
      },
      { name: 'robots', content: 'noindex, follow' }
    ],
    link: [
      {
        rel: 'canonical',
        href: `https://www.investing-space.tech${locale.value === 'ua' ? '/ua' : ''}/news`
      }
    ]
  }
}))
```

### CollectionPage JSON-LD

```ts
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: locale.value === 'ua' ? 'Фінансові новини' : 'Financial News',
      description: locale.value === 'ua'
        ? 'Актуальні новини фондового ринку та компаній'
        : 'Latest stock market and company news',
      url: `https://www.investing-space.tech${locale.value === 'ua' ? '/ua' : ''}/news`,
      publisher: {
        '@type': 'Organization',
        name: 'Investing Space',
        url: 'https://www.investing-space.tech'
      }
    })
  }]
})
```

---

## 10. nuxt.config.ts — зміни

**routeRules:**
```ts
'/news': { ssr: true },
'/ua/news': { ssr: true }
```

**sitemap.urls:**
```ts
{ loc: '/news', changefreq: 'hourly', priority: 0.7 },
{ loc: '/ua/news', changefreq: 'hourly', priority: 0.7 }
```

**dns-prefetch:**
```ts
{ rel: 'dns-prefetch', href: 'https://finnhub.io' }
```

---

## 11. layouts/default.vue — навігація

Ключ `navigation.news` вже існує в обох мовах. Додати тільки новий пункт в масив `navigation` між `comparison` і `calculator`:

```ts
{
  label: t('navigation.news'),
  routeName: localePath('/news')
}
```

---

## 12. pages/stock-comparison/index.vue — посилання

Після блоку `StockMetricsTable` (всередині `v-if="stock1"` і `v-if="!isLoading && !loadError"`):

```html
<NuxtLink
  :to="newsPageLink"
  class="flex items-center gap-x-1 text-sm text-gray-400 hover:text-white transition-colors"
>
  {{ $t('stockComparison.readNewsLink', { symbols: newsLinkLabel }) }}
</NuxtLink>
```

```ts
const localePath = useLocalePath()

const newsPageLink = computed(() => {
  const query: Record<string, string> = {}
  if (stock1.value) query.s1 = stock1.value.symbol
  if (stock2.value) query.s2 = stock2.value.symbol
  return localePath({ path: '/news', query })
})

const newsLinkLabel = computed(() => {
  return [stock1.value?.symbol, stock2.value?.symbol].filter(Boolean).join(' & ')
})
```

`localePath` — обов'язково, бо на UA-локалі посилання має бути `/ua/news?s1=AAPL`.

---

## 13. Analytics

У `pages/news/index.vue`:
```ts
const { trackEvent } = useAnalytics()

watch([activeSymbols, category], () => {
  trackEvent('news_filter_change', {
    symbols: activeSymbols.value.join(','),
    category: category.value
  })
})
```

У `NewsCard.vue` при кліці:
```ts
trackEvent('news_article_click', {
  symbol: article.symbol,
  source: article.source,
  headline: article.headline.slice(0, 60)
})
```

---

## 14. CLAUDE.md — оновити

Додати в розділ Project Structure:
```
  news/
    index.vue                  # News page (SSR, dynamic)
    news.service.ts            # fetchNewsFeed(), fetchNewsSentiment()
    components/
      NewsCard.vue             # Article card with timeAgo + symbol badge
      NewsFilters.vue          # Category pill filters
      NewsSkeleton.vue         # Loading placeholder
```

Додати в таблицю Routing:
```
| `/news` | Financial news (SSR, dynamic) | no cache |
```

Додати в таблицю Environment Variables:
```
| `NUXT_FINNHUB_API_KEY` | `''` | Finnhub API key (server-side only) |
```

---

## Перевірка роботи

### Функціональна

- [ ] `npm run dev` запускається без помилок
- [ ] `/news` відкривається і показує статті
- [ ] `view-source:http://localhost:3000/news` — HTML містить заголовки статей (SSR працює)
- [ ] `/news?s1=AAPL` показує новини тільки по AAPL, page source містить контент
- [ ] `/news?s1=AAPL&s2=MSFT` показує новини по обох тікерах
- [ ] Категорія-фільтр перемикається, URL оновлюється, статті змінюються
- [ ] Клік `×` на тікер-бейджі видаляє фільтр і оновлює URL
- [ ] "Завантажити більше" показує ще 9 статей без нового API запиту (Network tab)
- [ ] Клік на картку відкриває статтю в новій вкладці
- [ ] Skeleton показується під час завантаження
- [ ] При помилці API показується повідомлення з кнопкою retry
- [ ] На `/stock-comparison` при обраному stock1 видно посилання на `/news`
- [ ] Посилання з `/ua/stock-comparison` веде на `/ua/news?s1=AAPL`
- [ ] `/ua/news` відкривається з українськими текстами
- [ ] Мовний перемикач на `/news` переходить на `/ua/news` зі збереженням query params

### Кеш

- [ ] Повторний запит тих самих параметрів < 15 хвилин не робить новий fetch до Finnhub
- [ ] Різні комбінації параметрів кешуються окремо

### TypeScript

- [ ] `npm run type-check` — 0 помилок
- [ ] `npm run lint` — 0 помилок

### SEO

- [ ] `<title>` на `/news` — "Financial News | Investing Space"
- [ ] `<title>` на `/news?s1=AAPL` — "AAPL News | Investing Space"
- [ ] На `/news?s1=AAPL` є `<meta name="robots" content="noindex, follow">`
- [ ] На `/news?s1=AAPL` canonical вказує на `https://www.investing-space.tech/news`
- [ ] `<link rel="alternate" hreflang="uk">` вказує на `/ua/news`
- [ ] JSON-LD `CollectionPage` присутній у `<head>`
- [ ] `NewsCard` НЕ має `itemscope/itemprop`

### Build

- [ ] `npm run build` — 0 помилок
- [ ] `/news` є в `sitemap.xml` з `changefreq="hourly"`
- [ ] `/ua/news` є в `sitemap.xml`

---

## Скіли для запуску після реалізації

**1. Одразу після написання коду:**
```
/simplify
```
Перевірить якість коду, зайві абстракції, можливості реюзу компонентів.

**2. Після успішного `npm run build`:**
```
/seo
```
Технічний SEO-аудит: canonical, hreflang, structured data, meta tags.

**3. Після `/seo`:**
```
/geo
```
Оптимізація для AI-пошуку — ChatGPT, Perplexity, Gemini.

---

## Чого НЕ робити

- Не використовувати `$fetch` напряму в компонентах — тільки через `news.service.ts`
- Не використовувати `onMounted` для початкового fetch — тільки `useAsyncData`
- Не вставляти `<svg>` в шаблони — тільки `AppIcon*` через unplugin-icons
- Не додавати мікродату (`itemscope/itemprop`) — тільки JSON-LD
- Не робити `prerender: true` для `/news` — контент динамічний
- Не оновлювати `i18n/i18n.config.ts` — оновлювати тільки `i18n/messages/*/index.ts`
- Не додавати `navigation.news` до translation файлів — він вже існує
- Не використовувати `dayjs` для `timeAgo` без налаштування плагіну — обчислювати вручну
