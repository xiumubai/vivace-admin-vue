<template>
  <el-drawer
    v-model="drawerVisible"
    :destroy-on-close="true"
    size="450px"
    :title="`${drawerProps.title}用户`"
  >
    <el-form
      ref="ruleFormRef"
      label-width="100px"
      label-suffix=" :"
      :rules="rules"
      :model="drawerProps.rowData"
    >
      <el-form-item label="用户姓名" prop="username">
        <el-input
          :disabled="drawerProps.title === '分配角色'"
          v-model="drawerProps.rowData!.username"
          placeholder="请填写用户姓名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item
        label="用户昵称"
        prop="name"
        v-if="drawerProps.title !== '分配角色'"
      >
        <el-input
          v-model="drawerProps.rowData!.nickName"
          placeholder="请填写用户昵称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item
        label="用户密码"
        prop="password"
        v-if="drawerProps.title === '新增'"
      >
        <el-input
          v-model="drawerProps.rowData!.password"
          placeholder="请填写用户密码"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item
        label="角色列表"
        prop="rolesId"
        v-if="drawerProps.title === '分配角色'"
      >
        <el-checkbox
          v-model="state.checkAll"
          :indeterminate="state.isIndeterminate"
          style="margin-right: 30px"
          @change="handleCheckAllChange"
        >
          全选
        </el-checkbox>
        <el-checkbox-group
          v-model="state.assignRoles"
          @change="handleCheckedChange"
        >
          <el-checkbox
            v-for="item in state.allRolesList"
            :key="item.id"
            :label="item.id"
          >
            {{ item.roleName }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading">
        确定
      </el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref, reactive } from 'vue'
import { CheckboxValueType, ElMessage, FormInstance } from 'element-plus'
import type { Roles } from '@/api/acl/types'
interface DrawerProps {
  title: string
  rowData?: any
  list?: any
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}

interface RolesState {
  allRolesList: Roles[]
  assignRoles: string[]
  checkAll: boolean
  isIndeterminate: boolean
}

const rules = reactive({
  username: [
    { required: true, message: '请填写用户姓名' },
    { min: 4, message: '用户名不能小于4位' },
  ],
  password: [
    { required: true, message: '请填写用户密码' },
    { min: 6, message: '密码不能小于6位' },
  ],
})

// drawer框状态
const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps>({
  title: '',
})

const loading = ref<boolean>(false)

// 角色选择状态管理
const state: RolesState = reactive({
  allRolesList: [],
  assignRoles: [],
  checkAll: false,
  isIndeterminate: false,
})

// 全选
const handleCheckAllChange = (val: CheckboxValueType) => {
  state.assignRoles = val
    ? state.allRolesList.map((item: Roles) => item.id)
    : []
  console.log(state.assignRoles)

  state.isIndeterminate = false
}

// 单选
const handleCheckedChange = (value: CheckboxValueType[]) => {
  const checkedCount = value.length
  state.checkAll = checkedCount === state.allRolesList.length
  state.isIndeterminate =
    checkedCount > 0 && checkedCount < state.allRolesList.length
}

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps): void => {
  if (params.title === '分配角色') {
    const { list } = params
    state.allRolesList = list.data.allRolesList
    state.assignRoles = list.data.assignRoles.map((item: Roles) => item.id)
    state.isIndeterminate = state.assignRoles.length > 0 ? true : false
  }
  drawerProps.value = params
  drawerVisible.value = true
}

const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return
    try {
      loading.value = true
      if (drawerProps.value.title === '分配角色') {
        const params = {
          userId: drawerProps.value.rowData.id,
          roleIdList: state.assignRoles,
        }
        await drawerProps.value.api!(params)
      } else {
        await drawerProps.value.api!(drawerProps.value.rowData)
      }
      ElMessage.success({ message: `${drawerProps.value.title}用户成功！` })
      drawerProps.value.getTableList!()
      drawerVisible.value = false
      loading.value = false
    } catch (error) {
      loading.value = false

      console.log(error)
    }
  })
}

defineExpose({
  acceptParams,
})
</script>
<style lang="scss" scoped></style>
