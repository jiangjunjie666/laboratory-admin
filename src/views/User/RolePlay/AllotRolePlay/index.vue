<template>
  <div class="drawer">
    <el-drawer v-model="props.drawer" :direction="direction" :before-close="handleClose">
      <template #title>
        <div>
          <h1 class="title">给管理员分配角色</h1>
        </div>
      </template>
      <div class="allotTable">
        <el-popover placement="bottom" :width="200" trigger="hover" v-for="(role) in roleList" :key="role.id">
          <template #reference>
            <el-checkbox class="allotRole" @mouseenter="handleMouseEnter(role)" @change="handleCheck(role)"
              v-model="role.checked" :label="role.name" size="large" border />
          </template>
          <p v-for="i in hoverList" :key="i.id">{{ i.job }}</p>
        </el-popover>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { reqGetRolePermission } from '@/api/role'
import { ElMessageBox } from 'element-plus'
import { ref } from 'vue'

const hoverList = ref([])

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

//change处理
const handleCheck = (role) => {
  //将前面的选中状态取反
  props.roleList.forEach((item) => {
    if (item.id != role.id) {
      item.checked = false
    }
  })
}
// 选中角色
const handleMouseEnter = async (role) => {
  hoverList.value = []
  const res = await reqGetRolePermission(role.id)
  if (res.code == 200) {
    hoverList.value.push(res.data)
  } else {
    handleMouseEnter(role)
  }
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