<script setup lang="ts">
import type { VNode } from 'vue'

/**
 * カードやコンポーネントを並べるグリッド。
 * Studioでは `/` からProjectGridを挿入し、本文にProjectCardなどを直接配置する。
 * props編集でPCの列数と余白を設定できる。1024px未満では1列で表示する。
 *
 * @example Nuxt Studio / Markdown（MDC）
 * ::project-grid{columns="2" gap="large"}
 *   :::project-card
 *   #title
 *   制作物の名前
 *
 *   #description
 *   Markdownで説明を記述します。
 *   :::
 *
 *   :::project-card
 *   #title
 *   別の制作物
 *   :::
 * ::
 */
withDefaults(defineProps<{
  /** 1024px以上で表示する列数。既定は2列。 */
  columns?: 1 | 2 | 3 | 4
  /** 項目間の余白。small: 1rem、medium: 1.5rem、large: 2rem。 */
  gap?: 'small' | 'medium' | 'large'
}>(), {
  columns: 2,
  gap: 'large',
})

defineSlots<{
  /** ProjectCard・Markdown・任意のコンポーネントを配置する。直下の要素が各グリッド項目になる。 */
  default?: () => VNode[]
}>()
</script>

<template>
  <div class="project-grid" :data-gap="gap" :style="{ '--project-grid-columns': columns }">
    <slot />
  </div>
</template>

<style scoped>
.project-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 2rem;
  min-width: 0;
}

.project-grid[data-gap='small'] {
  gap: 1rem;
}

.project-grid[data-gap='medium'] {
  gap: 1.5rem;
}

@media (min-width: 1024px) {
  .project-grid {
    grid-template-columns: repeat(var(--project-grid-columns), minmax(0, 1fr));
  }
}
</style>
