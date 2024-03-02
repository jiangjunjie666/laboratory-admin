//axios构造器
//进行axios的二次封装：使用请求和响应拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router/index.js'
//利用axios对象的create方法创建axios实例
let request = axios.create({
  // withCredentials: true, //允许携带cookie
  baseURL: import.meta.env.VITE_APP_BASE_API, //请求
  timeout: 5000
})
request.interceptors.request.use((config) => {
  //config配置对象，headers属性请求头，经常给服务器端携带公共参数
  //加上请求头：application/x-www-form-urlencoded
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  //携带token
  const userinfo = JSON.parse(localStorage.getItem('userinfo'))
  if (userinfo) {
    config.headers.Authorization = userinfo.token
  }
  //返回配置对象
  return config
})
request.interceptors.response.use(
  (response) => {
    //成功回调
    return response.data
  },
  (error) => {
    //失败的回调
    //处理网络错误
    let msg = ''
    let status = error.response.status
    console.log(error)
    //处理token失效
    switch (status) {
      case 401:
        msg = error.response.data
        //实现路由跳转
        router.push('/login')
        localStorage.removeItem('userinfo')
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器出现问题'
        break
      default:
        msg = '无网络'
    }
    ElMessage({
      type: 'error',
      message: msg
    })
    return Promise.reject(error)
  }
)
export default request
