import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';
import router from './router'

// 样式引入
// 引入 Element Plus 样式
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css' // 暗黑模式
// 引入 Vant 样式
import 'vant/lib/index.css'

// 组件注册
// Element Plus 组件库
import ElementPlus from 'element-plus'
// Vant 组件库
import Vant from 'vant';


const app = createApp(App);
// 将 axios 添加到 Vue 原型链上，使其在所有组件中可用
app.config.globalProperties.$axios = axios;
app.use(router);
app.use(ElementPlus);
app.use(Vant);
app.mount('#app');
