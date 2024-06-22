<template>
  <el-table :data="tableData" style="width: 100vw; height: 50vh;">
    <el-table-column fixed prop="id" label="id" width="150" />
    <el-table-column prop="name" label="昵称" width="120" />
    <el-table-column prop="score" label="积分" width="120" />
    <el-table-column prop="country" label="国家" width="120" />
    <el-table-column prop="city" label="城市" width="120" />
    <el-table-column prop="address" label="地址" width="600" />
    <el-table-column fixed="right" label="献花" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click.prevent="nalert(scope.row.name)">
          选他
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { ElNotification } from 'element-plus'
export default {
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    addRow() {
      // 发送 GET 请求
      this.$axios.get('http://localhost:8080/api/users')
        .then((res) => {
          this.$message.success('榜单更新成功');
          var data = res.data; // res.data 已经是解析后的 JavaScript 对象或数组
          data.forEach(element => {
            this.tableData.push({
              id: element.id,
              name: element.name,
              score: element.score,
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
    nalert(name) {
      ElNotification({
        title: '献花成功',
        message: '恭喜' + name + '获得一朵鲜花',
        type: 'success',
      })
    }
  },
  mounted() {
    this.addRow();
  },
};

</script>