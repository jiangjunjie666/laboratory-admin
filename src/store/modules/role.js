import { defineStore } from 'pinia'
import { reqGetAllRoleList } from '@/api/role.js'
import { ElMessage } from 'element-plus'
export const useRoleStore = defineStore('role', {
  state: () => ({
    allRoleList: [],
    oldAllotLimitRoleList: [], // 查看角色的权限分配是否发生变化
    oldAllotUserRoleList: [] // 查看用户的角色分配是否发生变化
  }),
  actions: {
    //获取所有的角色列表
    async getAllRoleList() {
      const res = await reqGetAllRoleList()
      if (res.code === 200) {
        this.allRoleList = res.data
      } else {
        ElMessage({ type: 'error', message: res.message })
      }
    }
  }
})
