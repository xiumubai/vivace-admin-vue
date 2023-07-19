<template>
  <el-card>
    <el-row :gutter="20">
      <el-col>
        <el-input
          v-model="inputValue"
          placeholder="请输入二维码内容"
          style="width: 300px"
        />
        <el-button type="primary" @click="defaultQrCode">普通二维码</el-button>
        <el-button type="primary" @click="bgImgQrCode">背景图</el-button>
        <el-button type="primary" @click="logoQrCode">中心logo</el-button>
        <el-button type="primary" @click="colorQrCode">随机颜色</el-button>
        <el-button type="primary" @click="downloadQrCode">下载</el-button>
      </el-col>
      <el-col></el-col>
    </el-row>
    <el-image
      :style="[{ width: qrCodeSize + 'px' }, { height: qrCodeSize + 'px' }]"
      :src="downloadFileUrl"
      :zoom-rate="1.2"
      :previewSrcList="[downloadFileUrl]"
      :initial-index="4"
      fit="cover"
    />
    <vue-qr
      class="myqrcode"
      :text="inputValue"
      :logoSrc="logoSrc"
      :bgSrc="bgSrc"
      :colorDark="colorDark"
      :callback="callbackQrCode"
      :size="qrCodeSize"
      :bindElement="true"
    ></vue-qr>
  </el-card>
</template>
<script setup lang="ts">
import vueQr from 'vue-qr/src/packages/vue-qr.vue'
import { ref } from 'vue'
import { downloadBase64file } from '@/utils/index'

const bgImg =
  'https://images.unsplash.com/photo-1688320952889-e18706009bc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60'
const logoImg =
  'https://images.unsplash.com/photo-1689170649735-a8c259851e2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4Mnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60'

const inputValue = ref<string>('https://baidu.com')
const bgSrc = ref<string>('')
const logoSrc = ref<string>('')
const colorDark = ref<string>('rgba(0,0,0,1)')
const downloadFileUrl = ref<string>('')
const qrCodeSize = ref<number>(200)

const defaultQrCode = () => {
  bgSrc.value = ''
  logoSrc.value = ''
  colorDark.value = 'rgba(0,0,0,1)'
}
const bgImgQrCode = () => {
  bgSrc.value = bgSrc.value ? '' : bgImg
}
const logoQrCode = () => {
  logoSrc.value = logoSrc.value ? '' : logoImg
}
const colorQrCode = () => {
  bgSrc.value = ''
  let r = Math.floor(Math.random() * 256)
  let g = Math.floor(Math.random() * 256)
  let b = Math.floor(Math.random() * 256)
  colorDark.value = `rgb(${r},${g},${b},1)`
}

const callbackQrCode = (url) => {
  downloadFileUrl.value = url
}

const downloadQrCode = () => {
  downloadBase64file(downloadFileUrl.value, '二维码')
}
</script>

<style lang="scss" scoped>
.myqrcode {
  opacity: 0;
  position: fixed;
  top: -100px;
}
</style>
