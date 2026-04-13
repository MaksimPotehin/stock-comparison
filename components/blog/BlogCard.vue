<template>
  <NuxtLink :to="to" class="block group">
    <article
      class="flex flex-col justify-between rounded-lg p-4 h-full shadow-card
      transition-colors bg-card group-hover:bg-sb-hover"
      :class="featured ? 'brand-accent-border' : 'border border-sb-border'"
    >
      <div>
        <div v-if="featured" class="mb-2">
          <span class="brand-accent-badge">Featured</span>
        </div>
        <h3 class="text-primary text-lg mb-2 line-clamp-2">{{ title }}</h3>
        <p class="text-sb-muted text-sm line-clamp-3 mb-3">{{ excerpt }}</p>
      </div>

      <div class="flex items-center gap-3 text-[12px] text-sb-muted">
        <span>{{ date }}</span>
      </div>
    </article>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ to: string; title: string; excerpt: string; date: string; featured?: boolean }>()
</script>
