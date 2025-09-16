<template>
  <div class="flex flex-wrap gap-2">
    <span
      v-for="t in tags"
      :key="t"
      class="px-3 py-1.5 rounded-full text-[12px] cursor-pointer transition-colors border"
      :class="model?.includes(t) ? 'bg-warning text-gray-900 border-warning' : 'bg-gray-700 text-gray-300 border-gray-700 hover:bg-gray-700/80'"
      @click="toggle(t)"
    >{{ t }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ tags: string[] }>()
const model = defineModel<string[]>({ default: [] })

const toggle = (t: string) => {
  const i = model.value.indexOf(t)
  if (i >= 0) model.value.splice(i, 1)
  else model.value.push(t)
}
</script>


