<template>
  <div class="drawer">
    <el-drawer v-model="props.drawer" :direction="direction" :before-close="handleClose">
      <template #title>
        <div>
          <h1 class="title">给角色分配角色</h1>
        </div>
      </template>
      <div class="allotTable">
        <el-popover placement="bottom" :width="200" trigger="hover" v-for="(role) in roleList" :key="role.name">
          <template #reference>
            <el-checkbox class="allotRole" v-model="role.checked" :label="role.title" size="large" border />
          </template>
          <el-checkbox class="allotRole" style="margin:5px 0" v-for="i in role.children" :key="i.name" v-model="i.checked"
            :label="i.title" size="large" border />
        </el-popover>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ElMessageBox } from 'element-plus'

const props = defineProps({
  drawer: {
    type: Boolean,
    default: false
  },
  roleList: {
    type: Array,
    default: () => []
  },
  roleId: {
    type: Number,
    default: 0
  }
})



const $emit = defineEmits(['closeAllot'])
const handleClose = (done) => {
  ElMessageBox.alert('确定要进行此次分配嘛？', "提示", {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    callback: (action) => {
      if (action === 'confirm') {
        $emit('closeAllot', props.roleId)
        done()
      }
    }
  })
}

</script>

<style lang="scss" scoped>
.drawer {
  .title {
    font-size: 20px;
  }

  .allotTable {
    width: 100%;
    flex-wrap: wrap;
    display: flex;

    .allotRole {
      margin: 20px 5px;
      width: 30%;
    }

    p {
      text-align: center;
    }
  }

  .button {
    margin-right: auto;
  }
}
</style>