/*
 * @Author: 朽木白
 * @Date: 2023-06-25 15:00:42
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-26 09:31:31
 * @Description: 公共接口管理
 */
import http from '@/utils/http'
import type { IReqStatus, Upload } from './types'

/** 修改状态 */
export function changeStatus(params: IReqStatus) {
  return http.post<any>(`/admin/common/changeStatus/${params.type}`, {
    id: params.id,
    status: params.status,
  })
}

/** 上传图片 */
export function uploadImg(params: FormData) {
  return http.post<Upload.ResFileUrl>(`/admin/file/upload/img`, params)
}
