import ExcelJS from 'exceljs'
import { ColumnProps } from '@/components/ProTable/src/types'

interface ExCelMdal {
  column: ColumnProps[] // 列
  data: any // 数据
  filename: string // 文件名
  autoWidth?: boolean // 宽度是否auto
  format: string // excel格式
}

/**
 * 设置excel列的宽度
 */
const autoWidthAction = (val: string, width = 10) => {
  if (val == null) {
    width = 10
  } else if (val.toString().charCodeAt(0) > 255) {
    /*if chinese*/
    width = val.toString().length * 2
  } else {
    width = val.toString().length
  }
  return width
}

/**
 * excel导出
 */
export const exportExcel = async ({
  column,
  data,
  filename,
  autoWidth,
  format,
}: ExCelMdal) => {
  // 创建excel
  const workbook = new ExcelJS.Workbook()
  // 设置信息
  workbook.creator = 'Me'
  workbook.title = filename
  workbook.created = new Date()
  workbook.modified = new Date()
  // 创建工作表
  const worksheet = workbook.addWorksheet(filename)
  // 设置列名
  const columnsName: any = []
  column.forEach((item: ColumnProps) => {
    const obj = {
      header: item.label,
      key: item.prop,
      width: 0,
    }
    // 设置列宽度根据内容自适应
    if (autoWidth) {
      const maxArr = [autoWidthAction(item.label ? item.label : '')]
      data.forEach((ite: any) => {
        const str = ite[item.prop ? item.prop : ''] || ''
        if (str) {
          maxArr.push(autoWidthAction(str))
        }
      })
      obj.width = Math.max(...maxArr) + 5
    }
    // 设置列名、键和宽度
    columnsName.push(obj)
  })
  worksheet.columns = columnsName
  // 添加行
  worksheet.addRows(data)
  // 写入文件

  const uint8Array =
    format === 'xlsx'
      ? await workbook.xlsx.writeBuffer()
      : await workbook.csv.writeBuffer()

  const blob = new Blob([uint8Array], { type: 'application/octet-binary' })
  const nav = window.navigator as any
  if (nav.msSaveOrOpenBlob) {
    // msSaveOrOpenBlob方法返回boolean值
    nav.msSaveBlob(blob, filename + `.${format}`)
    // 本地保存
  } else {
    const link = document.createElement('a') // a标签下载
    link.href = window.URL.createObjectURL(blob) // href属性指定下载链接
    link.download = filename + `.${format}` // dowload属性指定文件名
    link.click() // click()事件触发下载
    window.URL.revokeObjectURL(link.href) // 释放内存
  }
}

/**
 * 添加excel列的样式
 */
export function addCellStyle(cell: ExcelJS.Cell, attr: any) {
  const { color, fontSize, horizontal, bold } = attr || {}
  // eslint-disable-next-line no-param-reassign
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: color },
  }
  // eslint-disable-next-line no-param-reassign
  cell.font = {
    bold: bold ?? true,
    size: fontSize ?? 11,
    // italic: true,
    // name: '微软雅黑',
    color: { argb: 'ff0000' },
  }
  // eslint-disable-next-line no-param-reassign
  cell.alignment = {
    vertical: 'middle',
    wrapText: true,
    horizontal: horizontal ?? 'left',
  }
}

/**
 * 导出带样式的excel
 */
