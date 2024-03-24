<template>
  <div>
    <div class="news-top">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>新闻管理</span>
          </div>
        </template>
        <div class="btn-list">
          <el-button type="primary" @click="dialogVisibleAdd = true">
            <el-icon>
              <Plus />
            </el-icon>
            <span>新增新闻</span>
          </el-button>
          <el-popconfirm title="确定要删除嘛？" @confirm="handleDeleteAll">
            <template #reference>
              <MyButton type="danger" icon="Delete" text="批量删除"></MyButton>
            </template>
          </el-popconfirm>
          <p style="margin:0 10px;color:#777">编辑人:</p>
          <el-select v-model="searchEditor" class="m-2 select" placeholder="Select" size="large" style="width: 240px"
            @change="getNewsList">
            <el-option label="所有" value="所有" />
            <el-option :label="i.editor" :value="i.editor" v-for="(i, index) in editorList" :key="i.id" />
          </el-select>
          <el-input v-model="searchKey" style="margin-left:10px" class="ipt" size="large" placeholder="请输入查询新闻标题"
            :suffix-icon="Search" />
          <MyButton type="primary" icon="Refresh" text="查询" @MybtnClick="getNewsList" :disable="searchKey == ''" />
          <el-tooltip class="box-item" effect="dark" content="刷新数据" placement="top-start">
            <el-icon class="set-icon" size="25" @click="getNewsList">
              <Refresh />
            </el-icon>
          </el-tooltip>
        </div>
      </el-card>
    </div>
    <div class="event-bottom">
      <el-card style="margin-top:10px">
        <el-table :data="tableData" @selection-change="handleSelectionChange" class="table" v-loading="loading"
          style="width: 100%" border highlight-current-row="true">
          <el-table-column type="selection" width="60" align="center" />
          <el-table-column property="id" label="ID号" width="60" align="center" />
          <el-table-column property="editor" label="编辑者" align="center" width="100" />
          <el-table-column property="title" label="新闻标题" width="200" align="center" />
          <el-table-column property="contentShow" label="新闻内容" align="center">
            <template #default="scope">
              <div class=content>
                {{ scope.row.contentShow }}
              </div>
            </template>
          </el-table-column>
          <el-table-column property="publish_date" label="创建时间" width="150" align="center" />
          <el-table-column property="last_modified" label="最后修改时间" width="150" align="center" />
          <el-table-column property="status" label="状态" width="150" align="center">
            <!-- 状态 -->
            <template #default="scope">
              <el-switch v-model="scope.row.status" @change="handleStatusChange(scope.row)" size="large" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="290" align="center">
            <template #default="scope">
              <el-button size="small" @click="handleView(scope.$index, scope.row)" type="success">
                <el-icon class="el-icon--right">
                  <Search />
                </el-icon>
                <span>查看原文</span>
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
          layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="getNewsList"
          @current-change="getNewsList" />
      </el-card>
    </div>
  </div>
  <el-dialog v-model="dialogVisibleAdd" title="添加新闻" width="40%" :before-close="handleClose">
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">关闭</el-button>
        <el-button type="primary" @click="addNewsFromSubmit(ruleFormRef)" :disabled="edit">
          添加
        </el-button>
        <el-button type="warning" @click="EditForm(ruleFormRef)" :disabled="!edit">修改</el-button>
      </span>
    </template>
    <el-form ref="ruleFormRef" :model="addNewsFrom" :rules="addNewsRules" label-width="100px" class="demo-ruleForm"
      label-position="left" :size="formSize" status-icon>
      <el-form-item label="新闻标题：" prop="title">
        <el-input v-model="addNewsFrom.title" placeholder="请输入新闻标题" style="width:300px" />
      </el-form-item>
      <el-form-item label="编辑者：" prop="editor">
        <el-input v-model="addNewsFrom.editor" placeholder="请输入编辑者" style="width:300px" />
      </el-form-item>
      <el-form-item label="新闻内容：" prop="content">
        <div style="max-height:200px;min-height:50px;overflow:auto">
          <el-input v-model="content" autosize type="textarea" placeholder="请输入新闻内容" style="width:300px;" />
        </div>
        <el-button type="primary" style="margin:0 10px"
          @click="openEditorDialog(addNewsFrom.content)">打开富文本编辑器</el-button>
        <p style="color:red">(请勿在输入框中直接修改内容，打开编辑器修改更佳)</p>
      </el-form-item>
      <el-form-item label="创建时间：" prop="publish_date">
        <el-date-picker v-model="addNewsFrom.publish_date" type="date" placeholder="创建时间" :size="size"
          value-format="YYYY-MM-DD" />
      </el-form-item>
      <el-form-item label="修改时间：" prop="last_modified">
        <el-date-picker v-model="addNewsFrom.last_modified" type="date" placeholder="最后修改时间" :size="size"
          value-format="YYYY-MM-DD" />
      </el-form-item>
    </el-form>
  </el-dialog>
  <div class="bottom">
    <el-dialog v-model="dialogEditor" width="60%">
      <template #header>
        <div class="dialog-header">
          <el-button type="success" @click="save">
            <el-icon class="el-icon--left">
              <Operation />
            </el-icon>
            临时保存
          </el-button>
          <el-popover placement="right" title="草稿箱" :width="420" trigger="click">
            <template #reference>
              <el-button class="m-2">使用草稿</el-button>
            </template>
            <el-table :data="gridData">
              <el-table-column width="150" align="center" property="title" label="标题" />
              <el-table-column width="100" align="center" property="editor" label="编辑者" />
              <el-table-column label="操作" width="150" align="center">
                <template #default="scope">
                  <el-button size="small" type="success" @click="handleDraft(scope.$index, scope.row)">使用</el-button>
                  <el-button type="danger" size="small"
                    @click="handleDeleteDraft(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-popover>
        </div>
      </template>
      <div style="border: 1px solid #ccc">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
          :mode="mode" />
        <Editor style="height: 600px; overflow-y: hidden;" v-model="addNewsFrom.content" :defaultConfig="editorConfig"
          :mode="mode" @onCreated="handleCreated" />
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { reqGetNewsList, reqAddNews, reqEditNews, reqDeleteNews, reqEditNewsStatus, reqGetAllEditor } from '@/api/news.js'
import { ElMessage } from 'element-plus';
import { ref, onMounted, computed, reactive, onBeforeUnmount, shallowRef } from 'vue'
import { getDraft, saveDraft, deleteDraft } from '@/utils/getDraft.js'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
const dialogVisibleAdd = ref(false)
const dialogEditor = ref(false)
const searchKey = ref('')
const searchEditor = ref('所有')
const page = ref(1)
const pageSize = ref(5)
const total = ref(0)
const edit = ref(false)
const multipleSelection = ref([])
//编辑人数组
const editorList = ref([])
//计算属性
//计算loading状态
const loading = computed(() => {
  return tableData.value.length == 0
})
//计算content内容
const content = computed(() => {
  return addNewsFrom.content.replace(/<[^>]+>/g, '')
    .replace(/&[^;]+;/g, '')
    .replace(/\u00A0/g, '')
    .replace(/\s+/g, ''); // 移除所有空白字符
})
//获取新闻列表
const tableData = ref([])
const ruleFormRef = ref(null)

