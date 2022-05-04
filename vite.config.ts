/*
 * @Author: 阿匡
 * @Date: 2022-05-03 12:57:36
 * @LastEditTime: 2022-05-04 11:55:42
 * @LastEditors: 阿匡
 * @Description: 配置文件
 * @FilePath: \03vue3-vite-pinia-cesium\vite.config.ts
 * 仅为学习使用
 */
import { defineConfig } from 'vite'
import cesium from 'vite-plugin-cesium'; // 引入插件
import vue from '@vitejs/plugin-vue'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [vue(),cesium()]
})
