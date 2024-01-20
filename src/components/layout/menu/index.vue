<template>
  <div>
    <div class="menu-left" :class="{ collapsed: utilsStore.isCollapse }">
      <el-scrollbar height="800px">
        <el-row class="tac">
          <el-col>
            <!-- logo -->
            <div class="logo">
              <img src="@/assets/vue.svg" alt="">
              <span v-if="!utilsStore.isCollapse">后台管理系统</span>
            </div>
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
              background-color="#24262F" text-color="#fff" active-text-color="#409EFF  " :collapse="utilsStore.isCollapse"
              style="border-right: none" collapse-transition="false" router="true">
              <!-- 去除右侧的滑动条 -->
              <el-menu-item index="/home">
                <el-icon>
                  <HomeFilled />
                </el-icon>
                <span>首页</span>
              </el-menu-item>
              <el-menu-item index="/data">
                <el-icon>
                  <Notebook />
                </el-icon>
                <span>资料管理</span>
              </el-menu-item>
              <el-sub-menu index="/user">
                <template #title>
                  <el-icon>
                    <Avatar />
                  </el-icon>
                  <span>用户管理 </span>
                </template>
                <el-menu-item-group class="el-menu-item-group">
                  <el-menu-item index="/user/roleplay" class="el-menu-item-text">
                    <el-icon>
                      <User />
                    </el-icon>
                    <span>角色管理</span>
                  </el-menu-item>
                  <el-menu-item index="/user/person" class="el-menu-item-text">
                    <el-icon>
                      <UserFilled />
                    </el-icon>
                    <span>人物管理</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>

              <el-sub-menu index="/inform">
                <template #title>
                  <el-icon>
                    <Bell />
                  </el-icon>
                  <span>通知管理 </span>
                </template>
                <el-menu-item-group class="el-menu-item-group">
                  <el-menu-item index="/inform/news" class="el-menu-item-text">
                    <el-icon>
                      <Message />
                    </el-icon>
                    <span>新闻管理</span>
                  </el-menu-item>
                  <el-menu-item index="/inform/notice" class="el-menu-item-text">
                    <el-icon>
                      <Calendar />
                    </el-icon>
                    <span>公告管理</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>

              <el-sub-menu index="/basics">
                <template #title>
                  <el-icon>
                    <Grid />
                  </el-icon>
                  <span>基础管理 </span>
                </template>
                <el-menu-item-group class="el-menu-item-group">
                  <el-menu-item index="/basics/general" class="el-menu-item-text">
                    <el-icon>
                      <DocumentCopy />
                    </el-icon>
                    <span>基础信息管理</span>
                  </el-menu-item>
                  <el-menu-item index="/basics/slides" class="el-menu-item-text">
                    <el-icon>
                      <PictureFilled />
                    </el-icon>
                    <span>轮播图图片管理</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
              <el-sub-menu index="/limits">
                <template #title>
                  <el-icon>
                    <Lock />
                  </el-icon>
                  <span>权限管理 </span>
                </template>
                <el-menu-item-group class="el-menu-item-group">
                  <el-menu-item index="/limits/rolelimit" class="el-menu-item-text">
                    <el-icon>
                      <Coin />
                    </el-icon>
                    <span>角色权限管理</span>
                  </el-menu-item>
                  <el-menu-item index="/limits/personlimit" class="el-menu-item-text">
                    <el-icon>
                      <Paperclip />
                    </el-icon>
                    <span>人物权限管理</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>

              <el-sub-menu index="/competition">
                <template #title>
                  <el-icon>
                    <GoldMedal />
                  </el-icon>
                  <span>竞赛管理 </span>
                </template>
                <el-menu-item-group class="el-menu-item-group">
                  <el-menu-item index="/competition/event" class="el-menu-item-text">
                    <el-icon>
                      <Football />
                    </el-icon>
                    <span>竞赛活动管理</span>
                  </el-menu-item>
                  <el-menu-item index="/competition/winner" class="el-menu-item-text">
                    <el-icon>
                      <Medal />
                    </el-icon>
                    <span>竞赛获奖管理</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
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
const $route = useRoute()
const utilsStore = useUtilsStore()
</script>
  
<style lang="scss" scoped>
.menu-left {
  width: $menuWidth;
  height: 100vh;
  min-height: 1200px;
  background-color: $menuBg;
  overflow: hidden;
  transition: all 0.3s; // 添加过渡效果

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