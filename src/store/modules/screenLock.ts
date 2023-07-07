import { defineStore } from 'pinia'

// 长时间不操作默认锁屏时间
const initTime = 60 * 60

export type IScreenLockState = {
  isLocked: boolean // 是否锁屏
  lockTime: number
}

export const useScreenLockStore = defineStore({
  id: 'app-screen-lock',
  state: (): IScreenLockState => ({
    isLocked: false, // 是否锁屏
    lockTime: initTime,
  }),
  getters: {},
  actions: {
    setLock(payload: boolean) {
      this.isLocked = payload
    },
    setLockTime(payload = initTime) {
      this.lockTime = payload
    },
  },
  persist: true,
})
