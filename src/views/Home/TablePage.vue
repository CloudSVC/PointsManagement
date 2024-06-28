<template>
  <el-drawer v-model="table" title="任务列表" direction="rtl" size="50%">
    <el-table :data="gridData">
      <el-table-column property="name" label="任务名" width="150" />
      <el-table-column property="score" label="可获得积分" width="200" />
      <el-table-column property="active" label="完成进度" width="200" />
      <el-table-column property="total" label="总进度" width="200" />
    </el-table>
  </el-drawer>

  <el-table :data="tableData" style="width: 100vw; height: 50vh;">
    <el-table-column fixed prop="id" label="id" width="150" />
    <el-table-column prop="name" label="昵称" width="120" />
    <el-table-column prop="score" label="积分" width="120" />
    <el-table-column prop="email" label="邮箱" width="180" />
    <el-table-column prop="country" label="国家" width="120" />
    <el-table-column prop="city" label="城市" width="120" />
    <el-table-column prop="address" label="地址" width="600" />
    <el-table-column fixed="right" label="查看任务" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click.prevent="showDrawer(scope.row.email)">
          查看
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  data() {
    return {
      tableData: [],
      gridData: [],
      table: ref(false)
    };
  },
  methods: {
    addRow() {
      // 发送 GET 请求
      this.$axios.get('/api/users')
        .then((res) => {
          this.$message.success('榜单更新成功');
          var data = res.data; // res.data 已经是解析后的 JavaScript 对象或数组
          data.forEach(element => {
            this.tableData.push({
              id: element.id,
              name: element.name,
              score: element.score,
              email: element.email,
              country: element.country,
              city: element.city,
              address: element.address,
            });
          });
        })
        .catch((error) => {
          this.$message.error('榜单更新失败');
          // 在这里处理请求失败的情况，比如显示错误信息等操作
        });
    },
    showDrawer(email) {
      this.table = true;
      this.$axios.get('/api/userMissions?email=' + email)
        .then((res) => {
          this.gridData = res.data.map(item => ({
            name: item.name,
            score: item.score,
            active: item.active,
            total: item.steps.split(',').length
          }));
        })
      console.log(this.gridData);
    }
  },
  mounted() {
    this.addRow();
  },
};
</script>