# Project: investing-space.tech

Bilingual (EN/UA) investment calculator and educational blog.

- **Site**: https://www.investing-space.tech
- **Stack**: Nuxt 3 · Vue 3 Composition API · TypeScript · Tailwind CSS · Element Plus
- **Deployment**: Vercel → `.output/public`

---

## Commands

```bash
npm run dev          # Dev server
npm run build        # Type-check + build
npm run build-only   # Build without type-check
npm run generate     # Static site generation
npm run lint         # ESLint auto-fix
npm run type-check   # Vue-tsc check
npm run preview      # Preview production build
```

---

## Project Structure

```
pages/
  calculator/
    index.vue                  # Main page — root / redirects here
    types.ts                   # Component-level types (IInvestmentParameters, IInvestmentResult)
    components/                # Co-located, NOT auto-routed
      CalculatorForm.vue
      CalculatorChart.vue
      CalculatorTable.vue
  stock-comparison/
    index.vue                  # Stock comparison page (dynamic, SSR, no prerender)
    stock.service.ts           # API calls: searchStocks(), fetchStockHistory()
    constants.ts               # STOCK_COLORS shared across chart + table
    components/                # Co-located, NOT auto-routed
      StockSearch.vue          # Search with autocomplete — wraps AppSearch + el-dropdown
      StockSearchField.vue     # StockSearch + StockBadge compound field
      StockBadge.vue           # Selected ticker badge with remove button
      StockComparisonChart.vue # Normalized % line chart (Chart.js), 1-2 stocks
      StockMetricsTable.vue    # Return%, volatility, max drawdown, high/low
  news/
    index.vue                  # News page (SSR, dynamic)
    news.service.ts            # fetchNewsFeed(), fetchNewsSentiment()
    components/
      NewsCard.vue             # Article card with timeAgo + symbol badge
      NewsFilters.vue          # Category pill filters
      NewsSkeleton.vue         # Loading placeholder
  blog/
    index.vue                  # Blog listing
    [slug].vue                 # Blog post detail
  faq.vue

components/                    # Auto-imported globally
  blog/                        # BlogCard, BlogSidebar, BlogPagination, BlogRelated, BlogCategories, BlogTags, BlogSearch
  TableModule.vue
  AdBlock.vue
  AppSearch.vue

composables/
  useSeo.ts                    # SEO for non-blog pages (calculator, faq, blog index)
  useBlogSeo.ts                # SEO for blog posts (article schema, pagination meta)
  useStructuredData.ts         # Schema.org generators (FAQ, WebApplication)
  useAnalytics.ts              # GA4 event tracking via window.gtag()
  useGeoLocale.ts              # Locale detection: ipapi.co → browser lang → default EN
  locale-router.ts             # Locale-aware navigation helpers
  filters.ts                   # Blog filtering logic
  form-config.ts               # Element Plus form utilities and validation rules

utils/
  investment-calculator.ts     # Core: simulateInvestment() — see section below
  markdown.ts                  # Markdown parsing

types/                         # App-level types (shared across features)
  blog.ts                      # IBlogPost, IBlogLocalizedText, IBlogFilter, IBlogPagination
  investment.ts                # IInvestmentParams, IInvestmentResult (app-level)
  stock.ts                     # IStockSearchResult, IStockHistoricalPoint, IStockComparisonData, TStockPeriod
  news.ts                      # INewsArticle, INewsSentiment, TNewsCategory
  enums.ts                     # EFrequency, ETimeUnit, etc.

content/
  blog/posts.ts                # ALL blog posts — hardcoded bilingual array (not CMS/filesystem)

server/
  routes/rss.xml.get.ts        # RSS feed (English only)
  api/stock/
    search.get.ts              # Proxy → Twelve Data /symbol_search (in-memory cache 60min)
    history.get.ts             # Proxy → Twelve Data /time_series (in-memory cache 10min)
  api/news/
    feed.get.ts                # Proxy → Finnhub market/company news (in-memory cache 15min)
    sentiment.get.ts           # Proxy → Finnhub news-sentiment (in-memory cache 30min)

plugins/
  schema-org.ts                # Global Organization + Breadcrumb Schema.org on mount
  gsc-verification.client.ts   # Google Search Console meta tag
  global-prototypes.plugin.ts  # Reserved for global prototypes (currently empty)

i18n/
  messages/en/                 # English translation files
  messages/ua/                 # Ukrainian translation files
  locales.config.ts            # Locale definitions

assets/
  styles/main.scss             # Global styles entry point
  styles/variables/colors.scss # SCSS color variables
  styles/element-reset/        # Element Plus component overrides
  icons/                       # SVG icons (gb-flag, ukraine-flag)
```

