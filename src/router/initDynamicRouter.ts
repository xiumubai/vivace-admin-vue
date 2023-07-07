import { RouteRecordRaw } from 'vue-router'
import router from './index'
import NProgress from '@/config/nprogress'
import { ElNotification } from 'element-plus'
import { LOGIN_URL, ROUTER_WHITE_LIST } from '@/config/config'
import { useAuthStore } from '@/store/modules/auth'
import { useUserStore } from '@/store/modules/user'
import { dynamicRoutes } from './dynamicRoutes'
import { notFoundRouter, staticRoutes } from './constantRoutes'
import { RESEETSTORE } from '@/utils/reset'
/**
 * @description 路由拦截
 */
router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const userStore = useUserStore()
  // 1.判断是访问登陆页，有 Token 就在当前页面，没有 Token 重置路由并放行到登陆页
  if (to.path === LOGIN_URL) {
    if (userStore.token) return next(from.fullPath)
    return next()
  }

  // 2.判断访问页面是否在路由白名单(不需要登陆)地址中，如果存在直接放行
  if (ROUTER_WHITE_LIST.includes(to.path)) return next()

  // 3.判断是否有 Token，没有token跳转到登陆页面并且携带原目标路径
  if (!userStore.token) {
    return next({ path: LOGIN_URL, query: { redirect: to.fullPath } })
  }
  // 4.如果没有菜单列表，就重新请求菜单列表并添加动态路由
  const authStore = useAuthStore()
  authStore.setRouteName(to.name as string)
  if (!authStore.authRouterList.length) {
    await initDynamicRouter()
    return next({ ...to, replace: true })
  }
  // 5.上述条件都不满足，直接放行
  return next()
})

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
  NProgress.done()
})

/**
 * @description 路由跳转错误
 * */
router.onError((error) => {
  NProgress.done()
  console.warn('路由错误', error.message)
})

/**
 * @description 获取动态路由
 */
const initDynamicRouter = async () => {
  const authStore = useAuthStore()
  const userStore = useUserStore()

  try {
    // 1.请求用户信息，携带路由权限信息
    await userStore.GetInfoAction()

    // 判断当前用户有没有菜单权限
    if (!authStore.authRouterList.length) {
      ElNotification({
        title: '无权限访问',
        message: '当前账号无任何菜单权限，请联系系统管理员！',
        type: 'warning',
        duration: 3000,
      })
      RESEETSTORE()
      router.replace(LOGIN_URL)
      return Promise.reject('No permission')
    }

    // 2.过滤路由
    const routerList = filterAsyncRoutes(
      dynamicRoutes,
      authStore.authRouterList,
    )

    // 3.添加动态路由
    routerList.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw)
    })

    // 4.添加notFound路由
    router.addRoute(notFoundRouter)

    // 5.处理subMenu数据,静态路由和动态路由拼接，过滤isHide=true的路由
    const menuList = getMenuList([
      ...staticRoutes,
      ...routerList,
    ] as unknown as Menu.MenuOptions[])
    authStore.setAuthMenuList(menuList)
  } catch (error) {
    // 当按钮 || 菜单请求出错时，重定向到登陆页
    RESEETSTORE()
    router.replace(LOGIN_URL)
    return Promise.reject(error)
  }
}

/**
 * @description 路由过滤
 */
function filterAsyncRoutes(
  dynamicRoutes: RouteRecordRaw[],
  authRouterList: string[],
) {
  return dynamicRoutes.filter((route) => {
    // 1.如果route的name在routeNames中没有, 直接过滤掉
    if (route?.meta?.noAuth) return true
    if (!authRouterList.includes(route.name as string)) return false

    // 2.如果当前route还有子路由(也就是有children), 需要对子路由也进行权限过滤
    if (route.children && route.children.length > 0) {
      route.children = filterAsyncRoutes(route.children, authRouterList)
    }
    return true
  })
}

/**
 * @description menu过滤
 */
function getMenuList(menuList: Menu.MenuOptions[]) {
  const newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList))

  return newMenuList.filter((item) => {
    item.children?.length && (item.children = getMenuList(item.children))
    return !item.meta?.isHide
  })
}
