<template>
  <div class="card">
    <el-card class="home-card">
      <div class="icon">
        <img src="@/assets/icon-svg/主题配置.svg" width="60" height="60">
        <p>主题配置</p>
      </div>
    </el-card>
    <el-card class="home-card">
      <div class="icon">
        <img src="@/assets/icon-svg/日期.svg" width="60" height="60">
        <p>日期</p>
      </div>
    </el-card>
    <el-card class="home-card">
      <div class="icon">
        <img src="@/assets/icon-svg/百度.svg" width="60" height="60">
        <p>百度一下</p>
      </div>
    </el-card>
    <el-card class="home-card">
      <div class="icon">
        <img src="@/assets/icon-svg/视频播放.svg" width="60" height="60">
        <p>视频播放</p>
      </div>
    </el-card>
    <el-card class="home-card">
      <div class="icon">
        <img src="@/assets/icon-svg/源码.svg" width="60" height="60">
        <p>源代码</p>
      </div>
    </el-card>
    <el-card class="home-card">
      <div class="icon">
        <img src="@/assets/icon-svg/QQ音乐.svg" width="60" height="60">
        <p>音乐</p>
      </div>
    </el-card>
    <el-card class="home-card">
      <div class="icon">
        <img src="@/assets/icon-svg/个人主页.svg" width="60" height="60">
        <p>个人主页</p>
      </div>
    </el-card>
    <el-card class="home-card">
      <div class="icon">
        <img src="@/assets/icon-svg/公告.svg" width="60" height="60">
        <p>公告</p>
      </div>
    </el-card>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.card {
  display: flex;
  justify-content: space-between;

  .home-card {
    width: 190px;
    height: 150px;
    position: relative;
    cursor: pointer;

    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;

      p {
        margin: 10px 0;
        font-size: 18px;
      }
    }
  }
}
</style>