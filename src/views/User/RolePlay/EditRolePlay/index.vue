<template>
  <div class="box">
    <el-dialog v-model="props.dialogVisibleEdit" title="编辑角色信息" width="30%" @close="closeDialog">
      <el-form :model="props.editData" label-width="90px" label-position="left">
        <el-form-item label="用户名" prop="name">
          <el-input placeholder="请输入内容" v-model="editData.name"></el-input>
        </el-form-item>
        <el-form-item label="管理员名称" prop="role_name">
          <el-input placeholder="请输入内容" v-model="editData.role_name"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisibleEdit = false">退出</el-button>
          <el-button type="primary" :disabled="editData.name == ''" @click="EditBtn">
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
import { reqEditRole } from '@/api/role.js'
//接收自定义事件
const $emit = defineEmits('editHandler')
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


//确认提交按钮
const EditBtn = async () => {
  const res = await reqEditRole(props.editData)
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
}
//关闭弹窗
const closeDialog = () => {
  $emit('editHandler', false)
}
</script>

<style lang="scss" scoped></style>