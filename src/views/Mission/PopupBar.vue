<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse">
    <el-menu-item index="1" @click="$router.push('/')">
      <el-icon><House /></el-icon>
      <template #title>首页</template>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <template #title>任务中心</template>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <el-icon>
        <setting />
      </el-icon>
      <template #title>设置</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  House,
} from '@element-plus/icons-vue'

const isCollapse = ref(true)
</script>
