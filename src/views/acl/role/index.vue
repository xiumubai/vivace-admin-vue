<template>
  <div>
    <ProTable ref="proTable" :columns="columns" :requestApi="getRoleList">
      <!-- Expand -->
      <template #tableHeader>
        <Auth :value="['btn.Role.add']">
          <el-button type="primary" icon="Plus" @click="openDialog('新增')">
            添加
          </el-button>
        </Auth>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <Auth :value="['btn.Role.assgin']">
          <el-button
            type="primary"
            link
            icon="UserFilled"
            @click="openDrawer('分配权限', scope.row)"
          >
            分配权限
          </el-button>
        </Auth>
        <Auth :value="['btn.Role.update']">
          <el-button
            type="primary"
            link
            icon="Edit"
            @click="openDialog('编辑', scope.row)"
          >
            编辑
          </el-button>
        </Auth>
        <Auth :value="['btn.Role.remove']">
          <el-button
            type="primary"
            link
            icon="Delete"
            @click="handleDelete(scope.row)"
          >
            删除
          </el-button>
        </Auth>
      </template>
    </ProTable>
    <RoleDialog ref="DialogRef" />
    <DoleDrawer ref="DrawerRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import RoleDialog from './components/RoleDialog.vue'
import DoleDrawer from './components/RoleDrawer.vue'
import type { Role } from '@/api/acl/types'
import { useHandleData } from '@/hooks/useHandleData'
import {
  getRoleList,
  deleteRole,
  addRole,
  updateRole,
  getRolePermission,
  assignRolePermission,
} from '@/api'
import { Auth } from '@/components/Auth'

const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  { prop: 'id', label: 'id' },
  {
    prop: 'roleName',
    label: '角色名称',
    search: { el: 'input', props: { placeholder: '输入角色名称' } },
  },
  { prop: 'createTime', label: '创建时间', sortable: true },
  { prop: 'updateTime', label: '更新时间', sortable: true },
  { prop: 'operation', label: '操作', fixed: 'right', width: 280 },
]

const proTable = ref()
// 打开Dialog
const DialogRef = ref()
const openDialog = (title: string, rowData: Partial<Role.ResRoleList> = {}) => {
  const params = {
    title: title,
    rowData: { ...rowData },
    api: title === '新增' ? addRole : updateRole,
    getTableList: proTable.value?.getTableList,
  }
  DialogRef.value.acceptParams(params)
}

// 打开Drawer
const DrawerRef = ref()
const openDrawer = async (title: string, rowData: Role.ResRoleList) => {
  const params = {
    title: title,
    rowData,
    list: await getRolePermission(rowData!.id),
    api: assignRolePermission,
    getTableList: proTable.value?.getTableList,
  }
  DrawerRef.value.acceptParams(params)
}

// *根据id删除角色
const handleDelete = async (row: Role.ResRoleList) => {
  await useHandleData(deleteRole, row.id, `删除${row.roleName}角色`)
  proTable.value?.getTableList()
}
</script>
