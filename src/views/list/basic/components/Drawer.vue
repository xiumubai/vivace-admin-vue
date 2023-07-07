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
      <el-form-item label="用户名" prop="name">
        <el-input
          v-model="drawerProps.rowData!.name"
          placeholder="请填写用户名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="用户头像" prop="avatar">
        <UploadImg
          v-model:imageUrl="drawerProps.rowData!.avatar"
          width="135px"
          height="135px"
          :file-size="3"
        >
          <template #empty>
            <el-icon><Avatar /></el-icon>
            <span>请上传头像</span>
          </template>
          <template #tip>头像大小不能超过 3M</template>
        </UploadImg>
      </el-form-item>

      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="drawerProps.rowData!.phone"
          placeholder="请输入手机号"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select
          v-model="drawerProps.rowData!.sex"
          placeholder="请选性别"
          style="width: 100%"
        >
          <el-option
            v-for="item in SEXLIST"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="VIP等级" prop="level">
        <el-select
          v-model="drawerProps.rowData!.level"
          placeholder="请选VIP等级"
          style="width: 100%"
        >
          <el-option
            v-for="item in VIPLEVEL"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
import { ElMessage, FormInstance } from 'element-plus'
import { SEXLIST, VIPLEVEL } from '@/utils/constant'
import { checkPhoneNumber } from '@/utils/eleValidate'
interface DrawerProps {
  title: string
  rowData?: any
  list?: any
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}

const rules = reactive({
  name: [
    { required: true, message: '请填写用户姓名' },
    { min: 2, message: '用户名不能小于2位' },
  ],
  phone: [{ required: true, validator: checkPhoneNumber, trigger: 'blur' }],
  avatar: [{ required: true, message: '请上传用户头像' }],
})

// drawer框状态
const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps>({
  title: '',
})

const loading = ref<boolean>(false)

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps): void => {
  drawerProps.value = params
  drawerVisible.value = true
}

const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return
    try {
      loading.value = true
      await drawerProps.value.api!(drawerProps.value.rowData)
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
