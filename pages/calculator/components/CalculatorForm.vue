<template>
  <div class="flex-shrink-0 border-r border-gray-500 pr-8">
    <p class="mb-4">Введіть дані для розрахунків:</p>
    <div class="w-full max-w-[300px]">
      <el-form v-model="modelValue" label-position="top" class="w-full">
        <!-- Реінвестування -->
        <el-form-item class="mb-3" label="Реінвестування">
          <el-switch
            v-model="modelValue.reinvestment"
            class="mb-2"
            style="--el-switch-on-color: #00bff5; --el-switch-off-color: #adb5bd"
          />
          <el-radio-group v-model="modelValue.reinvestmentFrequency" :disabled="!modelValue.reinvestment">
            <el-radio-button :value="EFrequency.Weekly">Щотижня</el-radio-button>
            <el-radio-button :value="EFrequency.Monthly">Щомісяця</el-radio-button>
            <el-radio-button :value="EFrequency.Yearly">Щороку</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <!-- Початковий депозит -->
        <el-form-item class="flex-grow mb-3" label="Початковий депозит">
          <el-input v-model.number="modelValue.start" />
        </el-form-item>

        <!-- Щомісячний/Щотижневий/Щорічний внесок -->
        <el-form-item class="flex-grow mb-3" :label="depositLabel + ' внесок'">
          <el-input v-model.number="modelValue.deposit" class="mb-2" />
          <el-radio-group v-model="modelValue.depositFrequency">
            <el-radio-button :value="EFrequency.Weekly">Щотижня</el-radio-button>
            <el-radio-button :value="EFrequency.Monthly">Щомісяця</el-radio-button>
            <el-radio-button :value="EFrequency.Yearly">Щороку</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <!-- Річна відсоткова ставка -->
        <el-form-item class="flex-grow mb-3" label="Річна відсоткова ставка">
          <el-input v-model.number="modelValue.percent" />
        </el-form-item>

        <!-- Тривалість -->
        <el-form-item class="flex-grow mb-3" label="Тривалість">
          <el-input v-model.number="modelValue.duration" class="mb-2" />
          <el-radio-group v-model="modelValue.durationUnit">
            <el-radio-button :value="EDurationUnit.Weeks">Тижні</el-radio-button>
            <el-radio-button :value="EDurationUnit.Months">Місяці</el-radio-button>
            <el-radio-button :value="EDurationUnit.Years">Роки</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { IFormModel } from '../types'
import { EFrequency, EDurationUnit } from '../types'

const modelValue = defineModel<IFormModel>({ required: true })

// Динамічний підпис для внеску
const depositLabel = computed(() => {
  if (modelValue.value.depositFrequency === EFrequency.Weekly) return 'Щотижневий'
  if (modelValue.value.depositFrequency === EFrequency.Monthly) return 'Щомісячний'
  return 'Щорічний'
})
</script>
