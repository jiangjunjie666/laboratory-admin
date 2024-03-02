function checkPermission(titlesArr) {
  const arr = []
  titlesArr.forEach((i) => {
    arr.push(i.meta.title)
    if (i.children) {
      i.children.forEach((j) => {
        arr.push(j.meta.title)
      })
    }
  })
  return arr
}
const navRoute = [
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

const arr = ['首页', '资料管理', '用户管理', '角色管理', '人物管理', '通知管理', '新闻管理', '公告管理', '竞赛管理', '竞赛活动管理', '竞赛获奖管理', '权限管理', '人物权限管理', '角色权限管理', '基础管理', '轮播图图片管理', '基础信息管理']
function arraysContainSameElements(arr1, arr2) {
  // 创建两个集合
  const set1 = new Set(arr1)
  const set2 = new Set(arr2)

  // 检查集合的大小是否相等
  if (set1.size !== set2.size) {
    return false
  }

  // 检查集合1中的所有元素是否都存在于集合2中
  for (const item of set1) {
    if (!set2.has(item)) {
      return false
    }
  }

  // 如果两个集合相等，则返回 true
  return true
}
console.log(checkPermission(navRoute))
console.log(arraysContainSameElements(checkPermission(navRoute), arr)) // 输出 true，因为权限数组匹配到了路由中的所有标题
