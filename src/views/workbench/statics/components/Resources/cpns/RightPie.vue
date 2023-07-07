<template>
  <BaseChart :height="200" :width="200" :options="options"></BaseChart>
</template>

<script setup lang="ts">
import BaseChart from '@/views/workbench/statics/components/Resources/cpns/BaseChart.vue'
import * as echarts from 'echarts'

const options: any = {
  backgroundColor:
    'linear-gradient(90deg, rgba(7, 32, 39, 0.4) 0%, #1B302C 100%)',
  title: {
    text: 65 + '%',
    x: 'center',
    y: 'center',
    textStyle: {
      fontSize: '45',
      fontWeight: '400',
      fontFamily: 'Source Han Sans CN',
      color: '#56D4B2',
    },
  },
  series: [
    {
      type: 'pie',
      clockWise: true,
      hoverAnimation: false,
      radius: ['63%', '67%'],
      center: ['50%', '50%'],
      itemStyle: {
        normal: {
          label: {
            show: false,
          },
        },
      },
      data: [
        {
          value: 100,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0.2, 1, 0.3, 0, [
                {
                  offset: 0,
                  color: 'rgba(54, 72, 71, 1)',
                },
                {
                  offset: 1,
                  color: 'rgba(17, 192, 178, 1)',
                },
              ]),
            },
          },
        },
      ],
    },
    {
      type: 'pie',
      silent: true,
      hoverAnimation: false,
      radius: ['70%', '72%'],
      center: ['50%', '50%'],
      itemStyle: {
        normal: {
          label: {
            show: false,
          },
        },
      },
      data: _pie(),
    },
  ],
}
function _pie() {
  let dataArr = []
  for (let i = 0; i < 100; i++) {
    if (i % 2 === 0) {
      dataArr.push({
        value: 10,
        itemStyle: {
          normal: {
            color: 'rgba(25, 38, 63, 1)',
          },
        },
      })
    } else {
      dataArr.push({
        value: 10,
        itemStyle: {
          normal: {
            color: 'rgba(0,0,0,0)',
          },
        },
      })
    }
  }
  return dataArr
}
</script>

<style scoped lang="scss"></style>
