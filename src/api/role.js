import request from '@/utils/request'

const API = {
  //获取所有的角色信息
  GETROLELIST: '/role/roleList',
  //修改角色信息
  EDITROLE: '/role/roleEdit',
  //获取所有的管理员信息
  GETUSERLIST: '/role/adminList',
  //新增管理员
  ADDADMIN: '/role/adminAdd',
  //删除管理员
  DELETEADMIN: '/role/adminDel'
}

export const reqGetRoleList = (page, pageSize, searchKey) => request.get(API.GETROLELIST + '?page=' + page + '&pageSize=' + pageSize + '&searchKey=' + searchKey)

export const reqEditRole = (data) => request.post(API.EDITROLE, data)

export const reqGetUserList = (page, pageSize, searchKey) => request.get(API.GETUSERLIST + '?page=' + page + '&pageSize=' + pageSize + '&searchKey=' + searchKey)

export const reqAddAdmin = (data) => request.post(API.ADDADMIN, data)

export const reqDeleteAdmin = (id) => request.delete(API.DELETEADMIN + '?id=' + id)
