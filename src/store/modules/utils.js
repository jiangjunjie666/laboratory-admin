//users小仓库
import { defineStore } from 'pinia'

export const useUtilsStore = defineStore('utils', {
  state: () => {
    return {
      isCollapse: false, //左侧菜单栏是否收起
      isDark: localStorage.getItem('useDarkKEY') == 'dark' ? true : false, //是否是暗黑模式
      visitedRoutes: localStorage.getItem('visitedRoutes') ? JSON.parse(localStorage.getItem('visitedRoutes')) : [] //存储访问的路由
    }
  },
  actions: {
    //修改左侧菜单栏的状态
    changeCollapse() {
      this.isCollapse = !this.isCollapse
    },
    //存储缓存路由
    saveVisitedRoutes(data) {
      const newVisitedRoutes = localStorage.getItem('visitedRoutes') ? JSON.parse(localStorage.getItem('visitedRoutes')) : []
      //遍历数组，查看是否已经存在，不存在则插入进去
      for (let i = 0; i < this.visitedRoutes.length; i++) {
        if (this.visitedRoutes[i].path == data.path) {
          return
        }
      }
      newVisitedRoutes.push(data)

      //清除缓存
      localStorage.removeItem('visitedRoutes')
      //重新保存到缓存
      localStorage.setItem('visitedRoutes', JSON.stringify(newVisitedRoutes))
      this.visitedRoutes = localStorage.getItem('visitedRoutes') ? JSON.parse(localStorage.getItem('visitedRoutes')) : []
    },
    closeTags(path) {
      //清除某个路由
      const visitedRoutes = localStorage.getItem('visitedRoutes') ? JSON.parse(localStorage.getItem('visitedRoutes')) : []

      const newVisitedRoutes = visitedRoutes.filter((item) => item.path !== path)
      localStorage.setItem('visitedRoutes', JSON.stringify(newVisitedRoutes))
    }
  },
  getters: {}
})
