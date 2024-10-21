<template>
  <div сlass="flex-grow">
    <div class="mb-8">
      <p class="text-warning text-2xl mb-4">Інвестиційний калькулятор</p>
      <p class="text-white-400 leading-7">
        Розраховуйте прибуток із врахуванням складних відсотків
        Цей калькулятор допоможе вам легко розрахувати зростання капіталу, показати динаміку на графіку та порівняти
        інвестиційні стратегії для досягнення найвищого результату.
      </p>
    </div>

    <div class="">
      <p class="mb-4">Введіть данні для розрухунків:</p>
      <div class="max-w-[300px] border-r border-gray-500">
        <el-form
          label-position="top"
          class="w-full max-w-[250px]"
        >
          <el-form-item class="mb-3" label="Реінвестування ">
            <el-switch
              v-model="formModel.reinvestment"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #adb5bd"
            />
          </el-form-item>

          <el-form-item class="flex-grow mb-3" label="Початковий депозит">
            <el-input v-model.number="formModel.start" />
          </el-form-item>

          <el-form-item class="flex-grow mb-3" :label="depositLabel + ' внесок'">
            <el-input v-model.number="formModel.deposit" class="mb-2" />
            <el-radio-group v-model="formModel.frequency">
              <el-radio-button label="weekly">Щотижня</el-radio-button>
              <el-radio-button label="monthly">Щомісяця</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item class="flex-grow mb-3" label="Відсоткова ставка">
            <el-input v-model.number="formModel.percent" />
          </el-form-item>

          <el-form-item class="flex-grow mb-3" label="Тривалість">
            <el-input v-model.number="formModel.duration" class="mb-2" />
            <el-radio-group v-model="formModel.durationUnit">
              <el-radio-button label="weeks">Тижні</el-radio-button>
              <el-radio-button label="months">Місяці</el-radio-button>
              <el-radio-button label="years">Роки</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item class="flex-grow" label="Інфляція">
            <el-input v-model.number="formModel.inflation" class="mb-2" />
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

definePageMeta({
  pageLabel: 'Calculator',
  navOrder: 1
})

const formModel = ref({
  start: 0,
  deposit: 0,
  percent: 0,
  duration: 0,
  frequency: '',
  durationUnit: '',
  inflation: '',
  reinvestment: true
})

const depositLabel = computed(() => formModel.value.frequency === 'weekly' ? 'Щотижневий' : 'Щомісячний')

</script>
