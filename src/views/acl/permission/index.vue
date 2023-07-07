<template>
  <div>
    <ProTable
      ref="proTable"
      :pagination="false"
      :toolButton="false"
      :columns="columns"
      :requestApi="getPermissionList"
    >
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          type="primary"
          link
          v-if="BUTTONS['btn.Permission.add']"
          icon="UserFilled"
          :disabled="scope.row.level === 4"
          @click="openDialog(1, scope.row)"
        >
          {{ scope.row.level === 3 ? '添加功能' : '添加菜单' }}
        </el-button>
        <el-button
          type="primary"
          link
          v-if="BUTTONS['btn.Permission.update']"
          icon="Edit"
          :disabled="scope.row.level === 1"
          @click="openDialog(2, scope.row)"
        >
          编辑
        </el-button>
        <el-button
          type="primary"
          link
          icon="Delete"
          v-if="BUTTONS['btn.Permission.remove']"
          :disabled="scope.row.level === 1"
          @click="handleDelete(scope.row)"
        >
          删除
        </el-button>
      </template>
    </ProTable>
    <PermissonDialog ref="DialogRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useHandleData } from '@/hooks/useHandleData'
import {
  getPermissionList,
  deletePermission,
  updatePermission,
  addPermission,
} from '@/api'
import type { Permission } from '@/api/acl/types'
import PermissonDialog from './components/PermissionDialog.vue'
import { useAuthButtons } from '@/hooks/useAuthButtons'

const { BUTTONS } = useAuthButtons()

const columns = [
  { prop: 'name', label: '名称', align: 'left' },
  { prop: 'code', label: '权限值' },
  // { prop: 'toCode', label: '跳转权限值' },
  { prop: 'updateTime', label: '修改时间' },
  { prop: 'operation', label: '操作', fixed: 'right', width: 280 },
]

// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref()
// 打开Dialog
const DialogRef = ref()
const openDialog = (type: number, rowData: Permission.ResPermisionList) => {
  const params = {
    type,
    rowData: { ...rowData },
    api: type == 1 ? addPermission : updatePermission,
    getTableList: proTable.value?.getTableList,
  }
  DialogRef.value.acceptParams(params)
}
// *根据id删除菜单
const handleDelete = async (row: Partial<Permission.ResPermisionList> = {}) => {
  await useHandleData(deletePermission, row?.id as string, `删除${row.name}`)
  proTable.value?.getTableList()
}
</script>
