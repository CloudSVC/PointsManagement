<template>
    <el-page-header :icon="null" class="page-header">
        <template #content>
            <div class="flex items-center">
                <el-avatar :size="30" class="mr-3 user" src="./src/assets/img/background.jpg" />
                <span class="text-large font-600 mr-3"> 暖暖的太阳 </span>
                <span class="text-sm mr-2" style="color: var(--el-text-color-regular)">
                    x Vue 3.4.29
                </span>
                <el-tag>游客</el-tag>
            </div>
        </template>
        <template #extra>
            <div class="flex items-center">
                <el-button @click="$router.push('/signup')">注册</el-button>
                <el-button type="primary" @click="$router.push('/login')">登录</el-button>
                <el-button type="info" @click="ckeckLogin">测试</el-button>
            </div>
        </template>
    </el-page-header>
</template>

<style>
.page-header {
    margin-bottom: 35px;
    transform: translateX(-45px);
}
</style>


<script>
import { ElNotification } from 'element-plus'

export default {
    mounted() {
        // 页面自动加载函数
        console.log(this.$route.path)
    },
    methods: {
        ckeckLogin() {
            if (localStorage.getItem('token')) {
                ElNotification({
                    title: '已登录',
                    message: '欢迎使用',
                    type: 'success',
                })
            } else {
                ElNotification({
                    title: '未登录',
                    message: '请登陆后重试',
                    type: 'error',
                })
            }
        }
    }
}
</script>