---

## Routing & i18n

| Route | Description | Cache |
|-------|-------------|-------|
| `/` | Redirect → `/calculator` | — |
| `/calculator` | Calculator (prerendered) | 1 year |
| `/stock-comparison` | Stock comparison (SSR, dynamic) | no cache |
| `/news` | Financial news (SSR, dynamic) | no cache |
| `/blog` | Blog listing (prerendered) | 1 day |
| `/blog/[slug]` | Blog post detail | 1 day |
| `/faq` | FAQ (prerendered) | 1 year |
| `/ua/*` | Ukrainian versions of all above | same |

**i18n strategy**: `prefix_except_default` — English is default (no prefix), Ukrainian uses `/ua`.
**Locale detection order**: ipapi.co (3s timeout, 24h localStorage cache) → browser language → EN default.
**Persistence**: `nuxt-i18n-lang` (localStorage) + `i18n_redirected` (cookie).

---

## Language & Copy Guidelines

All user-facing text must sound **natural and idiomatic** for its target language — not like a translation.

- **EN**: write for a native English speaker; avoid literal translations from Ukrainian
- **UA**: write idiomatic Ukrainian; avoid calques and sentence structures copied from English
- Applies to: page titles, meta descriptions, UI strings, blog content, structured data labels
- When in doubt, prefer shorter natural phrasing over literal accuracy

---

## Naming Conventions (ESLint enforced)

```ts
interface IBlogPost { ... }     // I prefix for interfaces
type TTimeUnit = 'week' | ...   // T prefix for type aliases
enum EFrequency { ... }         // E prefix for enums
```

- Components in templates: **PascalCase** (`<BlogCard />`, not `<blog-card>`)
- Interface members: **no trailing commas** in multiline (`@typescript-eslint/member-delimiter-style`)
- Max line length: **120 characters**
- Auto-generated `.d.ts` files are excluded from linting (`dts/*.d.ts`)

---

## Type System

Two levels of types — do not mix them:

| Location | Purpose | Example |
|----------|---------|---------|
| `types/` | App-wide shared types | `IInvestmentParams` in `types/investment.ts` |
| `pages/calculator/types.ts` | Component-local types | `IInvestmentParameters` used only by calculator components |

> `IInvestmentResult` exists in **both** — the calculator page uses its own local version.

---

## Calculator Algorithm (`utils/investment-calculator.ts`)

`simulateInvestment(params)` runs a **week-by-week simulation**:

- All durations converted to weeks: **4 weeks = 1 month, 52 weeks = 1 year** (approximation)
- Annual rate → weekly rate: `weeklyRate = annualRate / 52`
- Contributions added at configured frequency (weekly/monthly/yearly)
- Reinvestment applied at configured interval
- Results binned into display periods (weeks/months/years)

**Accuracy note**: 4-week months cause ~0.05% rounding drift vs. calendar months. This is intentional for simplicity.

---

## SEO Pattern

Use the correct composable depending on the page type:

```ts
// For calculator, faq, blog index — in setup():
useSeo({ title, description, keywords, canonicalPath })

// For individual blog posts — in setup():
useBlogSeo(post, locale)

// For structured data (FAQ schema, WebApplication):
useStructuredData()
```

- All composables use `useHead()` internally and are reactive via `watchEffect`
- Open Graph, Twitter cards, hreflang, and canonical URLs are handled automatically
- Global Organization schema is injected by `plugins/schema-org.ts` on mount

**Analytics** (`useAnalytics.ts`) wraps `window.gtag()`:
```ts
const { trackEvent } = useAnalytics()
trackEvent('calculator_submit', { duration, amount, rate })
```
GA ID: `G-BK379KJZQW` (configured in `nuxt.config.ts` head scripts).

---

## Adding a Blog Post

All posts live in `content/blog/posts.ts` as a typed array. Each post must follow `IBlogPost`:

