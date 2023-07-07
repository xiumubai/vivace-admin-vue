/*
 * @Author: 朽木白
 * @Date: 2023-06-16 15:41:27
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-19 15:52:21
 * @Description: 演员管理
 */

import http from '@/utils/http'
import type { PageRes } from '../types'
import type { IActor } from './types'

/**
 * @description 获取分页列表(带搜索)
 * @param page
 * @param limit
 * @param roleName
 * @returns {<PageRes<IActor.IResCreator>>}
 */
export function getActorList(params: IActor.IReqQuery) {
  return http.get<PageRes<IActor.IResActor>>(
    `/admin/user/actor/list/${params.pageSize}/${params.pageNum}`,
    { name: params.name },
  )
}
