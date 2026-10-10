<template>
  <div class="hero-visual">
    <NuxtImg src="/hero1.png" alt="LismUI-Vueのコンポーネントデモ画面" class="hero-main" width="960" height="600" loading="eager" />

    <NuxtImg src="/hero2.png" alt="ピタマイが制作したZINEの表紙" class="hero-sub" width="400" height="566" loading="eager" />
  </div>
</template>

<style scoped lang="scss">
.hero-visual {
  position: relative;
  width: 100%;
  min-width: 0;
  padding: 0 12% 16% 0;
}

.hero-main {
  display: block;
  width: 100%;
  height: auto;
  border: 1px solid #DCE5DA;
  border-radius: 0.5rem;
  box-shadow: 0 8px 24px rgb(24 38 28 / 6%);
}

.hero-sub {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 36%;
  height: auto;
  border: 1px solid #DCE5DA;
  border-radius: 0.25rem;
  box-shadow: 0 8px 24px rgb(24 38 28 / 8%);
}

@media (max-width: 767px) {
  .hero-visual {
    padding-right: 10%;
    padding-bottom: 14%;
  }

  .hero-sub {
    width: 34%;
  }
}
</style>