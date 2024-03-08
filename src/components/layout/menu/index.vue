<template>
  <div>
    <div class="menu-left" :class="{ collapsed: utilsStore.isCollapse }">
      <el-scrollbar height="900px">
        <el-row class="tac">
          <el-col>
            <!-- logo -->
            <div class="logo">
              <img src="@/assets/vue.svg" alt="">
              <span class="logo-text"
                :class="{ 'logo-text-active': !utilsStore.isCollapse }">&nbsp;&nbsp;&nbsp;后台管理系统</span>
            </div>
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
              background-color="#24262F" text-color="#fff" active-text-color="#409EFF  "
              :collapse="utilsStore.isCollapse" style="border-right: none" collapse-transition="false" router="true">
              <!-- 去除右侧的滑动条 -->
              <template v-for="i in route1">
                <el-menu-item :index="i.path">
                  <el-icon>
                    <!-- <HomeFilled /> -->
                    <component :is="i.meta.icon"></component>
                  </el-icon>
                  <span>{{ i.meta.title }}</span>
                </el-menu-item>
              </template>
              <template v-for="j in route2">
                <el-sub-menu :index="j.path">
                  <template #title>
                    <el-icon>
                      <component :is="j.meta.icon"></component>
                    </el-icon>
                    <span>{{ j.meta.title }}</span>
                  </template>
                  <el-menu-item-group class="el-menu-item-group" v-for="k in j.children">
                    <el-menu-item :index="k.path" class="el-menu-item-text">
                      <el-icon>
                        <component :is="k.meta.icon"></component>
                      </el-icon>
                      <span>{{ k.meta.title }}</span>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-sub-menu>
              </template>
            </el-menu>
          </el-col>
        </el-row>
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup>

import { useUtilsStore } from '@/store/modules/utils.js';
import { useRoute } from 'vue-router'
import { filterAsyncRoutes } from '@/utils/processRoutes.js'
import { onMounted, ref } from 'vue'
const $route = useRoute()
const utilsStore = useUtilsStore()
const route1 = ref([])
const route2 = ref([])

onMounted(() => {
  const [Route1, Route2] = filterAsyncRoutes(JSON.parse(localStorage.getItem('userinfo') || '[]').authority)
  //再次获取路由
  route1.value = Route1
  route2.value = Route2
})
</script>

<style lang="scss" scoped>
.menu-left {
  width: $menuWidth;
  height: 100vh;
  background-color: $menuBg;
  overflow: hidden;
  transition: all 0.3s; // 添加过渡效果

  // min-width: 200px;
  .logo-text {
    opacity: 0;
    /* 默认情况下不显示文字 */
    overflow: hidden;
    transition: opacity 0.3s ease;
    /* 添加过渡效果，适当调整过渡时间和缓动函数 */
  }

  .logo-text-active {
    opacity: 1;
    transition: opacity 1s ease;
    /* 类名为 .logo-text-active 时显示文字 */
  }

  // 根据 isCollapse 设置不同的宽度
  &.collapsed {
    width: $collapseMenuWidth;
  }
}

.el-menu-item-group {
  background-color: $groupOpenBg;
}


.logo {
  padding-left: 18px;
  padding-top: 10px;
  display: flex;

  img {
    width: 30px;
    height: 30px;
    margin-bottom: 10px;
  }

  span {
    font-size: 20px;
    color: #fff;
    line-height: 40px;
  }
}

.tac {
  width: $menuWidth;
}
</style>