<script setup lang="ts">
/**
 * content/news/[slug].md のお知らせを公開日の降順で表示する。
 * 各記事にはtitleとpublishedAt（YYYY-MM-DD）を設定する。categoryは任意。
 *
 * @example トップページの最新3件（MDC）
 * :news-list
 *
 * @example 全件表示（MDC）
 * :news-list{:limit="0" :show-all-link="false"}
 */
const props = withDefaults(defineProps<{
  /** 表示件数。0で全件表示。 */
  limit?: number
  /** /newsへの一覧リンクを表示する。 */
  showAllLink?: boolean
}>(), {
  limit: 3,
  showAllLink: true,
})

const { data: news, error } = await useAsyncData(
  () => `news-list-${props.limit}`,
  () => {
    const query = queryCollection('content')
      .where('path', 'LIKE', '/news/%')
      .where('publishedAt', 'IS NOT NULL')
      .select('path', 'title', 'publishedAt', 'category')
      .order('publishedAt', 'DESC')
      .order('path', 'ASC')
    if (props.limit > 0) query.limit(Math.floor(props.limit))
    return query.all()
  },
)
</script>

<template>
  <div class="news-list">
    <p v-if="error" role="status">お知らせを読み込めませんでした。</p>
    <ul v-else-if="news?.length" class="news-list__items">
      <li v-for="item in news" :key="item.path" class="news-list__item">
        <NuxtLink :to="item.path" class="news-list__link">
          <span class="news-list__text">
            <span v-if="item.category" class="news-list__category">{{ item.category }}</span>
            <span class="news-list__title">{{ item.title }}</span>
          </span>
          <time :datetime="item.publishedAt" class="news-list__date">
            {{ item.publishedAt?.replaceAll('-', '.') }}
          </time>
          <Icon name="i-lucide-arrow-down-right" class="h-6 w-6" />
        </NuxtLink>
      </li>
    </ul>
    <p v-else role="status">現在、お知らせはありません。</p>
  </div>
</template>

<style scoped lang="scss">
.news-list__items {
  list-style: none;
  margin: 0;
  padding: 0;
  border: 2px solid var(--color-secondary);
}

.news-list__item+.news-list__item {
  border-block-start: 1px solid var(--color-secondary);
}

.news-list__link {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-content: center;
  gap: 0.5rem 2rem;
  min-height: 8.5rem;
  padding: 2rem 2.5rem;
  color: inherit;
  text-decoration: none;

  &:visited {
    color: inherit;
  }

  &:hover .news-list__title {
    text-decoration: underline;
  }
}

.news-list__date {
  grid-column: 1;
  font-size: 0.875rem;
  font-variant-numeric: tabular-nums;
}

.news-list__text {
  grid-column: 1;
  min-width: 0;
}

.news-list__category {
  display: block;
  margin-block-end: 0.25rem;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.news-list__title {
  line-height: 1.7;
  overflow-wrap: anywhere;
}

.news-list__all {
  display: block;
  width: fit-content;
  margin-block-start: 1.25rem;
  margin-inline-start: auto;
}

@media (width < 640px) {
  .news-list__link {
    gap: 0.5rem 1rem;
    padding: 1.5rem;
  }
}
</style>
