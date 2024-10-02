<template>
  <div v-if="loading" class="text-center font-semibold text-gray-500">
    Loading...
  </div>
</template>

<script lang="ts" setup>

definePageMeta({
  pageLabel: 'Calendar',
  navOrder: 1
})

const loading = ref(true)

onMounted(() => {
  loading.value = false
})
</script>

<style scoped>
.hover-animation {
  transition: all 0.2s;
}
</style>
