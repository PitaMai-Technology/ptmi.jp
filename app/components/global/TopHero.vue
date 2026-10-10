<template>
  <BaseContainer>
    <div class="grid grid-cols-1 lg:grid-cols-2
             items-center gap-10 py-8 lg:py-14">
      <div class="space-y-6">
        <p class="text-sm font-medium tracking-wider
                 text-secondary">
          PitaMai Technology／ピタマイ・テクノロジー
        </p>

        <h1 class="text-4xl xl:text-5xl font-bold
                 leading-tight text-ink">
          ちょうど良いぐらいの<br class="hidden sm:block">
          テクノロジー。
        </h1>

        <p class="text-base leading-relaxed text-muted">
          Web技術を中心に、オープンソースソフトウェアの
          開発や創作活動に取り組む小さな団体です。
        </p>

        <div class="hero-actions flex flex-wrap gap-3">
          <BaseButton to="/projects" arrow="right" class="hero-button">
            プロジェクトを見る
          </BaseButton>

          <BaseButton to="/about" arrow="none" class="hero-button hero-button--secondary">
            私たちについて
          </BaseButton>
        </div>
      </div>

      <TopHeroAside />
    </div>
  </BaseContainer>
</template>

<style scoped lang="scss">
.hero-actions .hero-button {
  margin: 0;
  padding: 0.75rem 1.25rem;
  font-weight: 500;
}

.hero-actions .hero-button--secondary {
  color: var(--color-secondary);
  background: transparent;
  border: 1px solid var(--border-main);
  box-shadow: none;
}

.hero-actions .hero-button--secondary:hover {
  background: var(--bg-aside);
}
</style>
