<template>
    <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="item in img" :key="item">
            <img :src="item" alt="">
        </el-carousel-item>
    </el-carousel>
</template>

<style scoped>
.el-carousel__item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>

<script>
export default {
    data() {
        return {
            img: [
                './src/assets/img/001218jHkbd.jpg',
                './src/assets/img/23330590NyV.jpg',
                './src/assets/img/234509WruMb.jpg',
                './src/assets/img/211109HF9hy.jpg',
                './src/assets/img/003531vWDln.jpg',
                './src/assets/img/202554SzC51.jpg'
            ]
        }
    }
}

</script>