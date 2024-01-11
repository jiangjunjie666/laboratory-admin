// 路由管理
import { createRouter, createWebHistory } from 'vue-router'
import { constantRouter } from './route/index'
const router = createRouter({
  history: createWebHistory(),
  routes: constantRouter,
  //切换路由跳转至页面上层
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router
