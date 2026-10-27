---
title: Projects root file
---

::base-container
# 活動・プロジェクト

ピタマイ・テクノロジーでは、OSSの開発・保守やサークル名義での同人誌の制作・発行を中心に活動しています
::

::base-container
  :::project-grid{columns="2" gap="small"}
    ::::project-card
    #body
    ![hero1](/hero1.png)

    #title
    エンジニアリング

    #category
    プログラミング

    #description
    Web系のプログラミングやライブラリ開発などしています。

    #actions
      :::::base-button
      ---
      align: start
      arrow: external
      label: GitHubへ行くリンク
      target: _blank
      text: GitHubを見る
      to: https://github.com/PitaMai-Technology
      ---
      :::::
    ::::

    ::::project-card
    #title
    創作・出版活動

    #category
    創作活動

    #description
    エッセイなど、さまざまなテーマの同人誌を制作・発行しています。

    #actions
      :::::base-button{align="center" arrow="down"}
      詳しく見る
      :::::

    #body
    ![hero2](/hero2.png)
    ::::
  :::

  :::base-button{align="center" arrow="down" to="#制作物"}
  詳しく見る
  :::
::

::base-container
## 制作物

  :::project-grid{columns="2" gap="small"}
    ::::base-card
    ---
    arrow: external
    mode: divided
    ---
    Lism CSSベースのVue.js向けラッパー兼UIライブラリ

    Nuxtモジュールもあり、自動インポートなど相性バツグン

    #title
    ### LismUI-Vue

    #footer
    ```bash
    npm i lism-ui-vue
    npm i @lism-ui-vue/nuxt
    ```
    ::::
  :::
::