//编辑器内容部分
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const toolbarConfig = {}
//编辑器配置
let editorConfig = { MENU_CONF: {} }
editorConfig.placeholder = '请输入内容...'
//上传图片的配置
editorConfig.MENU_CONF['uploadImage'] = {
  //上传地址
  server: '/api/api/newsUpload',
  // 单个文件的最大体积限制，默认为 2M
  maxFileSize: 10 * 1024 * 1024, // 1M
  // 最多可上传几个文件，默认为 100
  maxNumberOfFiles: 10,
  // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
  allowedFileTypes: [],
  // 超时时间，默认为 10 秒
  timeout: 5 * 1000, // 5 秒

  onBeforeUpload(file) {
    return file
  },
  // 上传进度的回调函数
  onProgress(progress) {
    console.log('progress', progress)
  },

  // 单个文件上传成功之后
  onSuccess(file, res) {
    console.log(`${file.name} 上传成功`, res)
  },

  // 单个文件上传失败
  onFailed(file, res) {
    console.log(`${file.name} 上传失败`, typeof res.erron)
  },

  // 上传错误，或者触发 timeout 超时
  onError(file, err, res) {
    console.log(`${file.name} 上传出错`, err, res)
  },
}

const mode = ref('default')
//表单数据
const addNewsFrom = reactive({
  id: '',
  title: '',
  content: ``,
  editor: '',
  publish_date: '',
  last_modified: '',
  status: '',
})

//临时草稿数据
const gridData = ref([])
const handleCreated = (editor) => {
  console.log('created', editor);
  editorRef.value = editor // 记录 editor 实例，重要！
}

