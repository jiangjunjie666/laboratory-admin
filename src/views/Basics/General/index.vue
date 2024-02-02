<template>
  <div>
    <el-card>
      <Title title="实验室概况"> </Title>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item v-for="item in informData" :key="item.id" :title="item.name" :name="item.name">
          <el-input v-model="item.content" class="ipt" autosize type="textarea" @blur="iptBlur(item)"
            @focus="iptFocus(item)" />
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { reqGetLaboratory, reqEditLaboratory } from '@/api/basics.js'
import { ElMessage, ElMessageBox } from 'element-plus'
const activeNames = ref([])
const informData = ref([])
//标记当前的数据初值，判断用户是否修改
const isData = ref('')
const handleChange = (val) => {
  console.log(val)
}

//获取数据
const getLaboratory = async () => {
  const res = await reqGetLaboratory()
  if (res.code !== 200) {
    getLaboratory()
  } else {
    informData.value = res.data
    informData.value.forEach(i => {
      activeNames.value.push(i.name)
    });
  }
}
//输入框聚焦
const iptFocus = (item) => {
  isData.value = item.content
}
//输入框聚焦消失
const iptBlur = async (item) => {
  if (isData.value == item.content) {
    return
  }
  ElMessageBox.confirm(
    `你确定要修改${item.name}的数据吗？`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      const res = await reqEditLaboratory(item)
      if (res.code !== 200) {
        return ElMessage.error('修改失败')
      }
      ElMessage.success('修改成功')
    })
    .catch(() => {
      informData.value.forEach(i => {
        if (i.name == item.name) {
          i.content = isData.value
        }
      })
      return
    })
}
onMounted(() => {
  getLaboratory()
})
</script>

<style lang="scss" scoped>
.el-collapse-item {

  :deep(.el-collapse-item__header) {
    font-size: 18px;
    color: #409eff;
  }

  .ipt {
    //去除掉输入框的所有样式
    width: 60%;
    font-size: 14px;
    line-height: 18px;
    //动画效果
    transition: border-color 1s ease-in-out;

    .el-textarea__inner {
      border: none;
      outline: none;
    }

    &:focus {
      border: 1px solid #409eff;
    }
  }
}
</style>