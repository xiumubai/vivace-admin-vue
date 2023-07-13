<template>
  <div class="home container">
    <div class="page-header">
      <el-avatar :size="60" :src="userInfo?.avatar" />
      <div class="page-header-tip">
        <p class="page-header-tip-title">
          {{ timeFix() }}，{{ userInfo?.name }}，{{ welcome() }}
        </p>
        <p class="page-header-tip-desc">
          添加白哥wx
          <el-tag>xiumubai01</el-tag>
          参与开源项目
        </p>
      </div>
    </div>
    <div class="home-main">
      <div class="main-left">
        <el-card shadow="hover" class="card-item project">
          <template #header>
            <h3>社区介绍</h3>
          </template>
          <el-descriptions border :column="2">
            <el-descriptions-item
              v-for="item in INFOLIST"
              :key="item.name"
              :span="item.span"
            >
              <template #label>
                <div style="width: 70px">{{ item.name }}</div>
              </template>
              <a v-if="item.isLink" :href="item.desc">{{ item.desc }}</a>
              <span v-else>{{ item.desc }}</span>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
        <el-card shadow="hover" class="card-item log">
          <template #header>
            <h3>更新动态</h3>
          </template>
          <el-scrollbar height="324px">
            <el-timeline v-show="logList?.length > 0">
              <el-timeline-item
                v-for="(item, index) in logList"
                :key="index"
                :timestamp="item.timestamp"
                type="primary"
                placement="top"
              >
                <MdPreview :editorId="item.id" :modelValue="item.content" />
              </el-timeline-item>
            </el-timeline>
            <el-empty v-show="logList?.length === 0" />
          </el-scrollbar>
        </el-card>
      </div>
      <div class="main-right">
        <el-card shadow="hover" class="card-item option">
          <template #header>
            <h3>快捷操作</h3>
          </template>
          <div class="options-card">
            <el-card
              shadow="hover"
              class="options-card-item"
              v-for="item in OPTIONSLIST"
              :key="item.name"
              @click="handleView(item.link)"
            >
              <div class="options-item">
                <el-icon size="30" :color="item.color">
                  <component :is="item.icon"></component>
                </el-icon>
                <span class="text-lx text-center">{{ item.name }}</span>
              </div>
            </el-card>
          </div>
        </el-card>
        <el-card shadow="hover" class="card-item">
          <div class="welcome">
            <SvgIcon name="welcome" size="400px" />
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { useUserStore } from '@/store/modules/user'
import { timeFix, welcome } from '@/utils/index'
// 更新日志可以从github的realses中动态获取，然后使用md格式进行展示
import { logList } from './log'
import { useRouter } from 'vue-router'
import { OPTIONSLIST, INFOLIST } from '@/utils/constant'
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
const router = useRouter()
const userStore = useUserStore()
const userInfo = userStore.userInfo
/** 快捷操作跳转 */
const handleView = (url: string) => {
  router.push({
    path: url,
  })
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
