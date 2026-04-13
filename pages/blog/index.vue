<template>
  <div class="w-full h-full flex flex-col gap-6 md:gap-8 overflow-y-auto">
    <div class="flex flex-col gap-3">
      <h1 class="text-gradient text-2xl font-semibold">{{ $t('blog.title') }}</h1>
      <p class="text-sb-secondary">{{ $t('blog.description') }}</p>
    </div>

    <BlogSearch v-model="filters.search" />

    <div class="flex flex-col md:flex-row gap-6">
      <div class="w-full md:w-72 shrink-0 md:border-l md:border-sb-border md:pl-6 order-1 md:order-2">
        <BlogSidebar v-model="filters" :tags="allTags" />
      </div>
      <div class="flex-1 order-2 md:order-1">
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <BlogCard
            v-for="post in pagedPosts"
            :key="post.id"
            :to="localizedPostLink(post)"
            :title="localized(post.title)"
            :excerpt="localized(post.excerpt)"
            :date="formatDate(post.publishedAt)"
            :featured="post.featured"
          />
        </div>
        <p v-if="filteredPosts.length === 0" class="text-sb-secondary text-center py-12">
          {{ $t('blog.noResults') }}
        </p>
      </div>
    </div>

    <div class="mt-auto flex justify-center">
      <BlogPagination
        :page="pagination.page"
        :limit="pagination.limit"
        :total="filteredPosts.length"
        @update:page="onPageChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TBlogCategory, IBlogPost } from '~/types/blog'
import { BLOG_POSTS } from '~/content/blog/posts'
import { useBlogSeo } from '~/composables/useBlogSeo'
import BlogSearch from '~/components/blog/BlogSearch.vue'
import BlogCard from '~/components/blog/BlogCard.vue'
import BlogSidebar from '~/components/blog/BlogSidebar.vue'
import BlogPagination from '~/components/blog/BlogPagination.vue'

// Remove generic blog SEO to prevent duplication; handled by useBlogSeo

const { locale } = useI18n()
const localePath = useLocalePath()

const filters = reactive<{ category: TBlogCategory | 'all'; tags: string[]; search: string }>({
  category: 'all',
  tags: [],
  search: ''
})

const pagination = reactive({
  page: 1,
  limit: 9
})

const posts = ref<IBlogPost[]>(BLOG_POSTS)
const allTags = computed(() => Array.from(new Set(posts.value.flatMap(p => p.tags))).sort())

const localized = (t: { en: string; ua: string }) => (locale.value === 'ua' ? t.ua : t.en)

const formatDate = (iso: string) => new Date(iso).toLocaleDateString(locale.value === 'ua' ? 'uk-UA' : 'en-US')

const filteredPosts = computed(() => {
  const search = (filters.search || '').toLowerCase()
  return posts.value.filter(p => {
    const categoryIsAll = filters.category === 'all'
    const categoryIsEmptyArray = Array.isArray(filters.category) && (filters.category as any[]).length === 0
    const categoryMatches = Array.isArray(filters.category)
      ? (filters.category as any).includes(p.category)
      : p.category === filters.category
    const matchesCategory = categoryIsAll || categoryIsEmptyArray || categoryMatches
    const title = localized(p.title).toLowerCase()
    const excerpt = localized(p.excerpt).toLowerCase()
    const matchesSearch = !search || title.includes(search) || excerpt.includes(search)
    const matchesTags = !filters.tags.length || filters.tags.every(t => p.tags.includes(t))
    return matchesCategory && matchesSearch && matchesTags
  })
})

const pagedPosts = computed(() => {
  const start = (pagination.page - 1) * pagination.limit
  return filteredPosts.value.slice(start, start + pagination.limit)
})

const onPageChange = (page: number) => {
  pagination.page = page
  if (import.meta.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
watch(() => [filters.search, filters.category, filters.tags.join(',')], () => {
  pagination.page = 1
})

const localizedPostLink = (post: IBlogPost) => localePath(`/blog/${post.slug}`)
const { setupBlogIndexSeo } = useBlogSeo()
setupBlogIndexSeo(filteredPosts, pagedPosts, pagination)
</script>
