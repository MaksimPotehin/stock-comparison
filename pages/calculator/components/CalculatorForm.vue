<template>
  <div class="flex-shrink-0 border-r border-gray-500 pr-8">
    <p class="mb-4">Введіть данні для розрахунків:</p>

    <div class="w-full max-w-[300px]">
      <el-form
        v-model="modelValue"
        label-position="top"
        class="w-full"
      >
        <el-form-item class="mb-3" label="Реінвестування">
          <el-switch
            v-model="modelValue.reinvestment"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #adb5bd"
          />
        </el-form-item>

        <el-form-item class="flex-grow mb-3" label="Початковий депозит">
          <el-input v-model.number="modelValue.start" />
        </el-form-item>

        <el-form-item class="flex-grow mb-3" :label="depositLabel + ' внесок і реінвестування'">
          <el-input v-model.number="modelValue.deposit" class="mb-2" />
          <el-radio-group v-model="modelValue.frequency">
            <el-radio-button label="weekly">Щотижня</el-radio-button>
            <el-radio-button label="monthly">Щомісяця</el-radio-button>
            <el-radio-button label="yearly">Щороку</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item class="flex-grow mb-3" label="Відсоткова ставка">
          <el-input v-model.number="modelValue.percent" />
        </el-form-item>

        <el-form-item class="flex-grow mb-3" label="Тривалість">
          <el-input v-model.number="modelValue.duration" class="mb-2" />
          <el-radio-group v-model="modelValue.durationUnit">
            <el-radio-button label="weeks">Тижні</el-radio-button>
            <el-radio-button label="months">Місяці</el-radio-button>
            <el-radio-button label="years">Роки</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const modelValue = defineModel<any>({ required: true })

// Adjust the label for deposit based on frequency
const depositLabel = computed(() => {
  if (modelValue.value.frequency === 'weekly') return 'Щотижневий'
  if (modelValue.value.frequency === 'monthly') return 'Щомісячний'
  return 'Щорічний'
})
</script>
