import type { ReqPage } from '../types'

/**
 * VIP等级
 */
export type Level = 'VIP' | 'SVIP'

/**
 * 性别
 */
export enum Sex {
  The0 = '0',
  The1 = '1',
}

/**
 * 开启状态
 */
export type Empty = '0' | '1'

/**
 * select
 */
export interface ISelectItem {
  value: string
  label: string
}

export namespace ILongVideo {
  export interface IReqQuery extends ReqPage {
    title: string
    author: string
    authStatus: string
    category: string
    uploadTime: string[]
    authTime: string[]
  }

  export interface ILongVideoModal {
    id?: string
    /**
     * 分类
     */
    category?: string
    /**
     * 视频封面
     */
    postUrl: string
    /**
     * 视频价格
     */
    price?: string
    /**
     * 视频
     */
    src: string
    /**
     * 标题
     */
    title: string
    /**
     * 备注
     */
    remark?: string
    /**
     * 审批状态
     */
    status?: string
  }
  export interface IResLongVideo {
    /**
     * 审核管理员
     */
    authName: string
    /**
     * 上传者
     */
    author: string
    /**
     * 审核状态
     */
    authStatus: number
    /**
     * 审核时间
     */
    authTime: string
    /**
     * 封面
     */
    postUrl: string
    /**
     * 分类
     */
    category: string
    createTime?: string
    id?: number
    /**
     * 手机号
     */
    phone: string

    /**
     * 视频地址
     */
    src: string
    /**
     * 开启状态
     */
    status: boolean
    /**
     * 标题
     */
    title: string
    /**
     * 上传时间
     */
    uploadTime: string
  }
}

export namespace IShortVideo {
  export interface IReqQuery extends ReqPage {
    title: string
    author: string
    authStatus: string
    tagName: string
    uploadTime: string[]
    authTime: string[]
  }
  export interface IResShortVideo {
    /**
     * 审核管理员
     */
    authName: string
    /**
     * 上传者
     */
    author: string
    /**
     * 审核状态
     */
    authStatus: number
    /**
     * 审核时间
     */
    authTime: string
    /**
     * 封面
     */
    postUrl: string
    /**
     * 标签
     */
    tagName: string
    createTime?: string
    id?: number
    /**
     * 手机号
     */
    phone: string

    /**
     * 视频地址
     */
    src: string
    /**
     * 开启状态
     */
    status: boolean
    /**
     * 标题
     */
    title: string
    /**
     * 上传时间
     */
    uploadTime: string
  }
}

export namespace ILive {
  export interface IReqQuery extends ReqPage {
    title: string
    liveStatus: string
    startTime: string[]
  }
  export interface IResLive {
    /**
     * 直播收益
     */
    account: number
    /**
     * 结束时间
     */
    andTime: string
    createTime?: string
    id?: number
    /**
     * 主播
     */
    liver: string
    /**
     * 直播状态
     */
    liveStatus: number
    /**
     * 直播间地址
     */
    liveUrl: string
    /**
     * 手机号
     */
    phone: string
    /**
     * 直播间封面
     */
    postUrl: string
    /**
     * 开播时间
     */
    startTime: string
    /**
     * 开启状态
     */
    status: boolean
    /**
     * 标签
     */
    tagName: string
    /**
     * 标题
     */
    title: string
  }
}

export namespace IPost {
  export interface IReqQuery extends ReqPage {
    title: string
    author: string
    authStatus: string
    uploadTime: string[]
    authTime: string[]
  }
  export interface IResPost {
    /**
     * 审核管理员
     */
    authName: string
    /**
     * 发布者
     */
    author: string
    /**
     * 审核状态
     */
    authStatus: number
    /**
     * 审核时间
     */
    authTime: string
    createTime?: string
    id?: number
    /**
     * 手机号
     */
    phone: string
    /**
     * 头像
     */
    postUrl: string
    /**
     * 视频地址
     */
    src: string
    /**
     * 开启状态
     */
    status: boolean
    /**
     * 标签
     */
    tagName: string
    /**
     * 标题
     */
    title: string
    /**
     * 帖子类型
     */
    typeName: string
    /**
     * 上传时间
     */
    uploadTime: string
  }
}
