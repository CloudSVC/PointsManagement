<script setup lang="ts">
import { reactive } from 'vue'

const font = reactive({
  color: 'rgba(0, 0, 0, .15)',
})

</script>

<template>
  <el-watermark :font="font" :content="['暖暖的太阳', '123123']">
    <div style="height: 100vh">
    </div>
  </el-watermark>
</template>