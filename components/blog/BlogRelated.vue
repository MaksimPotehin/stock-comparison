<template>
  <div class="mt-10">
    <h2 class="text-sb-text text-xl mb-4">{{ $t('blog.related') }}</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <BlogCard
        v-for="p in items"
        :key="p.slug"
        :to="localePath(`/blog/${p.slug}`)"
        :title="localized(p.title)"
        :excerpt="localized(p.excerpt)"
        :date="formatDate(p.publishedAt)"
        :featured="p.featured"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BlogCard from './BlogCard.vue'
import type { IBlogPost } from '~/types/blog'

defineProps<{ items: IBlogPost[] }>()

const { locale } = useI18n()
const localePath = useLocalePath()
const localized = (t: { en: string; ua: string }) => locale.value === 'ua' ? t.ua : t.en
const formatDate = (iso: string) => new Date(iso).toLocaleDateString(locale.value === 'ua' ? 'uk-UA' : 'en-US')
</script>
