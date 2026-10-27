<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first();
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const description = page.value.description ?? '小林栄太(eita.vue)のリンク集'

useSeoMeta({
  title: page.value.title,
  description,
  ogTitle: page.value.title,
  ogDescription: description,
  twitterCard: 'summary_large_image',
})

defineOgImage('Main', {
  title: page.value.title,
  description,
  path: route.path,
}, {
  width: 1200,
  height: 630,
  alt: `${page.value.title} — 小林栄太のポートフォリオサイト`,
})
</script>

<template>
  <main class="content-page news-page">

    <article v-if="page" class="content-article news-article" aria-labelledby="news-title">
      <header class="news-article__header">
        <p class="news-article__eyebrow">お知らせ</p>
        <div class="news-article__meta">
          <time v-if="page.publishedAt" :datetime="page.publishedAt">
            {{ page.publishedAt.replaceAll('-', '.') }}
          </time>
          <span v-if="page.category" class="news-article__category">{{ page.category }}</span>
        </div>
        <h1 id="news-title" class="news-article__title">{{ page.title }}</h1>
      </header>

      <div class="news-article__body">
        <ContentRenderer :value="page" />
      </div>

      <footer class="news-article__footer">
        <BaseButton to="/" arrow="left">トップページへ戻る</BaseButton>
      </footer>
    </article>
  </main>
</template>

<style src="~/assets/content-page.scss" lang="scss" scoped></style>

<style lang="scss" scoped>
.news-page {
  padding: clamp(1.5rem, 4vw, 3rem) 1.5rem clamp(4rem, 8vw, 7rem);
  background: var(--bg-page);
}

.news-article {
  width: 100%;
  max-width: 48rem;
  margin-inline: auto;
}

.news-article__header {
  padding-block-end: 2rem;
  border-block-end: 1px solid var(--border-main);
}

.news-article__eyebrow {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin: 0 0 2.5rem;
  color: var(--color-secondary);
  font-size: 0.875rem;
  font-weight: 700;

  span {
    font-size: 0.6875rem;
    letter-spacing: 0.16em;
  }
}

.news-article__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1rem;
  font-size: 0.875rem;
  font-variant-numeric: tabular-nums;
}

.news-article__category {
  padding: 0.125rem 0.75rem;
  border: 1px solid var(--border-main);
  color: var(--color-secondary);
  font-size: 0.75rem;
}

.news-article__title {
  margin: 1.25rem 0 0;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0.025em;
  overflow-wrap: anywhere;
}

.news-article__body {
  padding-block: clamp(2rem, 5vw, 3rem) clamp(3rem, 6vw, 5rem);
  overflow-wrap: anywhere;

  :deep(.base-container__inner) {
    max-width: none;
    padding: 0;
  }
}

.news-article__footer {
  padding-block-start: 2rem;
  border-block-start: 1px solid var(--border-primary);

  :deep(.base-button) {
    margin-block: 0;
  }
}
</style>
