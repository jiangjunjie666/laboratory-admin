//路由鉴权
import router from '@/router/index.js'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css' //引入进度条样式
import { useUserStore } from '@/store/modules/users.js'
import { checkPermissionRoute, filterAsyncRoutes } from '@/utils/processRoutes.js'
//全局前置守卫

router.beforeEach((to, from, next) => {
  nProgress.start() //进度条开始
  //进行路由拦截
  const userStore = useUserStore()
  const [route1, route2] = filterAsyncRoutes(userStore.userinfo.authority)
  if (to.path == '/login' && !localStorage.getItem('userinfo')) {
    next()
  }

  if (to.path == '/401' || to.path == '/' || to.path == '/404') {
    next()
  }

  if (!checkPermissionRoute(route1, route2, to.path) && !localStorage.getItem('userinfo')) {
    //进行路由拦截，跳转至登录页
    next('/login')
  } else if (!checkPermissionRoute(route1, route2, to.path) && localStorage.getItem('userinfo')) {
    next('/401')
  } else {
    next()
  }
  // next()
})

//全局后置守卫
router.afterEach((to, from) => {
  nProgress.done() //进度条结束
})
