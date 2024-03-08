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

const authority = `首页,日期,资料管理,用户管理,角色管理`
function filterAsyncRoutes(authority) {
  const routeArr1 = []
  const routeArr2 = []
  const authoritySet = new Set(authority.split(',')) // 使用 Set 来存储权限，提高查找效率

  // 筛选出一级路由
  navRoute.forEach((route) => {
    if (authoritySet.has(route.meta.title)) {
      if (!route.children) {
        routeArr1.push(route)
      } else {
        // 筛选出有子路由的一级路由
        const filteredChildren = route.children.filter((child) => authoritySet.has(child.meta.title))
        if (filteredChildren.length > 0) {
          routeArr2.push({
            ...route,
            children: filteredChildren
          })
        }
      }
    }
  })

  return [routeArr1, routeArr2]
}

// 使用示例
const [routeArr1, routeArr2] = filterAsyncRoutes(authority)
console.log(routeArr1, routeArr2)
// function filterAsyncRoutes(authority) {
//   const routeArr1 = []
//   const routeArr2 = []
//   const authorityArr = authority.split(',')
//   //计算出只有一级路由的数组
//   authorityArr.forEach((item) => {
//     //去对比navRoute
//     for (let i = 0; i < navRoute.length; i++) {
//       if (item === navRoute[i].meta.title) {
//         //判断其有没有children
//         if (!navRoute[i].children) {
//           routeArr1.push(navRoute[i])
//         } else {
//           //再去遍历一遍
//           const newArr = JSON.parse(JSON.stringify(navRoute[i]))
//           let temp = 0
//           navRoute[i].children.forEach((item, index) => {
//             for (let j = 0; j < authorityArr.length; j++) {
//               if (item.meta.title == authorityArr[j]) {
//                 temp = -1
//               }
//             }
//             if (temp === 0) {
//               //就是没有匹配的那么删除一项
//               newArr.children.splice(0, 1)
//             }
//             temp = 0
//           })

//           //遍历结束后再去赋值
//           routeArr2.push(newArr)
//         }
//       }
//     }
//   })
//   return [routeArr1, routeArr2]
// }

// const [routeArr1, routeArr2] = filterAsyncRoutes(authority)
// console.log(routeArr1, routeArr2)
