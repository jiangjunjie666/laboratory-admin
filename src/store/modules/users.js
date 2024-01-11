//users小仓库
import { defineStore } from 'pinia'

export const useUserStore = defineStore('users', {
  state: () => {
    return {
      userinfo: localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')) : []
    }
  },
  actions: {
    //登录成功后存储信息的步骤
    saveUserInfo(data) {
      localStorage.setItem('userinfo', JSON.stringify(data))
    }
  },
  getters: {}
})
