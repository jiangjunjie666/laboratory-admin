<template>
  <div>
    <div class="top-nav">
      <div class="nav-icon">
        <el-icon size="25" class="icon" @click="utilsStore.changeCollapse()" v-if="!utilsStore.isCollapse">
          <Fold />
        </el-icon>
        <el-icon size="25" class="icon" @click="utilsStore.changeCollapse()" v-if="utilsStore.isCollapse">
          <Expand />
        </el-icon>
      </div>
      <!-- 面包屑 -->
      <div class="brand">
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item v-if="$route.path === '/home'">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(bread, index) in breadArr" :to="{ path: bread.path }" :key="bread.name">{{
            bread.meta.title
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="setting">
        <!-- 切换模式 -->
        <el-switch v-model="utilsStore.isDark" :active-action-icon="Moon" :inactive-action-icon="Sunny" class="light"
          style="--el-switch-on-color: #111; --el-switch-off-color: #ccc" @change="toggle()" />
        <!-- 刷新图标  -->
        <el-icon class="set-icon">
          <Refresh />
        </el-icon>
        <!-- 全屏图标 -->
        <el-icon class="set-icon">
          <Aim />
        </el-icon>
        <!-- 头像 -->
        <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt="" class="avatar">
        <el-dropdown class="dropdown">
          <span class="el-dropdown-link">
            Admin
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

    </div>
    <div class="tags">
      <el-tag v-for="item in utilsStore.visitedRoutes" :key="item.path" class="mx-1" effect="Plain" closable
        :type="item.path === $route.path ? 'success' : 'info'" @click="goRoute(item.path)"
        @close="utilsStore.closeTags(item.path)">
        {{ item.meta.title }}
      </el-tag>
    </div>
    <hr>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, watchEffect } from 'vue'
import { ArrowRight, Sunny, Moon } from '@element-plus/icons-vue'
import { useUtilsStore } from '@/store/modules/utils.js';
import { useDark, useToggle } from "@vueuse/core";
import { useRoute, useRouter } from 'vue-router'
import { navRoute } from '@/router/route/navRoute.js'
const $route = useRoute()
const $router = useRouter()
const utilsStore = useUtilsStore()
const breadArr = ref([])
const isDark = useDark({
  // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
  storageKey: 'useDarkKEY',
  // 暗黑class名字
  valueDark: 'dark',
  // 高亮class名字
  valueLight: 'light',
})

const toggle = useToggle(isDark);

//监听path是否发生改变
// watch(() => $route.path, () => {
//   utilsStore.saveVisitedRoutes($route)
//   getBread()
// })
watchEffect(() => {
  utilsStore.saveVisitedRoutes($route)
  getBread()
})
//获取到当前的path
function getBread() {
  //先清空数据
  breadArr.value = []
  const pathArr = $route.path.split('/')
  navRoute.forEach(item => {
    if (item.name == pathArr[1]) {
      // console.log(item);
      //将需要的数据存放到breadArr中
      const newarr = {
        path: item.path,
        name: item.name,
        meta: item.meta
      }
      breadArr.value.push(newarr)
      //再次遍历item的children
      if (item.children) {
        item.children.forEach(item => {
          if (item.name == pathArr[2]) {
            const newarr = {
              path: item.path,
              name: item.name,
              meta: item.meta
            }
            breadArr.value.push(newarr)
            return
          }
        })
      }
    }
  });
}

//监听tag标签实现路由跳转
const goRoute = (path) => {
  $router.push({ path: path })
}
onMounted(() => {
  getBread()
})
</script>

<style lang="scss" scoped>
.top-nav {
  height: $headerHeight;
  width: 100%;
  display: flex;

  .icon {
    //居中
    margin: 18px 0 0 10px;

    :hover {
      cursor: pointer;
      color: #409EFF;
    }
  }

  .brand {
    margin: 23px 0 0 10px;
  }

  .setting {
    //靠右
    margin-left: auto;
    margin-right: 10px; // 可以添加适当的右边距

    .set-icon {
      font-size: 20px;
      margin: 20px 20px 0 0;

      :hover {
        cursor: pointer;
        color: #409EFF;
      }
    }

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-bottom: 20px;
      margin-right: 10px;

      .img {
        margin: 25px;
      }
    }

    .dropdown {
      margin: 20px 0 0 0;
    }

    .light {
      margin: 10px 20px 17px 0;
    }
  }




}

.tags {
  margin-bottom: 5px;

  .mx-1 {
    margin: 5px 5px;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>