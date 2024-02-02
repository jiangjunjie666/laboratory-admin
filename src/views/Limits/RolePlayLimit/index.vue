<template>
  <div>
    <el-card class="top-card">
      <template #header>
        <div>
          <span>角色权限管理</span>
        </div>
      </template>
      <div class="btn-list">
        <MyButton type="primary" icon="Plus" text="新增角色" @click="dialogVisibleAdd = true" />
        <el-popconfirm title="确定要删除嘛？" @confirm="handleDeleteAll">
          <template #reference>
            <MyButton type="danger" icon="Delete" text="批量删除" @click="handleDeleteAll" />
          </template>
        </el-popconfirm>
        <el-input v-model="searchKey" class="ipt" size="large" placeholder="请输入查询角色名称" :suffix-icon="Search" />
        <MyButton type="primary" text="搜索" icon="Search" :disable="searchKey == ''" @MybtnClick="getData" />
        <el-tooltip class=" box-item" effect="dark" content="刷新数据" placement="top-start">
          <el-icon class="set-icon" size="25">
            <Refresh />
          </el-icon>
        </el-tooltip>
      </div>
    </el-card>
    <el-card>
      <el-button disabled @click="console.log(1)">1</el-button>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchKey = ref('')

const getData = () => {
  console.log(1);
}
</script>

<style lang="scss" scoped>
.top-card {
  margin-bottom: 10px;
  @include useBtnList();
}
</style>