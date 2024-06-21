<template>
  <el-table :data="tableData" style="width: 100vw; height: 50vh;">
    <el-table-column fixed prop="date" label="日期" width="150" />
    <el-table-column prop="name" label="名称" width="120" />
    <el-table-column prop="state" label="国家" width="120" />
    <el-table-column prop="city" label="城市" width="120" />
    <el-table-column prop="address" label="地址" width="600" />
    <el-table-column prop="zip" label="Zip" width="120" />
    <el-table-column fixed="right" label="选项" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">
          Remove
        </el-button>
        <el-button link type="primary" size="small" @click.prevent="nalert(scope.row.name)">
          GetName
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">

export default {
  data() {
    return {
      tableData: [],
    };
  },  
  methods: {
    deleteRow(index: number) {
      this.tableData.splice(index, 1);
      alert(this.tableData.name.value);
    },
    addRow() {
      for (var i = 1; i <= 100; i++) {
        // 添加新行
        this.tableData.push({
          date: '2024-06-21',
          name: 'Tom' + i,
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        });
      }
    },
    nalert(name) {
      alert(name);
    }
  },
  mounted() {
    this.addRow();
  },
};

</script>