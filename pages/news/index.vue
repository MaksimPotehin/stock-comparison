<template>
  <div class="flex flex-col w-full gap-y-4 min-h-0 overflow-auto">
    <!-- Page heading -->
    <div>
      <h1 class="text-2xl font-semibold text-gradient">{{ $t('news.pageTitle') }}</h1>
      <p class="text-sb-muted text-sm mt-1">{{ $t('news.pageSubtitle') }}</p>
    </div>

    <!-- Filters row -->
    <div class="flex items-start justify-between gap-x-4 flex-wrap gap-y-3">
      <!-- Left: ticker search + active badges -->
      <div class="flex flex-col gap-y-2">
        <div v-if="activeSymbols.length < MAX_SYMBOLS" class="w-80">
          <StockSearch
            ref="searchRef"
            :placeholder="$t('stockComparison.searchPlaceholder')"
            @select="onSelectSymbol"
          />
        </div>
        <div v-if="activeSymbols.length" class="flex items-center gap-x-2 flex-wrap gap-y-1">
          <button
            v-for="(symbol, idx) in activeSymbols"
            :key="symbol"
            class="flex items-center gap-x-1 px-2 py-0.5 rounded-full text-xs font-medium transition-colors"
            :style="symbolBadgeStyle(idx)"
            @click="removeSymbol(idx)"
          >
            <span class="w-1.5 h-1.5 rounded-full inline-block" :style="{ backgroundColor: TICKER_COLORS[idx] }" />
            {{ symbol }}
            <span class="ml-0.5 text-current opacity-70">×</span>
          </button>
        </div>
      </div>

      <!-- Right: category filters -->
      <NewsFilters v-model="category" />
    </div>

    <!-- Loading -->
    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <NewsSkeleton v-for="i in 6" :key="i" />
    </div>

    <!-- Error -->
    <div
      v-else-if="error"
      class="flex flex-col items-center justify-center py-12 gap-y-3 text-center"
    >
      <p class="text-danger text-sm">{{ error.message }}</p>
      <button
        class="px-4 py-2 rounded-md text-sm bg-surface/50 text-sb-secondary hover:bg-surface transition-colors"
        @click="refresh()"
      >
        Retry
      </button>
    </div>

    <!-- Empty -->
    <div
      v-else-if="!visibleArticles.length"
      class="flex flex-col items-center justify-center py-12 gap-y-3 text-center"
    >
      <AppIconInfo class="w-10 h-10 text-sb-subtle" />
      <p class="text-sb-text font-semibold">{{ $t('news.noNews') }}</p>
      <p class="text-sb-muted text-sm max-w-xs">{{ $t('news.noNewsSubtitle') }}</p>
    </div>

    <!-- Articles grid -->
    <template v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <NewsCard
          v-for="article in visibleArticles"
          :key="article.id"
          :article="article"
          :active-symbols="activeSymbols"
          :ticker-colors="TICKER_COLORS"
        />
      </div>

      <!-- Load more -->
      <div v-if="hasMore" class="flex justify-center pt-2">
        <button
          class="btn-gradient-border text-sm"
          @click="loadMore"
        >
          {{ $t('news.loadMore') }}
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { IStockSearchResult } from '~/types/stock'
import type { TNewsCategory } from '~/types/news'
import { fetchNewsFeed } from './news.service'
import NewsFilters from './components/NewsFilters.vue'
import NewsSkeleton from './components/NewsSkeleton.vue'
import NewsCard from './components/NewsCard.vue'
import StockSearch from '~/pages/stock-comparison/components/StockSearch.vue'

useSeo('news')

const MAX_SYMBOLS = 5
// Brand chart color sequence (Snowball Analytics palette)
const TICKER_COLORS = ['#3699ff', '#1bc5bd', '#ffa800', '#f64e60', '#9a6afa'] as const

const route = useRoute()
const router = useRouter()
const { locale } = useI18n()
const { trackEvent } = useAnalytics()

const searchRef = ref<InstanceType<typeof StockSearch> | null>(null)

const category = ref<TNewsCategory>((route.query.category as TNewsCategory) || 'general')
const activeSymbols = ref<string[]>(
  ['s1', 's2', 's3', 's4', 's5']
    .map(k => route.query[k] as string)
    .filter(Boolean)
)

const { data: articles, pending, error, refresh } = await useAsyncData(
  'news-feed',
  () => fetchNewsFeed({ symbols: activeSymbols.value, category: category.value }),
  { watch: [activeSymbols, category] }
)

const PAGE_SIZE = 18
const visibleCount = ref(PAGE_SIZE)

const visibleArticles = computed(() => articles.value?.slice(0, visibleCount.value) ?? [])
const hasMore = computed(() => (articles.value?.length ?? 0) > visibleCount.value)

function loadMore () {
  visibleCount.value += PAGE_SIZE
}

watch([activeSymbols, category], () => {
  visibleCount.value = PAGE_SIZE
})

watch([activeSymbols, category], () => {
  const query: Record<string, string> = {}
  activeSymbols.value.forEach((s, i) => { query[`s${i + 1}`] = s })
  if (category.value !== 'general') query.category = category.value
  router.replace({ query })

  trackEvent('news', 'news_filter_change', {
    symbols: activeSymbols.value.join(','),
    category: category.value
  })
})

function onSelectSymbol (result: IStockSearchResult) {
  const symbol = result.symbol
  if (activeSymbols.value.includes(symbol) || activeSymbols.value.length >= MAX_SYMBOLS) return
  activeSymbols.value = [...activeSymbols.value, symbol]
  searchRef.value?.clear()
}

function removeSymbol (idx: number) {
  activeSymbols.value = activeSymbols.value.filter((_, i) => i !== idx)
}

function symbolBadgeStyle (idx: number) {
  const color = TICKER_COLORS[idx] ?? '#7e8299'
  return {
    backgroundColor: `${color}22`,
    color,
    border: `1px solid ${color}44`
  }
}

// Dynamic SEO for ticker-filtered pages
useHead(computed(() => {
  if (!activeSymbols.value.length) return {}
  const symbolsStr = activeSymbols.value.join(locale.value === 'ua' ? ', ' : ', ')
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
</script>
