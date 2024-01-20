export const navRoute = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home/index.vue'),
    meta: {
      title: '首页',
      icon: 'HomeFilled'
    }
  },
  {
    path: '/data',
    name: 'data',
    component: () => import('@/views/Data/index.vue'),
    meta: {
      title: '资料管理',
      icon: 'Notebook'
    }
  },
  {
    path: '/user',
    name: 'user',
    redirect: '/user/roleplay',
    meta: {
      title: '用户管理',
      icon: 'Avatar'
    },
    children: [
      {
        path: '/user/roleplay',
        name: 'roleplay',
        component: () => import('@/views/User/RolePlay/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'User'
        }
      },
      {
        path: '/user/person',
        name: 'person',
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
    name: 'inform',
    redirect: '/inform/news',
    meta: {
      title: '通知管理',
      icon: 'Bell'
    },
    children: [
      {
        path: '/inform/news',
        name: 'news',
        component: () => import('@/views/Inform/News/index.vue'),
        meta: {
          title: '新闻管理',
          icon: 'Message'
        }
      },
      {
        path: '/inform/notice',
        name: 'notice',
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
    name: 'competition',
    redirect: '/competition/event',
    meta: {
      title: '竞赛管理',
      icon: 'GoldMedal'
    },
    children: [
      {
        path: '/competition/event',
        name: 'event',
        component: () => import('@/views/Competition/CompetitionEvent/index.vue'),
        meta: {
          title: '竞赛活动管理',
          icon: 'Football'
        }
      },
      {
        path: '/competition/winner',
        name: 'winner',
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
    name: 'limits',
    redirect: '/limits/personlimit',
    meta: {
      title: '权限管理',
      icon: 'Lock'
    },
    children: [
      {
        path: '/limits/personlimit',
        name: 'personlimit',
        component: () => import('@/views/Limits/PersonLimit/index.vue'),
        meta: {
          title: '人物权限管理',
          icon: 'Coin'
        }
      },
      {
        path: '/limits/rolelimit',
        name: 'rolelimit',
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
    name: 'basics',
    redirect: '/basics/general',
    meta: {
      title: '基础管理',
      icon: 'Grid'
    },
    children: [
      {
        path: '/basics/slides',
        name: 'slides',
        component: () => import('@/views/Basics/Slides/index.vue'),
        meta: {
          title: '轮播图管理',
          icon: 'PictureFilled'
        }
      },
      {
        path: '/basics/general',
        name: 'general',
        component: () => import('@/views/Basics/General/index.vue'),
        meta: {
          title: '基础信息管理',
          icon: 'DocumentCopy'
        }
      }
    ]
  }
]
