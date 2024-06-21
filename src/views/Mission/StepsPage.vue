<template>
  <el-steps style="width: 80vw;" :active="active" finish-status="success">
    <el-step title="选择任务" />
    <el-step title="执行任务" />
    <el-step title="获得积分" />
  </el-steps>
</template>


<script>
import { ElNotification } from 'element-plus';

export default {
  props: {
    active: {
      type: String,
      default: ''
    },
    msg: {
      type: String,
      default: ''
    }
  },
  methods: {
    next() {
      if (this.active == 3) {
        ElNotification({
          title: this.msg.status,
          message: '恭喜你获得' + this.msg.score + '积分',
          type: 'success',
        })
      }
    }
  },
  watch: {
    active(val) {
      this.next();
    }
  }
}
</script>