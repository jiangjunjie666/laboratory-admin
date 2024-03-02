import request from '@/utils/request'

const API = {
  //获取角色信息列表
  GETROLELIST: '/role/roleList',
  //获取所有的角色信息列表
  GETALLROLELIST: '/role/allRoleList',
  //修改角色信息
  EDITROLE: '/role/roleEdit',
  //增加角色
  ADDROLE: '/role/roleAdd',
  //删除角色
  DELETEROLE: '/role/roleDel',
  //获取所有的管理员信息
  GETUSERLIST: '/role/adminList',
  //新增管理员
  ADDADMIN: '/role/adminAdd',
  //删除管理员
  DELETEADMIN: '/role/adminDel',
  //编辑管理员
  EDITADMIN: '/role/adminEdit',
  //修改管理员状态
  EDITADMINSTATUS: '/role/adminStatus',
  //获取某个角色的权限信息
  GETROLEPERMISSION: '/role/rolePower',

  //给管理员分配角色
  GIVEADMINROLE: '/role/adminRole',
  //给角色分配权限
  GIVEALLOTROLE: '/role/allotRole'
}

export const reqGetRoleList = (page, pageSize, searchKey) => request.get(API.GETROLELIST + '?page=' + page + '&pageSize=' + pageSize + '&searchKey=' + searchKey)

export const reqGetAllRoleList = () => request.get(API.GETALLROLELIST)

export const reqEditRole = (data) => request.post(API.EDITROLE, data)

export const reqAddRole = (data) => request.post(API.ADDROLE, data)

export const reqDeleteRole = (id) => request.delete(API.DELETEROLE + '?id=' + id)

export const reqGetUserList = (page, pageSize, searchKey) => request.get(API.GETUSERLIST + '?page=' + page + '&pageSize=' + pageSize + '&searchKey=' + searchKey)

export const reqAddAdmin = (data) => request.post(API.ADDADMIN, data)

export const reqDeleteAdmin = (id) => request.delete(API.DELETEADMIN + '?id=' + id)

export const reqEditAdmin = (data) => request.post(API.EDITADMIN, data)

export const reqEditAdminStatus = (id, status) => request.put(API.EDITADMINSTATUS + '?id=' + id + '&status=' + status)

export const reqGetRolePermission = (id) => request.get(API.GETROLEPERMISSION + '?id=' + id)

export const reqGiveAdminRole = (data) => request.post(API.GIVEADMINROLE, data)

export const reqGiveAllotRole = (data) => request.post(API.GIVEALLOTROLE, data)
