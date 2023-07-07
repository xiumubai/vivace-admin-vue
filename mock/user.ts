import { resultError, resultSuccess, getRequestToken } from './_utils'
// mock/user.ts

function createUserList() {
  return [
    {
      userId: 1,
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'admin',
      password: '111111',
      desc: '平台管理员',
      roles: ['平台管理员'],
      buttons: ['cuser.detail'],
      routes: ['home'],
      token: 'Admin Token',
    },
    {
      userId: 2,
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'system',
      password: '111111',
      desc: '系统管理员',
      roles: ['系统管理员'],
      buttons: ['cuser.detail', 'cuser.user'],
      routes: ['home'],
      token: 'System Token',
    },
  ]
}

export default [
  // 用户登录
  {
    url: '/dev-api/mock/admin/acl/index/login',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      const checkUser = createUserList().find(
        (item) => item.username === username && item.password === password,
      )
      if (!checkUser) {
        return resultError('Incorrect username or password！')
      }
      const { token } = checkUser
      return resultSuccess({
        token,
      })
    },
  },
  // 获取用户信息
  {
    url: '/mock/user/info',
    method: 'get',
    response: (request) => {
      const token = getRequestToken(request)
      const checkUser = createUserList().find((item) => item.token === token)
      if (!checkUser) {
        return resultError(
          'The corresponding user information was not obtained!',
        )
      }
      return resultSuccess(checkUser)
    },
  },
  // 一个失败的请求
  {
    url: '/dev-api/error',
    method: 'get',
    response: () => {
      return {
        code: 1,
        message: '密码错误',
        data: null,
      }
    },
  },
]
