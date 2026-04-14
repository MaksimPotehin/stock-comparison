<template>
  <component
    :is="tag"
    class="app-btn"
    :class="`app-btn--${variant}`"
    v-bind="componentAttrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: 'brand-accent' | 'primary' | 'ghost'
  to?: string
  href?: string
}>(), {
  variant: 'brand-accent'
})

const tag = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return 'button'
})

const componentAttrs = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) return { href: props.href, target: '_blank', rel: 'noopener noreferrer' }
  return {}
})
</script>

<style scoped lang="scss">
.app-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.75rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  text-decoration: none;
  border: 1px solid transparent;
  transition: background 0.2s, opacity 0.2s;
  white-space: nowrap;

  &--brand-accent {
    color: #fff;
    background:
      linear-gradient(var(--card-bg), var(--card-bg)) padding-box,
      linear-gradient(to right, var(--sb-primary), var(--sb-info)) border-box;

    &:hover {
      background:
        linear-gradient(var(--main-bg), var(--main-bg)) padding-box,
        linear-gradient(to right, var(--sb-primary), var(--sb-info)) border-box;
    }
  }

  &--primary {
    color: #fff;
    background: var(--color-primary);

    &:hover { opacity: 0.85; }
  }

  &--ghost {
    color: var(--sb-dark);
    background: transparent;
    border-color: var(--sb-border-color);

    &:hover { background: var(--sb-row-hovered-bg); }
  }
}
</style>
