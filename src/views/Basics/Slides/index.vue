<template>
  <div>
    <el-card>
      <h1>现存的轮播图图片</h1>
      <el-scrollbar always="true" min-size="100" view-class="scrollbar-demo-item">
        <div class="img-list">
          <el-image class="img-item" style="width: 500px; height: 400px; " :src="item.img_url" :zoom-rate="1.2"
            :max-scale="7" :min-scale="0.2" :preview-src-list="srcListBig" :initial-index="0" fit="cover" lazy="true"
            v-for="item in srcList" :key="item.id" />
        </div>
      </el-scrollbar>

      <div class="manage-list">
        <div class="left">
          <div class="delete">
            <p class="delete-img">删除图片</p>
            <div class="img_search">
              <el-input placeholder="请输入图片描述" v-model="searchKey" :suffix-icon="Search"></el-input>
            </div>
            <el-button type="primary" class="search" :disabled="searchKey == ''" @click="getImgList">搜索</el-button>
          </div>
          <el-scrollbar height="500px">
            <div class="left-img" v-for="i in srcList" :key="i.id">
              <el-image :src="i.img_url" fit="cover" style="width: 80px;height: 80px;" :zoom-rate="1.2" :max-scale="7"
                :min-scale="0.2">
              </el-image>
              <p>{{ i.img_description }}</p>
              <el-popconfirm title="你确定要删除嘛？" confirm-button-text="Yes" cancel-button-text="No" :icon="InfoFilled"
                icon-color="#626AEF" @confirm="deleteImg(i.id)">
                <template #reference>
                  <el-button type="danger" class="img-btn">删除</el-button>
                </template>
              </el-popconfirm>
            </div>
          </el-scrollbar>
        </div>
        <div class="right">
          <p class="add-img">添加新图片</p>
          <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
            <el-form-item label="图片描述" prop="name">
              <el-input v-model="ruleForm.name" style="width:300px"></el-input>
            </el-form-item>
          </el-form>
          <el-upload v-model:file-list="fileList" class="upload-demo" action="/api/api/bannerUpload"
            :disabled="ruleForm.name.length < 2 || ruleForm.name.length > 20" list-type="picture"
            :on-success="handleSuccess" :before-upload="beforeUpload" :data="ruleForm">
            <el-button type="primary" :disabled="ruleForm.name.length < 2 || ruleForm.name.length > 20">选择图片</el-button>
            <template #tip>
              <div class="el-upload__tip">
                上传的图片小于5MB，且格式为：jpg/png
              </div>
            </template>
          </el-upload>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { reqGetBannerList, reqDeleteBanner } from '@/api/basics.js'
import { Search, InfoFilled } from '@element-plus/icons-vue'
const ruleFormRef = ref()
const ruleForm = reactive({
  name: '',
})
const rules = {
  name: [
    { required: true, message: '请输入图片描述', trigger: 'blur' },
    { min: 2, max: 20, message: '请输入2-20位字符', trigger: 'blur' }
  ],
}
const srcList = ref([])
const fileList = ref([])
const searchKey = ref('')
const srcListBig = ref([])

//上传成功的钩子
const handleSuccess = (response) => {
  //修改表单的值
  //清除最后一个fileList的值
  fileList.value.pop()
  if (fileList.value.length >= 4) {
    fileList.value.shift()
  }
  fileList.value.push(response.data)
  ruleFormRef.value.resetFields()  //清除表单
  getBannerList()
  //发送请求存储图片
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
//获取轮播图数据
const getBannerList = async () => {
  const res = await reqGetBannerList()
  if (res.code !== 200) {
    getBannerList()
  } else {
    srcList.value = res.data

    //处理大图展示的图片,只要图片路径
    srcList.value.forEach(item => {
      srcListBig.value.push(item.img_url)
    })
  }
}

//关键词搜索某数据
const getImgList = () => {
  //在srcList中查找将其放置第一位
  const key = srcList.value.find(item => {
    return item.img_description === searchKey.value
  })
  if (!key) {
    return ElMessage({
      type: 'error',
      message: '未找到相关图片'
    })
  } else {
    const index = srcList.value.indexOf(key)
    srcList.value.splice(index, 1)
    srcList.value.unshift(key)
    ElMessage({
      type: 'success',
      message: '成功找到图片，已经放置最上方'
    })
  }
}

//删除某图片
const deleteImg = async (id) => {
  // console.log(data);
  const res = await reqDeleteBanner(id)
  if (res.code !== 200) {
    return ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
  else {
    //将srcList中的数据删除
    srcList.value = srcList.value.filter(item => {
      return item.id !== id
    })
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
  }
}


onMounted(() => {
  getBannerList()
})
</script>

<style lang="scss" scoped>
h1 {
  font-size: $titleSize;
  margin: 0 0 10px 0;
}

.scrollbar-demo-item {

  //深度监听el-scrollbar__thumb
  :deep(.el-scrollbar__thumb) {
    background-color: pink;
  }

}

.img-list {
  white-space: nowrap;
  /* 防止换行 */
  // overflow-x: auto;
  /* 横向溢出时显示滚动条 */
  width: 100%;
  display: flex;

  // 设置滚动条的样式
  // &::-webkit-scrollbar {
  //   width: 12px;
  // }

  // &::-webkit-scrollbar-thumb {
  //   background-color: #ccc;
  //   border-radius: 10px;
  // }

  // &::-webkit-scrollbar-track {
  //   background-color: #FFF;
  // }

  /* 设置容器宽度 */
  .img-item {
    // 不会再空间缩小时，自动适应
    flex-shrink: 0;
    display: flex;
    margin-right: 10px;
    margin-bottom: 10px;
  }
}

.manage-list {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  .left {
    width: 45%;

    .delete {
      display: flex;

      .img_search {
        margin-left: auto;
        margin-right: 10px;
      }
    }

    .delete-img {
      font-size: $titleSize;
      margin: 0 0 10px 0;
    }

    .left-img {
      display: flex;
      align-items: center;
      margin: 0 0 10px 15px;

      // 添加一个动画效果
      &:hover {
        cursor: pointer;
        animation: imgMove 0.1s linear;
        //添加阴影
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
        transform: scale(1.05);
      }

      @keyframes imgMove {
        0% {
          transform: scale(1);
        }

        100% {
          transform: scale(1.05);
        }
      }


      p {
        margin: 0 0 0 20px;
      }

      .img-btn {
        margin-left: auto;
        margin-right: 20px;
      }
    }
  }

  .right {
    width: 45%;

    .add-img {
      font-size: $titleSize;
      margin: 0 0 10px 0;
    }

    .ipt {
      display: flex;
      align-items: center;
    }
  }
}
</style>

<style>
.demo-image__error .image-slot {
  font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}

.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
</style>