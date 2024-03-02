<template>
  <div class="addform">
    <el-form :model="addData" ref="addRuleFormRef" status-icon :rules="addRules" label-width="80px" label-position="left">
      <el-form-item label="角色名" prop="name">
        <el-input placeholder="请输入角色名" v-model="addData.name" class="input"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="job">
        <el-input placeholder="请输入角色描述" class="input" v-model="addData.job"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(addRuleFormRef)">
          创建角色
        </el-button>
        <el-button @click="resetForm(addRuleFormRef)">清空数据</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { reqAddRole } from '@/api/role.js'
import { ElMessage } from 'element-plus';
const $emit = defineEmits(['addAdminHandler'])
//新增信息
const addData = reactive({
  name: '',
  job: ''
})
const addRuleFormRef = ref()
//表单校验规则
const addRules = reactive({
  name: [
    { required: true, message: '请输入角色名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
  ],
  job: [
    { required: true, message: '请输入角色描述', trigger: 'blur' },
    { min: 6, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
  ]
})
//新建管理员事件
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log('submit!')
      const res = await reqAddRole(addData)
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
      //关闭弹窗,自定义事件
      $emit('addAdminHandler', false)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped lang="scss">
.addform {
  margin-left: 50px;

  .input {
    width: 300px;
  }
}
</style>