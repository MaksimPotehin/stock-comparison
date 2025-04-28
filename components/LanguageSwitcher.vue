<template>
  <el-dropdown @command="switchLanguage">
    <el-button type="primary" class="flex items-center gap-2">
      <span>{{ currentLocale.toUpperCase() }}</span>
      <el-icon><ArrowDown /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="lang in ['en', 'ua']" :key="lang" :command="lang">
          {{ lang.toUpperCase() }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAnalytics } from '~/composables/useAnalytics'
import { ArrowDown } from '@element-plus/icons-vue'
import { useSwitchLocalePath } from '#i18n'

const { locale } = useI18n()
const { trackLanguageSwitch } = useAnalytics()
const switchLocalePath = useSwitchLocalePath()

const currentLocale = computed(() => locale.value)

const switchLanguage = (newLocale: string) => {
  const currentLocale = locale.value
  locale.value = newLocale
  trackLanguageSwitch(currentLocale, newLocale)
  navigateTo(switchLocalePath(newLocale))
}
</script>
