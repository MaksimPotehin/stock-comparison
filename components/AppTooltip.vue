<template>
  <el-tooltip
    :content="content"
    :placement="placement"
    :trigger="trigger"
    :effect="effect"
    :disabled="disabled"
    :show-after="showAfter"
    :hide-after="hideAfter"
    :popper-class="popperClass"
  >
    <template v-if="$slots.content" #content>
      <slot name="content" />
    </template>
    <slot />
  </el-tooltip>
</template>

<script setup lang="ts">
type TPlacement =
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end'

type TTrigger = 'hover' | 'click' | 'focus' | 'contextmenu'
type TEffect = 'dark' | 'light'

withDefaults(defineProps<{
  content?: string
  placement?: TPlacement
  trigger?: TTrigger
  effect?: TEffect
  disabled?: boolean
  showAfter?: number
  hideAfter?: number
  popperClass?: string
}>(), {
  content: '',
  placement: 'top',
  trigger: 'hover',
  effect: 'dark',
  disabled: false,
  showAfter: 300,
  hideAfter: 100
})
</script>
