<template>
  <div ref="scrollContainer" class="w-full h-full flex flex-col gap-6 md:gap-8 p-3 md:p-8 overflow-y-auto">
    <!-- Reading progress bar -->
    <div
      class="fixed left-0 top-0 h-2 bg-warning z-50 transition-[width,opacity] duration-200"
      :style="{ width: progress + '%', opacity: progress > 5 ? 1 : 0 }"
    />

    <NuxtLink :to="localePath('/blog')" class="text-warning hover:underline text-sm">{{ $t('blog.back') }}</NuxtLink>

    <article v-if="post" class="prose prose-invert max-w-3xl mx-auto article-content">
      <h1 class="text-warning mb-2">{{ localized(post.title) }}</h1>
      <div class="flex flex-wrap items-center gap-2 text-[12px] text-white-400 mb-3">
        <span>{{ formatDate(post.publishedAt) }}</span>
        <template v-if="post.tags?.length">
          <span class="mx-1">·</span>
          <span
            v-for="t in post.tags"
            :key="t"
            class="px-2 py-0.5 rounded-full bg-gray-700/70 text-gray-200 border
             border-gray-700 hover:bg-gray-600/70 transition-colors"
          >
            {{ t }}
          </span>
        </template>
      </div>

      <div class="mt-6 text-white-300 leading-8">
        <div v-html="renderedHtml" />
      </div>
    </article>

    <BlogRelated v-if="related.length" :items="related" />
  </div>
</template>

<script lang="ts" setup>
import type { IBlogPost } from '~/types/blog'
import BlogRelated from '~/components/blog/BlogRelated.vue'
import { BLOG_POSTS } from '~/content/blog/posts'
import { md } from '~/utils/markdown'
import { useBlogSeo } from '~/composables/useBlogSeo'

const route = useRoute()
const { locale } = useI18n()
const localePath = useLocalePath()

const posts = ref<IBlogPost[]>(BLOG_POSTS)
const slugParam = computed(() => String((route.params as any).slug || ''))
const post = computed(() => posts.value.find(p => p.slug === slugParam.value) as IBlogPost)
const related = computed(() => {
  const current = post.value as IBlogPost | undefined
  if (!current) return [] as IBlogPost[]
  const sameCategory = posts.value.filter((p) => p.slug !== current.slug && p.category === current.category)
  return sameCategory.slice(0, 3)
})

const localized = (t: { en: string; ua: string }) => (locale.value === 'ua' ? t.ua : t.en)
const formatDate = (iso: string) => new Date(iso).toLocaleDateString(locale.value === 'ua' ? 'uk-UA' : 'en-US')

const scrollContainer = ref<HTMLElement | null>(null)
const progress = ref(0)
const renderedHtml = ref('')

function slugify (text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u0400-\u04FF\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

onMounted(() => {
  const container = scrollContainer.value!
  const onScroll = () => {
    const total = (container.scrollHeight - container.clientHeight) || 1
    progress.value = Math.min(100, Math.max(0, (container.scrollTop / total) * 100))
  }
  container.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  onBeforeUnmount(() => container.removeEventListener('scroll', onScroll))

  // Render markdown content
  watchEffect(() => {
    if (!post.value) return
    const raw = localized(post.value.content)
    const html = md.render(raw)
    const tmp = document.createElement('div')
    tmp.innerHTML = html
    Array.from(tmp.querySelectorAll('h2')).forEach((h) => {
      const el = h as HTMLElement
      const id = el.id || slugify(el.textContent || '')
      el.id = id
    })
    renderedHtml.value = tmp.innerHTML
  })
})

const { setupBlogPostSeo } = useBlogSeo()
setupBlogPostSeo(post)
</script>
