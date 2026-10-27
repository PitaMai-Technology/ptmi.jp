<script setup lang="ts">
import type { VNode } from 'vue'

/**
 * コンテンツの幅と余白を整える共通コンテナ。
 * 背景色などのclassは外側の全幅要素に適用され、本文は内側で幅を制限して中央に配置する。
 * 通常はデフォルトスロットのみを表示する。
 * `mode="media-text"` では本文をデフォルトスロット、画像などを `#media` に渡す。
 * 1024px以上では等幅の2カラム、それ未満では左右指定にかかわらずメディア→本文の順に縦並びになる。
 *
 * @example 通常のコンテナ
 * <BaseContainer>
 *   <h2>見出し</h2>
 *   <p>本文</p>
 * </BaseContainer>
 *
 * @example Nuxt Studio / Markdown（MDC）での2カラム
 * ::base-container{mode="media-text" media-position="right"}
 * ## 見出し
 *
 * 本文はここに書きます。
 *
 * #media
 * ![制作物の紹介画像](/hero1.png)
 * ::
 *
 * Studioでは `/` から BaseContainer を挿入し、props編集で
 * mode と mediaPosition を選択する。本文と media はエディタ内で編集できる。
 *
 * @example メディアを右側に配置する2カラム
 * <BaseContainer mode="media-text" media-position="right">
 *   <h2>見出し</h2>
 *   <p>本文</p>
 *   <template #media>
 *     <NuxtImg src="/hero1.png" alt="制作物の紹介画像" />
 *   </template>
 * </BaseContainer>
 */
withDefaults(defineProps<{
  /** 表示モード。既定は `default`。`media-text` で2カラムを有効にする。 */
  mode?: 'default' | 'media-text'
  /** 2カラム時のメディアの位置。既定は `left`。SPでの表示順には影響しない。 */
  mediaPosition?: 'left' | 'right'
}>(), {
  mode: 'default',
  mediaPosition: 'left',
})

defineSlots<{
  /** 本文。見出し・段落・ボタンなどを配置する。通常モードでも使用する。 */
  default?: () => VNode[]
  /** メディア。画像や動画などを配置する。mode が media-text のときに表示する。 */
  media?: () => VNode[]
}>()
</script>

<template>
  <section class="base-container w-full border-neutral-200">
    <div class="base-container__inner w-full max-w-5xl mx-auto px-6 py-8">
      <div v-if="mode === 'media-text'" class="media-text grid grid-cols-1 items-start gap-10 lg:grid-cols-2"
        :data-media-position="mediaPosition">
        <div class="media-text__media min-w-0">
          <slot name="media" />
        </div>
        <div class="media-text__text min-w-0">
          <slot />
        </div>
      </div>
      <slot v-else />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.base-container~.base-container {
  @apply pt-6;
  border-block-start-width: 2px;
  border-block-start-style: solid;
  border-block-start-color: var(--color-secondary);

  &:nth-child(even) {
    background-color: color-mix(in srgb, var(--color-primary) 35%, var(--bg-page));
  }

  &:not(:has(~ .base-container)) {
    background-color: transparent;
  }
}

@media (min-width: 1024px) {
  .media-text[data-media-position='right']>.media-text__media {
    order: 1;
  }
}
</style>