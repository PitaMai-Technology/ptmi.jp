<script setup lang="ts">
import {
  CollapsibleContent,
  CollapsibleRoot,
  CollapsibleTrigger,
} from 'reka-ui'

const route = useRoute()

defineEmits<{
  navigate: []
}>()

type NavigationItem = {
  label: string
  to: string
  children?: Array<{
    label: string
    to: string
  }>
}

const navigationItems: NavigationItem[] = [
  { label: 'TOP', to: '/' },
  { label: '私たちについて', to: '/about' },
  {
    label: '活動', to: '/projects',
    children: [
      { label: '出版(同人)', to: '/projects/books' },
    ],
  },
  { label: '問い合わせ', to: '/contact' },
]

const formatNavigationIndex = (index: number) => String(index + 1).padStart(2, '0')
</script>

<template>
  <nav class="px-6 py-8" aria-label="メインナビゲーション">
    <ul class="m-0 menu-list p-0">
      <li v-for="(item, index) in navigationItems" :key="item.to" class="border-b border-neutral-300">
        <CollapsibleRoot v-if="item.children?.length">
          <div class="submenu-heading">
            <NuxtLink class="menu-link" :to="item.to" :aria-current="route.path === item.to ? 'page' : undefined"
              @click="$emit('navigate')">
              <span class="font-sans text-sm text-neutral-500" aria-hidden="true">
                {{ formatNavigationIndex(index) }}
              </span>
              <span>{{ item.label }}</span>
            </NuxtLink>

            <CollapsibleTrigger class="submenu-trigger" :aria-label="`${item.label}のサブメニューを開閉する`">
              <Icon name="i-lucide-chevron-down" class="submenu-icon" />
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent class="submenu-content">
            <ul class="submenu-list">
              <li v-for="child in item.children" :key="child.to">
                <NuxtLink class="submenu-link" :to="child.to"
                  :aria-current="route.path === child.to ? 'page' : undefined" @click="$emit('navigate')">
                  {{ child.label }}
                </NuxtLink>
              </li>
            </ul>
          </CollapsibleContent>
        </CollapsibleRoot>

        <NuxtLink v-else class="menu-link" :to="item.to" :aria-current="route.path === item.to ? 'page' : undefined"
          @click="$emit('navigate')">
          <span class="font-sans text-sm text-neutral-500" aria-hidden="true">
            {{ formatNavigationIndex(index) }}
          </span>
          <span>{{ item.label }}</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.menu-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu-link {
  display: grid;
  grid-template-columns: 2rem 1fr;
  padding-block: 1.25rem;
  align-items: baseline;
  gap: 0.75rem;

  color: inherit;
  font-size: clamp(1.25rem, 4vw, 1.75rem);
  text-decoration: none;
}

.menu-link:hover,
.menu-link[aria-current='page'] {
  @apply text-secondary;
}

.menu-link::after {
  grid-column: 2;
  width: 0;
  height: 2px;

  content: '';
  background: var(--color-primary);
  transition: width 160ms ease;
}

.menu-link:hover::after,
.menu-link[aria-current='page']::after {
  width: 2.5rem;
}

.submenu-heading {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: stretch;
}

.submenu-trigger {
  display: inline-grid;
  width: 3.5rem;
  padding: 0;
  place-items: center;

  color: inherit;
  line-height: 1;
  cursor: pointer;
  background: transparent;
  border: 0;
  @apply bg-neutral-200;
}

.submenu-trigger:hover {
  color: var(--color-secondary);
  background: rgb(135 204 92 / 0.12);
}

.submenu-icon {
  display: block;
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 160ms ease;
}

.submenu-trigger[data-state='open'] .submenu-icon {
  transform: rotate(180deg);
}

.submenu-content {
  overflow: hidden;
}

.submenu-content[data-state='open'] {
  animation: submenu-open 180ms ease-out;
}

.submenu-content[data-state='closed'] {
  animation: submenu-close 150ms ease-in;
}

.submenu-list {
  margin: 0;
  padding: 0 0 1rem 2.75rem;
  list-style: none;
}

.submenu-link {
  display: block;
  padding: 0.625rem 0.75rem;

  color: inherit;
  font-size: 1rem;
  text-decoration: none;
  border-inline-start: 2px solid var(--border-primary);
}

.submenu-link:hover,
.submenu-link[aria-current='page'] {
  color: #3f7621;
  border-inline-start-color: var(--color-primary);
}

@keyframes submenu-open {
  from {
    height: 0;
    opacity: 0;
  }

  to {
    height: var(--reka-collapsible-content-height);
    opacity: 1;
  }
}

@keyframes submenu-close {
  from {
    height: var(--reka-collapsible-content-height);
    opacity: 1;
  }

  to {
    height: 0;
    opacity: 0;
  }
}

@media (min-width: 1024px) {
  .menu-link {
    padding-block: 1rem;
    font-size: 1.125rem;
    gap: 0.5rem;
  }

  .submenu-trigger {
    width: 2.75rem;
  }

  .submenu-list {
    padding-inline-start: 2.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {

  .menu-link::after,
  .submenu-content,
  .submenu-icon {
    animation: none;
    transition: none;
  }
}
</style>
