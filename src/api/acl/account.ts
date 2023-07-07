/*
 * @Author: 朽木白
 * @Date: 2023-03-03 15:58:03
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-16 10:11:22
 * @Description: 系统账户接口
 */

import http from '@/utils/http'
import type { PageRes } from '../types'
import type { AclUser } from './types'

/**
 * @description 获取后台用户分页列表(带搜索)
 * @param page
 * @param limit
 * @param username
 * @returns {<PageRes<AclUser.ResAclUserList>>}
 */
export function getAclUserList(params: AclUser.ReqAclUserListParams) {
  return http.get<PageRes<AclUser.ResAclUserList>>(
    `/admin/acl/user/list`,
    params,
  )
}

/**
 * @description 新增用户
 * @param  {string} username
 * @param {string} nickName
 * @param {string} password
 * @returns {<PageRes<any>>}
 */
export function addAclUser(params: AclUser.ReqAclAddUser) {
  return http.post<PageRes<any>>(`/admin/acl/user/save`, params)
}

/**
 * @description: 编辑用户
 * @param {AclUser} user
 * @returns {<PageRes<any>>}
 */
export function updateAclUser(params: AclUser.ResAclUserList) {
  return http.put<PageRes<any>>(`/admin/acl/user/update`, params)
}

/**
 * @description: 删除用户
 * @param {AclUser} user
 * @returns {<PageRes<any>>}
 */
export function deleteAclUserById(id: string) {
  return http.delete<PageRes<any>>(`/admin/acl/user/delete/${id}`)
}

/**
 * @description: 批量删除用户
 * @param {string[]} ids
 * @returns {<PageRes<any>>}
 */
export function batchAclUser(ids: string[]) {
  return http.delete<PageRes<any>>(`/admin/acl/user/batchDelete`, ids)
}

/**
 * @description:   获取某个用户的所有角色
 * @param {string} userId
 * @returns {<PageRes<any>>}
 */
export function getUserRolesList(userId: string) {
  return http.get<PageRes<AclUser.ResUserRolesList>>(
    `/admin/acl/user/toAssign/${userId}`,
  )
}

/**
 * @description:   给某个用户分配角色
 * @param {AclUser.ReqAssignRoles} params
 * @returns {<PageRes<any>>}
 */
export function assignUserRoles(params: AclUser.ReqAssignRoles) {
  // Post方法传递get参数的方式需要下面这么写
  return http.post<PageRes<any>>(`/admin/acl/user/doAssign`, params)
}
