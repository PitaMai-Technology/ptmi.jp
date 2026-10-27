<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui'

const route = useRoute()
const isOpen = ref(false)
const isDesktop = useMediaQuery('(min-width: 1024px)')

watch(
  () => route.fullPath,
  () => {
    isOpen.value = false
  },
)

watch(isDesktop, (value) => {
  if (value) isOpen.value = false
})
</script>

<template>
  <aside class="site-header">
    <div class="header-inner mx-auto flex py-4 max-w-6xl max-lg:flex-row-reverse items-center justify-between px-6">
      <NuxtLink class="site-name" to="/">
        <NuxtImg class="max-lg:h-8 max-lg:w-full" src="/logo.png" alt="PitaMai Technology／ピタマイ・テクノロジー ロゴ" />
      </NuxtLink>

      <DialogRoot v-if="!isDesktop" v-model:open="isOpen">
        <DialogTrigger class="menu-trigger rounded-full line-height-none" aria-label="メニューを開く">
          <span class="text-md">メニュー</span>
          <span aria-hidden="true">
            <Icon name="i-lucide-menu" class="text-xl" />
          </span>
        </DialogTrigger>

        <DialogPortal>
          <DialogOverlay class="menu-overlay" />

          <DialogContent class="menu-panel" :aria-describedby="undefined">
            <div class="flex items-center justify-between border-b bg-green-100 border-neutral-300 px-6 py-5">
              <DialogTitle class="m-0 text-xl font-bold">
                メニュー
              </DialogTitle>

              <DialogClose class="menu-close rounded-full" aria-label="メニューを閉じる">
                <Icon name="i-lucide-x" class="line-height-none close-icon" />
              </DialogClose>
            </div>

            <FrontNavigation @navigate="isOpen = false" />
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </div>
    <FrontNavigation class="desktop-navigation" />
  </aside>
</template>

<style scoped lang="scss">
.site-header {
  @apply inset-x-0 top-0;
  background-color: color-mix(in srgb, var(--bg-aside) 85%, transparent);
  border-block-end: 3px solid var(--border-main);
}

.site-name {
  color: inherit;
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-decoration: none;

  @apply flex items-center gap-2 text-inherit no-underline;
}

.menu-trigger {
  display: inline-flex;
  min-width: 2.75rem;
  min-height: 2.75rem;
  padding: 0.5rem 0.75rem;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;

  color: inherit;
  cursor: pointer;
  background: transparent;
  border: 1px solid var(--border-main);
  @apply bg-green-100 shadow-main
}

.menu-trigger:hover {
  border-color: var(--color-primary);
}

.menu-overlay {
  position: fixed;
  z-index: 40;
  inset: 0;

  background: rgb(20 20 20 / 0.38);
}

.menu-panel {
  position: fixed;
  z-index: 50;
  inset-block: 0;
  inset-inline-start: 0;

  width: min(88vw, 28rem);
  overflow-y: auto;

  @apply text-neutral-900 bg-neutral-100;
  border-inline-end: 1px solid var(--border-main);
  box-shadow: 1rem 0 3rem rgb(0 0 0 / 0.08);
}

.menu-close {
  position: relative;

  display: inline-grid;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  place-items: center;

  color: inherit;
  line-height: 1;
  cursor: pointer;
  background: transparent;
  border: 1px solid var(--border-main);
}

.close-icon {
  display: block;
  width: 1.25rem;
  height: 1.25rem;
  line-height: 1;
}

.menu-close:hover {
  border-color: var(--color-primary);
}

.menu-overlay[data-state='open'] {
  animation: overlay-in 160ms ease-out;
}

.menu-overlay[data-state='closed'] {
  animation: overlay-out 120ms ease-in;
}

.menu-panel[data-state='open'] {
  animation: panel-in 200ms ease-out;
}

.menu-panel[data-state='closed'] {
  animation: panel-out 150ms ease-in;
}

@keyframes overlay-in {
  from {
    opacity: 0;
  }
}

@keyframes overlay-out {
  to {
    opacity: 0;
  }
}

@keyframes panel-in {
  from {
    transform: translateX(-100%);
  }
}

@keyframes panel-out {
  to {
    transform: translateX(-100%);
  }
}

@media (prefers-reduced-motion: reduce) {

  .menu-overlay,
  .menu-panel,
  .menu-close {
    animation: none;
    transition: none;
  }
}

.desktop-navigation {
  display: none;
}

@media (min-width: 1024px) {
  .menu-trigger {
    display: none;
  }

  .site-header {
    position: sticky;
    top: 0;
    height: 100dvh;
    overflow-y: auto;
    border-block-end: 0;
    border-inline-end: 2px solid var(--border-main);
  }

  .header-inner {
    padding-block: 1.5rem;
  }

  .desktop-navigation {
    display: block;
    padding-block: 1rem;
  }
}
</style>
