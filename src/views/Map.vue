<!--
 * @Author: 阿匡
 * @Date: 2022-05-03 13:01:26
 * @LastEditTime: 2022-05-04 18:21:27
 * @LastEditors: 阿匡
 * @Description: 地图组件
 * @FilePath: \03vue3-vite-pinia-cesium\src\views\Map.vue
 * 仅为学习使用
-->
<script lang='ts' setup>
import { Viewer } from "cesium"; //引入cesium
import { onMounted,provide } from "vue";
import Tools from '@/components/Tools/index.vue'
import {initCesium} from '@/hooks/useInitCesiumMap.ts'
let viewer:Viewer 
onMounted(()=>{
  viewer = initCesium('cesiumContainer')
})
</script>
<template>
  <div id="cesiumContainer"></div>
  <Tools/>
</template>

<style scoped>
#cesiumContainer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  min-width: 1260px;
  z-index: 0;
  overflow: hidden;
}
</style>