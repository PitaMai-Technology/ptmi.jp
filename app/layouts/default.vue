<script setup lang="ts">
const isCookieSettingsOpen = ref(false)
</script>

<template>
  <div id="top">
    <div class="site-layout bg-bgPage">
      <FrontHeader />
      <div class="site-main">
        <slot />
        <FrontFooter @open-cookie-settings="isCookieSettingsOpen = true" />
      </div>
    </div>
    <BaseSticky v-slot="{ stickyClass, stickyStyle }" :breakpoint="0" top="0rem">
      <CookieConsentBanner :class="[stickyClass, 'z-60']" v-model:open="isCookieSettingsOpen" :style="stickyStyle" />
    </BaseSticky>
  </div>
</template>

<style scoped>
.site-main {
  min-width: 0;
}

@media (min-width: 1024px) {
  .site-layout {
    display: grid;
    grid-template-columns: 18rem minmax(0, 1fr);
    align-items: start;
  }
}
</style>
