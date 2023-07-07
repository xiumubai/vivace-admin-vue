<template>
  <div>
    <ProTable ref="proTable" :columns="columns" :requestApi="getNormalUserList">
      <template #tableHeader="scope">
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!BUTTONS['btn.UserNormal.add']"
          @click="openDialog('新增')"
        >
          新增
        </el-button>

        <el-button type="primary" icon="Upload" plain @click="batchAdd">
          导入
        </el-button>
        <el-button type="primary" icon="Download" plain @click="downloadFile">
          导出
        </el-button>
        <el-button
          type="danger"
          icon="Delete"
          plain
          @click="batchDelete(scope.selectedListIds)"
          :disabled="!scope.isSelected"
        >
          批量删除
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          v-if="scope.row.status !== 1"
          type="primary"
          link
          icon="Edit"
          :disabled="!BUTTONS['btn.UserNormal.update']"
          @click="openDialog('编辑', scope.row)"
        >
          编辑
        </el-button>
        <el-button
          type="primary"
          link
          icon="Delete"
          :disabled="!BUTTONS['btn.UserNormal.update']"
          @click="handleDelete(scope.row)"
        >
          删除
        </el-button>
        <el-button
          v-if="scope.row.status !== 1"
          type="primary"
          link
          icon="View"
          :disabled="!BUTTONS['btn.UserNormal.view']"
          @click="handleView(scope.row.id)"
        >
          详情
        </el-button>
      </template>
    </ProTable>
    <Drawer ref="drawerRef" />
    <ImportExcel ref="dialogRef" />
  </div>
</template>
<script setup lang="tsx">
import type { INormalMange } from '@/api/user/types'
import { ref, computed } from 'vue'
import { ColumnProps, EnumProps } from '@/components/ProTable/src/types'
import { useAuth, hasAuth } from '@/hooks/useAuth'
import { useAuthButtons } from '@/hooks/useAuthButtons'
import { changeStatus } from '@/api/common/index'
import { SEXLIST, VIPLEVEL } from '@/utils/constant'
import { useHandleData } from '@/hooks/useHandleData'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { exportExcel } from '@/utils/exprotExcel'
import {
  getNormalUserList,
  addNormalUser,
  updateNormalUser,
  deleteUserById,
  batchUser,
  // exportUserInfo,
  downLoadExcelTemp,
  ImportUserInfo,
} from '@/api/user/normal'
import Drawer from './components/Drawer.vue'
import ImportExcel from './components/ImportExcel.vue'
const router = useRouter()
const { BUTTONS } = useAuthButtons()

// *表格配置项
const columns: ColumnProps[] = [
  { type: 'selection', fixed: 'left', width: 80 },
  { prop: 'id', label: 'ID', width: 80 },
  {
    prop: 'name',
    label: '用户名',
    search: { el: 'input', props: { placeholder: '请输入用户名' } },
  },
  {
    prop: 'avatar',
    label: '头像',
    width: 100,
    render: ({ row }) => {
      return (
        <>
          <el-avatar size={50} src={row.avatar} />
        </>
      )
    },
  },
  {
    prop: 'phone',
    label: '手机号',
    width: 140,
    search: { el: 'input', props: { placeholder: '请输入手机号' } },
  },
  {
    prop: 'sex',
    label: '性别',
    width: 100,
    render: ({ row }) => {
      return row.sex === 0 ? '男' : '女'
    },
    fieldNames: { label: 'name', value: 'id' },
    enum: computed(() => {
      return SEXLIST || []
    }) as unknown as EnumProps[],
    search: { el: 'select', props: { placeholder: '请选择性别' } },
  },
  {
    prop: 'level',
    label: 'VIP等级',
    width: 100,
    enum: computed(() => {
      return VIPLEVEL || []
    }) as unknown as EnumProps[],
    search: { el: 'select', props: { placeholder: '请选择VIP等级' } },
  },
  { prop: 'account', label: '账户余额', width: 100 },
  {
    prop: 'onlineStatus',
    label: '在线状态',
    width: 100,
    render: ({ row }) => {
      return row.onlineStatus === 0 ? (
        <el-tag type="success">离线</el-tag>
      ) : (
        <el-tag type="info">离线</el-tag>
      )
    },
  },
  {
    prop: 'authStatus',
    label: '主播认证',
    width: 100,
    render: ({ row }) => {
      return row.authStatus === 0 ? (
        <el-tag type="warning">未认证</el-tag>
      ) : (
        <el-tag>已认证</el-tag>
      )
    },
  },
  {
    prop: 'createTime',
    label: '注册时间',
    width: 180,
    search: {
      el: 'date-picker',
      span: 2,
      props: { type: 'datetimerange', valueFormat: 'YYYY-MM-DD HH:mm:ss' },
    },
  },
  {
    prop: 'status',
    label: '状态',
    width: 110,
    render: ({ row }) => {
      return (
        <el-switch
          v-model={row.status}
          active-text={row.status ? '启用' : '禁用'}
          onClick={() => handleChangeStatus(row)}
        />
      )
    },
  },
  { prop: 'operation', label: '操作', fixed: 'right', width: 220 },
]

// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref()

const drawerRef = ref()
const openDialog = async (title: string, row?: INormalMange.IResNormal) => {
  // 检查是否有操作权限
  const isAuth =
    title === '新增'
      ? hasAuth('btn.UserNormal.add')
      : hasAuth('btn.UserNormal.update')
  await useAuth(isAuth)
  // 其他的逻辑
  let params = {
    title,
    rowData: { ...row },
    api: title === '新增' ? addNormalUser : updateNormalUser,
    getTableList: proTable.value?.getTableList,
  }
  drawerRef.value.acceptParams(params)
}

/** 修改状态 */
const handleChangeStatus = async (row: any) => {
  await useHandleData(
    changeStatus,
    {
      type: 'creator',
      id: row.id,
      status: row.status == 1 ? 0 : 1,
    },
    `切换【${row.name}】用户状态`,
  )
  // proTable.value?.getTableList()
}

/** 根据id删除用户 */
const handleDelete = async (row: INormalMange.IResNormal) => {
  await useHandleData(deleteUserById, row.id, `删除${row.name}用户`)
  proTable.value?.getTableList()
}

// *批量删除用户
const batchDelete = async (ids: string[]) => {
  await useHandleData(batchUser, ids, '删除所选用户信息')
  proTable.value?.clearSelection()
  proTable.value?.getTableList()
}

/** 查看详情 */
const handleView = (id: number) => {
  router.push({
    path: `/list/basic/show/${id}`,
  })
}

/** 导出 */
const downloadFile = () => {
  ElMessageBox.confirm('确认导出用户数据?', '温馨提示', {
    type: 'warning',
  }).then(async () => {
    // 导出根据查询参数，带分页
    // 第一种方式：根据接口导出
    // const res = await exportUserInfo({
    //   ...proTable.value?.searchParam,
    //   ...proTable.value?.pageable,
    // })

    const format = ref('xlsx')
    exportExcel({
      column: columns,
      data: proTable.value?.tableData, // 表格渲染数据
      filename: '导出 excel',
      format: format.value,
      autoWidth: true,
    })
  })
}
/** 批量添加用户 */
const dialogRef = ref()
const batchAdd = () => {
  let params = {
    title: '用户',
    columns,
    tempApi: downLoadExcelTemp, // 模板下载数据
    importApi: ImportUserInfo, // 导入请求接口
    getTableList: proTable.value.getTableList,
  }
  dialogRef.value.acceptParams(params)
}
</script>

<style lang="scss" scoped></style>
