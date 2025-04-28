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
              :to="item.routePath"
              class="hover:bg-gray-600/60 flex items-center px-4 py-2 text-sm rounded-md transition-all"
              active-class="bg-gray-600 text-white"
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
              <el-input v-model="search" />
            </div>

            <!-- Language switcher -->
            <LanguageSwitcher />
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
              :to="item.routePath"
              class="block px-3 py-2 text-[14px] hover:bg-gray-600/60 rounded-md transition-all"
              active-class="bg-gray-600 text-white"
              @click="isMobileMenuOpen = false"
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
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

// Default values in case i18n is not available during prerendering
let locale = ref('en')
let t = (key: string) => key
let switchLocalePath: any = () => '/'

// Try to get i18n and navigation utilities
try {
  const i18n = useI18n()
  locale = ref(i18n.locale.value)
  t = i18n.t

  switchLocalePath = useSwitchLocalePath()
} catch (e) {
  console.error('Failed to initialize i18n in layout during prerendering', e)
}

const search = ref()
const isMobileMenuOpen = ref(false)

// Navigation items - using direct paths instead of named routes to avoid type issues
const navigation = computed(() => {
  try {
    return [
      {
        label: t('navigation.calculator'),
        routePath: '/calculator'
      },
      {
        label: t('navigation.faq'),
        routePath: '/faq'
      }
    ]
  } catch (e) {
    console.error('Failed to compute navigation', e)
    return [
      {
        label: 'Calculator',
        routePath: '/calculator'
      },
      {
        label: 'FAQ',
        routePath: '/faq'
      }
    ]
  }
})

// Only watch on client side
if (process.client) {
  watch(() => locale.value, (newVal) => {
    // Type safety with any to avoid linter errors
    navigateTo(switchLocalePath(newVal))
  })
}
</script>
