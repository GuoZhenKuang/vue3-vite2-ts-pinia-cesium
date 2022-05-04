/*
 * @Author: 阿匡
 * @Date: 2022-05-03 12:57:36
 * @LastEditTime: 2022-05-04 14:47:11
 * @LastEditors: 阿匡
 * @Description: 配置文件
 * @FilePath: \03vue3-vite-pinia-cesium\src\main.ts
 * 仅为学习使用
 */
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
