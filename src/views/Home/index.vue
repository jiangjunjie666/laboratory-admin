<template>
  <div class="home">
    <!-- 整个屏幕的布局 -->
    <!-- 左侧导航栏 -->
    <!-- <div class="menu-left" :class="{ collapsed: isCollapse }"> -->
    <Menu></Menu>
    <!-- </div> -->
    <div class="menu-right" :class="{ iscollpsed: utilsStore.isCollapse }">
      <!-- 顶部导航栏 -->
      <Tabbar></Tabbar>
      <!-- 内容区域 -->
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref } from 'vue'
import Tabbar from '@/components/layout/tabbar/index.vue'
import Menu from '@/components/layout/menu/index.vue'
import { useUtilsStore } from '@/store/modules/utils.js';
const utilsStore = useUtilsStore()
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  width: 100%;
  height: 100%;

  .menu-right {
    width: calc(100% - #{$menuWidth});
    height: 100vh;
    transition: all 0.3s; // 添加过渡效果

    &.iscollpsed {
      width: calc(100% - #{$collapseMenuWidth});
    }

    .content {
      height: calc(100% - #{$headerHeight});
      width: 100%;
      // background-color: #F0F2F5;
      padding: 10px;
    }
  }
}
</style>