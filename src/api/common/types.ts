export interface IReqStatus {
  /**
   * 类型
   */
  type: string
  id: string
  /**
   * 状态
   */
  status: number
}

// * 文件上传模块
export namespace Upload {
  export interface ResFileUrl {
    fileUrl: string
  }
}
