<template>
    <div class="login-container">
        <van-cell-group>
            <van-field v-model="username" label="邮箱" placeholder="admin@example.com" />
            <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" />
        </van-cell-group>
        <van-button type="primary" block @click="handleLogin">登录</van-button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { showSuccessToast, showToast } from 'vant';
import router from '@/router';
import axios from 'axios';

const username = ref('');
const password = ref('');

const handleLogin = () => {
    if (username.value && password.value) {
        // 创建登录参数对象
        const loginData = {
            email: username.value,
            password: password.value
        };
        // 登录逻辑
        axios.post('/api/login', loginData).then(res => {
            if (res.data.status == "true") {
                document.cookie = "token=" + JSON.stringify(JSON.parse(res.data.msg));
                // 跳转首页
                router.push('/');
            } else {
                showToast({
                    message: res.data.msg,
                    position: 'top',
                });
            }
        });
    } else {
        // 提示用户输入用户名和密码
        showToast({
            message: '请输入用户名和密码',
            position: 'top',
        });
    }
};
</script>

<style scoped>
.login-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    padding: 90px 20px 90px 20px;
    background-color: #fff;
    box-shadow: 10px 00px 20px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
}
</style>