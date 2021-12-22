<template>
	<view class="numbers">
		<div v-model="Data">
			<div class="title">点击头像切换账号</div>
			<div class="userbox" v-for="(item, index) in Data">
				<img :src="item.img" style="width: 120rpx;height: 120rpx;" alt="" @click="checknumber(index)"/>
				<div style="margin-left: 24rpx;">
					<p>{{ item.number }}</p>
					<p
						v-if="item.ischeck"
						style="width:134rpx;
									height:54rpx;
									background-color:rgba(215, 243, 233, 1;color:rgba(65, 171, 133, 1);
									font-size:28rpx;
									text-align:center;"
					>
						当前登录
					</p>
				</div>
			</div>
			<div>
				<div class="insertnumber userbox" @click="login">
					<div class="imgbox"><image class="inserticon" src="../assest/insert.svg"></image></div>
					<span class="insertmes">新账号登录</span>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
export default {
	data() {
		return {
			Data: [
				{
					img: require('../assest/portrait1.png'),
					number: '176****3596',
					ischeck: true
				},
				{
					img: require('../assest/portrait2.png'),
					number: '176****3596',
					ischeck: false
				}
			]
		};
	},
	methods: {
		checknumber(index){
			this.Data.forEach((item)=>{
				item.ischeck = false;
			})
			this.Data[index].ischeck = true;
		},
		login(){
			this.$router.push('/')
		}
	}
};
</script>

<style>
.title {
	text-align: center;
	color: rgba(80, 80, 80, 1);
	font-family: "Microsoft YaHei";
	font-size: 40rpx;
	margin-bottom: 64rpx;
	font-weight: bold;
}
.numbers {
	width: ;
	padding: 240rpx 80rpx;
}
.userbox {
	width: 100%;
	height: 144rpx;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	background-color: rgba(255, 255, 255, 1);
	margin-top: 20rpx;
	padding: 12rpx;
}
.inserticon {
	width: 80rpx;
	height: 80rpx;
}
.imgbox {
	width: 120rpx;
	height: 120rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	border: rgba(229, 229, 229, 1) solid 1px;
	margin-right: 24rpx;
}
.insertmes{
	color: rgba(80, 80, 80, 1);
	font-size: 32rpx;
	font-family: "Microsoft YaHei";
	font-weight: bold;
}
</style>
