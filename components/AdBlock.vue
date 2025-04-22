<!-- TODO: Implement ads -->
<!--
<template>
  <div class="ad-block">
    <ins
      class="adsbygoogle"
      :style="{ display: 'block' }"
      :data-ad-client="adClient"
      :data-ad-slot="adSlot"
      :data-ad-format="format"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  adClient: string;
  adSlot: string;
  format: 'horizontal' | 'rectangle';
}>();

onMounted(() => {
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch (err) {
    console.error('Error loading ad:', err);
  }
});
</script>

<style scoped>
.ad-block {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  min-height: 100px;
}
</style>
-->
