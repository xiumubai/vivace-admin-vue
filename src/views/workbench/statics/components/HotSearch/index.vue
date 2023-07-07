<template>
  <div class="search">
    <div class="search-left">
      <HotSearch></HotSearch>
    </div>
    <div class="search-right">
      <Trend></Trend>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HotSearch from '@/views/workbench/statics/components/HotSearch/cpns/HotSearch.vue'
import Trend from '@/views/workbench/statics/components/HotSearch/cpns/Trend.vue'
</script>

<style scoped lang="scss">
.search {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .search-left {
    width: 48%;
  }
  .search-right {
    width: 48%;
  }
}
</style>
