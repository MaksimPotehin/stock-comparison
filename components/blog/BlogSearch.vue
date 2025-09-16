<template>
  <AppSearch
    v-model="model"
    :placeholder="$t('blog.searchPlaceholder')"
    size="large"
    centered
  />
</template>

<script setup lang="ts">
import AppSearch from '~/components/AppSearch.vue'

const model = defineModel<string>({ default: '' })
</script>
