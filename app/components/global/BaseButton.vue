<script setup lang="ts">
import type { VNode } from 'vue'

/**
 * リンク先・表示文字・矢印・配置を設定できるリンクボタン。
 * 表示文字は本文スロット → text → label → 「詳しく見る」の順で使用する。
 * Markdown本文には文字や強調を記述し、リンクはtoで指定する。
 * 文字色はclass="text-secondary"など、呼び出し側のclassで上書きできる。
 *
 * @example propsで表示文字を設定する（Nuxt Studio / MDC）
 * :base-button{to="/about" text="私たちについて" align="center"}
 *
 * @example Markdown本文で表示文字を編集する
 * ::base-button{to="/projects" arrow="right"}
 * プロジェクトを見る
 * ::
 *
 * @example 外部サイトを別タブで開く
 * :base-button{to="https://github.com/otusoa" text="GitHubを見る" target="_blank" arrow="external"}
 */
const props = withDefaults(defineProps<{
  /** 表示文字。本文スロットがある場合は本文を優先する。 */
  text?: string
  /** リンク先。サイト内は /about、外部サイトは https://...、ページ内は #top。 */
  to: string
  /** textを省略した場合の表示文字。既存のMarkdownとの互換用。 */
  label?: string
  /** 矢印の向き。right: 右、left: 左、up: 上、down: 下、external: 外部リンク、none: なし。 */
  arrow?: 'right' | 'left' | 'up' | 'down' | 'external' | 'none'
  /** ボタンの配置。start: 左、center: 中央、end: 右。 */
  align?: 'start' | 'center' | 'end'
  /** リンクの開き方。_self: 同じタブ、_blank: 別タブ。 */
  target?: '_self' | '_blank'
}>(), {
  text: undefined,
  label: undefined,
  arrow: 'right',
  align: 'start',
  target: '_self',
})

defineSlots<{
  /** ボタンの表示文字。Markdownの文字や強調を記述でき、text・labelより優先する。 */
  default?: () => VNode[]
}>()

const arrowSymbols: Record<typeof props.arrow, string> = {
  right: 'i-lucide-arrow-right',
  left: 'i-lucide-arrow-left',
  up: 'i-lucide-arrow-up',
  down: 'i-lucide-arrow-down',
  external: 'i-lucide-external-link',
  none: '',
}

const arrowIcon = computed(() => arrowSymbols[props.arrow])
const isLeadingArrow = computed(() => props.arrow === 'left')
const rel = computed(() => props.target === '_blank' ? 'noopener noreferrer' : undefined)
</script>

<template>
  <NuxtLink class="base-button no-underline" :to="to" :target="target" :rel="rel" :data-arrow="arrow"
    :data-align="align">
    <span v-if="arrowIcon && isLeadingArrow" aria-hidden="true">
      <Icon :name="arrowIcon" class="base-button__arrow" />
    </span>

    <span class="base-button__label">
      <slot mdc-unwrap="p">{{ text || label || '詳しく見る' }}</slot>
    </span>

    <span v-if="arrowIcon && !isLeadingArrow" aria-hidden="true">
      <Icon :name="arrowIcon" class="base-button__arrow" />
    </span>
  </NuxtLink>
</template>

<style lang="scss" scoped>
/* 既定の文字色は、呼び出し側の通常のCSSやUnoCSSクラスを優先する。 */
@layer components {
  .base-button,
  .base-button:visited {
    @apply text-white;
  }
}

.base-button {
  @apply flex w-fit items-center px-4 py-2 my-5 justify-center gap-3 bg-secondary rounded-full leading-[1] shadow-main;

  transition:
    color 150ms ease,
    background-color 150ms ease,
    border-color 150ms ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}

.base-button[data-align='start'] {
  @apply me-auto;
}

.base-button[data-align='center'] {
  @apply mx-auto;
}

.base-button[data-align='end'] {
  @apply ms-auto;
}

.base-button__arrow {
  @apply inline-block text-[1.2em] font-normal leading-none;

  color: currentColor;
  transition: transform 150ms ease;
}

.base-button:is([data-arrow='right'], [data-arrow='external']):hover .base-button__arrow {
  transform: translateX(0.4rem);
}

.base-button[data-arrow='left']:hover .base-button__arrow {
  transform: translateX(-0.4rem);
}

.base-button[data-arrow='up']:hover .base-button__arrow {
  transform: translateY(-0.15rem);
}

.base-button[data-arrow='down']:hover .base-button__arrow {
  transform: translateY(0.15rem);
}

@media (prefers-reduced-motion: reduce) {
  .base-button__arrow {
    transition: none;
  }
}
</style>
