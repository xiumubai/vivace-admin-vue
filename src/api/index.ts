/*
 * @Author: 朽木白
 * @Description: 接口
 * @docs: http://139.198.152.148:8110/doc.html#/home
 */

export { login, getUserInfo, logout } from './login'
export {
  getAclUserList,
  addAclUser,
  updateAclUser,
  deleteAclUserById,
  batchAclUser,
  getUserRolesList,
  assignUserRoles,
} from './acl/account'

export { getRoleList, deleteRole, addRole, updateRole } from './acl/role'

export {
  getRolePermission,
  assignRolePermission,
  getPermissionList,
  deletePermission,
  addPermission,
  updatePermission,
} from './acl/permission'
