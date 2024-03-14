//users小仓库
import { defineStore } from 'pinia'
import { filterAsyncRoutes } from '@/utils/processRoutes.js'
export const useUserStore = defineStore('users', {
  state: () => {
    return {
      userinfo: localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')) : []
    }
  },
  actions: {
    //登录成功后存储信息的步骤
    saveUserInfo(data) {
      this.userinfo = data
      localStorage.setItem('userinfo', JSON.stringify(data))
      return true
    },
    logout() {
      localStorage.removeItem('userinfo')
      localStorage.removeItem('visitedRoutes')
    }
  },
  getters: {}
})
