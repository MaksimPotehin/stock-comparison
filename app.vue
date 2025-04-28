<template>
  <ElConfigProvider
    :locale="localeConfig"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ElConfigProvider>
</template>

<script lang="ts" setup>
import type { TranslatePair } from 'element-plus/lib/locale'
import { ref, computed } from 'vue'

// Default values
const locale = ref('en')
const messagesValue = ref<Record<string, any>>({
  en: { el: {} },
  ua: { el: {} }
})

// Computed properties for template to avoid .value syntax
const localeConfig = computed(() => ({
  name: locale.value,
  el: messagesValue.value[locale.value || 'en']?.el as TranslatePair
}))

// Wrap in onMounted to ensure it runs only in browser context
if (process.client) {
  try {
    const i18n = useI18n()
    locale.value = i18n.locale.value
    messagesValue.value = i18n.messages.value as Record<string, any>
  } catch (e) {
    console.error('I18n not available', e)
  }
}
</script>
