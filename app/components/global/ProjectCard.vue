<script setup lang="ts">
import type { VNode } from 'vue'

/**
 * 制作物の画像・分類・タイトル・説明を表示するカード。
 * Studioではtitle・description・categoryスロットにMarkdownを記述できる。
 * 各名前付きスロットは同名のpropsより優先する。
 * bodyスロットには画像・動画・Markdown・任意のコンポーネントを配置できる。
 * bodyは画像より優先してカード上部に表示する。
 * 画像1枚だけのbodyは16:10の枠内で中央に収め、それ以外は内容に合わせた高さになる。
 * 説明はdescriptionスロット→本文スロット→description propsの順に表示する。
 * title・categoryには見出し記号を付けず、テキストや強調を記述する。
 * toを指定する場合、title内にはリンクを入れない。
 * 画像やリンクを省略しても使用できる。見出しだけをリンクにするため、
 * 本文やactionsスロット内にもリンク・ボタンを配置できる。
 *
 * @example Nuxt Studio / Markdown（MDC）
 * ::project-card
 * ---
 * image: /hero1.png
 * imageAlt: LismUI-Vueのコンポーネントデモ画面
 * to: /projects/lism-ui-vue
 * headingLevel: 3
 * ---
 * #title
 * LismUI-Vue
 *
 * #category
 * オープンソース
 *
 * #description
 * Vue向けのUIコンポーネントを開発しています。
 *
 * #actions
 * :base-button{to="/projects/lism-ui-vue" text="詳しく見る"}
 * ::
 *
 * @example 画像の代わりにコンポーネントを配置する（MDC）
 * ::project-card
 * #body
 * :top-hero-aside
 *
 * #title
 * 制作物の紹介
 *
 * #description
 * 本文をMarkdownで記述できます。
 * ::
 */
const props = withDefaults(defineProps<{
  /** 制作物の名前。titleスロットがある場合はそちらを表示する。 */
  title?: string
  /** 短い説明。descriptionスロットや本文スロットがある場合はそちらを表示する。 */
  description?: string
  /** 分類。categoryスロットがある場合はそちらを表示する。 */
  category?: string
  /** 紹介画像のURL。bodyスロットがある場合はそちらを表示する。 */
  image?: string
  /** 画像の代替テキスト。Markdownでタイトルを設定する場合は画像の説明を指定する。装飾画像には空文字を指定する。 */
  imageAlt?: string
  /** 画像の収め方。containは全体を表示、coverは枠いっぱいに切り抜く。 */
  imageFit?: 'contain' | 'cover'
  /** タイトルのリンク先。サイト内パスや外部URLを指定する。省略時はリンクにしない。 */
  to?: string
  /** リンクの開き方。別タブにする場合は_blankを指定する。 */
  target?: '_self' | '_blank'
  /** 見出しの階層。ページの構成に合わせて2・3・4から選ぶ。 */
  headingLevel?: 2 | 3 | 4
}>(), {
  title: undefined,
  description: undefined,
  category: undefined,
  image: undefined,
  imageAlt: undefined,
  imageFit: 'contain',
  to: undefined,
  target: '_self',
  headingLevel: 3,
})

