/*
 * @Author: 朽木白
 * @Date: 2023-03-06 17:45:41
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-06-01 09:46:55
 * @Description: 表格多选操作
 */

import { computed, ref } from 'vue'

export const useSelection = (selectId = 'id') => {
  const isSelected = ref<boolean>(false)
  const selectedList = ref([])
  const selectedListIds = computed((): string[] => {
    const ids: string[] = []
    selectedList.value.forEach((item) => {
      ids.push(item[selectId])
    })
    return ids
  })
  const getRowKeys = (row: any) => {
    return row[selectId]
  }

  /**
   * @description 多选操作
   * @param {Array} rowArr 当前选择的所有数据
   * @return void
   */
  const selectionChange = (rowArr: any) => {
    rowArr.length === 0 ? (isSelected.value = false) : (isSelected.value = true)
    selectedList.value = rowArr
  }

  return {
    isSelected,
    selectedList,
    selectedListIds,
    getRowKeys,
    selectionChange,
  }
}
