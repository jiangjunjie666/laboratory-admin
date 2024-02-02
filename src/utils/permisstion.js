//路由鉴权
import router from '@/router/index.js'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css' //引入进度条样式
import { useUserStore } from '@/store/modules/users.js'
//全局前置守卫
router.beforeEach((to, from, next) => {
  nProgress.start() //进度条开始
  //进行路由拦截
  // const userStore = useUserStore()
  // console.log(router)
  // if (router.path)
  //   if (userStore.userinfo) {
  //     //进行路哟拦截
  //     console.log('路由拦截')
  //   } else {
  //     next()
  //   }
  next()
})

//全局后置守卫
router.afterEach((to, from) => {
  nProgress.done() //进度条结束
})
