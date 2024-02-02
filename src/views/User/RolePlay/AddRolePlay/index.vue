<template>
  <div class="addform">
    <el-form :model="addData" ref="addRuleFormRef" status-icon :rules="addRules" label-width="70px" label-position="left">
      <el-form-item label="用户名" prop="username">
        <el-input placeholder="请输入内容" v-model="addData.username" class="input"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" show-password placeholder="请输入内容" class="input password"
          v-model="addData.password"></el-input>
      </el-form-item>
      <el-form-item label="职称" prop="role_name">
        <el-input placeholder="请输入内容" v-model="addData.role_name" class="input"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(addRuleFormRef)">
          创建管理员
        </el-button>
        <el-button @click="resetForm(addRuleFormRef)">清空数据</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { reqAddAdmin } from '@/api/role.js'
import { ElMessage } from 'element-plus';
const $emit = defineEmits(['addAdminHandler'])
//新增信息
const addData = reactive({
  username: '',
  password: '',
  role_name: ''
})
const addRuleFormRef = ref()
//表单校验规则
const addRules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
  ],
  role_name: [
    { required: true, message: '请输入职称', trigger: 'blur' },
  ]
})
//新建管理员事件
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log('submit!')
      const res = await reqAddAdmin(addData)
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