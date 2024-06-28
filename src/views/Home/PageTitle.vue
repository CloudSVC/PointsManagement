<template>
    <el-page-header :icon="null" class="page-header">
        <template #content>
            <div class="flex items-center">
                <el-avatar :size="30" class="mr-3 user" src="./src/assets/img/background.jpg" />
                <span class="text-large font-600 mr-3"> 暖暖的太阳 </span>
                <span class="text-sm mr-2" style="color: var(--el-text-color-regular)">
                    x Vue 3.4.29
                </span>
                <el-tag>管理员</el-tag>
            </div>
        </template>
        <template #extra>
            <div class="flex items-center">
                <el-button v-if="isLoggedIn" type="danger" @click="logout">退出登录</el-button>
                <template v-else>
                    <el-button @click="$router.push('/signup')">注册</el-button>
                    <el-button type="primary" @click="$router.push('/login')">登录</el-button>
                </template>
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
    data() {
        return {
            isLoggedIn: false,
            name: '',
            uid: '游客'
        }
    },
    methods: {
        checkLogin() {
            if (this.getCookie('token')) {
                this.isLoggedIn = true;
                var token = this.getCookie('token');
                token = JSON.parse(token);
                this.name = token.name;
                this.uid = token.email;
            } else {
                this.isLoggedIn = false;
            }
        },
        // 从Cookie中读取JSON数据
        getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        },
        // 清除Cookie/退出登录
        logout() {
            // 获取所有的cookie并拆分成数组
            var cookies = document.cookie.split(";");

            // 遍历所有cookie并将其过期时间设置为过去
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                var eqPos = cookie.indexOf("=");
                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }
            window.location.reload();
        }

    },
    mounted() {
        this.checkLogin();
    }
}
</script>
