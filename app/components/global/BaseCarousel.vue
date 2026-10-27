<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
import { Comment, Fragment, Text, defineComponent, h, isVNode } from 'vue'
import type { VNode } from 'vue'

/**
 * Studioから画像・Markdown・コンポーネントを編集できるカルーセル。
 * `/` メニューから BaseCarousel を挿入し、その中に BaseCarouselSlide を追加する。
 * 各スライドの本文にMarkdownやコンポーネントを配置できる。
 * Studioでカードを並べる場合はautoSlidesを有効にし、カードを直接配置する。
 * 直下の各要素が1スライドになるため、MDCのネストを1段減らせる。
 * autoSlidesを有効にする場合はBaseCarouselSlideで囲まない。
 * 画像のみの場合は、props編集で images の src（画像URL）と alt（画像の説明）を設定する。
 * imagesとスロットを併用した場合は、画像→スロットの順に表示する。
 * 768px未満では itemsToShow、768px以上では desktopItemsToShow の枚数を表示する。
 * 画像・スロットのどちらも未設定の場合はカルーセルを表示しない。
 *
 * @example Markdownとコンポーネントをスライドにする（MDC）
 * :::base-carousel
 * ::base-carousel-slide
 * ## 活動について
 *
 * Web技術を中心にものづくりをしています。
 * ::
 *
 * ::base-carousel-slide
 * :top-hero-aside
 * ::
 * :::
 *
 * @example Studio向けにカードを直接並べる（MDC）
 * ::base-carousel{auto-slides}
 *   :::project-card
 *   #title
 *   制作物の紹介
 *
 *   #description
 *   本文をMarkdownで編集できます。
 *   :::
 * ::
 *
 * @example Nuxt Studio / Markdown（MDC）
 * ::base-carousel
 * ---
 * images:
 *   - src: /hero1.png
 *     alt: LismUI-Vueのコンポーネントデモ画面
 *   - src: /hero2.png
 *     alt: ピタマイが制作したZINEの表紙
 * desktopItemsToShow: 2
 * imageHeight: 24rem
 * objectFit: contain
 * wrapAround: true
 * navigation: true
 * ---
 * ::
 */
const props = withDefaults(defineProps<{
  /** 直下の各要素を自動で1スライドにする。Studioでネストを浅くする場合に有効にする。 */
  autoSlides?: boolean
  /** 表示する画像。Studioで各画像のURLと説明を設定する。配列の順に表示する。 */
  images?: Array<{
    /** 画像URL。例: /hero1.png またはメディアライブラリのURL。 */
    src: string
    /** 画像の内容を伝える代替テキスト。装飾画像の場合は空文字にする。 */
    alt: string
  }>
  /** 768px未満で同時に表示する枚数。1以上を指定する。既定は1。 */
  itemsToShow?: number
  /** 768px以上で同時に表示する枚数。1以上を指定する。既定は2。 */
  desktopItemsToShow?: number
  /** 最後の画像から先頭に戻るループを有効にする。既定はtrue。 */
  wrapAround?: boolean
  /** 前後の画像に移動する矢印を表示する。既定はtrue。 */
  navigation?: boolean
  /** 画像の高さ。CSSの長さを指定する。例: 24rem、400px、80vh。 */
  imageHeight?: string
  /** coverは枠いっぱいに切り抜き、containは画像全体を表示する。 */
  objectFit?: 'cover' | 'contain'
  /** スクリーンリーダー向けのカルーセル名。 */
  label?: string
}>(), {
  autoSlides: false,
  images: () => [],
  itemsToShow: 1,
  desktopItemsToShow: 2,
  wrapAround: true,
  navigation: true,
  imageHeight: '80vh',
  objectFit: 'cover',
  label: 'カルーセル',
})

defineSlots<{
  /** 通常はBaseCarouselSlideを並べる。autoSlides有効時はカードなどを直接配置する。 */
  default?: () => VNode[]
}>()

function getSlideNodes(nodes: VNode[]): VNode[] {
  return nodes.flatMap((node) => {
    if (node.type === Fragment && Array.isArray(node.children)) {
      return getSlideNodes(node.children.filter(isVNode))
    }
    if (node.type === Comment || (node.type === Text && !String(node.children ?? '').trim())) {
      return []
    }
    return [node]
  })
}

const AutomaticSlides = defineComponent({
  setup(_, { slots }) {
    return () => getSlideNodes(slots.default?.() ?? []).map((node, index) =>
      h(Slide, { key: node.key ?? index }, {
        default: () => h('div', { class: 'base-carousel__content-slide' }, [node]),
      }),
    )
  },
})

const carouselConfig = computed(() => ({
  itemsToShow: Math.max(1, props.itemsToShow),
  wrapAround: props.wrapAround,
  clamp: true,
  breakpoints: {
    768: {
      itemsToShow: Math.max(1, props.desktopItemsToShow),
    },
  },
  i18n: {
    ariaGallery: props.label,
    ariaNextSlide: '次の画像へ',
    ariaPreviousSlide: '前の画像へ',
    ariaNavigateToSlide: '{slideNumber}枚目のスライドへ',
    iconArrowLeft: '左向きの矢印',
    iconArrowRight: '右向きの矢印',
    itemXofY: '{slidesCount}枚中{currentSlide}枚目',
  },
}))
</script>

<template>
  <ClientOnly>
    <div class="base-carousel">
      <Carousel v-if="images.length || $slots.default" v-bind="carouselConfig">
        <Slide v-for="(image, index) in images" :key="`${index}-${image.src}`">
          <NuxtImg class="base-carousel__image" :src="image.src" :alt="image.alt"
            :style="{ height: imageHeight, objectFit }" loading="lazy" />
        </Slide>

        <AutomaticSlides v-if="autoSlides">
          <slot />
        </AutomaticSlides>
        <slot v-else />

        <template #addons="{ slidesCount }">
          <Navigation v-if="navigation && slidesCount > 1" />
          <Pagination v-if="slidesCount > 1" class="base-carousel__pagination" />
        </template>
      </Carousel>
    </div>
    <template #fallback>
      <BaseLoading />
    </template>
  </ClientOnly>
</template>

<style scoped lang="scss">
.base-carousel {
  min-width: 0;
  --vc-nav-background: rgb(255 255 255 / 70%);
  --vc-nav-border-radius: 100%;
}

.base-carousel__image {
  display: block;
  width: 100%;
  margin: 0;

  @media (width < 768px) {
    // スワイプ操作のため、画像の左右に余白を残す。
    width: 90%;
  }
}

:deep(.base-carousel__pagination) {
  padding: 0.5rem 0.75rem;
  background: color-mix(in srgb, var(--color-primary) 40%, transparent);
  border-radius: 9999px;
}

:deep(.base-carousel__content-slide) {
  width: 100%;
  min-width: 0;
  padding: 1rem;
  text-align: start;
}

:deep(.carousel__slide) {
  transition: transform 0.5s ease-in-out;
  align-items: center;
}

:deep(.carousel__slide--prev .base-carousel__image),
:deep(.carousel__slide--next .base-carousel__image) {
  filter: contrast(0.3);
}
</style>
