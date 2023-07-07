/*
 * @Author: 朽木白
 * @Date: 2023-06-16 15:41:27
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-26 17:12:44
 * @Description: 主播管理
 */

import http from '@/utils/http'
import type { PageRes, ReqPage } from '../types'
import type { IAnchor } from './types'

/**
 * @description 获取分页列表(带搜索)
 * @param page
 * @param limit
 * @param roleName
 * @returns {<PageRes<IAnchor.IResAnchor>>}
 */
export function getAnchorList(params: IAnchor.IReqQuery) {
  const startTime =
    params.createTime && params.createTime.length > 0 && params.createTime[0]
  const endTime =
    params.createTime && params.createTime.length > 0 && params.createTime[1]
  return http.get<PageRes<IAnchor.IResAnchor>>(
    `/admin/user/anchor/list/${params.pageSize}/${params.pageNum}`,
    {
      name: params.name,
      phone: params.phone,
      sex: params.sex,
      liveTimes: params.liveTimes,
      startTime,
      endTime,
    },
  )
}

/** 主播认证信息 */
export function getAuth(id: string) {
  return http.get<IAnchor.IResAuth>(`/admin/user/anchor/getAuth/${id}`)
}

/** 主播认证 */
export function doAuth(params: IAnchor.IDoAuth) {
  return http.post<PageRes<any>>(`/admin/user/anchor/doAuth`, params)
}

/** 直播记录列表*/
export function getLiveRecordList(params: ReqPage) {
  return http.get<PageRes<any>>(`/admin/user/anchor/liveRecord/${params.id}`, {
    pageSize: params.pageSize,
    pageNum: params.pageNum,
  })
}

/** 获取主播认证成功信息 */
export function getAuthDetail(id: string) {
  return http.get<IAnchor.IResAuth>(`/admin/user/anchor/getAuthDetail/${id}`)
}
