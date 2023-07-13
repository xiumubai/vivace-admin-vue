<template>
  <MdEditor v-model="text" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const text = ref('## md-editor-v3')
</script>

<style lang="scss" scoped></style>
