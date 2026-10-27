# Nuxt Content Starter

Look at the [Nuxt Content documentation](https://content.nuxt.com) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Nuxt Studioでカルーセルを編集する

カードを並べる場合は `BaseCarousel` の `autoSlides` を有効にして、
`ProjectCard` を直接配置します。直下の各要素が1枚のスライドになります。
このモードでは `BaseCarouselSlide` を使いません。
通常のスライド指定は `autoSlides: false`（既定）で引き続き利用できます。

```md
::base-container
  :::base-carousel
  ---
  autoSlides: true
  desktopItemsToShow: 1
  ---

    ::::project-card
    #title
    制作物の名前

    #description
    Markdownで説明を記述します。
    ::::
  :::
::
```

コンポーネントのYAML設定に続いて別のコンポーネントを入れる場合は、
設定の閉じ `---` の後に空行を置きます。
現在の依存バージョンでは、深いネスト内の名前付きスロットが
StudioのMarkdown再生成で外側に移動するケースを確認しています。
上の形式ではネストを1段減らし、再生成を繰り返しても構造が保持されます。

Studioと同じパーサー・再生成処理で10回の往復を検証できます。
このチェックはファイルを書き換えません。

```bash
cat content/index.md | node scripts/check-studio-mdc.mjs
```

この検証はMarkdownの再生成を対象とし、Studioの画面操作全体を保証するものではありません。

## お知らせの追加

Nuxt Studioまたはエディタで `content/news/[slug].md` を作成します。
公開日とタイトルは必須、カテゴリは任意です。ファイル名が詳細ページのURLになります。
例えば `content/news/example.md` は `/news/example` です。

```md
---
title: お知らせのタイトル
publishedAt: '2026-10-11'
category: 更新情報
---

::base-container
# お知らせのタイトル

お知らせの本文を記述します。
::
```

トップページの `:news-list` は最新3件、`/news` は全件を公開日の降順で表示します。
一覧では画像と説明文を表示しません。日付は `YYYY.MM.DD` 形式になります。
通常ページと同じContentコレクションを使用し、一覧は `/news/` 配下で公開日を設定した記事を対象にします。
