<template>
  <aside class="w-full flex flex-col gap-4 md:top-6">
    <BlogCategories
      v-model="categoriesModel"
      :placeholder="$t('blog.categories.all') as string"
    />

    <BlogTags v-if="tags?.length" v-model="model.tags" :tags="tags" />
  </aside>
</template>

<script setup lang="ts">
import type { IBlogFilter, TBlogCategory } from '~/types/blog'
import BlogCategories from './BlogCategories.vue'
import BlogTags from './BlogTags.vue'

const props = defineProps<{ tags: string[] }>()
const model = defineModel<IBlogFilter>({
  default: { category: 'all', tags: [], search: '' }
})

// Adapter so BlogCategories always gets an array (or 'all')
const categoriesModel = computed<TBlogCategory[] | 'all'>({
  get: () => (Array.isArray(model.value.category)
    ? (model.value.category as TBlogCategory[])
    : model.value.category === 'all'
      ? 'all'
      : model.value.category
        ? [model.value.category as TBlogCategory]
        : []),
  set: (val) => {
    if (Array.isArray(val) && (val.length === 0 || val.includes('all' as any))) {
      model.value.category = 'all'
    } else {
      model.value.category = val
    }
  }
})

const { tags } = toRefs(props)
</script>

<style scoped>
.select-dark :deep(.el-select__placeholder) { @apply text-gray-500; }
.select-dark :deep(.el-select__selection .el-select__selected-item) { @apply text-black-800; }
.select-dark :deep(.el-select__tags .el-tag) { @apply bg-gray-700 border-gray-700 text-gray-200; }
</style>
