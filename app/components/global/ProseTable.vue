<script setup lang="ts">
defineOptions({ inheritAttrs: false })
</script>

<template>
  <div class="table-container">
    <div class="table-scroll" role="region" aria-label="表" tabindex="0">
      <table v-bind="$attrs">
        <slot />
      </table>
    </div>
  </div>
</template>

<style scoped>
.table-container {
  container: content-table / inline-size;
  width: 100%;
  min-width: 0;
}

.table-scroll {
  width: 100%;
  min-width: 0;
  margin-block-end: 1.25rem;
}

@container content-table (width < 768px) {
  .table-scroll {
    overflow-x: auto;
  }

  .table-scroll table {
    table-layout: auto;
  }

  .table-scroll :deep(th),
  .table-scroll :deep(td) {
    min-width: 8rem;
  }
}
</style>
