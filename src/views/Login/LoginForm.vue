<template>
    <div class="login-container">
        <h1>登录</h1>
        <el-form ref="loginForm" :model="loginForm" :rules="loginFormRules" label-width="80px" class="login-form"
            label-position="left">
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="loginForm.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="login">登录</el-button>
                <!-- 清空 -->
                <el-button type="danger" @click="$refs.loginForm.resetFields()">清空</el-button>
                <!-- 注册 -->
                <el-button type="primary" @click="$router.push('/signup')">去注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loginForm: {
                email: '',
                password: ''
            },
            loginFormRules: {
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不正确', trigger: ['blur', 'change'] }
                ],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        };
    },
    methods: {
        login() {
            // 输入值非空判断
            if (this.loginForm.email === '' || this.loginForm.password === '') {
                this.$message.error('邮箱或密码不能为空');
                return;
            }
            // 登录逻辑
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    // 在这里处理登录逻辑，例如向服务器发送登录请求
                    alert(this.loginForm.email + ' 登录成功');
                    // 登录成功后跳转到其他页面
                    // this.$router.push('/home');
                } else {
                    console.log('表单验证失败');
                    return false;
                }
            });
        }
    }
};
</script>

<style scoped>
.login-form {
    width: 300px;
    margin: 0 auto;
    padding-top: 100px;
}

h1 {
    text-align: center;
    margin-bottom: -50px;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 900;
}

.login-container {
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 90px;
}
</style>