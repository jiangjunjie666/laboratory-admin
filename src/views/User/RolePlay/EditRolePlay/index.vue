<template>
  <div class="box">
    <el-dialog v-model="props.dialogVisibleEdit" title="编辑角色信息" width="30%" @close="closeDialog">
      <el-form :model="editData" ref="editRuleFormRef" :rules="editRules" label-width="100px" label-position="left">
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入内容" v-model="editData.username"></el-input>
        </el-form-item>
        <el-form-item label="管理员名称" prop="role_name">
          <el-input placeholder="请输入内容" v-model="editData.role_name"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisibleEdit = false">退出</el-button>
          <el-button type="primary" :disabled="editData.username == ''" @click="EditBtn(editRuleFormRef)">
            确认修改
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus';
import { reqEditAdmin } from '@/api/role.js'
//接收自定义事件
const $emit = defineEmits('editHandler')
const editRuleFormRef = ref()
//接收父组件传过来的数据
const props = defineProps({
  dialogVisibleEdit: {
    type: Boolean,
    default: false
  },
  editData: {
    type: Object,
    default: () => ({})
  }
})
//表单检验
const editRules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  role_name: [
    { required: true, message: '请输入管理员名称', trigger: 'blur' }
  ]
})

//确认提交按钮
const EditBtn = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (!valid) return
    const res = await reqEditAdmin(props.editData)
    if (res.code !== 200) {
      return ElMessage({
        type: 'error',
        message: res.message
      })
    } else {
      ElMessage({
        type: 'success',
        message: res.message
      })
      $emit('editHandler', false)
    }
  })
}
//关闭弹窗
const closeDialog = () => {
  $emit('editHandler', false)
}
</script>

<style lang="scss" scoped></style>