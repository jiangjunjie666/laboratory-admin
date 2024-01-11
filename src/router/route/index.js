import { navRoute } from './navRoute.js'

export const constantRouter = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue')
  },
  {
    //任意路由
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home/index.vue'),
    meta: {
      title: '首页'
    },
    children: navRoute
  }
]
