<template>
  <div class="top-card">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>角色信息管理</span>
        </div>
      </template>
      <div class="btn-list">
        <el-button type="primary" @click="dialogVisibleAdd = true">
          <el-icon>
            <Plus />
          </el-icon>
          <span>新增管理员</span>
        </el-button>
        <el-popconfirm title="确定要删除嘛？" @confirm="handleDeleteAll">

          <template #reference>
            <MyButton type="danger" :disable="multipleSelection.length == 0" icon="Delete" text="批量删除"></MyButton>
          </template>
        </el-popconfirm>

        <el-input v-model="searchKey" class="ipt" size="large" placeholder="请输入查询人职位名称" :suffix-icon="Search" />
        <MyButton type="primary" icon="Refresh" text="查询" @MybtnClick="getRoleList" :disable="searchKey == ''" />
        <el-tooltip class="box-item" effect="dark" content="刷新数据" placement="top-start">
          <el-icon class="set-icon" size="25" @click="getRoleList">
            <Refresh />
          </el-icon>
        </el-tooltip>
      </div>
    </el-card>
    <el-card class=" table-card">
      <el-table :data="tableData" @selection-change="handleSelectionChange" v-loading="loading" style="width: 100%"
        border highlight-current-row="true">
        <el-table-column type="selection" width="100" align="center" />
        <el-table-column property="id" label="ID号" width="100" align="center" />
        <el-table-column property="username" label="用户名" width="150" align="center" />
        <el-table-column property="role_name" label="职位名称" width="150" align="center" />
        <el-table-column property="allot_role" label="拥有的角色" width="220" align="center">

          <template #default="scope">
            <div class="tag-list">
              <el-tag class="tag" type="error" v-if="scope.row.allot_role.length == 0">暂无角色</el-tag>
              <el-tag v-for="(item, index)  in scope.row.allot_role" style="margin:3px" :key="index" size="mini"
                type="success">
                {{ item }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column property="status" label="当前状态" align="center" width="120">

          <template #default="scope">
            <el-switch v-model="scope.row.status" size="large" @change="handleStatusChange(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column property="online" label="是否在线" align="center" width="120">

          <template #default="scope">
            <el-switch v-model="scope.row.online" size="large" disabled />
          </template>
        </el-table-column>
        <el-table-column property="addressRole" label="拥有的路由权限" show-overflow-tooltip align="center">

          <template #default="scope">
            <div class="tag-list">
              <el-tag class="tag" type="error" v-if="scope.row.addressRole.length == 0">暂无权限</el-tag>
              <el-tag class="tag" v-for="(item, index) in scope.row.addressRole" :key="index" type="success"
                effect="light" round>
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
            <el-popconfirm title="确定要删除嘛？" @confirm="handleDelete(scope.$index, scope.row)">
              <template #reference>
                <el-button size="small" type="danger">
                  <el-icon class="el-icon--right">
                    <Delete />
                  </el-icon>
                  <span>删除</span>
                </el-button>
              </template>
            </el-popconfirm>
            <el-button type="success" size="small" @click="drawerChange(scope.$index, scope.row)">
              <el-icon>
                <Cpu />
              </el-icon>
              <span>分配角色</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination" background v-model:current-page="page" v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]" :small="small" :disabled="disabled" :background="background"
        layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="getRoleList"
        @current-change="getRoleList" />
    </el-card>
    <!-- 编辑对话框 -->
    <EditRolePlay :dialogVisibleEdit="dialogVisibleEdit" :editData="editData" @editHandler="editHandler"></EditRolePlay>
    <!-- 新增管理员对话框 -->
    <el-dialog v-model="dialogVisibleAdd" title="新增管理员" width="30%">
      <AddRolePlay @addAdminHandler="addAdminHandler"></AddRolePlay>
    </el-dialog>
    <AllotRolePlay :drawer="drawer" :roleList="roleList" :roleId="roleId" @closeAllot="closeAllot"></AllotRolePlay>
  </div>
</template>

<script setup>
import { reqGetUserList, reqDeleteAdmin, reqEditAdminStatus, reqGiveAdminRole } from '@/api/role.js'
import { ref, onMounted, computed, reactive } from 'vue'
import { ElMessage } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import AddRolePlay from '@/views/User/RolePlay/AddRolePlay/index.vue'
import EditRolePlay from '@/views/User/RolePlay/EditRolePlay/index.vue'
import AllotRolePlay from '@/views/User/RolePlay/AllotRolePlay/index.vue'
import { useRoleStore } from '@/store/modules/role.js'
import { checkAllPermission } from '@/utils/processRoutes.js'


const roleStore = useRoleStore()
const searchKey = ref('')
//获取信息数据
const tableData = ref([])
const page = ref(1)
const pageSize = ref(5)
const total = ref(0)
//弹窗控制
const dialogVisibleEdit = ref(false)
const dialogVisibleAdd = ref(false)
const drawer = ref(false)
//搜索到的数据是否为空
const dataLoading = ref(false)
//待批量删除的数据
const multipleSelection = ref([])
//编辑信息
const editData = reactive({
  id: '',
  username: '',
  role_name: ''
})
//分配角色子组件需要的数据
const roleList = ref([])
const roleId = ref(0)
//加载框显示
//计算属性计算出来
const loading = computed(() => {
  if (dataLoading.value) return false
  return tableData.value.length === 0
})

//获取table数据
const getRoleList = async () => {
  tableData.value = []
  const res = await reqGetUserList(page.value, pageSize.value, searchKey.value)
  if (res.code !== 200) {
    return ElMessage({
      type: 'error',
      message: res.message
    })
  }
  //判断数据是否为空
  if (!res.data) {
    dataLoading.value = true
    return ElMessage({
      type: 'warning',
      message: res.message
    })
  }
  total.value = res.data.total
  tableData.value = handlerTableData(res.data.roleList)
}

//编辑
const handleEdit = (index, row) => {
  dialogVisibleEdit.value = true
  editData.id = row.id
  editData.username = row.username
  editData.role_name = row.role_name
}

//处理route_permissions数据
function handlerTableData(data) {
  const arr = []
  data.forEach(i => {
    const tableObj = {
      id: i.id,
      username: i.username,
      role_name: i.role_name,
      status: i.status == 1 ? true : false,
      online: i.online == 1 ? true : false,
      allot_role: i.allot_role ? i.allot_role.split(',') : [],
      addressRole: checkAllPermission(i.authority.split(','))
    }
    arr.push(tableObj)
  });
  return arr;
}
//查看用户是否拥有所有的权限路由
const handleDelete = async (index, row) => {
  const res = await reqDeleteAdmin(row.id)
  if (res.code !== 200) {
    return ElMessage({
      type: 'error',
      message: res.message
    })
  }
  ElMessage({
    type: 'success',
    message: res.message
  })
  //删除对应的数据
  tableData.value.splice(index, 1)
}
//批量选择
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}
//批量删除回调
const handleDeleteAll = async () => {
  // 没有成功删除的数据
  let errArr = [];

  // 使用 Promise.all 等待所有请求完成
  await Promise.all(
    multipleSelection.value.map(async i => {
      try {
        const res = await reqDeleteAdmin(i.id);
        if (res.code !== 200) {
          errArr.push(i.username);
        }
      } catch (error) {
        console.error(error);
        errArr.push(i.username);
      }
    })
  );
  // 弹窗提示哪些被删了，哪些没有被删
  if (errArr.length > 0) {
    ElMessage({
      message: `${errArr.join(',')} 删除失败`,
      type: 'error',
    });
  } else {
    ElMessage({
      type: 'success',
      message: '批量删除成功',
    });
    //修改数据
    tableData.value = tableData.value.filter(
      i => !multipleSelection.value.includes(i)
    )
  }
}
//状态发生改变
const handleStatusChange = async (row) => {
  const res = await reqEditAdminStatus(row.id, row.status ? 1 : 0)
  if (res.code !== 200) {
    return ElMessage({
      type: 'error',
      message: res.message
    })
  }
  ElMessage({
    type: 'success',
    message: res.message
  })
}
//增加管理员自定义事件回调
const addAdminHandler = (value) => {
  dialogVisibleAdd.value = value
  //重新获取数据
  getRoleList()
}

