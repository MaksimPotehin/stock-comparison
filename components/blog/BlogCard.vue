<template>
  <NuxtLink :to="to" class="block group">
    <article
      class="rounded-lg p-4 h-full border transition-colors bg-gray-600/80 border-gray-600 group-hover:bg-gray-600"
    >
      <h3 class="text-warning text-lg mb-2 line-clamp-2">{{ title }}</h3>
      <p class="text-white-400 text-sm line-clamp-3 mb-3">{{ excerpt }}</p>
      <div class="flex items-center gap-3 text-[12px] text-white-500">
        <span>{{ date }}</span>
      </div>
    </article>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ to: string; title: string; excerpt: string; date: string }>()
</script>
