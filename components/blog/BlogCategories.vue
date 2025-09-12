<template>
  <el-select
    v-model="model"
    multiple
    collapse-tags
    collapse-tags-tooltip
    class="w-full select-dark"
    :max-collapse-tags="2"
    :placeholder="placeholder"
    tag-type="danger"
    @change="$emit('change', model)"
  >
    <el-option
      v-for="opt in categoryOptions"
      :key="opt.value"
      :label="opt.label"
      :value="opt.value"
    />
  </el-select>
</template>

<script setup lang="ts">
import type { TBlogCategory } from '~/types/blog'

defineProps<{ placeholder?: string }>()
defineEmits<{ (e: 'change', val: (TBlogCategory | 'all')[] | TBlogCategory | 'all'): void }>()

const model = defineModel<TBlogCategory[] | 'all'>({ default: [] })
const { t } = useI18n()

type TCategoryOption = { value: TBlogCategory | 'all'; label: string }
const categoryOptions = computed<TCategoryOption[]>(() => [
  { value: 'all', label: t('blog.categories.all') as string },
  { value: 'calculator-guides', label: t('blog.categories.calculatorGuides') as string },
  { value: 'investment-basics', label: t('blog.categories.investmentBasics') as string },
  { value: 'financial-planning', label: t('blog.categories.financialPlanning') as string },
  { value: 'investment-tools', label: t('blog.categories.investmentTools') as string },
  { value: 'strategies-analysis', label: t('blog.categories.strategiesAnalysis') as string },
  { value: 'practical-tips', label: t('blog.categories.practicalTips') as string },
  { value: 'financial-education', label: t('blog.categories.financialEducation') as string }
])
</script>

<style scoped lang="scss">
.select-dark :deep(.el-select__placeholder) { @apply text-gray-700; }
.select-dark :deep(.el-select__selection .el-select__selected-item) { @apply text-black-800; }
.select-dark :deep(.el-select__tags .el-tag) { @apply bg-gray-700 border-gray-700 text-gray-400; }
</style>
