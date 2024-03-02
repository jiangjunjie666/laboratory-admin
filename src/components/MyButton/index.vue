<template>
  <div>
    <el-button :type="props.type" :size="props.btnSize" class="button" :disabled="props.disable" @click="handleClick">
      <el-icon v-if="props.icon" :size="props.size">
        <component :is="props.icon"></component>
      </el-icon>
      <span>{{ props.text }}</span>
    </el-button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const $emit = defineEmits(['MybtnClick']);
// 接收父组件传过来的值
const props = defineProps({
  icon: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: '按钮'
  },
  size: {
    type: String,
    default: 'mini'
  },
  disable: {
    type: Boolean,
    default: false
  },
  btnSize: {
    type: String,
    default: 'mini'
  }
});

const handleClick = () => {
  // 只有在按钮没有被禁用时才执行点击事件
  if (!props.disable) {
    $emit('MybtnClick');
  }
};
</script>

<style lang="scss" scoped>
.button {
  margin: 0 10px;
}

.button:disabled {
  cursor: not-allowed;
}
</style>
