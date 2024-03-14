<template>
  <div class="CompetitionWinner">
    <div class="top">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>竞赛获奖管理</span>
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
              <MyButton type="danger" icon="Delete" text="批量删除"></MyButton>
            </template>
          </el-popconfirm>

          <p style="margin:0 10px;color:#777">竞赛名称:</p>
          <el-select v-model="searchKeyName" class="m-2 select" placeholder="Select" size="large" style="width: 240px"
            @change="getAwardList">
            <el-option label="所有" value="所有" />
            <el-option :label="i.event_associated" :value="i.event_associated" v-for="(i, index) in selectData"
              :key="index" />
          </el-select>
          <el-input v-model="searchKeyComp" class="ipt" style="margin-left: 10px;" size="large" placeholder="请输入查询获奖人名字"
            :suffix-icon="Search" />
          <MyButton type="primary" icon="Refresh" text="查询" @MybtnClick="getAwardList" :disable="searchKeyComp == ''" />
          <el-tooltip class="box-item" effect="dark" content="刷新数据" placement="top-start">
            <el-icon class="set-icon" size="25" @click="getAwardList">
              <Refresh />
            </el-icon>
          </el-tooltip>
        </div>
      </el-card>
    </div>
    <div class="bottom">
      <el-card>
        <el-table :data="tableData" @selection-change="handleSelectionChange" v-loading="loading" style="width: 100%"
          border highlight-current-row="true">
          <el-table-column type="selection" width="100" align="center" />
          <el-table-column property="id" label="ID号" width="100" align="center" />
          <el-table-column property="event_associated" label="竞赛名称" width="200" align="center" />
          <el-table-column property="prize_name" label="奖品名称" width="300" align="center" />
          <el-table-column property="winner" label="获奖人" width="150" align="center" />
          <el-table-column label="获奖图片" align="center" width="200">
            <template #default="scope">
              <el-image style="width: 80px; height: 60px" :src="scope.row.prize_image" fits="fit">
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
          <el-table-column property="award_time" label="获奖时间" width="150" align="center" />
          <el-table-column label="操作" align="center">
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
        <el-pagination class="pagination" background v-model:current-page="page" v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]" :small="small" :disabled="disabled" :background="background"
          layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="getAwardList"
          @current-change="getAwardList" />
      </el-card>
    </div>
  </div>
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
    <el-form ref="ruleFormRef" :model="addCompetitionFrom" :rules="addCompetitionRules" label-width="140px"
      class="demo-ruleForm" label-position="left" :size="formSize" status-icon>
      <el-form-item label="竞赛名称：" prop="event_associated">
        <el-input v-model="addCompetitionFrom.event_associated" placeholder="请输入竞赛名字" style="width:300px" />
      </el-form-item>
      <el-form-item label="奖品名称：" prop="prize_name">
        <el-input v-model="addCompetitionFrom.prize_name" placeholder="请输入奖品名称" style="width:300px" />
      </el-form-item>
      <el-form-item label="获奖人：" prop="winner">
        <el-input v-model="addCompetitionFrom.winner" placeholder="请输入获奖人名字" style="width:300px" />
      </el-form-item>
      <el-form-item label="获奖时间：" prop="award_time">
        <el-date-picker v-model="addCompetitionFrom.award_time" type="date" placeholder="获奖时间" :size="size"
          value-format="YYYY-MM-DD" />
      </el-form-item>
      <el-form-item label="照片：" prop="prize_image">
        <img :src="existImage" class="existImg" v-if="existImage">
        <el-upload class="avatar-uploader" action="/api/api/prizeUpload" headers="headers" :show-file-list="false"
          :on-success="handleSuccess" :before-upload="beforeUpload">
          <img v-if="addCompetitionFrom.prize_image && !edit" :src="addCompetitionFrom.prize_image" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
import { Search } from '@element-plus/icons-vue';
import { reqGetAwardList, reqGetAllCompetition, reqAddAward, reqEditAward, reqDeleteAward } from '@/api/competition.js'
import { ElMessage } from 'element-plus';
import { useRoute } from 'vue-router';
const $route = useRoute()
const page = ref(1)
const pageSize = ref(5)
const total = ref(0)
const searchKeyComp = ref('')   //获奖人名称
const searchKeyName = ref('所有')   //竞赛名称

const dialogVisibleAdd = ref(false)
//批量选择的数据
const multipleSelection = ref([])
const ruleFormRef = ref(null)
//所有的表格数据
const tableData = ref([])
const selectData = ref([])

