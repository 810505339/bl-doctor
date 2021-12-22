<template>
	<view class="binkedit">
		<div class="uni-page-head binkhead">
			<div style="width: 62rpx; height: 62rpx;margin:0 4rpx;display: flex;justify-content: center;align-items: center;">
				<i class="uni-btn-icon" style="color: rgb(0, 0, 0); font-size: 54rpx;" @click="goback()"></i>
			</div>
		</div>
		<div class="box">
			<div class="title">
				<p>修改手机号</p>
				<span>需要验证您当前账号所绑定的手机号</span>
			</div>
			<div class="inputbox">
				<span
					style="width:100%;border: rgba(229, 229, 229, 1) solid 2rpx;height: 96rpx;display: block;padding: 0;display: flex;align-items: center;margin: 28rpx 0;font-weight: inherit;border-radius: 50rpx;"
				>
					<input
						v-model="checknum"
						style="float: left;border: none;width: 100%;"
						placeholder="请输入验证码"
						placeholder-style="color: rgba(166, 166, 166, 1);font-family: 'Microsoft YaHei';font-size: 28rpx;height:28rpx;line-height:28rpx"
					/>
					<p v-if="beforeclick" style="position: fixed;right: 74rpx;color:rgba(65, 171, 133, 1) ;" @click="getchecknum">获取验证码</p>
					<p v-if="afterclick" style="position: fixed;right: 74rpx;">{{ time }}秒后重新获取</p>
				</span>
			</div>
			<div class="deletbink" @click="binding">下一步</div>
		</div>
		<div></div>
	</view>
</template>
<script>
export default {
	data() {
		return {
			returnchecknum: '',
			phonenum: '',
			checknum: '',
			beforeclick: true,
			afterclick: false,
			time: 60
		};
	},
	activated() {
		// 进入时强制刷新页面
		history.go(0);
	},
	mounted() {
		this.getdata();
	},
	methods: {
		async getdata() {
			const data = await this.$axios({
				method: 'get',
				url: '/api/mine/get_user_info',
				data: {}
			});
			if (data.code == 1) {
				this.phonenum = data.data.mobile;
			}
		},
		goback() {
			this.$router.go('-1');
		},
		checknull() {
			if (this.phonenum == '') {
				uni.showToast({
					icon: 'none',
					title: '请先输入手机号',
					duration: 2000,
					position: 'bottom'
				});
				return false;
			}
			return true;
		},
		async getcheck() {
			const data = await this.$axios({
				method: 'get',
				url: '/api/sms_code',
				data: {
					mobile: this.phonenum
				}
			});
		},
		getchecknum() {
			this.checknull();
			if (this.checknull()) {
				this.beforeclick = !this.beforeclick;
				this.afterclick = !this.afterclick;
				this.getcheck();
				let timeon = setInterval(() => {
					this.time = this.time - 1;
					if (this.time == 0) {
						this.beforeclick = !this.beforeclick;
						this.afterclick = !this.afterclick;
						this.time = 60;
						clearInterval(timeon);
					}
				}, 1000);
			}
		},
		async changemobile() {
			const checkresult = await this.$axios({
				method: 'post',
				url: '/api/mine/edit_bind_mobile',
				data: {
					mobile: this.phonenum,
					code: this.checknum
				}
			}).then(()=>{
				this.phonenum = '';
				this.checknum = '';
				this.$router.push('/pages/account/account-phonenum/account-register');
			}).catch(()=>{
				uni.showToast({
					icon: 'none',
					title: '验证失败',
					duration: 2000,
					position: 'bottom'
				});
			})
			// console.log(checkresult.code);
			// if (checkresult.code == 1) {
				
			// } else {
				
			// }
		},
		binding() {
			this.checknull();
			if (this.checknull()) {
				if (this.checknum == '') {
					uni.showToast({
						icon: 'none',
						title: '请先输入验证码',
						duration: 2000,
						position: 'bottom'
					});
				} else {
					this.changemobile();
				}
			}
		}
	}
};
</script>
<style>
.binkedit {
	height: 100%;
	background-color: rgba(255, 255, 255, 1);
}
</style>
<style>
.binkhead {
	padding: 14rpx 6rpx;
	background-color: rgb(255, 255, 255);
	color: rgb(0, 0, 0);
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.binkhead span {
	font-weight: 700;
	font-size: 34rpx;
}
.box {
	padding: 0 56rpx;
	overflow: hidden;
}
.title {
	width: 100%;
	/* text-align: center; */
	margin-top: 140rpx;
}
.title p {
	height: 72rpx;
	color: rgba(80, 80, 80, 1);
	font-size: 48rpx;
	line-height: 150%;
	font-weight: bold;
}
.title span {
	height: 42rpx;
	top: 326rpx;
	color: rgba(166, 166, 166, 1);
	font-size: 28rpx;
	line-height: 150%;
}
.inputbox {
	margin-top: 60rpx;
}
.inputbox p {
	height: 48rpx;
	color: rgba(128, 128, 128, 1);
	font-size: 32rpx;
	line-height: 150%;
	text-align: left;
}
::v-deep .uni-input-input {
	color: rgba(166, 166, 166, 1);
	font-family: 'Microsoft YaHei';
	font-size: 28rpx;
}
.inputbox input {
	height: 96rpx;
	background-color: rgba(255, 255, 255, 1);
	border-radius: 12rpx;
	line-height: 150%;
	border: rgba(229, 229, 229, 1) solid 2rpx;
	padding-left: 22rpx;
	margin: 14rpx 0;
	border-radius: 50rpx;
}
.inputbox input:last-child {
	border: 0 !important;
}
.insertbink {
	height: 42rpx;
	color: rgba(212, 48, 48, 1);
	font-size: 28rpx;
	line-height: 150%;
	text-align: left;
}
.deletbink {
	width: 100%;
	height: 96rpx;
	background-color: rgba(65, 171, 133, 1);
	border-radius: 50rpx;
	text-align: center;
	line-height: 96rpx;
	font-family: 'Microsoft YaHei';
	font-weight: bold;
	font-size: 32rpx;
	color: rgba(255, 255, 255, 1);
	left: 0;
	right: 0;
	margin-left: auto;
	margin-right: auto;
	margin-top: 52rpx;
}
</style>