```ts
{
  id: 'unique-id',
  slug: 'url-friendly-slug',
  category: 'investment-basics',      // must match existing categories
  tags: ['tag1', 'tag2'],
  author: 'Author Name',
  publishedAt: '2026-01-15',          // ISO date
  readingTime: 5,                     // minutes
  featured: false,
  en: {
    title: 'English Title',
    excerpt: 'Short description...',
    content: '<p>HTML content...</p>',
    metaTitle: 'SEO Title',
    metaDescription: 'SEO description',
    keywords: ['keyword1'],
  },
  ua: { /* same structure in Ukrainian */ },
}
```

After adding a post, the sitemap and RSS feed update automatically on next build.
**Note**: RSS feed only includes English content.

---

## Adding a New Page

Checklist for new Nuxt pages:

1. Create `pages/your-page.vue` (auto-routed)
2. Call `useSeo(...)` in `setup()` for meta tags
3. Add prerender rule in `nuxt.config.ts` → `routeRules`
4. Add i18n translations to `i18n/messages/en/` and `i18n/messages/ua/`
5. Add to sitemap config in `nuxt.config.ts` if needed
6. Add navigation link in `layouts/default.vue`

---

## Service Layer (enforced)

All API calls (`$fetch`, `useFetch`) must live in a **service file**, never directly in components or pages.

- Place services co-located with the feature: `pages/stock-comparison/stock.service.ts`
- Export plain async functions: `export async function searchStocks(q: string): Promise<...>`
- Components only call service functions — they never construct API URLs or call `$fetch` directly

---

## Caching & Cache Invalidation

Pages are prerendered at build time and cached on Vercel's CDN:
- **1 year** cache: `/calculator`, `/faq`, `/ua/*`
- **1 day** cache: `/blog/*`

To invalidate cache after content updates: **redeploy** (triggers new prerender + CDN purge).
There is no runtime cache invalidation — all updates require a new deployment.

---

## Environment Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `NUXT_PUBLIC_SITE_URL` | `https://www.investing-space.tech` | Base URL for sitemap, canonical, OG |
| `NUXT_PUBLIC_GSC_VERIFICATION` | `''` | Google Search Console meta content |
| `NUXT_TWELVE_DATA_API_KEY` | `''` | Twelve Data API key (server-side only, add to `.env.local`) |
| `NUXT_FINNHUB_API_KEY` | `''` | Finnhub API key (server-side only, add to `.env.local`) |
| `VERCEL` | auto-detected | Switches Nitro preset to `'vercel'` |

---

## Service Layer (enforced)

All API calls (`$fetch`, `useFetch`) must live in a **service file**, never directly in components or pages.

- Place services co-located with the feature: `pages/stock-comparison/stock.service.ts`
- Export plain async functions: `export async function searchStocks(q: string): Promise<...>`
- Components only call service functions — they never construct API URLs or call `$fetch` directly

---

## Component Reuse Rules (enforced)

**Before creating any UI element — search first:**

1. **Icons**: always use the unplugin-icons system via `AppIcon*` naming (e.g. `AppIconGbFlag`). SVG files live in `assets/icons/`. **Never** put raw `<svg>` blocks or unicode symbols (✕, →) directly in templates.
2. **Existing components**: check `components/` (auto-imported globally) and the page's own `components/` folder before writing new markup. Key reusables: `AppSearch`, `TableModule`, `AdBlock`.
3. **Repeated blocks**: if the same UI block appears more than once in a template, extract it into a component immediately — even within the same page's `components/` folder.
4. **Shared constants**: colors, z-indexes, or other values used in multiple files go into a shared constants file — never hardcode the same value in two places.

---

## CSS & Styling

- **Tailwind** for utility classes; config in `tailwind.config.ts`
- **Element Plus** component overrides in `assets/styles/element-reset/`
- Tailwind color tokens (`primary`, `success`, etc.) map to CSS variables (`var(--color-primary)`) — these are defined/overridden via Element Plus theming in SCSS
- **Do not** use inline styles; prefer Tailwind utilities or SCSS classes

---

## Testing

**No test suite exists.** No testing framework is configured.
When adding tests, consider Vitest (compatible with Nuxt 3 + Vue Test Utils).

---

## Updating This File

Update CLAUDE.md after any of the following:
- New pages, routes, or major components added
- Dependencies added or removed
- Naming conventions or architectural decisions changed
- New environment variables introduced
- Deployment or caching strategy changes
