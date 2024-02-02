// 路由管理
import { createRouter, createWebHistory } from 'vue-router'
import { constantRouter } from './route/index'
const router = createRouter({
  history: createWebHistory(),
  routes: constantRouter,
  //切换路由跳转至页面上层
  scrollBehavior: () => ({ left: 0, top: 0 })
})

//路由鉴权拦截
router.beforeEach((to, from, next) => {
  //判断是否登录
  if (to.meta.auth) {
    //判断是否登录
    if (localStorage.getItem('token')) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
