<script setup>
import LoginForm from './LoginForm.vue'
</script>

<template>
    <div class="login">
        <LoginForm />
    </div>
</template>

<style scoped>
.login {
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background: url('./src/assets/img/background.jpg') no-repeat center center fixed;
    overflow: hidden;
    background-size: cover;
}
</style>

<script>
// 给html元素添加一个暗黑类
// document.querySelector('html').classList.add('dark');
</script>