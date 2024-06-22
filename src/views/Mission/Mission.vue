<script setup>
import PopupBar from './PopupBar.vue';
import Card from './Card.vue';
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="70px">
                <PopupBar />
            </el-aside>
            <el-main>
                <Card :userinfo="userinfo" />
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userinfo: {
                name: '',
                uid: ''
            }
        }
    },
    methods: {
        // 从Cookie中读取JSON数据
        getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        },
        // 验证登录
        checkLogin() {
            if (this.getCookie('token')) {
                var token = this.getCookie('token');
                token = JSON.parse(token);
                this.userinfo.name = token.name;
                this.userinfo.uid = token.email;
            } else {
                this.$message.error("请先登录");
                this.$router.push('/');
                return false;
            }
        },
    }, 
    mounted() {
        this.checkLogin();
    }
}
</script>

<style>
.steps {
    margin-top: 30px;
    display: flex;
    /* 子元素居中显示 */
    justify-content: center;
    /* 子元素垂直居中 */
    align-items: center;
}
</style>