<template>
  <div
    class="flex items-center gap-x-2 px-3 py-1.5 rounded text-sm"
    :style="{
      background: `${color}1e`,
      border: `1px solid ${color}4d`
    }"
  >
    <span class="font-mono font-semibold shrink-0" :style="{ color }">{{ symbol }}</span>
    <span class="text-sb-secondary truncate">{{ name }}</span>
    <button
      class="ml-auto shrink-0 text-sb-muted hover:text-sb-text transition-colors leading-none"
      :aria-label="`Remove ${symbol}`"
      @click="emit('remove')"
    >
      <AppIconClose class="w-3.5 h-3.5" />
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  symbol: string
  name: string
  color: string
}>()

const emit = defineEmits<{
  (e: 'remove'): void
}>()
</script>
