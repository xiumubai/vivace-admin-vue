/**
 * @description: Login interface parameters
 */

import type { UserInfo } from '@/api/login/types'
export interface LoginParams {
  username: string
  password: string
}

export interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
}
