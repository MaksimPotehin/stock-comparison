<template>
  <div class="flex flex-col h-full overflow-hidden">
    <header class="gap-x-6 shadow-[0px_1px_0px_0px_#2e3448]">
      <div class="w-full max-w-[1440px] flex items-center justify-between m-auto px-3 md:px-5 py-2 md:py-3">
        <!-- Logo block placeholder -->
        <div class="flex items-center gap-x-12">
          <!-- <div class="logo w-10 bg-gray-700/50 md:w-12 h-10 md:h-12" /> -->
          <!-- Center section - Desktop navigation -->

          <div class="hidden md:flex items-center gap-x-3 flex-grow justify-center">
            <NuxtLink
              v-for="item in navigation"
              :key="item.label"
              :to="{ name: item.routeName }"
              class="hover:bg-gray-600/60 flex items-center px-4 py-2 text-sm rounded-md transition-all"
              active-class="bg-gray-600 text-white"
              @click="handleNavigation(item.routeName)"
            >
              {{ item.label }}
            </NuxtLink>
          </div>
        </div>

        <!-- Right section -->
        <div class="flex items-center gap-x-4">
          <!-- Mobile menu button -->
          <button
            class="md:hidden p-2 text-white hover:bg-gray-600/60 rounded-md"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                v-if="!isMobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <client-only>
            <!-- Search - desktop only -->
            <div class="hidden md:block w-[300px]">
              <el-input
                v-model="search"
                @keyup.enter="handleSearch"
              />
            </div>

            <!-- Language switcher -->
            <div class="flex flex-col">
              <AppIconGbFlag
                class="w-4 hover:brightness-90 cursor-pointer transition-all"
                :class="locale === locales[0].code ? 'brightness-100' : 'brightness-50'"
                @click="switchLanguage(locales[0].code)"
              />
              <AppIconUkraineFlag
                class="w-4 hover:brightness-90 cursor-pointer transition-all"
                :class="locale === locales[1].code ? 'brightness-100' : 'brightness-50'"
                @click="switchLanguage(locales[1].code)"
              />
            </div>
          </client-only>
        </div>
      </div>

      <!-- Mobile navigation -->
      <div
        v-show="isMobileMenuOpen"
        class="md:hidden bg-gray-800 shadow-lg border-t border-gray-700"
      >
        <div class="px-3 py-2">
          <!-- Mobile navigation links -->
          <div class="flex flex-col gap-y-1">
            <NuxtLink
              v-for="item in navigation"
              :key="item.label"
              :to="{ name: item.routeName }"
              class="block px-3 py-2 text-[14px] hover:bg-gray-600/60 rounded-md transition-all"
              active-class="bg-gray-600 text-white"
              @click="handleNavigation(item.routeName)"
            >
              {{ item.label }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-[1440px] w-full flex flex-col flex-grow overflow-auto m-auto p-3 md:p-5">
      <!-- MAIN -->
      <main class="flex w-full flex-grow overflow-hidden bg-gray-800 p-3 md:p-5 rounded-md">
        <slot />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAnalytics } from '~/composables/useAnalytics'

const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localeRouteName = useLocaleRouteName()
const { trackLanguageSwitch, trackNavigation, trackEvent } = useAnalytics()

const search = ref()
const isMobileMenuOpen = ref(false)

const navigation = computed(() => [
  // { label: t('navigation.home'), routeName: localeRouteName('index') },
  { label: t('navigation.calculator'), routeName: localeRouteName('calculator') },
  // { label: t('navigation.comparison'), routeName: localeRouteName('comparison') },
  // { label: t('navigation.news'), routeName: localeRouteName('news') },
  { label: t('navigation.faq'), routeName: localeRouteName('faq') }
])

const handleNavigation = (routeName: string) => {
  trackNavigation(routeName)
  isMobileMenuOpen.value = false
}

const handleSearch = () => {
  if (search.value) {
    trackEvent('search', 'query', search.value)
  }
}

const switchLanguage = (newLocale: string) => {
  const currentLocale = locale.value
  locale.value = newLocale
  trackLanguageSwitch(currentLocale, newLocale)
  navigateTo(switchLocalePath(newLocale))
}

watch(() => locale.value, newVal => {
  switchLanguage(newVal)
})
</script>
