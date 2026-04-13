<template>
  <div :class="['w-full', centered ? 'max-w-2xl mx-auto' : '']" :style="containerStyle">
    <el-input
      v-model="model"
      :placeholder="placeholder"
      :size="size"
      :clearable="clearable"
      class="app-search"
      @keyup.enter="emit('enter', model)"
    />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  placeholder?: string
  size?: 'default' | 'large' | 'small'
  clearable?: boolean
  centered?: boolean
  radius?: number
}>(), {
  placeholder: 'Search…',
  size: 'large',
  clearable: true,
  centered: false,
  radius: 8
})

const model = defineModel<string>({ default: '' })
const emit = defineEmits<{ (e: 'enter', val: string): void }>()

const containerStyle = computed(() => ({ '--app-search-radius': `${props.radius}px` }))
</script>

<style scoped>
.app-search :deep(.el-input__wrapper) {
  height: 50px;
  border-radius: var(--app-search-radius, 6px);
  box-shadow: none;
}
</style>
