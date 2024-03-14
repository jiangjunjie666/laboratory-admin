<template>
  <div class="role">
    <el-card class="top-card">
      <template #header>
        <div>
          <span>角色权限管理</span>
        </div>
      </template>
      <div class="btn-list">
        <MyButton type="primary" icon="Plus" text="新增角色" @click="dialogVisibleAdd = true" />
        <el-popconfirm title="确定要删除嘛？" @confirm="handleDeleteAll">

          <template #reference>
            <MyButton type="danger" icon="Delete" text="批量删除" @click="handleDeleteAll" />
          </template>
        </el-popconfirm>
        <el-input v-model="searchKey" class="ipt" size="large" placeholder="请输入查询角色名称" :suffix-icon="Search" />
        <MyButton type="primary" text="搜索" icon="Search" :disable="searchKey == ''" @MybtnClick="getData" />
        <el-tooltip class=" box-item" effect="dark" content="刷新数据" placement="top-start">
          <el-icon class="set-icon" size="25" @click="getRoleList">
            <Refresh />
          </el-icon>
        </el-tooltip>
      </div>
    </el-card>
    <el-card>
      <el-table :data="tableData" @selection-change="handleSelectionChange" v-loading="loading" style="width: 100%"
        border highlight-current-row="true">
        <el-table-column type="selection" width="100" align="center" />
        <el-table-column label="Id" prop="id" width="100" align="center" />
        <el-table-column label="角色名称" prop="name" width="150" align="center" />
        <el-table-column label="角色描述" prop="job" width="200" align="center" />
        <el-table-column property="addressRole" label="拥有的路由权限" show-overflow-tooltip align="center">

          <template #default="scope">
            <div class="tag-list">
              <el-tag class="tag" type="error" v-if="!scope.row.route_permissions">暂无权限</el-tag>
              <el-tag class="tag"
                v-for="(item, index) in scope.row.route_permissions ? checkAllPermission(scope.row.route_permissions.split(',')) : []"
                :key="index" type="success" effect="light" round>
                {{ item }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">

          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)" type="primary">
              <el-icon class="el-icon--right">
                <Edit />
              </el-icon>
              <span>编辑</span>
            </el-button>
            <el-popconfirm title="确定要删除嘛？" @confirm="handleDelete(scope.row)">
              <template #reference>
                <el-button size="small" type="danger">
                  <el-icon class="el-icon--right">
                    <Delete />
                  </el-icon>
                  <span>删除</span>
                </el-button>
              </template>
            </el-popconfirm>
            <el-button type="success" size="small" @click="allotRoleBtn(scope.row)">
              <el-icon>
                <Cpu />
              </el-icon>
              <span>分配权限</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination" background v-model:current-page="page" v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]" :small="small" :disabled="disabled" :background="background"
        layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="getRoleList"
        @current-change="getRoleList" />
    </el-card>
    <EditPerson :dialogVisibleEdit="dialogVisibleEdit" :editData="editData" @editHandler="editHandler"></EditPerson>
    <el-dialog v-model="dialogVisibleAdd" title="新增角色" width="30%">
      <AddPerson @addAdminHandler="dialogVisibleAdd = false"></AddPerson>
    </el-dialog>

    <AllotRolePerson :drawer="drawer" :roleList="roleList" :roleId="roleId" :roleName="roleName"
      @closeAllot="closeAllot">
    </AllotRolePerson>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive, watch } from 'vue'
import { reqGetRoleList, reqDeleteRole, reqGiveAllotRole } from '@/api/role.js'
import { ElMessage } from 'element-plus'
import EditPerson from '@/views/Limits/RolePlayLimit/EditPerson/index.vue'
import AllotRolePerson from '@/views/Limits/RolePlayLimit/AllotRolePerson/index.vue'
import AddPerson from '@/views/Limits/RolePlayLimit/AddPerson/index.vue'
import { convertRoutes, checkAllPermission } from '@/utils/processRoutes.js'
import { navRoute } from '@/router/route/navRoute.js'
import { useRoleStore } from '@/store/modules/role.js'

const roleStore = useRoleStore()
const searchKey = ref('')
const tableData = ref([])

const page = ref(1)
const pageSize = ref(5)
const total = ref(0)

//弹窗控制
const dialogVisibleEdit = ref(false)
const dialogVisibleAdd = ref(false)
const drawer = ref(false)

//分配权限的数组
const roleList = ref([])

