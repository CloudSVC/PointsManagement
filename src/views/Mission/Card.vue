<script setup>
import StepsPage from './StepsPage.vue';
import { ref } from 'vue';
const showSteps = ref(false);
const showCarousel = ref(true);

var msg = ref({
    "mission": "Mission 0",
    "score": 10
});

const accept = (item) => {
    showSteps.value = true;
    showCarousel.value = false;
    msg.value.mission = item.name;
    msg.value.score = item.score;
};

// 当步骤完成时的回调函数
const handleStepsCompleted = () => {
    showSteps.value = false;
    showCarousel.value = true;
};
</script>

<template>
    <el-carousel height="800px" direction="vertical" type="card" :autoplay="false" v-if="showCarousel">
        <el-carousel-item v-for="(item, index) in mission" :key="index">
            <div class="carousel-item">
                <div class="left-content">
                    <img :src="item.img" alt="Mission" />
                </div>
                <div class="right-content">
                    <h3>任务：{{ item.name }}</h3>
                    <el-button type="success" @click="accept(item)">接受任务</el-button>
                </div>
            </div>
        </el-carousel-item>
    </el-carousel>
    <StepsPage v-if="showSteps" @steps-completed="handleStepsCompleted" :msg="msg" :userinfo="userinfo" />
</template>

<style scoped>
.carousel-item {
    display: flex;
    height: 400px;
    background-color: #77bbfbf1;
    /* 背景透明 */
    border-radius: 10px;
    /* 圆角 */
}

.left-content {
    flex: 1;
    /* 占据左边整个空间 */
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 10px;
    /* 左上角圆角 */
    border-bottom-left-radius: 10px;
    /* 左下角圆角 */
    overflow: hidden;
    /* 隐藏溢出部分 */
}

.left-content img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    /* 图片圆角 */
}

.right-content {
    flex: 1;
    /* 占据右边整个空间 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.right-content h3 {
    margin-bottom: 10px;
}

.right-content .el-button {
    width: 100px;
}
</style>


<script>
export default {
    data() {
        return {
            mission: []
        }
    },
    methods: {
        addMission() {
            // 发送 GET 请求
            this.$axios.get('/api/missions')
                .then((res) => {
                    this.$message.success('任务列表更新成功');
                    var data = res.data; // res.data 已经是解析后的 JavaScript 对象或数组
                    this.mission = data;
                })
                .catch((error) => {
                    this.$message.error('任务列表更新失败');
                    // 在这里处理请求失败的情况，比如显示错误信息等操作
                });
        }
    },
    props: {
        // 父组件传递过来的userinfo值
        userinfo: {
            name: '',
            uid: 0
        }
    },
    mounted() {
        this.addMission();
    }
}
</script>