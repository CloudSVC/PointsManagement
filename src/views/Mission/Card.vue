<script>
export default {
    data() {
        return {
            mission: [
                "Mission 1",
                "Mission 2",
                "Mission 3",
                "Mission 4",
                "Mission 5",
                "Mission 6"
            ]
        }
    },
    methods: {
        nalert(item) {
            alert(item)
        }
    }
}
</script>

<template>
    <el-carousel height="400px" direction="vertical" type="card" :autoplay="false">
        <el-carousel-item v-for="(item, index) in mission" :key="index">
            <div class="carousel-content">
                <h3>{{ item }}</h3>
                <el-button type="success" @click="nalert(item)">接受</el-button>
            </div>
        </el-carousel-item>
    </el-carousel>
</template>

<style scoped>
.carousel-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200px;
    background-color: #d3dce6;
}

.carousel-content:nth-child(2n) {
    background-color: #99a9bf;
}
</style>