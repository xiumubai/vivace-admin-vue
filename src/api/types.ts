// * 分页请求参数
export interface ReqPage {
  id?: number
  pageNum: number
  pageSize: number
}

// * 分页响应参数
export interface PageRes<T> {
  list: T[]
  pageNum?: number
  pageSize?: number
  total: number
}
