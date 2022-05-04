<!--
 * @Author: 阿匡
 * @Date: 2022-05-04 14:21:34
 * @LastEditTime: 2022-05-04 18:21:07
 * @LastEditors: 阿匡
 * @Description: 工具栏
 * @FilePath: \03vue3-vite-pinia-cesium\src\components\Tools\index.vue
 * 仅为学习使用
-->
<script lang='ts' setup>
import { ArrowDown } from '@element-plus/icons-vue'
const handleClick = () => {
  console.log('Viewer')
}
</script>
<template>
  <div class="tools">
      <el-dropdown >
      <el-button type="primary">
        菜单<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleClick">飞机巡视</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item>Action 4</el-dropdown-item>
          <el-dropdown-item>Action 5</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang='scss'>
.tools{
    position: absolute;
    top: 50px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>