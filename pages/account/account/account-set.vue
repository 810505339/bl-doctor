<template>
	<view class="form">
		<uni-list>
			<uni-list-item title="微信授权" @click="bindingwechat" link>
				<template slot="footer">
					<image class="lefticon" src="../assest/wechat.png"></image>
					<text class="mes">{{iswechatpower}}</text>
					<image class="righticon" src="../assest/right.svg"></image>
				</template>
			</uni-list-item>
			<uni-list-item title="支付宝授权" @click="bindingalipay" link>
				<template slot="footer">
					<image class="lefticon" src="../assest/Alipay.png"></image>
					<text class="mes">{{isalipaypower}}</text>
					<image class="righticon" src="../assest/right.svg"></image>
				</template>
			</uni-list-item>
			<uni-list-item title="银行卡管理" @click="gobink()" link>
				<template slot="footer">
					<image class="righticon" src="../assest/right.svg"></image>
				</template>
			</uni-list-item>
			<uni-list-item title="修改手机号" @click="changephone" link>
				<template slot="footer">
					<text class="mes">{{phone}}</text>
					<image class="righticon" src="../assest/right.svg"></image>
				</template>
			</uni-list-item>
			<uni-list-item title="SOS急救模式" @click="sos" link>
				<template slot="footer">
					<image class="righticon" src="../assest/right.svg"></image>
				</template>
			</uni-list-item>
			<uni-list-item title="指纹/面容解锁" @click="verification" link>
				<template slot="footer">
					<image class="righticon" src="../assest/right.svg"></image>
				</template>
			</uni-list-item>
			<uni-list-item title="修改密码" @click="changepass" link>
				<template slot="footer">
					<image class="righticon" src="../assest/right.svg"></image>
				</template>
			</uni-list-item>
			<uni-list-item title="个性化推荐" @click="individualization" link>
				<template slot="footer">
					<image class="righticon" src="../assest/right.svg"></image>
				</template>
			</uni-list-item>
			<uni-list-item title="清理缓存" @click="clearcache" link>
				<template slot="footer">
					<text class="mes">{{cachenumber}}M</text>
					<image class="righticon" src="../assest/right.svg"></image>
				</template>
			</uni-list-item>
		</uni-list>
		<uni-list style="margin-top: 20rpx;">
			<uni-list-item title="切换账号" @click="checknumber" link>
				<template slot="footer">
					<image class="righticon" src="../assest/right.svg"></image>
				</template>
			</uni-list-item>
		</uni-list>
		<div class="signout" @click="signout()"><span>退出登录</span></div>
	</view>
</template>

<script>
export default {
	data() {
		return {
		cachenumber:"22.99",
		iswechatpower:"未授权",
		isalipaypower:"未授权",
		phone:""
		}
	},
	mounted(){
		this.getdata();
	},
	methods: {
		async getdata(){
			const data = await this.$axios({
				method:'get',
			  url: '/api/mine/get_user_info',
				"data":{
				}
			});
			if(data.code === 1){
				if(data.data.alipay_id){
					this.isalipaypower = "已授权";
				}else {
					this.isalipaypower = "未授权"
				}
				if(data.data.wechat_id){
					this.iswechatpower = "已授权"
				}else{
					this.iswechatpower = "未授权"
				}
				this.phone = data.data.nickname
			}
		},
		gobink() {
			this.$router.push("/pages/account/account-bink/account-bink")
		},
		signout() {
			var that = this;
			uni.showModal({
				title:'提示',
				content:'退出将无法收到来自医生们和服务的通知，是否退出？',
				confirmColor: 'rgba(67, 207, 124, 1)',
				success:function(res){
				if(res.confirm){
					that.$router.push("/");
				}else{
				}
				}
			})
		},
		bindingwechat(){
			this.$router.push("/pages/account/account-wechat/account-wechat")
		},
		checknumber(){
			this.$router.push("/pages/account/account-number/account-number")
		},
		clearcache(){
			uni.showToast({
					icon: "none",
					title: "缓存已清理",
					duration: 2000,
					position: 'bottom'
			})
			this.cachenumber = 0;
		},
		verification(){
			this.$router.push("/pages/account/account-verification/account-verification")
		},
		individualization(){
			this.$router.push("/pages/account/account-individualization/account-individualization")
		},
		sos(){
			this.$router.push("/pages/account/account-sos/account-sos")
		},
		changephone(){
			this.$router.push("/pages/account/account-phonenum/account-phonenum")
		},
		changepass(){
			this.$router.push("/pages/login/forgetPassword")
		},
		bindingalipay(){
			this.$router.push("/pages/account/account-alipay/account-alipay")
		}
	}
}
</script>

<style lang="scss" scoped>
	::v-deep .uni-page-head{
		line-height: 96rpx;
		font-family: 'Microsoft YaHei';
		font-size: 28rpx;
		color: #505050;
	}
.form {
	::v-deep .uni-icon-wrapper {
		padding: 0;
	}

	::v-deep .uni-list-item {
		padding: 0;
		margin: 0;
		height: 96rpx;
		line-height: 96rpx;
	}
	::v-deep .uni-list-item__content-title{
		line-height: 96rpx;
		font-family: 'Microsoft YaHei';
		font-size: 28rpx;
		color: #505050;
	}
	::v-deep .uni-list-item__container {
		padding: 0 8rpx 0 24rpx;
		font-family: 'Microsoft YaHei';
		font-size: 28rpx;
		color: #505050;
		line-height: 96rpx;
	}

	::v-deep .uni-list-item__container text {
		padding: 0 20rpx 0 20rpx;
	}

	::v-deep .lefticon {
		width: 54rpx;
		height: 54rpx;
		margin: 21rpx 0 21rpx 0;
	}

	::v-deep .righticon {
		width: 56rpx;
		height: 56rpx;
		margin: 20rpx 0 20rpx 0;
	}
	::v-deep .uni-icon-wrapper {
		display: none;
	}
}

.signout {
	width: 93%;
	height: 96rpx;
	background-color: rgba(212, 48, 48, 1);
	border: 0;
	border-radius: 12rpx;
	text-align: center;
	line-height: 96rpx;
	margin-top: 120rpx;
	margin-left: auto;
	margin-right: auto;
}

.signout span {
	font-size: 32rpx;
	color: rgba(255, 255, 255, 1);
	font-weight: bold;
	font-style: Microsoft YaHei;
}
</style>
