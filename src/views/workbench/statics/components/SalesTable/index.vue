<template>
  <el-card class="sales-table-card">
    <template #header>
      <div class="header">
        <div class="header-left">
          <div class="header-left-title active">销售额</div>
          <div class="header-left-title">访问量</div>
        </div>

        <div class="title-right">
          <span>今年</span>
          <span>本周</span>
          <span>本月</span>
          <span>本年</span>
          <el-date-picker
            type="daterange"
            start-placeholder="Start date"
            end-placeholder="End date"
          />
        </div>
      </div>
    </template>
    <div class="table">
      <div class="table-left">
        <div class="table-left-body" ref="table1"></div>
      </div>
      <div class="table-right">
        <div class="table-right-body" ref="table2"></div>
      </div>
    </div>
    <!-- <div class="sales-table"></div> -->
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const table1 = ref()
const table2 = ref()
onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  const myChart1 = echarts.init(
    table1.value,
    {},
    {
      width: 800,
      height: 400,
    },
  )
  // 绘制图表
  myChart1.setOption({
    title: {
      text: '销售额趋势',
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
      },
    ],
  })

  // 基于准备好的dom，初始化echarts实例
  const myChart2 = echarts.init(
    table2.value,
    {},
    {
      width: 600,
      height: 400,
    },
  )
  // 绘制图表
  myChart2.setOption({
    title: {
      text: '销售额占比分析',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { value: 40, name: '长视频' },
          { value: 10, name: '短视频' },
          { value: 20, name: '直播' },
          { value: 20, name: '帖子' },
          { value: 10, name: '问答' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.el-card :deep(.el-card__body) {
  padding-top: 0;
}
.sales-table-card {
  margin-top: 20px;
}
.el-card {
  display: flex;
  flex-direction: column;
  :deep(.el-card__header) {
    padding-top: 0;
    padding-bottom: 0;
  }
  .header {
    height: 60px;
    line-height: 60px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .header-left {
      font-size: 1.2em;
      display: flex;
      align-items: center;
      .header-left-title {
        padding: 0 0.5em;
        border-bottom: 3px solid transparent;
        cursor: pointer;
        &.active {
          border-bottom: 2px solid rgb(24, 144, 255);
          color: rgb(24, 144, 255);
        }
        &:first-child {
          margin-right: 1em;
        }
      }
    }
    .title-right {
      display: flex;
      align-items: center;
      span {
        cursor: pointer;
        margin-right: 1em;
      }
    }
  }
  .table {
    padding-top: 1em;
    width: 100%;
    height: 400px;
    display: flex;
    .table-left {
      width: 60%;
      height: 600px;
      .table-left-body {
        height: 600px;
        width: 100%;
      }
    }
    .table-right {
      width: 40%;
      height: 100%;
      .table-right-body {
        height: 100%;
      }
    }
  }
}
</style>
