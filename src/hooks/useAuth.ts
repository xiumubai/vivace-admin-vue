import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/store/modules/auth'

// 无权限的时候提示
export const useAuth = (hasAuth: boolean) => {
  return new Promise((resolve) => {
    if (!hasAuth) {
      ElMessage({
        message: '你没有权限！！！',
        type: 'warning',
      })
    } else {
      resolve('success')
    }
  })
}

// 判断是否有权限
export const hasAuth = (value: string) => {
  const authStore = useAuthStore()
  const authButtons = authStore.authButtonList || []
  return authButtons.includes(value)
}
