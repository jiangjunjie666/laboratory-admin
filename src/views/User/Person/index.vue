<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>实验室人员信息管理</span>
        </div>
      </template>
      <div class="handler">
        <div class="head">
          <p>人员职位:</p>
          <el-select v-model="positionKey" class="m-2 select" placeholder="Select" size="large" style="width: 240px"
            @change="getPersonList">
            <el-option label="所有" value="所有" />
            <el-option label="学生" value="学生" />
            <el-option label="教师" value="老师" />
          </el-select>
          <p>性别:</p>
          <el-select v-model="genderKey" class="m-2 select" placeholder="Select" size="large" style="width: 240px"
            @change="getPersonList">
            <el-option label="所有" value="所有" />
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
          <p>是否在校:</p>
          <el-select v-model="inSchoolKey" class="m-2 select" placeholder="Select" size="large" style="width: 240px"
            @change="getPersonList">
            <el-option label="所有" value="所有" />
            <el-option label="在" value="1" />
            <el-option label="不在" value="0" />
          </el-select>
        </div>
        <div class="foot">
          <p>人员搜索:</p>
          <el-input v-model="searchKey" class="w-50 m-2" size="large" placeholder="请输入查询人名字" :suffix-icon="Search" />
          <el-button type="primary" class="search" :disabled="searchKey == ''" @click="getPersonList">搜索</el-button>
          <el-icon class="refresh" @click="getPersonList" size="20">
            <Refresh />
          </el-icon>
        </div>
      </div>
    </el-card>
    <el-card class="tableData">
      <el-button type="primary" class="add" @click="addPerson">添加新成员</el-button>
      <el-table :data="personList" border="true" class="table" highlight-current-row="true" lazy="true" stripe="true">
        <el-table-column label="Id" prop="id" width="50" />
        <el-table-column label="姓名" prop="name" width="100" />
        <el-table-column label="性别" prop="gender" width="100" />
        <!-- 头像照片 -->
        <el-table-column label="照片">
          <template #default="scope">
            <el-image style="width: 70px; height: 50px" :src="`http://localhost:3000/images/${scope.row.avatar_photo}`"
              fits="fill">
              <template #error>
                <div class="image-slot">
                  <el-icon>
                    <Picture />
                  </el-icon>
                  <span>图片失效</span>
                </div>
              </template>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="生日" prop="birthday" />
        <el-table-column label="加入时间" prop="join_date" />
        <el-table-column label="职位" prop="position" />
        <el-table-column label="是否在学校">
          <template #default="scope">
            <p>{{ scope.row.is_in_school ? '是' : '否' }}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作">
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
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="page" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]" :small="small"
        :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper" :total="total"
        @size-change="getPersonList" @current-change="getPersonList" />
    </el-card>
    <!-- dialog弹出框 添加新成员 -->
    <el-dialog v-model="dialogVisible" title="添加新成员" width="40%" :before-close="handleClose">
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="addPersonFormSubmit(ruleFormRef)" :disabled="edit">
            添加
          </el-button>
          <el-button type="warning" @click="EditForm(ruleFormRef)" :disabled="!edit">修改</el-button>
        </span>
      </template>
      <el-form ref="ruleFormRef" :model="addPersonForm" :rules="addPersonRules" label-width="100px" class="demo-ruleForm"
        label-position="left" :size="formSize" status-icon>
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="addPersonForm.name" placeholder="请输入姓名" style="width:300px" />
        </el-form-item>
        <el-form-item label="性别：" prop="gender">
          <el-radio-group v-model="addPersonForm.gender" class="ml-4">
            <el-radio label="男" size="large">男</el-radio>
            <el-radio label="女" size="large">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="职位：" prop="position">
          <el-radio-group v-model="addPersonForm.position" class="ml-4">
            <el-radio label="老师" size="large">老师</el-radio>
            <el-radio label="学生" size="large">学生</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="职位：" prop="is_in_school">
          <el-radio-group v-model="addPersonForm.is_in_school" class="ml-4">
            <el-radio label="1" size="large">在校</el-radio>
            <el-radio label="0" size="large">不在校</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日：" prop="birthday">
          <el-date-picker v-model="addPersonForm.birthday" type="date" placeholder="生日" :size="size"
            value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item label="加入时间：" prop="join_date">
          <el-date-picker v-model="addPersonForm.join_date" type="date" placeholder="加入时间" :size="size"
            value-format="YYYY-MM-DD" />
        </el-form-item>

        <el-form-item label="照片：" prop="avatar_url">
          <el-upload class="avatar-uploader" action="/api/api/upload" headers="headers" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="addPersonForm.avatar_url" :src="addPersonForm.avatar_url" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="照片名字：" prop="avatar_url_name">
          <el-input v-model="addPersonForm.avatar_url_name" placeholder="请输入照片名" style="width: 300px;margin:0 10px 0 0" />
          <el-button type="primary" @click="addPersonForm.avatar_url_name = addPersonForm.name">使用姓名命名</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { reqGetPersonList, reqAddPerson, reqEditPerson, reqDeletePerson } from '@/api/users.js'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
//分页相关数据
const page = ref(1)
const pageSize = ref(5)
const total = ref(0)
const personList = ref([])

//检索关键字
const positionKey = ref('所有') //下拉框选项
const genderKey = ref('所有')
const inSchoolKey = ref('所有')
const searchKey = ref('')


