import type { ReqPage } from '../types'

export interface Roles {
  deleted?: boolean
  gmtCreate?: string
  gmtModified?: string
  id: string
  remark?: null
  roleName: string
}
// * 用户管理模块
export namespace AclUser {
  export interface ReqAclUserListParams extends ReqPage {
    username?: string
  }
  export interface ReqAclAddUser {
    username: string
    nickName?: string
    password: string
  }
  export interface ReqAssignRoles {
    userId: string
    roleIdList: string
  }
  export interface ResAclUserList {
    deleted: boolean
    gmtCreate: string
    gmtModified: string
    id: string
    nickName: string
    password: string
    roleName: string
    salt: null
    token: null
    username: string
  }
  export interface ResUserRolesList {
    allRolesList: Roles[]
    assignRoles: Roles[]
  }
}

// * 角色管理模块
export namespace Role {
  export interface ReqRoleListParams extends ReqPage {
    roleName?: string
  }

  export interface ResRoleList {
    deleted?: boolean
    gmtCreate?: string
    gmtModified?: string
    id: string
    remark?: any
    roleName: string
  }
}

// * 菜单管理模块
export namespace Permission {
  export interface ReqAssignPermision {
    roleId: string
    permissionId: string
  }

  export interface ReqAddPermission {
    code: string
    level: number
    name: string
    pid: string
    toCode: string
    type: string
  }

  export interface ResPermisionList {
    id?: string
    pid?: string // 父级权限菜单的id
    level?: number // 菜单层级
    name?: string
    select?: boolean // 菜单是否选中
    children?: ResPermisionList[]
    code?: string // 权限值
    type?: number // 权限类型，type=1为菜单 type=2为按钮
  }
}
