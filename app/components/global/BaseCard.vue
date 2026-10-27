<script setup lang="ts">
import type { VNode } from 'vue'
import { NuxtLink } from '#components'

/**
 * タイトル・本文・フッターをまとめる汎用カード。
 * Studioでは本文と名前付きスロットをMarkdownで編集できる。
 * 見出しはtitleスロットにMarkdownで記述する。
 * mode="divided"で見出し・本文・フッターの間をボーダーで区切る。
 * toを指定するとカード全体がリンクになる。この場合、本文やフッターには別のリンクやボタンを入れない。
 * 複数並べる場合はProjectGrid内に配置する。
 *
 * @example Nuxt Studio / Markdown（MDC）
 * ::base-card{mode="divided"}
 * #title
 * ### カードのタイトル
 *
 * #default
 * ここに説明や画像などを記述します。
 *
 * #footer
 * :base-button{to="/about" text="詳しく見る"}
 * ::
 *
 * @example カード全体をリンクにする
 * ::base-card{to="/about" arrow="right"}
 * #title
 * ### 私たちについて
 *
 * #default
 * 活動内容や団体概要をご紹介します。
 * ::
 */
const props = withDefaults(defineProps<{
  /** 表示モード。default: 通常、divided: 見出し・本文・フッターをボーダーで区切る。 */
  mode?: 'default' | 'divided'
  /** カード全体のリンク先。省略すると通常のカードになる。 */
  to?: string
  /** リンクの開き方。_self: 同じタブ、_blank: 別タブ。 */
  target?: '_self' | '_blank'
  /** 矢印。right: 右、left: 左、up: 上、down: 下、external: 外部リンク、none: なし。 */
  arrow?: 'right' | 'left' | 'up' | 'down' | 'external' | 'none'
}>(), {
  mode: 'default',
  to: undefined,
  target: '_self',
  arrow: 'right',
})

const rel = computed(() => props.target === '_blank' ? 'noopener noreferrer' : undefined)
const arrowSymbols: Record<typeof props.arrow, string> = {
  right: 'i-lucide-arrow-right',
  left: 'i-lucide-arrow-left',
  up: 'i-lucide-arrow-up',
  down: 'i-lucide-arrow-down',
  external: 'i-lucide-external-link',
  none: '',
}
const arrowIcon = computed(() => arrowSymbols[props.arrow])

defineSlots<{
  /** 見出しエリア。Markdownの見出し（### など）を記述する。 */
  title?: () => VNode[]
  /** 本文。Markdownや任意のコンポーネントを配置する。 */
  default?: () => VNode[]
  /** カード下部。通常カードではリンクやBaseButtonも配置できる。 */
  footer?: () => VNode[]
}>()
</script>

<template>
  <component :is="to ? NuxtLink : 'div'" class="base-card" :data-mode="mode" v-bind="to ? { to, target, rel } : {}">
    <div v-if="$slots.title" class="base-card__heading">
      <slot name="title" />
    </div>

    <div v-if="$slots.default" class="base-card__body">
      <slot />
    </div>

    <div v-if="$slots.footer" class="base-card__footer">
      <slot name="footer" />
    </div>
    <Icon v-if="to && arrowIcon" :name="arrowIcon" class="base-card__arrow" aria-hidden="true" />
  </component>
</template>

<style scoped lang="scss">
@layer components {
  .base-card {
    display: flex;
    flex-direction: column;
    min-width: 0;
    padding: 1.5rem;
    gap: 1rem;
    color: inherit;
    background-color: var(--bg-page);
    border: 1px solid var(--border-main);
    border-radius: 0.75rem;
  }
}

.base-card:where(a),
.base-card:where(a):visited {
  color: inherit;
  text-decoration: none;
}

.base-card:where(a):hover {
  border-color: var(--color-secondary);
  box-shadow: var(--box-shadow-primary);
}

.base-card__arrow {
  align-self: flex-end;
  flex: none;
  width: 1.25rem;
  height: 1.25rem;
  color: currentColor;
}

.base-card__heading {
  :deep(:is(h1, h2, h3, h4, h5, h6)) {
    margin: 0;
    padding: 0;
    border: 0;

    &::before,
    &::after {
      display: none;
    }
  }
}

.base-card__body {
  min-width: 0;
  overflow-wrap: anywhere;
}

.base-card__footer {
  margin-block-start: auto;

  :deep(.base-button) {
    margin-block: 0;
  }
}

.base-card__heading,
.base-card__body,
.base-card__footer {
  :deep(> :first-child) {
    margin-block-start: 0;
  }

  :deep(> :last-child) {
    margin-block-end: 0;
  }
}

.base-card[data-mode='divided'] {
  padding: 0;
  gap: 0;

  >.base-card__heading,
  >.base-card__body,
  >.base-card__footer {
    padding: 1rem;
  }

  >.base-card__heading+.base-card__body,
  > :is(.base-card__heading, .base-card__body)+.base-card__footer {
    border-block-start: 1px solid var(--border-main);
  }

  >.base-card__arrow {
    margin: 0 1.5rem 1.5rem;
  }
}
</style>
