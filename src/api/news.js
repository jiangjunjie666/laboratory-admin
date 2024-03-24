import request from '@/utils/request.js'
const API = {
  //获取新闻列表
  GETNEWSLIST: '/news/getNews',
  //修改
  EDITNEWS: '/news/editNews',
  //新增
  ADDNEWS: '/news/addNews',
  //删除
  DELETENEWS: '/news/delNews',
  //修改状态
  EDITNEWSSTATUS: '/news/editStatus',
  //获取所有编辑人
  GETALLEDITOR: '/news/allEditor'
}

//获取新闻列表
export const reqGetNewsList = (page, pageSize, searchKey, searchEditor) => request.get(API.GETNEWSLIST + '?page=' + page + '&pageSize=' + pageSize + '&searchKey=' + searchKey + '&searchEditor=' + searchEditor)

//修改
export const reqEditNews = (data) => request.post(API.EDITNEWS, data)

//新增
export const reqAddNews = (data) => request.post(API.ADDNEWS, data)

//删除
export const reqDeleteNews = (id) => request.delete(API.DELETENEWS + '?id=' + id)

//修改状态
export const reqEditNewsStatus = (id, status) => request.put(API.EDITNEWSSTATUS + '?id=' + id + '&status=' + status)

//获取
export const reqGetAllEditor = () => request.get(API.GETALLEDITOR)
