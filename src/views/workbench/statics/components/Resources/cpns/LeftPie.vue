<template>
  <BaseChart :options="options" :height="200" :width="200"></BaseChart>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseChart from './BaseChart.vue'

interface Props {
  pieText: string
  value: number
  color?: string // 颜色有默认值
}
const props = withDefaults(defineProps<Props>(), {
  color: '#e6e9f0',
})
const total = ref(100)
const options: any = computed(() => {
  return {
    backgroundColor: '#fff',
    title: [
      {
        top: 30,
        left: 30,
        textStyle: {
          color: '#35598d',
          fontSize: 18,
          fontWeight: 'normal',
        },
      },
    ],
    graphic: [
      {
        type: 'text',
        top: '49%',
        left: '12%',
        style: {
          text: props.pieText,
          font: '10px "microsoft yahei"',
          textAlign: 'center',
          fill: '#4d71df',
        },
      },
    ],
    series: [
      {
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['20%', '26%'],
        startAngle: 180, //起始角度
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        emphasis: false,
        data: [
          {
            value: props.value,
            name: '',
            itemStyle: {
              normal: {
                color: props.color,
              },
            },
          },
          {
            name: '',
            itemStyle: {
              emphasis: {
                color: '#e6e9f0',
              },
              normal: {
                color: '#e6e9f0',
              },
            },
            value: total.value - props.value, // 总数减去当前项数(灰色占比)
          },
        ],
      },
    ],
  }
})
</script>

<style scoped></style>
