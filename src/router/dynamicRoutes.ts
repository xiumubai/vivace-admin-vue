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
 * @param meta.badge ==> 徽标
 * @param meta.noAuth ==> 路由是否添加权限
 * */
import { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layouts/index.vue')

export const dynamicRoutes: RouteRecordRaw[] = [
  // 外部链接
  {
    path: '/link',
    component: Layout,
    redirect: '/link/github',
    meta: {
      title: '外部链接',
      badge: 'Hot',
      icon: 'Link',
      noAuth: true,
    },
    children: [
      {
        path: '/link/github',
        component: () => import('@/views/acl/user/index.vue'), // 外部链接的component随意写
        meta: {
          noAuth: true,
          title: 'Github',
          icon: 'Link',
          isLink: 'https://github.com/xiumubai/vivace-admin-vue',
        },
      },
      {
        path: '/link/yuque',
        component: () => import('@/views/acl/user/index.vue'),
        meta: {
          noAuth: true,
          title: '开源文档',
          icon: 'Link',
          isLink: 'https://www.yuque.com/xiumubai/open',
        },
      },
    ],
  },
  // 权限管理
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
      badge: 'New',
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
        meta: { title: '复杂列表', icon: 'Grid', noAuth: true, badge: 'New' },
      },
    ],
  },
  // 常用组件模块
  {
    name:'commonComponent',
    path:'/commonComponent',
    component: Layout,
    redirect: '/edit/markdown',
    meta:{
      title: '常用组件',
      icon: 'Grid',
      noAuth: true,
    },
    children: [
      {
        name: 'Markdown',
        path: '/edit/markdown',
        component: () => import('@/views/editor/markdown/index.vue'),
        meta: {
          title: 'markdown',
          icon: 'Document',
          noAuth: true,
        },
      },
      {
        name: 'Wangeditor',
        path: '/edit/wangeditor',
        component: () => import('@/views/editor/wangeditor/index.vue'),
        meta: {
          title: '富文本',
          icon: 'Notebook',
          noAuth: true,
        },
      },
      {
        name: 'qrCode',
        path: '/edit/qrCode',
        component: () => import('@/views/commonComponent/qrCode/index.vue'),
        meta: {
          title: '二维码生成',
          icon: 'Picture',
          noAuth: true,
        },
      },
    ],

  },
]