const roleId = ref(0)
const roleName = ref('')
const editData = reactive({
  id: '',
  name: '',
  job: ''
})
//计算出loading
const loading = computed(() => {
  return tableData.value.length === 0
})
const getRoleList = async () => {
  tableData.value = []
  const res = await reqGetRoleList(page.value, pageSize.value, searchKey.value)
  if (res.code !== 200) {
    return ElMessage({
      type: 'error',
      message: res.message
    })
  }
  total.value = res.data.total
  tableData.value = res.data.roleList
}
//函数角色
const handleDelete = async (row) => {
  const res = await reqDeleteRole(row.id)
  if (res.code !== 200) {
    return ElMessage({
      type: 'error',
      message: res.message
    })
  }
  ElMessage({
    type: 'success',
    message: '删除成功'
  })
  tableData.value = tableData.value.filter(i => i.id !== row.id)
}
//编辑按钮
const handleEdit = (index, row) => {
  dialogVisibleEdit.value = true
  editData.id = row.id
  editData.name = row.name
  editData.job = row.job
}
//编辑成功回调
const editHandler = () => {
  dialogVisibleEdit.value = false
  //修改数据
  tableData.value.forEach(i => {
    if (i.id == editData.id) {
      i.name = editData.name
      i.job = editData.job
    }
  })
}

//监听roleList的数据变化
watch(roleList, (newValue, oldValue) => {
  newValue.forEach(parent => {
    if (parent.children) {
      // 检查每个父元素下的子元素是否有 checked 变为 true 的情况
      const hasCheckedChildren = parent.children.some(child => child.checked);
      if (hasCheckedChildren) {
        // 如果存在 checked 变为 true 的子元素，则将父元素的 checked 设置为 true
        parent.checked = true;
      }
      // 检查父元素下的所有子元素的 checked 是否都为 false
      const allChildrenUnchecked = parent.children.every(child => !child.checked);
      if (allChildrenUnchecked) {
        // 如果所有子元素的 checked 都为 false，则将父元素的 checked 设置为 false
        parent.checked = false;
      }
    }
  })
}, {
  deep: true
})

//分配权限按钮
const allotRoleBtn = (row) => {
  drawer.value = true
  roleId.value = row.id
  roleName.value = row.name
  // 将权限字符串转换为数组
  const permissions = row.route_permissions.split(',');
  const arr = convertRoutes(navRoute)
  // console.log(arr);
  // 遍历权限数组，匹配路由配置
  permissions.forEach(permission => {
    checkPermission(permission, arr);
  });
  roleList.value = arr
  roleStore.oldAllotLimitRoleList = JSON.parse(JSON.stringify(arr))
}
//关闭分配权限
const closeAllot = async (id, name) => {
  drawer.value = false
  //查看数据是否被修改
  if (JSON.stringify(roleList.value) !== JSON.stringify(roleStore.oldAllotLimitRoleList)) {
    const roleStr = convertRoleListToPermissionString(roleList.value)
    const data = {
      id,
      name,
      roleStr
    }
    const res = await reqGiveAllotRole(data)
    if (res.code == 200) {
      //重新获取table数据
      getRoleList()
      return ElMessage({
        type: 'success',
        message: res.message
      })
    } else {
      return ElMessage({
        type: 'error',
        message: res.message
      })
    }
  }
  else {
    return
  }
}

/**
 * 将选中的角色列表转换为权限字符串
 * @param {Array} roleList 包含角色信息的数组
 * @returns {string} 权限字符串，以逗号分隔
 */
function convertRoleListToPermissionString(roleList) {
  const permissionArray = []; // 存储权限字符串的数组

  // 遍历角色列表
  roleList.forEach(role => {
    // 如果当前角色被选中，则将其标题加入权限数组
    if (role.checked) {
      permissionArray.push(role.title);
    }

    // 如果当前角色有子角色，则继续遍历子角色
    if (role.children) {
      role.children.forEach(childRole => {
        // 如果子角色被选中，则将其标题加入权限数组
        if (childRole.checked) {
          permissionArray.push(childRole.title);
        }
      });
    }
  });

  return permissionArray.join(',');
}

/**
 * 检查权限字符串是否包含在路由配置中，并更新路由配置的 checked 属性
 * @param {Array} permission 需要匹配的权限字符串数组
 * @param {Array} routes 被匹配的路由配置数组
 * @returns {boolean} 如果找到匹配的权限，则返回 true；否则返回 false
 */

function checkPermission(permission, routes) {
  return routes.some(route => {
    if (route.title === permission) {
      route.checked = true;
      return true;
    }
    if (route.children) {
      return checkPermission(permission, route.children);
    }
    return false;
  });
}




onMounted(() => {
  getRoleList()
})
</script>

<style lang="scss" scoped>
.top-card {
  margin-bottom: 10px;
  @include useBtnList();
}

.tag-list {
  display: flex;
  flex-wrap: wrap;

  .tag {
    margin: 5px 5px 5px 0;
  }
}

.pagination {
  margin: 10px 0;
  display: flex;
  justify-content: center;
}

.role {
  width: 100%;
  height: 100%;
}
</style>