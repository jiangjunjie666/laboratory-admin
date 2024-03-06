<template>
  <div>
    <el-card class="date">
      <el-calendar>
        <template #date-cell="{ data }">
          <p :class="data.isSelected ? 'is-selected' : ''">
            {{ data.day.split('-').slice(1).join('-') }}
            {{ data.isSelected ? '✔️' : '' }}
          </p>
        </template>
      </el-calendar>
    </el-card>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.date {
  margin: 10px 0 0 0;

  .is-selected {
    color: #1989fa;
  }
}
</style>