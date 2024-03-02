import { navRoute } from './navRoute'

export const constantRouter = [
  // {
  //   path: '/',
  //   redirect: '/home'
  // },
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
    path: '/401',
    name: '401',
    component: () => import('@/views/401/index.vue')
  },
  {
    path: '/',
    redirect: '/home',
    name: 'layout',
    component: () => import('@/views/Layout/index.vue'),
    children: navRoute
  }
]
