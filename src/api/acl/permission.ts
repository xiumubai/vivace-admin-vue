/*
 * @Author: 朽木白
 * @Date: 2023-03-10 11:31:11
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-13 15:56:58
 * @Description: 权限接口
 */
import http from '@/utils/http'
import type { PageRes } from '../types'
import type { Permission } from './types'

/**
 * @description 查看某个角色权限列表
 * @param { string } id
 * @returns {<PageRes<any>>}
 */
export function getRolePermission(roleId: string | number) {
  return http.get<PageRes<Permission.ResPermisionList[]>>(
    `/admin/acl/permission/toAssign/${roleId}`,
  )
}

/**
 * @description 给某个角色分配权限
 * @param { Permission.ReqAssignPermision } data
 * @returns {<PageRes<any>>}
 */
export function assignRolePermission(data: Permission.ReqAssignPermision) {
  return http.post<PageRes<any>>(
    `/admin/acl/permission/doAssign`,
    {},
    { params: data },
  )
}

/**
 * @description 获取权限菜单列表
 * @returns
 */
export function getPermissionList() {
  return http.get<PageRes<Permission.ResPermisionList[]>>(
    `admin/acl/permission`,
  )
}

/**
 * @description 删除权限
 * @param { string } id
 * @returns
 */
export function deletePermission(id: string) {
  return http.delete<PageRes<any>>(`admin/acl/permission/remove/${id}`)
}

/**
 * @description 新增权限
 * @param { string } id
 * @returns
 */
export function addPermission(data: Permission.ResPermisionList) {
  return http.post<PageRes<any>>(`admin/acl/permission/save`, data)
}

/**
 * @description 修改权限
 * @param { string } id
 * @returns
 */
export function updatePermission(data: Permission.ResPermisionList) {
  return http.put<PageRes<any>>(`admin/acl/permission/update`, data)
}