export const exportStyleExcel = async ({
  column,
  data,
  filename,
  autoWidth,
  format,
}: ExCelMdal) => {
  // 创建excel
  const workbook = new ExcelJS.Workbook()
  // 设置信息
  workbook.creator = 'Me'
  workbook.title = filename
  workbook.created = new Date()
  workbook.modified = new Date()
  // 创建工作表
  const worksheet = workbook.addWorksheet(filename)
  // 设置列名
  const columnsName: any = []
  column.forEach((item: ColumnProps) => {
    const obj = {
      header: item.label,
      key: item.prop,
      width: 0,
    }
    if (autoWidth) {
      const maxArr = [autoWidthAction(item.label ? item.label : '')]
      data.forEach((ite: any) => {
        const str = ite[item.prop ? item.prop : ''] || ''
        if (str) {
          maxArr.push(autoWidthAction(str))
        }
      })
      obj.width = Math.max(...maxArr) + 5
    }
    // 设置列名、键和宽度
    columnsName.push(obj)
  })
  worksheet.columns = columnsName
  // 添加行
  worksheet.addRows(data)
  // 写入文件

  // 设置表头颜色
  // 给表头添加背景色。因为表头是第一行，可以通过 getRow(1) 来获取表头这一行
  const headerRow = worksheet.getRow(1)
  // 通过 cell 设置样式，更精准
  headerRow.eachCell((cell) =>
    addCellStyle(cell, { color: 'dff8ff', fontSize: 12, horizontal: 'left' }),
  )

  const uint8Array =
    format === 'xlsx'
      ? await workbook.xlsx.writeBuffer()
      : await workbook.csv.writeBuffer()

  const blob = new Blob([uint8Array], { type: 'application/octet-binary' })
  const nav = window.navigator as any
  if (nav.msSaveOrOpenBlob) {
    // msSaveOrOpenBlob方法返回boolean值
    nav.msSaveBlob(blob, filename + `.${format}`)
    // 本地保存
  } else {
    const link = document.createElement('a') // a标签下载
    link.href = window.URL.createObjectURL(blob) // href属性指定下载链接
    link.download = filename + `.${format}` // dowload属性指定文件名
    link.click() // click()事件触发下载
    window.URL.revokeObjectURL(link.href) // 释放内存
  }
}

/**
 * 导出多表头excel
 */
export const exportMultiHeaderExcel = ({
  column,
  data,
  filename,
}: ExCelMdal) => {
  // 创建excel
  const workbook = new ExcelJS.Workbook()
  // 创建工作表
  const sheet = workbook.addWorksheet('sheet1')

  // 添加表头
  // eslint-disable-next-line no-sparse-arrays
  sheet.getRow(1).values = ['序号', '日期', '地址', '配送消息', , ,]
  sheet.getRow(2).values = ['序号', '日期', '地址', '省份', '城市', '邮编']
  const headers: any = []
  column.forEach((item: ColumnProps) => {
    if (item._children) {
      item._children.forEach((itemChild) => {
        const obj = {
          key: itemChild.prop,
          width: 0,
        }
        const maxArr = [autoWidthAction(itemChild.label ? itemChild.label : '')]
        data.forEach((ite: any) => {
          const str = ite[itemChild.prop ? itemChild.prop : ''] || ''
          if (str) {
            maxArr.push(autoWidthAction(str))
          }
        })
        obj.width = Math.max(...maxArr) + 5
        // 设置列名、键和宽度
        headers.push(obj)
      })
    } else {
      const obj = {
        key: item.prop,
        width: 0,
      }
      const maxArr = [autoWidthAction(item.label ? item.label : '')]
      data.forEach((ite: any) => {
        const str = ite[item.prop ? item.prop : ''] || ''
        if (str) {
          maxArr.push(autoWidthAction(str))
        }
      })
      obj.width = Math.max(...maxArr) + 5
      // 设置列名、键和宽度
      headers.push(obj)
    }
  })
  sheet.columns = headers
  sheet.addRows(data)

  // 合并单元格
  sheet.mergeCells(`D1:F1`)
  sheet.mergeCells('A1:A2')
  sheet.mergeCells('B1:B2')
  sheet.mergeCells('C1:C2')
  // 写入文件
  workbook.xlsx.writeBuffer().then((data) => {
    const blob = new Blob([data], { type: 'application/vnd.ms-excel' })
    const nav = window.navigator as any
    if (nav.msSaveOrOpenBlob) {
      // msSaveOrOpenBlob方法返回boolean值
      nav.msSaveBlob(blob, filename + '.xlsx')
      // 本地保存
    } else {
      const link = document.createElement('a') // a标签下载
      link.href = window.URL.createObjectURL(blob) // href属性指定下载链接
      link.download = filename + '.xlsx' // dowload属性指定文件名
      link.click() // click()事件触发下载
      window.URL.revokeObjectURL(link.href) // 释放内存
    }
  })
}
