<template>
  <div class="w-full h-full flex flex-col gap-6 md:gap-8 p-3 md:p-8 overflow-y-auto">
    <!-- Header section with CTA -->
    <div class="flex flex-col gap-4 md:gap-6">
      <div class="flex flex-col gap-3 md:gap-4">
        <h1 class="text-warning text-xl md:text-2xl">{{ $t('faq.title') }}</h1>
        <p class="text-white-400 text-[14px] md:text-base leading-6 md:leading-7">{{ $t('faq.description') }}</p>
      </div>

      <NuxtLink
        :to="localePath('/calculator')"
        class="self-start flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-warning text-gray-900
              rounded-lg hover:bg-warning/90 transition-colors font-medium text-[14px] md:text-base"
      >
        <span>{{ $t('faq.startCalculating') }}</span>
        <svg class="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </NuxtLink>
    </div>

    <!-- Quick Tips Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
      <div class="p-3 md:p-6 bg-gray-800/50 rounded-lg flex items-start gap-3 md:gap-4">
        <div class="p-2 md:p-3 bg-warning/10 rounded-lg">
          <svg
            class="w-5 h-5 md:w-6 md:h-6 text-warning"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M12 2v20M2 12h20" />
          </svg>
        </div>
        <div>
          <h3 class="text-warning mb-2 text-base md:text-lg">{{ $t('faq.tips.compound.title') }}</h3>
          <p class="text-white-400 text-[14px] md:text-base">{{ $t('faq.tips.compound.description') }}</p>
        </div>
      </div>

      <div class="p-3 md:p-6 bg-gray-800/50 rounded-lg flex items-start gap-3 md:gap-4">
        <div class="p-2 md:p-3 bg-warning/10 rounded-lg">
          <svg
            class="w-5 h-5 md:w-6 md:h-6 text-warning"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M12 8v4M12 16h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 class="text-warning mb-2 text-base md:text-lg">{{ $t('faq.tips.early.title') }}</h3>
          <p class="text-white-400 text-[14px] md:text-base">{{ $t('faq.tips.early.description') }}</p>
        </div>
      </div>

      <div class="p-3 md:p-6 bg-gray-800/50 rounded-lg flex items-start gap-3 md:gap-4">
        <div class="p-2 md:p-3 bg-warning/10 rounded-lg">
          <svg
            class="w-5 h-5 md:w-6 md:h-6 text-warning"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
        <div>
          <h3 class="text-warning mb-2 text-base md:text-lg">{{ $t('faq.tips.consistent.title') }}</h3>
          <p class="text-white-400 text-[14px] md:text-base">{{ $t('faq.tips.consistent.description') }}</p>
        </div>
      </div>

      <div class="p-3 md:p-6 bg-gray-800/50 rounded-lg flex items-start gap-3 md:gap-4">
        <div class="p-2 md:p-3 bg-warning/10 rounded-lg">
          <svg
            class="w-5 h-5 md:w-6 md:h-6 text-warning"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012
              2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <div>
          <h3 class="text-warning mb-2 text-base md:text-lg">{{ $t('faq.tips.diversify.title') }}</h3>
          <p class="text-white-400 text-[14px] md:text-base">{{ $t('faq.tips.diversify.description') }}</p>
        </div>
      </div>
    </div>

    <!-- TODO: Implement ads -->
    <!-- <AdBlock
      adClient="ca-pub-XXXXXXXXXXXXXXXX"
      adSlot="XXXXXXXXXX"
      format="horizontal"
    /> -->

    <!-- FAQ Accordion -->
    <div class="flex flex-col gap-3 md:gap-4">
      <div
        v-for="(item, index) in faqItems"
        :key="index"
        class="bg-gray-800 rounded-lg overflow-hidden"
      >
        <button
          class="w-full flex justify-between items-center p-3 md:p-6 text-left hover:bg-gray-700/50 transition-colors"
          @click="item.isOpen = !item.isOpen"
        >
          <h2 class="text-warning text-base md:text-xl">{{ $t(item.question) }}</h2>
          <svg
            class="w-5 h-5 md:w-6 md:h-6 text-warning transition-transform flex-shrink-0 ml-3 md:ml-4"
            :class="{ 'rotate-180': item.isOpen }"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div
          v-if="item.isOpen"
          class="p-3 md:p-6 pt-0"
        >
          <p class="text-white-400 text-[14px] md:text-base leading-6 md:leading-7">{{ $t(item.answer) }}</p>
        </div>
      </div>
    </div>

    <!-- TODO: Implement ads -->
    <!-- <AdBlock
      adClient="ca-pub-XXXXXXXXXXXXXXXX"
      adSlot="XXXXXXXXXX"
      format="rectangle"
    /> -->

    <!-- Bottom CTA -->
    <div class="flex flex-col items-center gap-3 md:gap-4 py-3 md:py-6 px-3 md:px-8 bg-gray-800 rounded-lg">
      <h2 class="text-warning text-base md:text-xl">{{ $t('faq.readyToStart') }}</h2>
      <NuxtLink
        :to="localePath('/calculator')"
        class="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-warning text-gray-900
              rounded-lg hover:bg-warning/90 transition-colors font-medium text-[14px] md:text-base"
      >
        <span>{{ $t('faq.tryCalculator') }}</span>
        <svg class="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useSeo } from '~/composables/useSeo'

const localePath = useLocalePath()

// SEO metadata
useSeo('faq')

const faqItems = ref([
  {
    question: 'faq.questions.compoundInterest.question',
    answer: 'faq.questions.compoundInterest.answer',
    isOpen: true
  },
  {
    question: 'faq.questions.calculatorUsage.question',
    answer: 'faq.questions.calculatorUsage.answer',
    isOpen: false
  },
  {
    question: 'faq.questions.reinvestment.question',
    answer: 'faq.questions.reinvestment.answer',
    isOpen: false
  },
  {
    question: 'faq.questions.marketHistory.question',
    answer: 'faq.questions.marketHistory.answer',
    isOpen: false
  },
  {
    question: 'faq.questions.inflation.question',
    answer: 'faq.questions.inflation.answer',
    isOpen: false
  },
  {
    question: 'faq.questions.taxConsiderations.question',
    answer: 'faq.questions.taxConsiderations.answer',
    isOpen: false
  },
  {
    question: 'faq.questions.diversificationTips.question',
    answer: 'faq.questions.diversificationTips.answer',
    isOpen: false
  },
  {
    question: 'faq.questions.emergencyFund.question',
    answer: 'faq.questions.emergencyFund.answer',
    isOpen: false
  },
  {
    question: 'faq.questions.optimumInvestment.question',
    answer: 'faq.questions.optimumInvestment.answer',
    isOpen: false
  },
  {
    question: 'faq.questions.interestRates.question',
    answer: 'faq.questions.interestRates.answer',
    isOpen: false
  },
  {
    question: 'faq.questions.longTerm.question',
    answer: 'faq.questions.longTerm.answer',
    isOpen: false
  }
])
</script>
