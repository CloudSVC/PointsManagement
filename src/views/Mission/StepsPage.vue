<template>

  <el-card style="max-width: 50vw; margin-top: 50px; margin-bottom: 50px;">
    <template #header>
      <div class="card-header">
        <span>任务： {{ msg.mission }}</span><br />
        <span>用户：{{ userinfo.name }}</span><br />
        <span>邮箱：{{ userinfo.uid }} </span>
      </div>
    </template>
    <p class="text item">好好学习</p>
    <p class="text item">天天向上</p>
    <template #footer>积分： {{ msg.score }}</template>
  </el-card>


  <el-steps style="width: 80vw;" :active="active" finish-status="success">
    <el-step title="规划任务" />
    <el-step title="执行任务" />
    <el-step title="提交任务" />
    <el-step title="完成任务" />
  </el-steps>

  <div style="max-width: 50vw; margin-top: 50px; margin-bottom: 50px;">
    <!-- 点击按钮，将active进行到下一步 -->
    <el-button @click="nextStep">下一步</el-button>
  </div>
</template>


<script>
import { ElNotification } from 'element-plus';

export default {
  props: {
    // 父组件传递过来的msg值
    msg: {
      mission: '',
      score: 0
    },
    userinfo: {
      name: '',
      uid: ''
    }
  },
  data() {
    return {
      active: 0
    }
  },
  methods: {
    next() {
      if (this.active == 4) {
        this.active = 0;
        ElNotification({
          title: this.msg.mission + "完成",
          message: '恭喜你获得' + this.msg.score + '积分',
          type: 'success',
        });
        // 发送 GET 请求
        this.$axios.get('http://localhost:8080/api/addScore?email=' +  this.userinfo.uid + '&score=' + this.msg.score)
          .catch((error) => {
            this.$message.error('成绩提交失败');
          });
        // 步骤完成后触发一个事件通知父组件
        this.$emit('steps-completed');
      }
    },
    nextStep() {
      this.active++;
    }
  },
  watch: {
    active(val) {
      this.next();
    }
  }
}
</script>