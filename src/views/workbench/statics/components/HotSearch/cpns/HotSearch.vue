<template>
  <el-card header="线上热门搜索">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="50"
      class="mt-4"
    />
  </el-card>
</template>

<script lang="ts" setup>
// import { computed } from 'vue'
// import BaseChart from '@/views/workbench/statics/components/Resources/cpns/BaseChart.vue'
// const options = computed(() => {
//   return {}
// })
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<style scoped lang="scss">
.el-pagination {
  margin-top: 20px;
  display: flex;
  align-items: flex-end;
}
</style>
