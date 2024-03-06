<template>
  <div>
    <el-drawer v-model="drawer" title="I am the title" direction="rtl">
      <template #title>
        <div>
          <h1 class="title">给管理员分配角色</h1>
        </div>
      </template>
      <span>Hi, there!</span>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const drawer = ref(true)
</script>

<style lang="scss" scoped></style>