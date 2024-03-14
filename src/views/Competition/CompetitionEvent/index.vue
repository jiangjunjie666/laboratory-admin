<template>
  <div class="animate__fadeInRightBig animate__animated">
    <div class="enevt-top">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>竞赛项目管理</span>
          </div>
        </template>
        <div class="btn-list">
          <el-button type="primary" @click="dialogVisibleAdd = true">
            <el-icon>
              <Plus />
            </el-icon>
            <span>新增竞赛</span>
          </el-button>
          <el-popconfirm title="确定要删除嘛？" @confirm="handleDeleteAll">
            <template #reference>
              <MyButton type="danger" :disable="multipleSelection.length == 0" icon="Delete" text="批量删除"></MyButton>
            </template>
          </el-popconfirm>

          <el-input v-model="searchKey" class="ipt" size="large" placeholder="请输入查询项目名称" :suffix-icon="Search" />
          <MyButton type="primary" icon="Refresh" text="查询" @MybtnClick="getCompetitionList"
            :disable="searchKey == ''" />
          <el-tooltip class="box-item" effect="dark" content="刷新数据" placement="top-start">
            <el-icon class="set-icon" size="25" @click="getCompetitionList">
              <Refresh />
            </el-icon>
          </el-tooltip>
        </div>
      </el-card>
    </div>
    <div class="event-bottom">
      <el-card>
        <el-table :data="tableData" @selection-change="handleSelectionChange" v-loading="loading" style="width: 100%"
          border highlight-current-row="true">
          <el-table-column type="selection" width="100" align="center" />
          <el-table-column property="id" label="ID号" width="100" align="center" />
          <el-table-column property="name" label="竞赛名称" width="150" align="center" />
          <el-table-column label="竞赛图片logo" align="center" width="200">
            <template #default="scope">
              <el-image style="width: 80px; height: 60px" :src="scope.row.image" fits="fit">
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
          <el-table-column property="description" label="竞赛简介" />
          <el-table-column property="creation_date" label="竞赛首次参与时间" width="150" align="center" />
          <el-table-column label="操作" width="290" align="center">
            <template #default="scope">
              <el-button size="small" @click="handleView(scope.$index, scope.row)" type="success">
                <el-icon class="el-icon--right">
                  <Search />
                </el-icon>
                <span>查看获奖</span>
              </el-button>
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
        <el-pagination class="pagination" background v-model:current-page="page" v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]" :small="small" :disabled="disabled" :background="background"
          layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="getCompetitionList"
          @current-change="getCompetitionList" />
      </el-card>
    </div>

  </div>
  <!-- 新增项目表单 -->
  <el-dialog v-model="dialogVisibleAdd" title="添加新成员" width="40%" :before-close="handleClose">
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">关闭</el-button>
        <el-button type="primary" @click="addCompetitionFromSubmit(ruleFormRef)" :disabled="edit">
          添加
        </el-button>
        <el-button type="warning" @click="EditForm(ruleFormRef)" :disabled="!edit">修改</el-button>
      </span>
    </template>
    <el-form ref="ruleFormRef" :model="addCompetitionFrom" :rules="addCompetitionRules" label-width="100px"
      class="demo-ruleForm" label-position="left" :size="formSize" status-icon>
      <el-form-item label="竞赛名字：" prop="name">
        <el-input v-model="addCompetitionFrom.name" placeholder="请输入竞赛名字" style="width:300px" />
      </el-form-item>
      <el-form-item label="竞赛简介：" prop="description">
        <el-input v-model="addCompetitionFrom.description" autosize type="textarea" placeholder="请输入竞赛简介"
          style="width:300px" />
      </el-form-item>
      <el-form-item label="加入时间：" prop="creation_date">
        <el-date-picker v-model="addCompetitionFrom.creation_date" type="date" placeholder="加入时间" :size="size"
          value-format="YYYY-MM-DD" />
      </el-form-item>
      <el-form-item label="照片：" prop="image">
        <img :src="existImage" class="existImg" v-if="existImage">
        <el-upload class="avatar-uploader" action="/api/api/competitionUpload" headers="headers" :show-file-list="false"
          :on-success="handleSuccess" :before-upload="beforeUpload">
          <img v-if="addCompetitionFrom.image && !edit" :src="addCompetitionFrom.image" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue';
import { ref, onMounted, computed, reactive } from 'vue'
import { reqGetCompetitionList, reqAddCompetition, reqEditCompetition, reqDeleteCompetition } from '@/api/competition'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
const $router = useRouter()
const tableData = ref([])
const page = ref(1)
const pageSize = ref(5)
const searchKey = ref('')
const dialogVisibleAdd = ref(false)
const total = ref(0)