const editHandler = (value) => {
  dialogVisibleEdit.value = value
  //重新获取数据，尽量减少发送请求次数
  tableData.value.forEach(i => {
    if (i.id == editData.id) {
      i.username = editData.username
      i.role_name = editData.role_name
    }
  })
}

//分配角色按钮
const drawerChange = (index, row) => {
  console.log(row);
  drawer.value = true
  if (roleStore.allRoleList.length == 0) {
    const res = roleStore.getAllRoleList()
    res.then(() => {
      handlerRoleList(row)
    })
    return;
  }
  handlerRoleList(row)
  roleStore.oldAllotUserRoleList = JSON.parse(JSON.stringify(roleList.value))
}

//关闭分配角色弹窗
const closeAllot = async (roleid) => {
  drawer.value = false
  const arr = []
  //首先查看是否有修改
  if (JSON.stringify(roleList.value) !== JSON.stringify(roleStore.oldAllotUserRoleList)) {
    roleList.value.forEach(item => {
      if (item.checked) {
        arr.push(item.name)
      }
    })
    //将arr转换为字符串
    const data = {
      id: roleid,
      roleArr: arr.join(',')
    }
    const res = await reqGiveAdminRole(data)
    if (res.code == 200) {
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

//处理分配角色的子组件数据
const handlerRoleList = (row) => {
  //遍历整个数组，给每个对象添加一个是否已经选中的标识
  roleList.value = []
  roleId.value = row.id
  //假设row.allot_role为空数组
  if (row.allot_role.length == 0) {
    return roleStore.allRoleList.forEach(item => {
      roleList.value.push({
        id: item.id,
        name: item.name,
        checked: false
      })
    })
  }

  //对吧row中的数据
  roleStore.allRoleList.forEach((item) => {
    row.allot_role.forEach((item2) => {
      if (item2 == item.name) {
        roleList.value.push({
          id: item.id,
          name: item.name,
          checked: true
        })
      } else {
        roleList.value.push({
          id: item.id,
          name: item.name,
          checked: false
        })
      }
    })
  })
}
onMounted(() => {
  getRoleList()
})
</script>

<style lang="scss" scoped>
@include useBtnList();

.table-card {
  margin-top: 15px;
  margin-bottom: 10px;

  .tag-list {
    // margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;

    .tag {
      margin: 5px 5px;
    }
  }
}

.pagination {
  margin: 10px;
  display: flex;
  justify-content: center;
}

.top-card {
  width: 100%;
  height: 100%;
}
</style>