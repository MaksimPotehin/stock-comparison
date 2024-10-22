<template>
  <div class="flex flex-col h-full overflow-hidden">
    <header class="gap-x-6 shadow-[0px_1px_0px_0px_#2e3448]">
      <div class="w-full max-w-[1440px] flex items-center m-auto px-5 py-3">
        <div class="logo w-12 h-12" />
        <div class="flex flex-grow gap-x-3">
          <NuxtLink
            v-for="item in navigation"
            :key="item.label"
            :to="{ name: item.routeName }"
            :class="[
              'hover:bg-gray-600/60 flex items-center px-4 py-2 text-sm rounded-md transition-all'
            ]"
            active-class="bg-gray-600 text-white"
          >
            {{ item.label }}
          </NuxtLink>
        </div>

        <client-only>
          <div class="flex gap-x-4 w-[300px]">
            <el-input v-model="search" />

            <div class="flex flex-col">
              <AppIconGbFlag
                class="w-4 hover:brightness-90 cursor-pointer transition-all"
                :class="locale === locales[0].code ? 'brightness-100' : 'brightness-50'"
                @click="locale = locales[0].code"
              />

              <AppIconUkraineFlag
                class="w-4 hover:brightness-90 cursor-pointer transition-all"
                :class="locale === locales[1].code ? 'brightness-100' : 'brightness-50'"
                @click="locale = locales[1].code"
              />
            </div>
          </div>
        </client-only>
      </div>
    </header>

    <div class="max-w-[1440px] w-full flex flex-col flex-grow overflow-auto m-auto p-5">
      <!-- MAIN -->
      <main class="flex w-full flex-grow overflow-hidden bg-gray-800 p-5 rounded-md">
        <slot />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { locale, locales, t } = useI18n()

const switchLocalePath = useSwitchLocalePath()
const localeRouteName = useLocaleRouteName()

const search = ref()

const navigation = computed(() => [
  { label: t('navigation.home'), routeName: localeRouteName('index') },
  { label: t('navigation.calculator'), routeName: localeRouteName('calculator') },
  { label: t('navigation.comparison'), routeName: localeRouteName('comparison') },
  { label: t('navigation.news'), routeName: localeRouteName('news') }
])

watch(() => locale.value, newVal => {
  navigateTo(switchLocalePath(newVal))
})
</script>
