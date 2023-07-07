<template>
  <div>
    <router-view v-if="!isLock"></router-view>
    <transition v-if="isLock && $route.name !== 'login'" name="slide-up">
      <ScreenLock />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from './hooks/useTheme'
import { useScreenLockStore } from '@/store/modules/screenLock'
// 锁屏
const screenLockStore = useScreenLockStore()
const isLock = computed(() => screenLockStore.isLocked)
// 初始化主题配置
const { initTheme } = useTheme()
initTheme()
</script>
