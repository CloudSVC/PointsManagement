// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';
import router from './router'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
// 暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App);
// 将 axios 添加到 Vue 原型链上，使其在所有组件中可用
app.config.globalProperties.$axios = axios;
app.use(router);
app.use(ElementPlus);
app.mount('#app');
