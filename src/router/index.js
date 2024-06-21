// router/index.js 中的示例
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/Home/HomePage.vue'
import AboutPage from '../views/AboutPage.vue'
import Login from '../views/Login/Login.vue'
import Signup from '../views/Signup/SignupPage.vue'
import Misssion from '../views/Mission/Mission.vue'

// 我们为每个路由添加了一个 meta 字段，用于存储页面的标题。
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { title: '首页 By 暖暖的太阳' }
  },
  {
    path: '/mission',
    name: 'Mission',
    component: Misssion,
    meta: { title: '任务大厅 (=✪ᆽ✪=)' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: '登录 (̷ ̷₌̷ ̷ㅇ̷ ̷ᆽ̷ ̷ㅇ̷ ̷₌̷ ̷)♡' }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: { title: '注册 (=✪ᆽ✪=)' }
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes
});

// 我们使用 router.beforeEach 导航守卫来在每次路由切换时更新页面的标题。
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '暖暖的太阳'
  next()
});

export default router;