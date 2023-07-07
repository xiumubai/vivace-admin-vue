<template>
  <el-card shadow="never" body-style="border: none;">
    <template #header>
      <el-page-header @back="goBack">
        <template #content>
          <span class="text-large font-600 mr-3">【基础列表】详情页面</span>
        </template>
      </el-page-header>
    </template>
    <el-tabs v-model="activeName">
      <el-tab-pane label="上传视频" name="first">
        <ProTable
          :columns="columns1"
          :toolButton="false"
          :initParam="initParam"
          :requestApi="getVideoList"
        ></ProTable>
      </el-tab-pane>
      <el-tab-pane label="账户余额" name="second">
        <ProTable
          :columns="columns2"
          :toolButton="false"
          :initParam="initParam"
          :requestApi="getAccountList"
        ></ProTable>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { getVideoList, getAccountList } from '@/api/user/normal'
import { ColumnProps } from '@/components/ProTable/src/types'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const activeName = ref('first')
// *查询参数
const initParam = reactive({
  id: route.params.id,
})

const goBack = () => {
  router.back()
}

// *表格配置项
const columns1: ColumnProps[] = [
  { prop: 'id', label: 'ID', width: 80, fixed: 'left' },
  { prop: 'type', label: '视频类型' },
  { prop: 'title', label: '标题' },
  { prop: 'time', label: '时长' },
  { prop: 'authStatus', label: '审核状态' },
  { prop: 'createTime', label: '添加时间' },
]

// *表格配置项
const columns2: ColumnProps[] = [
  { prop: 'id', label: 'ID', width: 80, fixed: 'left' },
  { prop: 'type', label: '交易类型' },
  { prop: 'amount', label: '交易金额' },
  { prop: 'status', label: '交易状态' },
  { prop: 'account', label: '实时余额' },
  { prop: 'createTime', label: '交易时间' },
]
</script>

<style scoped></style>
