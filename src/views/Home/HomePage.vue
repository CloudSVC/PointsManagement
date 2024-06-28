<script setup>
import Card from './Card.vue'
// import PopupBar from './PopupBar.vue'
import PageTitle from './PageTitle.vue'
import TablePage from './TablePage.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <!-- <el-aside width="70px">
        <PopupBar />
      </el-aside> -->
      <el-main>
        <div class="page-title">
          <PageTitle></PageTitle>
        </div>
        <Card></Card>
        <div class="table-container">
          <TablePage></TablePage>
        </div>
      </el-main>
    </el-container>
  </div>
</template>



<style scoped>
/* Add any styles you want */
.page-title {
  margin-top: 10px;
  /* 只影响 PageTitle 的上边距 */
  margin-left: -20px;
}

.table-container {
  margin-top: 30px;
  display: flex;
  height: 50vh;
  overflow-x: auto;
  /* 子元素居中显示 */
  justify-content: center;
  /* 子元素垂直居中 */
  align-items: center;
}
</style>