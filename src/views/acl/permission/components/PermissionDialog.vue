<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    :destroy-on-close="true"
    width="500px"
  >
    <el-form
      ref="ruleFormRef"
      label-width="100px"
      label-suffix=" :"
      :rules="rules"
      :model="permissionData"
    >
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="permissionData!.name"
          placeholder="请填写名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="权限值" prop="code">
        <el-input
          v-model="permissionData!.code"
          placeholder="请填写权限值"
          clearable
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button
        type="primary"
        @click="handleSubmit(ruleFormRef)"
        :loading="loading"
      >
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="RoleDialog">
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import type { Permission } from '@/api/acl/types'
interface DialogProps {
  type: number
  rowData?: Permission.ResPermisionList
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}

let permissionData = ref<Permission.ResPermisionList>({
  name: '',
  code: '',
})

const rules = reactive({
  name: [{ required: true, message: '请填写名称' }],
  code: [{ required: true, message: '请填写权限值' }],
})

const dialogVisible = ref(false)
// dialog标题
const title = ref<string>()
const loading = ref<boolean>(false)

// props定义
const dialogProps = ref<DialogProps>({ type: 1 })
// 接收父组件参数
const acceptParams = (params: DialogProps): void => {
  const row: any = params.rowData
  if (params.type === 1) {
    permissionData.value = {
      pid: row.id, // pid ==> parentId 父权限数据的id
      level: row.level! + 1,
      type: row.level == 3 ? 2 : 1,
    }
  } else {
    permissionData.value = row
  }

  title.value = getDialogTitle(params)
  dialogProps.value = params
  dialogVisible.value = true
}
// 初始化dialog标题
const getDialogTitle = (params: DialogProps): string => {
  const level = params.rowData && params.rowData.level
  let title = ''
  if (params.type === 1) {
    if (level === 1) {
      title = '添加一级菜单'
    }
    if (level === 2) {
      title = '添加二级菜单'
    }

    if (level === 3) {
      title = '添加功能'
    }
  } else {
    if (level === 1) {
      title = '修改一级菜单'
    }
    if (level === 2 || level === 3) {
      title = '修改二级菜单'
    }
    if (level === 4) {
      title = '修改功能'
    }
  }
  return title
}
const ruleFormRef = ref<FormInstance>()

const handleSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (!valid) return
    try {
      loading.value = true
      await dialogProps.value.api!(permissionData.value)
      ElMessage.success({ message: `${title.value}成功！` })
      dialogProps.value.getTableList!()
      dialogVisible.value = false
      loading.value = false
      // 重置表单
      resetForm(formEl)
    } catch (error) {
      loading.value = false
      console.log(error)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
// 暴露给父组件的方法
defineExpose({
  acceptParams,
})
</script>

<style lang="scss" scoped></style>
