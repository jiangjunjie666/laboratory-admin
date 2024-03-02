import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/reset.css'
//安装vue-router
import router from '@/router'
//安装pinia
import store from '@/store'
//配置element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'animate.css'
//注册全局组件
import Title from '@/components/Title/index.vue'
import MyButton from '@/components/MyButton/index.vue'
//引入路由鉴权
import '@/utils/permisstion.js'
const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus, {
  locale: zhCn
})
//全局组件
app.component('Title', Title)
app.component('MyButton', MyButton)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
