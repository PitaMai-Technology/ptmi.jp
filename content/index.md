---
title: 小林栄太(eita.vue)のポートフォリオ
loc: /
---

:top-hero

::base-container
---
mediaPosition: left
mode: media-text
---
私たちは、Web技術を中心に、さまざまなものづくりを楽しむ小さな団体です。

オープンソースソフトウェアの開発から文章・出版物の制作まで、それぞれの興味やアイデアを形にする活動を行っています。

#media
## ピタマイについて
::

::base-container
## 活動・プロジェクト

  :::base-carousel{auto-slides :desktop-items-to-show='1' :items-to-show='1'}
    ::::project-card
    ---
    image: /hero2.png
    imageFit: contain
    ---
    #title
    出版・創作活動

    #description
    文章などの発信を通じた制作活動
    ::::

    ::::project-card
    ---
    target: _blank
    ---
    #title
    LismUI-Vue

    #category
    OSS / Web系

    #description
    Vue.js向けのUIライブラリ開発

    #body
    ```bash
    npm i lism-ui-vue
    npm i @lism-ui-vue/nuxt
    ```
    ::::
  :::
::

::base-container{mode="default"}
## お知らせ

  :::news-list{:limit='3'}
  :::
::
