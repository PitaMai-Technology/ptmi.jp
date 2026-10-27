<script setup lang="ts">
import { Slide } from 'vue3-carousel'
import type { VNode } from 'vue'

/**
 * BaseCarousel内で使用する1枚分のスライド。
 * StudioではBaseCarouselの本文にこのコンポーネントを追加し、
 * デフォルトスロットに見出し・段落・画像・他のコンポーネントを配置する。
 * 内容の高さに合わせて表示する。画像専用のimageHeightやobjectFitは適用しない。
 *
 * @example Markdown（MDC）
 * :::base-carousel
 * ::base-carousel-slide
 * ## スライドの見出し
 *
 * 本文を自由に書けます。
 *
 * :base-button{to="/about" text="私たちについて"}
 * ::
 * :::
 */
defineSlots<{
  /** スライドの内容。Markdownや任意のコンポーネントを配置する。 */
  default?: () => VNode[]
}>()
</script>

<template>
  <Slide>
    <div class="base-carousel-slide">
      <slot />
    </div>
  </Slide>
</template>

<style scoped>
.base-carousel-slide {
  width: 100%;
  min-width: 0;
  padding: 1rem;
  text-align: start;
}
</style>
