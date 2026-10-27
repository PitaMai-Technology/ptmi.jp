<script setup lang="ts">
const isCookieSettingsOpen = ref(false)
</script>

<template>
  <div id="top">
    <div class="site-layout">
      <BaseSticky v-slot="{ stickyClass, stickyStyle }" :breakpoint="0" top="0rem">
        <FrontHeader :class="[stickyClass, 'z-70']" :style="stickyStyle" />
      </BaseSticky>
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
#top {
  position: relative;
  isolation: isolate;
  background-color: var(--bg-aside);
}

#top::before {
  position: fixed;
  z-index: -1;
  inset: 0;
  pointer-events: none;
  content: '';
  background: url('/favicon.svg') center / min(60vw, 32rem) auto no-repeat;
  opacity: 0.15;
  margin: auto;
  filter: grayscale(1);
}

.site-main {
  min-width: 0;
}

@media (min-width: 1024px) {
  #top::before {
    inset-inline-start: 18rem;
  }

  .site-layout {
    display: grid;
    grid-template-columns: 18rem minmax(0, 1fr);
    align-items: start;
  }
}
</style>
