import request from '@/utils/request.js'

const API = {
  //获取轮播图数据
  GETBANNERLIST: '/basics/bannerList',
  //删除图片
  DELETEBANNER: '/basics/bannerDel?id='
}

export const reqGetBannerList = () => request.get(API.GETBANNERLIST)

export const reqDeleteBanner = (id) => request.delete(API.DELETEBANNER + id)