const edit = ref(false)
//表单数据
const existImage = ref('')
const addCompetitionFrom = reactive({
  id: '',
  event_associated: '',
  prize_name: '',
  award_time: '',
  prize_image: '',
  winner: ''
})
//表单校验
const addCompetitionRules = reactive({
  prize_name: [
    { required: true, message: '请输入获奖名称', trigger: 'blur' },
  ],
  award_time: [
    { required: true, message: '请选择获奖时间', trigger: 'blur' },
  ],
  event_associated: [
    { required: true, message: '请输入竞赛名字', trigger: 'blur' },
  ],
  winner: [
    { required: true, message: '请输入获奖人', trigger: 'blur' },
  ],
  prize_image: [
    { required: true, message: '请上传照片', trigger: 'blur' },
  ]
})
const getAwardList = async () => {
  const res = await reqGetAwardList(page.value, pageSize.value, searchKeyName.value == '所有' ? '' : searchKeyName.value, searchKeyComp.value)
  if (res.code == 200) {
    tableData.value = res.data
    total.value = res.total
  }
  else {
    return ElMessage({
      type: 'error',
      message: '数据获取失败，请刷新'
    })
  }
}
//计算出loading
// const loading = computed(() => {
//   return tableData.value.length === 0
// })
const getAllCompetition = async () => {
  const res = await reqGetAllCompetition()
  if (res.code == 200) {
    selectData.value = res.data
  } else {
    ElMessage({
      type: 'error',
      message: '数据获取失败，请刷新'
    })
  }
}
//添加获奖信息
const addCompetitionFromSubmit = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid, fields) => {
    if (valid) {
      //发送请求
      const res = await reqAddAward(addCompetitionFrom)
      if (res.code == 200) {
        //清空表单的数据
        addCompetitionFrom.id = ''
        addCompetitionFrom.event_associated = ''
        addCompetitionFrom.prize_name = ''
        addCompetitionFrom.award_time = ''
        addCompetitionFrom.prize_image = ''
        addCompetitionFrom.winner = ''
        ElMessage({
          type: 'success',
          message: res.message
        })
        //关闭表单
        dialogVisibleAdd.value = false
        //重新获取数据
        getAwardList()
      } else {
        ElMessage({
          type: 'error',
          message: res.message
        })
      }
    }
    else {
      console.log('error submit!', fields)
    }
  })
}

//点击编辑按钮
const handleEdit = (index, row) => {
  dialogVisibleAdd.value = true
  edit.value = true
  addCompetitionFrom.id = row.id
  addCompetitionFrom.event_associated = row.event_associated
  addCompetitionFrom.prize_name = row.prize_name
  addCompetitionFrom.award_time = row.award_time
  addCompetitionFrom.prize_image = row.prize_image
  addCompetitionFrom.winner = row.winner
  existImage.value = row.prize_image
}
//批量选择
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}
//修改信息
const EditForm = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid, fields) => {
    if (valid) {
      //发送修改请求
      const res = await reqEditAward(addCompetitionFrom)
      if (res.code == 200) {
        ElMessage({
          type: 'success',
          message: res.message
        })
        //重新获取数据
        dialogVisibleAdd.value = false
        getAwardList()
      } else {
        ElMessage({
          type: 'error',
          message: res.message
        })
      }
    }
    else {
      console.log('error submit!', fields)
    }
  })
}
//删除
const handleDelete = async (index, row) => {
  const res = await reqDeleteAward(row.id)
  if (res.code == 200) {
    getAwardList()
    return ElMessage({
      type: 'success',
      message: res.message
    })
  }
  else {
    ElMessage({
      type: 'error',
      message: res.message
    })
  }

}
//批量删除
const handleDeleteAll = async () => {
  //批量删除，promise.all
  await Promise.all(
    multipleSelection.value.map(async i => {
      try {
        const res = await reqDeleteAward(i.id)
        if (res.code == 200) {
          ElMessage({
            type: 'success',
            message: `${i.prize_name}` + res.message
          })
        } else {
          ElMessage({
            type: 'error',
            message: `${i.prize_name}` + res.message
          })
        }
      } catch (error) {
        console.error(error)
      }
    })
  )
  getAwardList()
}
//关闭弹窗
const handleClose = (done) => {
  //清空表单
  addCompetitionFrom.id = ''
  addCompetitionFrom.prize_name = ''
  addCompetitionFrom.award_time = ''
  addCompetitionFrom.event_associated = ''
  addCompetitionFrom.prize_image = ''
  addCompetitionFrom.winner = ''

  existImage.value = ''
  if (edit.value) { addCompetitionFrom.image = '' }
  edit.value = false
  done()
}


//图片上传成功的回调
const handleSuccess = (response) => {
  if (edit.value) {
    existImage.value = response.data.url
  }
  addCompetitionFrom.prize_image = response.data.url
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
  //查看route中有没有query参数
  if ($route.query.name) {
    searchKeyName.value = $route.query.name
  }
  getAwardList()
  getAllCompetition()
})
</script>

<style lang="scss" scoped>
@include useBtnList();

.top {
  margin-bottom: 10px;
}

.pagination {
  margin-top: 10px;
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