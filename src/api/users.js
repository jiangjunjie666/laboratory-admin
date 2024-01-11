import request from '@/utils/request.js'

const API = {
  //登录接口
  LOGIN: '/api/login'
}

export const reqLogin = (data) => request.post(API.LOGIN, data)
