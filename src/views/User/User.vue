<script setup>
import axios from 'axios';
import { showToast, showNotify, showConfirmDialog } from 'vant';
import { onMounted, ref } from 'vue';
import router from '@/router';

// 定义当前在哪个页面，例如0：任务大厅，1：我的任务，2：设置
const active = ref(0);
// 刷新功能
const loading = ref(false);
const onRefresh = () => {
    loading.value = false;
    addMission();
    updateScore();
}

const MyScore = ref(0);
const updateScore = () =>{
    axios.get('/api/getUserInfo?email=' + userinfo.value.uid)
    .then((res) => {
        MyScore.value = res.data.score;
    })
};

// 使用 ref 声明响应式变量 missions
const missions = ref([]);
// 我的任务列表
const myMissions = ref([]);
// 加载任务大厅，任务列表
const addMission = () => {
    // 发送 GET 请求
    // 更新任务列表
    axios.get('/api/missions')
        .then((res) => {
            var data = res.data; // res.data 已经是解析后的 JavaScript 对象或数组
            missions.value = res.data; // 使用 missions.value 更新数据
        })
        .catch((error) => {
            showToast('任务列表更新失败');
            // 在这里处理请求失败的情况，比如显示错误信息等操作
        });
    // 更新我的任务列表
    axios.get('/api/userMissions?email=' + userinfo.value.uid)
        .then((res) => {
            myMissions.value = res.data.map(mission => ({
                ...mission,
                steps: mission.steps.split(',') // 将 steps 字符串按逗号分隔转为数组
            }));
        })
        .catch((error) => {
            showToast('任务列表更新失败');
            // 在这里处理请求失败的情况，比如显示错误信息等操作
        });
}

// 弹窗内容
const showMission = (id, name, describe, score) => {
    showConfirmDialog({
        title: name,
        message: '积分：' + score + '\n' + describe,
        confirmButtonText: '领取任务',
        cancelButtonText: '取消'
    })
        .then(() => {
            // on confirm
            showNotify({ type: 'success', message: "任务接取成功, 请前往我的任务查看", duration: 700 });
            axios.get('/api/addUserMission?uid=' + userinfo.value.uuid + '&mid=' + id);
        })
}
const userinfo = ref({
    name: '',
    uid: '',
    uuid: '',
    score: 0
});
// 验证登录
const getCookie = (name) => {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
};
const checkLogin = () => {
    if (getCookie('token')) {
        var token = getCookie('token');
        token = JSON.parse(token);
        userinfo.value.name = token.name;
        userinfo.value.uid = token.email;
        userinfo.value.uuid = token.id;
        userinfo.value.score = token.score;
        addMission();
    } else {
        showToast({
            message: '请先登录',
            position: 'top',
        });
        router.push('/userlogin');
        return false;
    }
};

// 清除Cookie/退出登录
const logout = () => {
    // 获取所有的cookie并拆分成数组
    var cookies = document.cookie.split(";");

    // 遍历所有cookie并将其过期时间设置为过去
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
}

// 自动加载部分
onMounted(() => {
    checkLogin();
    updateScore();
});
</script>


<template>
    <!-- 刷新功能 -->
    <van-pull-refresh v-model="loading" @refresh="onRefresh"
        style=" height: 100vh; background-color: #f7f8fa;  overflow-y: scroll;">

        <div class="container">
            <!-- 任务大厅页面 -->
            <div v-if="active === 0">
                <van-notice-bar left-icon="volume-o" text="请认真阅读任务描述，选择符合自己的任务领取，领取后尽快完成任务。" />
                <div v-for="item in missions" :key="item.id" style="padding: 20px;">
                    <van-card :desc="'描述:' + item.steps" :price="item.score" :title=item.name :thumb=item.img
                        @click="showMission(item.id, item.name, item.steps, item.score)" />
                </div>
            </div>
            <!-- 我的任务页面 -->
            <div v-if="active === 1">
                <van-notice-bar left-icon="volume-o" text="点击任务名，开始完成任务。" />
                <div class="myMissions" v-for="item in myMissions" style="margin-bottom: 40px;">
                    <van-grid :column-num="2" @click="() => {
                        if (item.active < item.steps.length - 1) {
                            showConfirmDialog({
                                title: item.name,
                                message: '积分：' + item.score + '\n' + '是否继续？',
                                confirmButtonText: '继续',
                                cancelButtonText: '取消'
                            })
                                .then(() => {
                                    item.active++;
                                    // 更新active
                                    axios.get('/api/setActive?id=' + item.id + '&active=' + item.active);
                                })
                                .catch(() => {
                                    // on cancel
                                });
                        } else if (item.active === item.steps.length - 1) {
                            showNotify({ type: 'success', message: '获得积分：' + item.score, duration: 700 });
                            item.active++;
                            // 更新active
                            axios.get('/api/setActive?id=' + item.id + '&active=' + item.active);
                            // 加分在这里进行
                            axios.get('/api/addScore?email=' + userinfo.uid + '&score=' + item.score);
                            return;
                        } else {
                            showNotify({ type: 'success', message: '奖励已发放', duration: 700 });
                            return;
                        }
                    }">
                        <van-grid-item :text="item.name" />
                        <van-grid-item :text="'积分：' + item.score" />
                    </van-grid>
                    <van-steps :active="item.active" active-icon="success" active-color="#07c160">
                        <van-step v-for="step in item.steps">{{ step }}</van-step>
                    </van-steps>
                </div>
                <!-- 如果没有任务显示下面的内容 -->
                <van-empty description="再往下也没有内容了" />
            </div>

            <!-- 设置页面 -->
            <div v-if="active === 2">
                <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o" :scrollable="false">
                    <van-swipe vertical class="notice-swipe" :autoplay="3000" :touchable="false"
                        :show-indicators="false">
                        <van-swipe-item>明月直入，无心可猜。</van-swipe-item>
                        <van-swipe-item>仙人抚我顶，结发受长生。</van-swipe-item>
                        <van-swipe-item>今人不见古时月，今月曾经照古人。</van-swipe-item>
                    </van-swipe>
                </van-notice-bar>
                <van-cell-group inset>
                    <van-field label="用户名" :model-value="userinfo.name" readonly />
                    <van-field label="邮箱" :model-value="userinfo.uid" readonly />
                    <van-field label="积分" :model-value="MyScore" readonly />
                </van-cell-group>

                <van-button type="danger" size="large" style="margin-top: 60px;" @click="() => {
                    logout();
                    $router.push('/userlogin');
                }">退出登录</van-button>
            </div>
        </div>
    </van-pull-refresh>

    <van-tabbar v-model="active">
        <van-tabbar-item icon="clock-o">任务大厅</van-tabbar-item>
        <van-tabbar-item icon="contact-o">我的任务</van-tabbar-item>
        <van-tabbar-item icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
</template>


<style scoped>
.notice-swipe {
    height: 40px;
    line-height: 40px;
}
</style>