const headingTag = computed(() => `h${props.headingLevel}` as 'h2' | 'h3' | 'h4')
const resolvedImageAlt = computed(() => props.imageAlt ?? (props.title ? `${props.title}の紹介画像` : '制作物の紹介画像'))
const isExternal = computed(() => /^(?:https?:)?\/\//i.test(props.to ?? ''))
const rel = computed(() => props.target === '_blank' ? 'noopener noreferrer' : undefined)

defineSlots<{
  /** カード上部の内容。画像・動画・Markdown・任意のコンポーネントを配置する。image propsより優先する。 */
  body?: () => VNode[]
  /** 制作物の名前。Markdownのテキスト・強調を記述する。title propsより優先する。 */
  title?: () => VNode[]
  /** 分類。Markdownのテキスト・強調を記述する。category propsより優先する。 */
  category?: () => VNode[]
  /** 制作物の説明。Markdownやコンポーネントを配置する。本文スロットとdescription propsより優先する。 */
  description?: () => VNode[]
  /** 制作物の説明。Markdownやコンポーネントを配置する。descriptionより優先する。 */
  default?: () => VNode[]
  /** 詳細ページ・ソースコードなどへのリンクやボタンを配置する。 */
  actions?: () => VNode[]
}>()
</script>

<template>
  <article class="project-card">
    <div v-if="$slots.body" class="project-card__body">
      <slot name="body" />
    </div>
    <div v-else-if="image" class="project-card__visual">
      <NuxtImg class="project-card__image " :src="image" :alt="resolvedImageAlt" :style="{ objectFit: imageFit }"
        width="1280" sizes="100vw sm:50vw lg:33vw" loading="lazy" />
    </div>

    <div class="project-card__content">
      <div v-if="$slots.category || category" class="project-card__category">
        <slot name="category" mdc-unwrap="p">{{ category }}</slot>
      </div>

      <component :is="headingTag" v-if="$slots.title || title" class="project-card__title">
        <NuxtLink v-if="to" class="project-card__link" :to="to" :target="target" :rel="rel">
          <span>
            <slot name="title" mdc-unwrap="p">{{ title }}</slot>
          </span>
          <Icon :name="isExternal ? 'i-lucide-arrow-up-right' : 'i-lucide-arrow-right'" aria-hidden="true"
            class="project-card__arrow" />
          <span v-if="target === '_blank'" class="project-card__sr-only">（新しいタブで開きます）</span>
        </NuxtLink>
        <slot v-else name="title" mdc-unwrap="p">{{ title }}</slot>
      </component>

      <div v-if="$slots.description || $slots.default || description" class="project-card__description">
        <slot name="description">
          <slot>
            <p>{{ description }}</p>
          </slot>
        </slot>
      </div>

      <footer v-if="$slots.actions" class="project-card__actions">
        <slot name="actions" />
      </footer>
    </div>
  </article>
</template>

<style scoped lang="scss">
.project-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  height: 100%;
  color: #262626;
  border-block-end: 1px solid var(--border-main);
}

.project-card__visual {
  flex: none;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--bg-aside);
  border: 1px solid var(--border-main);
}

.project-card__body {
  width: 100%;
  min-width: 0;

  :deep(p:first-child) {
    margin-block-start: 0;
  }

  :deep(p:last-child) {
    margin-block-end: 0;
  }
}

.project-card__image {
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  object-position: center;
}

/* Markdownの画像1枚は、縦横比にかかわらず共通の枠に収める。 */
.project-card__body:has(> p:only-child > img:only-child),
.project-card__body:has(> img:only-child) {
  position: relative;
  flex: none;
  aspect-ratio: 16 / 10;
  overflow: hidden;

  :deep(> p) {
    position: absolute;
    inset: 0;
    margin: 0;
  }

  :deep(img) {
    display: block;
    width: 100%;
    height: 100%;
    margin: 0;
    object-fit: contain;
    object-position: center;
  }

  :deep(> img) {
    position: absolute;
    inset: 0;
  }
}

.project-card__content {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  padding-block: 1.25rem;
  gap: 0.75rem;
  align-items: center;
}

.project-card__category {
  margin: 0;
  color: var(--color-secondary);
  font-size: 0.75rem;
  font-weight: 700;
}

.project-card__title {
  margin: 0;
  padding: 0;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.4;
  border: 0;

  &::before,
  &::after {
    display: none;
  }
}

.project-card__link,
.project-card__link:visited {
  display: inline-flex;
  align-items: baseline;
  gap: 0.5rem;
  color: inherit;
  text-decoration: underline;
  text-decoration-color: var(--border-primary);
  text-underline-offset: 0.2em;
}

.project-card__link:hover {
  color: var(--color-secondary);
  text-decoration-color: currentColor;
}

.project-card__arrow {
  flex: none;
  width: 1em;
  height: 1em;
}

.project-card__description {
  color: #525252;
  font-size: 0.875rem;
  line-height: 1.8;

  :deep(p:first-child) {
    margin-block-start: 0;
  }

  :deep(p:last-child) {
    margin-block-end: 0;
  }
}

.project-card__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-block-start: auto;
  padding-block-start: 0.5rem;
  gap: 0.75rem;

  :deep(.base-button) {
    margin: 0;
  }
}

.project-card__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
</style>
