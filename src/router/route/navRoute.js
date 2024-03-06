export const navRoute = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home/index.vue'),
    meta: {
      title: '首页',
      icon: 'HomeFilled'
    }
  },
  {
    path: '/date',
    name: 'Date',
    component: () => import('@/views/Date/index.vue'),
    meta: {
      title: '日期',
      icon: 'Calendar'
    }
  },
  {
    path: '/data',
    name: 'Data',
    component: () => import('@/views/Data/index.vue'),
    meta: {
      title: '资料管理',
      icon: 'Notebook'
    }
  },
  {
    path: '/user',
    name: 'User',
    redirect: '/user/roleplay',
    meta: {
      title: '用户管理',
      icon: 'Avatar'
    },
    children: [
      {
        path: '/user/roleplay',
        name: 'RolePlay',
        component: () => import('@/views/User/RolePlay/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'User'
        }
      },
      {
        path: '/user/person',
        name: 'Person',
        component: () => import('@/views/User/Person/index.vue'),
        meta: {
          title: '人物管理',
          icon: 'UserFilled'
        }
      }
    ]
  },
  {
    path: '/inform',
    name: 'Inform',
    redirect: '/inform/news',
    meta: {
      title: '通知管理',
      icon: 'Bell'
    },
    children: [
      {
        path: '/inform/news',
        name: 'News',
        component: () => import('@/views/Inform/News/index.vue'),
        meta: {
          title: '新闻管理',
          icon: 'Message'
        }
      },
      {
        path: '/inform/notice',
        name: 'Notice',
        component: () => import('@/views/Inform/Notice/index.vue'),
        meta: {
          title: '公告管理',
          icon: 'Calendar'
        }
      }
    ]
  },
  {
    path: '/competition',
    name: 'Competition',
    redirect: '/competition/event',
    meta: {
      title: '竞赛管理',
      icon: 'GoldMedal'
    },
    children: [
      {
        path: '/competition/event',
        name: 'Event',
        component: () => import('@/views/Competition/CompetitionEvent/index.vue'),
        meta: {
          title: '竞赛活动管理',
          icon: 'Football'
        }
      },
      {
        path: '/competition/winner',
        name: 'Winner',
        component: () => import('@/views/Competition/CompetitionWinner/index.vue'),
        meta: {
          title: '竞赛获奖管理',
          icon: 'Medal'
        }
      }
    ]
  },
  {
    path: '/limits',
    name: 'Limits',
    redirect: '/limits/personlimit',
    meta: {
      title: '权限管理',
      icon: 'Lock'
    },
    children: [
      {
        path: '/limits/personlimit',
        name: 'PersonLimit',
        component: () => import('@/views/Limits/PersonLimit/index.vue'),
        meta: {
          title: '人物权限管理',
          icon: 'Coin'
        }
      },
      {
        path: '/limits/rolelimit',
        name: 'RoleLimit',
        component: () => import('@/views/Limits/RolePlayLimit/index.vue'),
        meta: {
          title: '角色权限管理',
          icon: 'Paperclip'
        }
      }
    ]
  },
  {
    path: '/basics',
    name: 'Basics',
    redirect: '/basics/general',
    meta: {
      title: '基础管理',
      icon: 'Grid'
    },
    children: [
      {
        path: '/basics/slides',
        name: 'Slides',
        component: () => import('@/views/Basics/Slides/index.vue'),
        meta: {
          title: '轮播图图片管理',
          icon: 'PictureFilled'
        }
      },
      {
        path: '/basics/general',
        name: 'General',
        component: () => import('@/views/Basics/General/index.vue'),
        meta: {
          title: '基础信息管理',
          icon: 'DocumentCopy'
        }
      }
    ]
  }
]
