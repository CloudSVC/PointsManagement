<script setup>
import PopupBar from './PopupBar.vue';
import Card from './Card.vue';
import StepsPage from './StepsPage.vue';
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="70px">
                <PopupBar />
            </el-aside>
            <el-main>
                <Card />
                <div class="steps">
                    <StepsPage :active="active" :msg="msg" />
                </div>
                <!-- 点击按钮，将active进行到下一步 -->
                <el-button @click="nextStep">下一步</el-button>
            </el-main>
        </el-container>
    </div>
</template>

<style>
.steps {
    margin-top: 30px;
    display: flex;
    /* 子元素居中显示 */
    justify-content: center;
    /* 子元素垂直居中 */
    align-items: center;
}
</style>

<script>
import { ref } from 'vue';
var active = ref(0);
var msg = ref({
    "status": "任务完成",
    "score": 1
});

const nextStep = () => {
    if (active.value++ > 2) active.value = 0;
}
</script>