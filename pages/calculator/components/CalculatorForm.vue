<template>
  <div class="flex-shrink-0 border-r-0 md:border-r border-gray-500 md:pr-8">
    <p class="mb-4">{{ $t('calculator.form.enterData') }}</p>
    <el-form v-model="modelValue" label-position="top" class="w-full">
      <!-- Реінвестування -->
      <el-form-item class="mb-3" :label="$t('calculator.form.reinvestment')">
        <div class="flex flex-col gap-y-2">
          <el-switch
            v-model="modelValue.reinvestment"
            style="--el-switch-on-color: #00bff5; --el-switch-off-color: #adb5bd"
          />
          <el-radio-group v-model="modelValue.reinvestmentFrequency" :disabled="!modelValue.reinvestment">
            <el-radio-button :value="EFrequency.Weekly">{{ $t('calculator.form.weekly') }}</el-radio-button>
            <el-radio-button :value="EFrequency.Monthly">{{ $t('calculator.form.monthly') }}</el-radio-button>
            <el-radio-button :value="EFrequency.Yearly">{{ $t('calculator.form.yearly') }}</el-radio-button>
          </el-radio-group>
        </div>
      </el-form-item>

      <!-- Початковий депозит -->
      <el-form-item class="flex-grow mb-3" :label="$t('calculator.form.initialDeposit')">
        <el-input v-model.number="modelValue.start" />
      </el-form-item>

      <!-- Щомісячний/Щотижневий/Щорічний внесок -->
      <el-form-item class="flex-grow mb-3" :label="depositLabel + ' ' + $t('calculator.form.contribution')">
        <el-input v-model.number="modelValue.deposit" class="mb-2" />
        <el-radio-group v-model="modelValue.depositFrequency">
          <el-radio-button :value="EFrequency.Weekly">{{ $t('calculator.form.weekly') }}</el-radio-button>
          <el-radio-button :value="EFrequency.Monthly">{{ $t('calculator.form.monthly') }}</el-radio-button>
          <el-radio-button :value="EFrequency.Yearly">{{ $t('calculator.form.yearly') }}</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <!-- Річна відсоткова ставка -->
      <el-form-item class="flex-grow mb-3" :label="$t('calculator.form.annualInterestRate')">
        <el-input v-model.number="modelValue.percent" />
      </el-form-item>

      <!-- Тривалість -->
      <el-form-item class="flex-grow mb-3" :label="$t('calculator.form.duration')">
        <el-input v-model.number="modelValue.duration" class="mb-2" />
        <el-radio-group v-model="modelValue.durationUnit">
          <el-radio-button :value="EDurationUnit.Weeks">{{ $t('calculator.form.weeks') }}</el-radio-button>
          <el-radio-button :value="EDurationUnit.Months">{{ $t('calculator.form.months') }}</el-radio-button>
          <el-radio-button :value="EDurationUnit.Years">{{ $t('calculator.form.years') }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { IFormModel } from '../types'
import { EFrequency, EDurationUnit } from '../types'

const { t } = useI18n()

const modelValue = defineModel<IFormModel>({ required: true })

const depositLabel = computed(() => {
  if (modelValue.value.depositFrequency === EFrequency.Weekly) return t('calculator.form.weekly')
  if (modelValue.value.depositFrequency === EFrequency.Monthly) return t('calculator.form.monthly')
  return t('calculator.form.yearly')
})
</script>
