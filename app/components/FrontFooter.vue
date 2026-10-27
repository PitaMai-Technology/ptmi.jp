<script setup lang="ts">
type FooterLink = {
  label: string
  to: string
}

type FooterGroup = {
  title: string
  links: FooterLink[]
}

defineEmits<{
  openCookieSettings: []
}>()

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <section class="contact-band" aria-labelledby="footer-contact-title">
      <div class="footer-inner contact-content">
        <h2 id="footer-contact-title">
          研究・その他のお問い合わせについて
        </h2>
        <p>お問い合わせは、コンタクトページからお気軽にご連絡ください。</p>

        <BaseButton to="/contact" align="center" arrow="right"
          class="text-xl py-2 px-6 font-bold border-2 border-solid border-secondary">
          お問い合わせ
        </BaseButton>
      </div>
    </section>

    <section class=" identity-band" aria-label="サイト情報">
      <div class="footer-inner identity-content">
        <NuxtLink class="footer-brand" to="/">
          <NuxtImg src="/logo.png" alt="PitaMaiロゴ" />
        </NuxtLink>
        <p>神道学の研究と、Vue.js／Nuxtを中心としたWeb開発をしています。</p>
      </div>
    </section>
    <div class="copyright-band">
      <div class="footer-inner copyright-content">
        <div class="flex flex-col flex-items-start gap-2 items-center text-sm">
          &copy; {{ currentYear }} PitaMai Technology
          <nav class="privacy-links" aria-label="プライバシー設定">
            <NuxtLink to="/privacy">
              プライバシーとCookie
            </NuxtLink>
            <button type="button" @click="$emit('openCookieSettings')">
              Cookie設定
            </button>
          </nav>
        </div>
        <BaseButton to="#top" align="end" arrow="up" class="text-sm text-gray800 footer-top-button">
          ページ上部へ戻る
        </BaseButton>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.site-footer {
  @apply text-neutral-800;

  &::before {
    display: block;
    height: clamp(3.5rem, 6vw, 6rem);
    content: '';
    background-color: color-mix(in srgb, var(--color-secondary) 35%, transparent);
  }

  a:not(.base-button) {
    @apply text-inherit no-underline;

    &:visited {
      @apply text-inherit;
    }
  }
}

.footer-inner {
  @apply w-full max-w-6xl mx-auto px-6;
}

.contact-band {
  background: color-mix(in srgb, var(--bg-footer-contact) 85%, transparent);
}

.contact-content {
  @apply flex flex-col items-center py-14 pt-20 text-center px-10;

}

.identity-band {
  color: var(--bg-page);
  background: color-mix(in srgb, var(--bg-footer) 90%, transparent);
}

.identity-content {
  @apply flex flex-col items-center py-14 text-center;

  >p {
    @apply max-w-xl mt-4 mb-0 text-sm leading-7;

    color: color-mix(in srgb, var(--bg-page) 80%, transparent);
  }
}

.footer-brand {
  @apply inline-flex items-center gap-4 text-4xl font-bold tracking-[0.03em];

  font-family: var(--font-main);
}

.copyright-band {
  color: var(--bg-page);
  background: color-mix(in srgb, var(--bg-footer) 90%, transparent);
  border-block-start: 1px solid color-mix(in srgb, var(--border-main) 18%, transparent);
}

.copyright-content .footer-top-button {
  background: var(--bg-page);
  box-shadow: none;
}

.copyright-content {
  @apply flex items-center justify-between gap-6 py-5;
}

.privacy-links {
  @apply flex flex-wrap items-center justify-center gap-x-5 gap-y-2;

  a,
  button {
    @apply m-0 border-0 bg-transparent p-0 text-sm underline cursor-pointer;

    color: inherit;
    font-family: inherit;
    text-underline-offset: 0.2em;
  }
}

@media (max-width: 800px) {
  .sitemap-grid {
    @apply grid-cols-2;
  }
}

@media (max-width: 520px) {

  .contact-content,
  .identity-content {
    @apply py-11;
  }

  .footer-brand {
    @apply text-3xl;

    :deep(img) {
      @apply h-14;
    }
  }

  .sitemap-band>.footer-inner {
    @apply py-12;
  }

  .sitemap-grid {
    @apply grid-cols-1;
  }

  .copyright-content {
    @apply flex-col items-start gap-2;
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-link {
    transition: none;
  }
}
</style>
