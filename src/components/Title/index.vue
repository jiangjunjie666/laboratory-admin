<template>
  <div>
    <!-- 标题 -->
    <h1>{{ title }}</h1>
  </div>
</template>

<script setup>
//接收props参数
const props = defineProps({
  title: String
})
</script>

<style lang="scss" scoped>
h1 {
  font-size: $titleSize;
  margin: 0 0 10px 0;
}
</style>