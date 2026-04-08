<template>
  <a
    :href="article.url"
    target="_blank"
    rel="noopener noreferrer"
    class="rounded-xl bg-gray-700/20 overflow-hidden hover:bg-gray-700/40 transition-colors cursor-pointer block"
    @click="handleClick"
  >
    <!-- Image -->
    <div class="aspect-video bg-gray-700/40 overflow-hidden">
      <img
        v-if="article.imageUrl"
        :src="article.imageUrl"
        :alt="article.headline"
        class="w-full h-full object-cover"
        loading="lazy"
      >
      <div v-else class="w-full h-full flex items-center justify-center">
        <AppIconInfo class="w-8 h-8 text-gray-600" />
      </div>
    </div>

    <!-- Content -->
    <div class="p-4 flex flex-col gap-y-2">
      <!-- Meta row -->
      <div class="flex items-center gap-x-2 text-xs text-gray-400 flex-wrap gap-y-1">
        <span
          v-if="article.symbol"
          class="px-1.5 py-0.5 rounded text-xs font-medium"
          :style="symbolStyle"
        >
          {{ article.symbol }}
        </span>
        <span>{{ article.source }}</span>
        <span>·</span>
        <span>{{ timeAgoText }}</span>
      </div>

      <!-- Headline -->
      <p class="text-white text-sm font-medium leading-snug line-clamp-2">
        {{ article.headline }}
      </p>

      <!-- Summary -->
      <p class="text-gray-400 text-sm line-clamp-3">
        {{ article.summary }}
      </p>
    </div>
  </a>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAnalytics } from '~/composables/useAnalytics'
import type { INewsArticle } from '~/types/news'

const props = defineProps<{
  article: INewsArticle
  activeSymbols?: string[]
  tickerColors?: readonly string[]
}>()

const { t } = useI18n()
const { trackEvent } = useAnalytics()

const symbolStyle = computed(() => {
  const idx = props.activeSymbols?.indexOf(props.article.symbol) ?? -1
  const colors = props.tickerColors
  if (idx >= 0 && colors && idx < colors.length) {
    const color = colors[idx]
    return {
      backgroundColor: `${color}22`,
      color,
      border: `1px solid ${color}44`
    }
  }
  return {
    backgroundColor: 'rgb(75 85 99 / 0.4)',
    color: 'rgb(209 213 219)'
  }
})

const timeAgoText = computed(() => {
  const diffMin = Math.floor((Date.now() - props.article.publishedAt * 1000) / 60000)
  if (diffMin < 1) return t('news.timeAgo.justNow')
  if (diffMin < 60) return t('news.timeAgo.minutesAgo', { n: diffMin })
  const diffHrs = Math.floor(diffMin / 60)
  if (diffHrs < 24) return t('news.timeAgo.hoursAgo', { n: diffHrs })
  return t('news.timeAgo.daysAgo', { n: Math.floor(diffHrs / 24) })
})

function handleClick () {
  trackEvent('news_article_click', {
    symbol: props.article.symbol,
    source: props.article.source,
    headline: props.article.headline.slice(0, 60)
  })
}
</script>
