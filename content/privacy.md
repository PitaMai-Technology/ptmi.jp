---
title: プライバシーとCookie
description: このサイトでのGoogle Analyticsの利用目的と、アクセス解析Cookieの設定方法をご案内します。
---

::base-container
# プライバシーとCookie

## Google Analyticsについて

このサイトでは、どのページがよく読まれているかなど、サイトの利用状況を把握し、内容や使いやすさを改善するために、Google LLCが提供するGoogle Analytics（Google アナリティクス）を使用しています。

閲覧したページのURLや参照元、ブラウザや端末に関する情報などが、アクセス解析のためにGoogleに送信されることがあります。広告用Cookieの使用、広告目的でのユーザーデータ送信、パーソナライズ広告は、アクセス解析Cookieの選択にかかわらず無効にしています。

## アクセス解析Cookieの設定

このブラウザに選択が保存されていない場合、アクセス解析用のCookieを許可するか拒否するかを選べます。

- 「解析Cookieを許可」を選ぶと、Google Analyticsがアクセス解析用のCookieを読み書きできるようになります。
- 「拒否する」を選んだ場合や、まだ選択していない場合は、アクセス解析用のCookieの読み書きを無効にします。

| Cookie                      | 用途            | 保存期間                     |
| --------------------------- | ------------- | ------------------------ |
| `eita-analytics-consent-v1` | 許可または拒否の選択を保存 | 最長1年間                    |
| `_ga`、`_ga_*` など            | 許可した場合のアクセス解析 | Google Analyticsの設定によります |

ページ下部の「Cookie設定」から、いつでも選択を変更できます。許可から拒否に変更すると、このサイトから削除できるアクセス解析用のCookieを削除します。

## Cookieを使わない計測

このサイトでは、Googleの同意モードの詳細モード（Advanced）を使用しています。アクセス解析用のCookieを拒否した場合や、まだ選択していない場合も、同意状態やページ閲覧に関する計測信号が、Cookieを使わずにGoogleへ送信されることがあります。計測信号の通信には、時刻、参照元、ブラウザの種類、画面サイズなどの情報が含まれる場合があります。詳しくは、[Google Analyticsの同意モードのリファレンス](https://support.google.com/analytics/answer/13802165?hl=ja)をご覧ください。

## Googleへのデータ送信

Google Analyticsへの計測通信には、Nuxt Scriptsのプロキシを使用しています。このサイトのサーバーを経由してGoogleへ転送する際に、訪問者のIPアドレス、言語設定、端末のハードウェアに関する一部の情報を加工し、送信する情報を減らしています。詳しくは、[Nuxt ScriptsのGoogle Analytics連携](https://scripts.nuxt.com/scripts/google-analytics)をご覧ください。

Googleによるデータの取り扱いについては、[Googleのプライバシーポリシー](https://policies.google.com/privacy?hl=ja)と[Googleのサービスを使用するサイトやアプリから収集した情報のGoogleによる使用](https://policies.google.com/technologies/partner-sites?hl=ja)をご覧ください。
::
