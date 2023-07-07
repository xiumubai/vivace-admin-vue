import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'virtual:svg-icons-register'
import pinia from './store/index'
import router from './router'
import registerGlobComp from './components'
import directives from '@/directives/index'

// element默认主题
import 'element-plus/dist/index.css'
// 公共样式，包含自定义暗黑模式，element重置样式
import '@/styles/index.scss'
// 字体样式
import '@/assets/fonts/font.scss'

/** 加载异步路由 */
import '@/router/initDynamicRouter'

const app = createApp(App)

/** 导入全部Element-icon */
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus, {
  locale: zhCn,
})

app.use(registerGlobComp)

app.use(pinia)

app.use(router)

app.use(directives)

app.mount('#app')
