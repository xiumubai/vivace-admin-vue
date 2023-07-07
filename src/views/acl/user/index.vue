<template>
  <div>
    <ProTable
      ref="proTable"
      :columns="columns"
      :requestApi="getAclUserList"
      :initParam="initParam"
    >
      <template #tableHeader="scope">
        <el-button
          type="primary"
          icon="Plus"
          v-auth="['btn.User.add']"
          @click="openDrawer('新增')"
        >
          添加
        </el-button>
        <el-button
          type="danger"
          icon="Delete"
          plain
          v-auth="['btn.User.remove']"
          @click="batchDelete(scope.selectedListIds)"
          :disabled="!scope.isSelected"
        >
          批量删除
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          type="primary"
          link
          icon="UserFilled"
          v-auth="['btn.User.assgin']"
          @click="openDrawer('分配角色', scope.row)"
        >
          分配角色
        </el-button>
        <el-button
          type="primary"
          link
          icon="Edit"
          v-auth="['btn.User.update']"
          @click="openDrawer('编辑', scope.row)"
        >
          编辑
        </el-button>
        <el-button
          type="primary"
          link
          icon="Delete"
          v-auth="'btn.User.remove'"
          @click="handleDelete(scope.row)"
        >
          删除
        </el-button>
      </template>
    </ProTable>
    <UserDrawer ref="drawerRef" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import UserDrawer from './components/UserDrawer.vue'
import type { AclUser } from '@/api/acl/types'
import { useHandleData } from '@/hooks/useHandleData'
import { ElMessage } from 'element-plus'
import {
  getAclUserList,
  addAclUser,
  updateAclUser,
  deleteAclUserById,
  batchAclUser,
  getUserRolesList,
  assignUserRoles,
} from '@/api'

// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref()

// *表格配置项
const columns: ColumnProps[] = [
  { type: 'selection', fixed: 'left', width: 80 },
  { type: 'index', label: '#', width: 80 },
  { prop: 'id', label: 'id' },
  {
    prop: 'username',
    label: '用户名',
    search: { el: 'input', props: { placeholder: '输入用户名' } },
  },
  { prop: 'nickName', label: '用户昵称' },
  { prop: 'roleName', label: '角色列表' },
  { prop: 'phone', label: '联系方式', width: 120 },
  { prop: 'createTime', label: '创建时间', sortable: true, width: 120 },
  { prop: 'updateTime', label: '更新时间', sortable: true, width: 120 },
  { prop: 'operation', label: '操作', fixed: 'right', width: 280 },
]

// *查询参数
const initParam = reactive({})
// *新增、编辑、分配角色
const drawerRef = ref()
const openDrawer = async (
  title: string,
  rowData: Partial<AclUser.ResAclUserList> = {},
) => {
  let params = {
    title,
    rowData: { ...rowData },
    list: title === '分配角色' ? await getUserRolesList(rowData!.id || '') : [],
    api:
      title === '新增'
        ? addAclUser
        : title === '编辑'
        ? updateAclUser
        : assignUserRoles,
    getTableList: proTable.value?.getTableList,
  }
  drawerRef.value.acceptParams(params)
}

// *根据id删除用户
const handleDelete = async (row: AclUser.ResAclUserList) => {
  if (row?.username === 'admin') {
    ElMessage({
      type: 'warning',
      message: `系统用户不允许删除`,
    })
    return
  }
  await useHandleData(deleteAclUserById, row.id, `删除${row.username}用户`)
  proTable.value?.getTableList()
}

// *批量删除用户
const batchDelete = async (ids: string[]) => {
  await useHandleData(batchAclUser, ids, '删除所选用户信息')
  proTable.value?.clearSelection()
  proTable.value?.getTableList()
}
</script>
