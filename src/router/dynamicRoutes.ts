/**
 * @description 📚 路由参数配置简介
 * @param path ==> 菜单路径
 * @param name ==> 菜单别名
 * @param redirect ==> 重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 菜单信息
 * @param meta.icon ==> 菜单图标
 * @param meta.title ==> 菜单标题
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单
 * @param meta.isLink ==> 是否外链
 * @param meta.isHide ==> 是否隐藏
 * @param meta.isFull ==> 是否全屏(示例：数据大屏页面)
 * @param meta.isAffix ==> 是否固定在 tabs nav
 * @param meta.isKeepAlive ==> 是否缓存
 * */
import { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layouts/index.vue')

export const dynamicRoutes: RouteRecordRaw[] = [
  // 权限管理 *此路由放在最后*
  {
    name: 'Acl',
    path: '/acl',
    component: Layout,
    redirect: '/acl/user',
    meta: {
      title: '权限管理',
      icon: 'Setting',
    },
    children: [
      {
        name: 'User',
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'UserFilled',
        },
      },
      {
        name: 'Role',
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'Avatar',
        },
      },
      {
        name: 'Permission',
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        meta: {
          title: '菜单管理',
          icon: 'Menu',
        },
      },
      {
        path: '/acl/button',
        component: () => import('@/views/acl/button/index.vue'),
        meta: {
          title: '按钮权限',
          icon: 'Menu',
          noAuth: true,
        },
      },
    ],
  },
  // 基础数据模块
  {
    path: '/list',
    component: Layout,
    redirect: '/list/basic',
    name: 'UserManage',
    meta: {
      title: '列表页面',
      icon: 'Menu',
    },
    children: [
      {
        path: '/list/basic',
        name: 'UserNormal',
        component: () => import('@/views/list/basic/index.vue'),
        meta: { title: '基础列表', icon: 'Grid' },
      },
      {
        path: '/list/basic/show/:id',
        component: () => import('@/views/list/basic/show.vue'),
        meta: {
          title: '详情',
          isHide: true,
          noAuth: true,
          icon: 'Grid',
        },
      },
      {
        path: '/list/complex',
        component: () => import('@/views/list/complex/index.vue'),
        meta: { title: '复杂列表', icon: 'Grid', noAuth: true, isNew: true },
      },
    ],
  },
]
