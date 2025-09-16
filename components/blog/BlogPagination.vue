<template>
  <div class="flex items-center justify-center gap-2">
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="page"
      :page-size="limit"
      :total="total"
      @current-change="$emit('update:page', $event)"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{ page: number, limit: number, total: number }>()
defineEmits<{ (e: 'update:page', v: number): void }>()
</script>