//定义表单检验规则
const addNewsRules = reactive({
  title: [
    { required: true, message: '请输入新闻标题', trigger: 'blur' },
  ],
  editor: [
    { required: true, message: '请输入编辑者', trigger: 'blur' },
  ],
  content: [
    { required: true, message: '请输入新闻内容', trigger: 'blur' },
  ],
  publish_date: [
    { required: true, message: '请输入创建时间', trigger: 'blur' },
  ],
  last_modified: [
    { required: true, message: '请输入最后修改时间', trigger: 'blur' },
  ]
})
const getNewsList = async () => {
  const res = await reqGetNewsList(page.value, pageSize.value, searchKey.value, searchEditor.value)
  if (res.code == 200) {
    //将res.data中的status改成布尔值
    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].status == 1) {
        res.data[i].status = true
      } else {
        res.data[i].status = false
      }
    }
    tableData.value = res.data
    //对tableData中的数据content去除html标签
    for (let i = 0; i < tableData.value.length; i++) {
      let contentShow = tableData.value[i].content
        .replace(/<[^>]+>/g, '')
        .replace(/&[^;]+;/g, '')
        .replace(/\u00A0/g, '')
        .replace(/\s+/g, ''); // 移除所有空白字符
      tableData.value[i].contentShow = contentShow
    }
    total.value = res.total
  }
}
//获取所有编辑人
const getEditorList = async () => {
  const res = await reqGetAllEditor()
  if (res.code == 200) {
    editorList.value = res.data
  }
}
//添加按钮
const addNewsFromSubmit = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      //提交表单
      const res = await reqAddNews(addNewsFrom)
      if (res.code == 200) {
        ElMessage({
          type: 'success',
          message: '添加成功'
        })
        dialogVisibleAdd.value = false
        getNewsList()
      } else {
        ElMessage({
          type: 'warning',
          message: '添加失败'
        })
      }
    } else {
      ElMessage({
        type: 'warning',
        message: '请检查表单是否填写完全,正确'
      })
    }
  })
}
//删除按钮
const handleDelete = async (index, row) => {
  const res = await reqDeleteNews(row.id)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getNewsList()
  } else {
    ElMessage({
      type: 'warning',
      message: '删除失败'
    })
  }
}
//批量删除
const handleDeleteAll = async () => {
  //批量删除，promise.all
  await Promise.all(
    multipleSelection.value.map(async i => {
      await reqDeleteNews(i.id)
    })
  ).then(() => {
    ElMessage({
      type: 'success',
      message: '批量删除成功'
    })
    getNewsList()
  })
}
//修改状态的按钮
const handleStatusChange = async (row) => {
  const res = await reqEditNewsStatus(row.id, row.status ? 1 : 0)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '修改成功'
    })
  }
  else {
    ElMessage({
      type: 'warning',
      message: '修改失败'
    })
  }
}
//打开编辑器
const openEditorDialog = (i) => {
  dialogEditor.value = true
}
onMounted(() => {
  getNewsList()
  gridData.value = getDraft()
  getEditorList()
})

//点击编辑按钮
const handleEdit = (index, row) => {
  dialogVisibleAdd.value = true
  edit.value = true
  addNewsFrom.id = row.id
  addNewsFrom.title = row.title
  addNewsFrom.editor = row.editor
  addNewsFrom.content = row.content
  addNewsFrom.publish_date = row.publish_date
  addNewsFrom.last_modified = row.last_modified
}

//关闭新增新闻的弹窗的回调函数
const handleClose = (done) => {
  //查看是否为编辑状态
  if (edit.value) {
    //清空数据
    addNewsFrom.title = ''
    addNewsFrom.editor = ''
    addNewsFrom.content = ''
    addNewsFrom.publish_date = ''
    addNewsFrom.last_modified = ''
    edit.value = false
    done()
  } else {
    //不用清空数据
    done()
  }
}
//修改
const EditForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const res = await reqEditNews(addNewsFrom)
      console.log(res);
      if (res.code == 200) {
        ElMessage({
          type: 'success',
          message: '修改成功'
        })
        dialogVisibleAdd.value = false
        //清空数据
        addNewsFrom.title = ''
        addNewsFrom.editor = ''
        addNewsFrom.content = ''
        addNewsFrom.publish_date = ''
        addNewsFrom.last_modified = ''
        getNewsList()
      } else {
        ElMessage({
          type: 'warning',
          message: '修改失败'
        })
      }
    } else {
      ElMessage({
        type: 'warning',
        message: '请检查表单是否填写完全,正确'
      })
    }
  })
}
//临时保存草稿
const save = () => {
  //将html元素保存到localStorage中
  if (saveDraft(addNewsFrom)) {
    return ElMessage({
      type: 'success',
      message: '保存成功'
    })
  } else {
    return ElMessage({
      type: 'error',
      message: '保存失败'
    })
  }
}
//选中所有
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

//删除某个草稿
const handleDeleteDraft = (index, row) => {
  deleteDraft(index, row)
  //重新获取
  gridData.value = getDraft()
}
//使用此草稿
const handleDraft = (index, row) => {
  addNewsFrom.title = row.title
  addNewsFrom.editor = row.editor
  addNewsFrom.content = row.content
  addNewsFrom.publish_date = row.publish_date
  addNewsFrom.last_modified = row.last_modified
  addNewsFrom.status = row.status
}
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
</script>

<style lang="scss" scoped>
@include useBtnList();

.pagination {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  .cell {
    height: 100px;
    overflow: hidden
  }

}

.table {
  :deep(.content) {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    /* 限制在一个块元素显示的文本的行数 */
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5;
    /* 可以设置为你想要的行高 */
    max-height: 4.5em;
    /* 根据行高计算最大高度，这里是3行的总高度 */
  }
}

.bottom {
  :deep(.draft-list) {
    display: flex
  }
}
</style>