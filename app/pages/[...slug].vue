<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
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
  <main class="content-page" :class="{ 'content-page--top': route.path === '/' }">
    <article class="content-article">
      <div class=""></div>
      <ContentRenderer v-if="page" :value="page" />
    </article>
  </main>
</template>

<style src="~/assets/content-page.scss" lang="scss" scoped></style>
