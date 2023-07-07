/*
 * @Author: 朽木白
 * @Date: 2023-03-10 11:31:11
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-16 10:36:18
 * @Description: 角色接口
 */
import http from '@/utils/http'
import type { PageRes } from '../types'
import type { Role } from './types'

/**
 * @description 获取后台用户分页列表(带搜索)
 * @param page
 * @param limit
 * @param roleName
 * @returns {<PageRes<Role.ResRoleList>>}
 */
export function getRoleList(params: Role.ReqRoleListParams) {
  return http.get<PageRes<Role.ResRoleList>>(
    `/admin/acl/role/list/${params.pageSize}/${params.pageNum}`,
    { roleName: params.roleName },
  )
}

/**
 * @description 删除角色
 * @param { string } id
 * @returns {<PageRes<any>>}
 */
export function deleteRole(id: string) {
  return http.delete<PageRes<any>>(`/admin/acl/role/remove/${id}`)
}

/**
 * @description 添加角色
 * @param { string } id
 * @returns {<PageRes<any>>}
 */
export function addRole(roleName: object) {
  return http.post<PageRes<any>>(`/admin/acl/role/save`, roleName)
}

/**
 * @description 修改角色
 * @param { string } id
 * @returns {<PageRes<any>>}
 */
export function updateRole(role: object) {
  return http.put<PageRes<any>>(`/admin/acl/role/update`, role)
}
