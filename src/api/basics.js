import request from '@/utils/request.js'

const API = {
  //获取轮播图数据
  GETBANNERLIST: '/basics/bannerList',
  //删除图片
  DELETEBANNER: '/basics/bannerDel',
  //读取实验室数据
  GETLABORATORY: '/basics/basicInform',
  //修改实验室数据
  EDITLABORATORY: '/basics/basicInformEdit'
}

export const reqGetBannerList = () => request.get(API.GETBANNERLIST)

export const reqDeleteBanner = (id, imgUrl) => request.delete(API.DELETEBANNER + '?id=' + id + '&imgUrl=' + imgUrl)

export const reqGetLaboratory = () => request.get(API.GETLABORATORY)

export const reqEditLaboratory = (data) => request.post(API.EDITLABORATORY, data)
