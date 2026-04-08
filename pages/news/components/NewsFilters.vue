<template>
  <div class="flex items-center gap-x-1 flex-wrap">
    <button
      v-for="cat in CATEGORIES"
      :key="cat"
      class="px-3 py-1 rounded-lg text-sm font-medium transition-colors"
      :class="modelValue === cat
        ? 'bg-primary text-white'
        : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'"
      @click="$emit('update:modelValue', cat)"
    >
      {{ $t(`news.categories.${cat}`) }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { TNewsCategory } from '~/types/news'

defineProps<{
  modelValue: TNewsCategory
}>()

defineEmits<{
  'update:modelValue': [value: TNewsCategory]
}>()

const CATEGORIES: TNewsCategory[] = ['general', 'forex', 'crypto', 'merger']
</script>
