<template>
  <div class="w-full h-full flex flex-col gap-6 md:gap-8 p-3 md:p-8 overflow-y-auto">
    <NuxtLink :to="localePath('/blog')" class="text-warning hover:underline text-sm">{{ $t('blog.back') }}</NuxtLink>

    <article class="prose prose-invert max-w-none">
      <h1 class="text-warning">{{ localized(post.title) }}</h1>
      <div class="text-[12px] text-white-500 mb-4">
        <span>{{ formatDate(post.publishedAt) }}</span>
        <span>·</span>
        <span>{{ post.readingTime }} {{ $t('blog.min') }}</span>
      </div>

      <p class="text-white-400 text-lg">{{ localized(post.excerpt) }}</p>

      <div class="mt-6 text-white-300 leading-7">
        <div v-html="localized(post.content)"></div>
      </div>
    </article>
  </div>
</template>

<script lang="ts" setup>
import type { IBlogPost } from '~/types/blog'
import { BLOG_POSTS } from '~/content/blog/posts'
import { useSeo } from '~/composables/useSeo'

const route = useRoute()
const { locale } = useI18n()
const localePath = useLocalePath()

const posts = ref<IBlogPost[]>(BLOG_POSTS)
const post = computed(() => posts.value.find(p => p.slug === route.params.slug) as IBlogPost)

const localized = (t: { en: string, ua: string }) => locale.value === 'ua' ? t.ua : t.en
const formatDate = (iso: string) => new Date(iso).toLocaleDateString(locale.value === 'ua' ? 'uk-UA' : 'en-US')

watchEffect(() => {
  useSeo('blog')
  if (!post.value) return
  const { locale } = useI18n()
  const currentLocale = locale.value === 'ua' ? 'ua' : 'en'
  useHead({
    title: post.value.title[currentLocale],
    meta: [
      { name: 'description', content: post.value.excerpt[currentLocale] },
      { property: 'og:title', content: post.value.title[currentLocale] },
      { property: 'og:description', content: post.value.excerpt[currentLocale] }
    ]
  })
})
</script>


