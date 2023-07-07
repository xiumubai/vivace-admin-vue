<template>
  <div class="resource">
    <el-card header="各类资源占比" class="resource-left-card">
      <div class="resource-pie-list">
        <LeftPie
          :color="item.color"
          :value="item.value"
          :pieText="item.title"
          :key="item.id"
          v-for="item in list"
        ></LeftPie>
      </div>
    </el-card>
    <el-card header="资源剩余" class="resource-right-card">
      <RightPie style="margin: 0 auto"></RightPie>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import LeftPie from './cpns/LeftPie.vue'
import RightPie from './cpns/RightPie.vue'
import { reactive } from 'vue'
const list = reactive([
  { id: 1, title: '长视频', value: 28, color: 'green' },
  { id: 2, title: '短视频', value: 22, color: 'blue' },
  { id: 3, title: '帖子', value: 22, color: 'black' },
  { id: 4, title: '直播', value: 22, color: 'red' },
])
</script>

<style lang="scss" scoped>
.resource {
  display: flex;
  .resource-left-card {
    width: 80%;
    margin-top: 20px;
    margin-right: 20px;
    .resource-pie-list {
      display: flex;
      align-items: center;
    }
  }
  .resource-right-card {
    margin-top: 20px;
    width: calc(20% - 20px);
  }
}
</style>
