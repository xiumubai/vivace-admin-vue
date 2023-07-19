export const num = 0

export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9
    ? '早上好'
    : hour <= 11
    ? '上午好'
    : hour <= 13
    ? '中午好'
    : hour < 20
    ? '下午好'
    : '晚上好'
}

export function welcome() {
  const arr = [
    '加油努力工作',
    '喝一杯咖啡吧',
    '休息一会儿吧',
    '准备吃什么呢',
    '要不要站起来活动一下',
  ]
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * @description 生成唯一 uuid
 * @return string
 */
export function generateUUID() {
  if (typeof crypto === 'object') {
    if (typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID()
    }
    if (
      typeof crypto.getRandomValues === 'function' &&
      typeof Uint8Array === 'function'
    ) {
      const callback = (c: any) => {
        const num = Number(c)
        return (
          num ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))
        ).toString(16)
      }
      return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, callback)
    }
  }
  let timestamp = new Date().getTime()
  let performanceNow =
    (typeof performance !== 'undefined' &&
      performance.now &&
      performance.now() * 1000) ||
    0
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let random = Math.random() * 16
    if (timestamp > 0) {
      random = (timestamp + random) % 16 | 0
      timestamp = Math.floor(timestamp / 16)
    } else {
      random = (performanceNow + random) % 16 | 0
      performanceNow = Math.floor(performanceNow / 16)
    }
    return (c === 'x' ? random : (random & 0x3) | 0x8).toString(16)
  })
}

/**
 * @params url 文件url
 * @ddescription 下载base64格式文件到本地
 */
export function downloadBase64file(base64:any,fileName:string = '文件'){
  const arr = base64.split(","),
  mime = arr[0].match(/:(.*?);/)[1],
  bstr = window.atob(arr[1]),
  n = bstr.length,
  u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const bolb =  new Blob([u8arr], { type: mime });
  const url = URL.createObjectURL(bolb);
  const link = document.createElement('a') 
  link.style.display = 'none'
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  link.setAttribute("target", "_blank");
  document.body.appendChild(link)
  link.click()
  URL.revokeObjectURL(link.href)
  document.body.removeChild(link)
}