//控制对话框开关
const dialogVisible = ref(false)
//表单校验dom对象
const ruleFormRef = ref()
//控制是否是编辑状态
const edit = ref(false)
//表单数据
const addPersonForm = reactive({
  id: '',
  name: '',
  gender: '',
  avatar_url: '',
  birthday: '',
  join_date: '',
  position: '',
  is_in_school: '',
  avatar_url_name: ''
})
//获取table数据
const getPersonList = async () => {
  let params = {
    page: page.value,
    pageSize: pageSize.value,
    searchKey: searchKey.value,
    genderKey: genderKey.value == '所有' ? '' : genderKey.value,
    positionKey: positionKey.value == '所有' ? '' : positionKey.value,
    inSchoolKey: inSchoolKey.value == '所有' ? '' : inSchoolKey.value
  }
  const res = await reqGetPersonList(params.page, params.pageSize, params.searchKey, params.genderKey, params.positionKey, params.inSchoolKey)
  if (res.code !== 200) {
    return ElMessage({
      type: 'error',
      message: res.message
    })
  }
  personList.value = res.data
  total.value = res.total
}
//上传图片处理事件回调
const handleAvatarSuccess = (
  response,
  uploadFile
) => {
  addPersonForm.avatar_url = import.meta.env.VITE_SERVER + response.imgUrl
}
//限制上传图片的格式
const beforeAvatarUpload = (rawFile) => {
  //只能是照片格式
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('确保上传的照片格式正确!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error('照片大小小于5MB!')
    return false
  }
  return true
}


//表单验证规则
const addPersonRules = reactive({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 5, message: '请输入2-5位字符', trigger: 'blur' }
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ],
  birthday: [
    { required: true, message: '请选择生日', trigger: 'change' }
  ],
  join_date: [
    { required: true, message: '请选择加入时间', trigger: 'change' }
  ],
  position: [
    { required: true, message: '请选择职位', trigger: 'change' }
  ],
  is_in_school: [
    { required: true, message: '请选择是否在校', trigger: 'change' }
  ],
  avatar_url: [
    { required: true, message: '请上传照片', trigger: 'change' }
  ],
  avatar_url_name: [
    { required: true, message: '请输入照片名', trigger: 'blur' },
  ]
})

//点击添加新成员按钮后处理的事件
const addPerson = () => {
  dialogVisible.value = true
  edit.value = false
  clearForm()
}
//编辑完数据后点击添加按钮后处理的事件
const addPersonFormSubmit = async (formEl) => {
  //清空表单数据
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log('submit!')
      const res = await reqAddPerson(addPersonForm)
      if (res.code !== 200) {
        return ElMessage({
          type: 'error',
          message: res.message
        })
      }
      ElMessage({
        type: 'success',
        message: res.msg
      })
      //清空数据表
      clearForm()
      //关闭弹窗
      dialogVisible.value = false
    } else {
      console.log('error submit!', fields)
    }
  })
}

//编辑按钮
const handleEdit = (index, row) => {
  console.log(index, row)
  dialogVisible.value = true
  edit.value = true
  //赋值
  addPersonForm.id = row.id
  addPersonForm.name = row.name
  addPersonForm.gender = row.gender
  addPersonForm.avatar_url = import.meta.env.VITE_SERVER + '/images/' + row.avatar_photo
  addPersonForm.birthday = row.birthday
  addPersonForm.join_date = row.join_date
  addPersonForm.position = row.position
  addPersonForm.is_in_school = row.is_in_school + ''
  addPersonForm.avatar_url_name = row.avatar_photo.split('.')[0]
}
//编辑请求发送
const EditForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      //调用编辑的接口，修改数据
      const res = await reqEditPerson(addPersonForm)
      if (res.code !== 200) {
        return ElMessage({
          type: 'error',
          message: '编辑失败'
        })
      }
      ElMessage({
        type: 'success',
        message: '编辑成功'
      })
      //清空数据表
      clearForm()
      //关闭弹窗
      dialogVisible.value = false
      //重新获取数据
      getPersonList()
    } else {
      console.log('error submit!', fields)
    }
  })
}
//删除人员按钮
const handleDelete = async (index, row) => {
  console.log(row.id);
  const res = await reqDeletePerson(row.id)
  if (res.code !== 200) {
    return ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
  ElMessage({
    type: 'success',
    message: '删除成功'
  })
  getPersonList()
}
//清空表单数据函数
const clearForm = () => {
  addPersonForm.id = ''
  addPersonForm.name = ''
  addPersonForm.gender = ''
  addPersonForm.avatar_url = ''
  addPersonForm.birthday = ''
  addPersonForm.join_date = ''
  addPersonForm.position = ''
  addPersonForm.is_in_school = ''
  addPersonForm.avatar_url_name = ''
}
onMounted(() => {
  getPersonList()
})
</script>

<style lang="scss" scoped>
.handler {
  display: flex;
  align-items: center;

  .head {
    display: flex;
    align-items: center;

    p {
      font-size: 14px;
      color: #aaa;
    }

    .select {
      margin: 0 20px 0 10px;
    }
  }

  .foot {
    display: flex;
    align-items: center;

    p {
      font-size: 14px;
      color: #aaa;
    }

    .m-2 {
      //靠右
      width: 300px;
      margin: 0 10px 0 10px;
    }
  }


}

.tableData {
  margin-top: 15px;
  margin-bottom: 20px;

  .add {
    margin: 0 0 10px 0;
  }

  .table {
    margin: 10px 0;
  }
}

.image-slot {
  display: flex;
  align-items: center;
}

.refresh {
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    color: var(--el-color-primary);
  }
}
</style>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>