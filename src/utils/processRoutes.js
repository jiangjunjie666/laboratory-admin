//处理路由的一些函数
import { navRoute } from '@/router/route/navRoute.js'

/**
 * @param {Array} routes 需要的路由数组
 * @returns {Array} 处理好的路由权限数组
 */

//编辑数组数据，将需要的数据返回给子组件
export function convertRoutes(routes) {
  return routes.map((route) => {
    const convertedRoute = {
      name: route.name,
      title: route.meta.title,
      checked: false
    }

    if (route.children && route.children.length > 0) {
      convertedRoute.children = convertRoutes(route.children)
    }
    return convertedRoute
  })
}

/**
 * @param {Array} arr 用户拥有的路由权限
 * @returns {Array} 处理好的路由权限
 */
//查看用户拥有的路由权限是否是所有的

export function checkAllPermission(arr) {
  //将arr中的空字符元素清除
  // console.log(arr)
  arr = arr.filter((item) => {
    return item !== ''
  })
  // console.log(arr)
  if (arraysContainSameElements(checkPermission(navRoute), arr)) {
    return ['所有权限']
  } else {
    return arr ? arr : []
  }
}

function checkPermission(titlesArr) {
  const arr = []

  // 辅助函数，用于递归地处理路由数组
  function extractTitles(routes) {
    for (const route of routes) {
      if (route.meta && route.meta.title) {
        arr.push(route.meta.title) // 将当前路由的标题添加到数组中
      }
      if (route.children) {
        extractTitles(route.children) // 递归处理子路由
      }
    }
  }

  // 调用辅助函数处理初始的路由数组
  extractTitles(titlesArr)

  return arr
}

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

//计算出menu需要的路由数据
export function filterAsyncRoutes(authority) {
  const routeArr1 = []
  const routeArr2 = []
  const authoritySet = new Set(authority ? authority.split(',') : []) // 使用 Set 来存储权限，提高查找效率

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

//计算出用户是否拥有该权限路由
export function checkPermissionRoute(routeArr1, routeArr2, path) {
  // console.log(routeArr1, path)
  let checked = false
  routeArr1.forEach((item) => {
    if (item.path === path) {
      checked = true
    }
  })
  if (!checked) {
    routeArr2.forEach((item) => {
      if (item.path === path && !item.children) {
        checked = false
      }
      item.children.forEach((child) => {
        if (child.path === path) {
          checked = true
        }
      })
    })
  }
  return checked
}
