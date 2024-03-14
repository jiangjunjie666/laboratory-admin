import request from '@/utils/request'

const API = {
  //获取竞赛活动列表
  GETCOMPETITIONLIST: '/competition/list',
  //新增竞赛活动
  ADDCOMPETITION: '/competition/add',
  //修改
  EDITCOMPETITION: '/competition/edit',
  //删除
  DELETECOMPETITION: '/competition/del',

  //获取所有奖品信息
  GETAWARDLIST: '/competition/allList',
  //获取所有的竞赛名称
  GETALLCOMPETITION: '/competition/allName',
  //新增获奖
  ADDAWARD: '/competition/addPrize',
  //修改获奖
  EDITAWARD: '/competition/editPrize',
  //删除获奖
  DELETEAWARD: '/competition/delPrize'
}

export const reqGetCompetitionList = (page, pageSize, searchKey) => request.get(API.GETCOMPETITIONLIST + `?page=${page}&pageSize=${pageSize}&searchKey=${searchKey}`)

export const reqAddCompetition = (data) => request.post(API.ADDCOMPETITION, data)

export const reqEditCompetition = (data) => request.post(API.EDITCOMPETITION, data)

export const reqDeleteCompetition = (id) => request.delete(API.DELETECOMPETITION + `?id=${id}`)

export const reqGetAwardList = (page, pageSize, searchKeyName, searchKeyComp) => request.get(API.GETAWARDLIST + `?page=${page}&pageSize=${pageSize}&searchKeyName=${searchKeyName}&searchKeyComp=${searchKeyComp}`)

export const reqGetAllCompetition = () => request.get(API.GETALLCOMPETITION)

export const reqAddAward = (data) => request.post(API.ADDAWARD, data)

export const reqEditAward = (data) => request.post(API.EDITAWARD, data)

export const reqDeleteAward = (id) => request.delete(API.DELETEAWARD + `?id=${id}`)