const ruleFormRef = ref(null)
//是否是修改
const edit = ref(false)
//现有的图片数据
const existImage = ref('')
//批量选择的数据
const multipleSelection = ref([])
const addCompetitionFrom = reactive({
  id: '',
  name: '',
  description: '',
  creation_date: '',
  image: ''
})
//新增项目表单
//添加按钮
const addCompetitionFromSubmit = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const res = await reqAddCompetition(addCompetitionFrom)
      if (res.code == 200) {
        //将表单的所有数据全部清空
        addCompetitionFrom.id = ''
        addCompetitionFrom.name = ''
        addCompetitionFrom.description = ''
        addCompetitionFrom.creation_date = ''
        addCompetitionFrom.image = ''
        dialogVisibleAdd.value = false
        getCompetitionList()
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
    } else {
      ElMessage({
        type: 'warning',
        message: '请按要求填写表单'
      })
    }
  })
}
//修改表单按钮
const handleEdit = (index, row) => {
  edit.value = true
  dialogVisibleAdd.value = true
  addCompetitionFrom.id = row.id
  addCompetitionFrom.name = row.name
  addCompetitionFrom.description = row.description
  addCompetitionFrom.creation_date = row.creation_date
  existImage.value = row.image
  addCompetitionFrom.image = row.image
}

//提交表单
const EditForm = async (formEl) => {

  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    const res = await reqEditCompetition(addCompetitionFrom)
    if (res.code == 200) {
      dialogVisibleAdd.value = false
      getCompetitionList()
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
  })
}
//删除按钮
const handleDelete = async (index, row) => {
  const res = await reqDeleteCompetition(row.id)
  if (res.code == 200) {
    getCompetitionList()
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
//批量删除
const handleDeleteAll = async () => {
  //批量删除，promise.all
  //遍历tableData中的数据

  await Promise.all(
    multipleSelection.value.map(async i => {
      try {
        const res = await reqDeleteCompetition(i.id)
        if (res.code == 200) {
          ElMessage({
            type: 'success',
            message: `${i.name}删除成功`
          })
        }
      } catch (error) {
        ElMessage({
          type: 'warning',
          message: `${i.name}删除失败`
        })
      }
    })
  )

  //重新获取数据
  getCompetitionList()
}
//配置校验
const addCompetitionRules = reactive({
  name: [
    { required: true, message: '请输入竞赛名字', trigger: 'blur' },
  ],
  description: [
    { required: true, message: '请输入竞赛简介', trigger: 'blur' },
  ],
  creation_date: [
    { required: true, message: '请输入加入时间', trigger: 'blur' },
  ],
  image: [
    { required: true, message: '请上传照片', trigger: 'blur' },
  ]
})
//关闭弹窗回调
const handleClose = (done) => {
  //清空表单
  addCompetitionFrom.name = ''
  addCompetitionFrom.description = ''
  addCompetitionFrom.creation_date = ''

  existImage.value = ''
  if (edit.value) { addCompetitionFrom.image = '' }
  edit.value = false
  done()
}
//获取table数据
const getCompetitionList = async () => {
  tableData.value = []
  const res = await reqGetCompetitionList(page.value, pageSize.value, searchKey.value)
  if (res.code == 200) {
    tableData.value = res.data
    total.value = res.total
  }
}
//计算出loading
const loading = computed(() => {
  return tableData.value.length === 0
})

//查看获奖，跳转页面
const handleView = (index, row) => {
  $router.push({ path: `/competition/winner`, query: { name: row.name } })
}
//批量选择
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}
//上传成功的钩子
const handleSuccess = (response) => {
  //判断打开的是不是修改按钮
  if (edit.value) {
    existImage.value = response.data.url
  }
  addCompetitionFrom.image = response.data.url
}
//上传之前的钩子
const beforeUpload = (file) => {
  //查看文件的大小 不超过5mb 且文件必须为图片
  if (file.size / 1024 / 1024 > 5) {
    ElMessage.error('文件大小不能超过5MB')
    return false
  }
  if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
    ElMessage.error('文件必须为图片')
    return false
  }
  return true
}

onMounted(() => {
  getCompetitionList()
})
</script>

<style lang="scss" scoped>
@include useBtnList();

.enevt-top {

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

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.existImg {
  margin: 0 20px 0 0;
  width: 178px;
  height: 178px;
  border: 1px dashed var(--el-border-color);
}
</style>