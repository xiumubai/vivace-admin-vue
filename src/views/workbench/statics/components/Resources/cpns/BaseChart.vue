<template>
  <div
    ref="pie"
    class="pie"
    :style="{
      height: props.height ? `${props.height}px` : '',
      width: props.width ? `${props.width}px` : '',
    }"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

const props = defineProps<{
  height: number
  width: number
  options: EChartsOption
}>()
const pie = ref()
onMounted(() => {
  const myChart = echarts.init(
    pie.value,
    {},
    {
      renderer: 'canvas',
    },
  )
  myChart.setOption(props.options)
})
</script>

<style scoped lang="scss">
.pie {
  width: 200px;
  height: 200px;
}
</style>
