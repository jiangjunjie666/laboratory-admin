import request from '@/utils/request.js'

const API = {
  //登录接口
  LOGIN: '/api/login',
  //退出登录
  LOGOUT: '/api/logout',
  //获取人员信息
  GETPERSONLIST: '/person/personList',
  //新增人员
  ADDPERSON: '/person/personAdd',
  //编辑人员
  EDITPERSON: '/person/personEdit',
  //删除人员
  DELETEPERSON: '/person/personDel?'
}

export const reqLogin = (data) => request.post(API.LOGIN, data)

export const reqGetPersonList = (page, pageSize, searchKey, genderKey, positionKey, inSchoolKey) => request.get(API.GETPERSONLIST + '?page=' + page + '&pageSize=' + pageSize + '&searchKey=' + searchKey + '&genderKey=' + genderKey + '&positionKey=' + positionKey + '&inSchoolKey=' + inSchoolKey)

export const reqAddPerson = (data) => request.post(API.ADDPERSON, data)

export const reqEditPerson = (data) => request.post(API.EDITPERSON, data)

export const reqDeletePerson = (id) => request.get(API.DELETEPERSON + 'id=' + id)

export const reqLogout = (data) => request.post(API.LOGOUT, data)
