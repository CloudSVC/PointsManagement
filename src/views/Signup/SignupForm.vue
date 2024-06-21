<template>
    <div class="signup-container">
        <h1>注册</h1>
        <el-form ref="signupForm" :model="signupForm" :rules="signupFormRules" label-width="80px" class="signup-form"
            label-position="left">
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="signupForm.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="signupForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="passwordConfirm">
                <el-input v-model="signupForm.passwordConfirm" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="signup">注册</el-button>
                <!-- 清空 -->
                <el-button type="danger" @click="$refs.signupForm.resetFields()">清空</el-button>
                <!-- 登录 -->
                <el-button type="primary" @click="$router.push('/login')">去登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            signupForm: {
                email: '',
                password: '',
                passwordConfirm: ''
            },
            signupFormRules: {
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不正确', trigger: ['blur', 'change'] }
                ],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                passwordConfirm: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    {
                        validator: this.validatePasswordConfirm,
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    methods: {
        // 验证密码是否一致
        validatePasswordConfirm(rule, value, callback) {
            if (value !== this.signupForm.password) {
                callback(new Error('两次输入的密码不一致'));
            } else {
                callback();
            }
        },
        // 注册逻辑
        signup() {
            if (this.signupForm.email == "" || this.signupForm.password == "") {
                this.$message.error('邮箱或密码不能为空');
                return;
            }
            if (this.signupForm.password !== this.signupForm.passwordConfirm) {
                this.$message.error('两次输入的密码不一致');
                return;
            }
            // 在这里处理注册逻辑，例如向服务器发送注册请求
            alert('注册成功');
            // 注册成功后跳转到登录页面
            this.$router.push('/login');
        }
    }
};
</script>

<style scoped>
.signup-form {
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

.signup-container {
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 90px;
}
</style>