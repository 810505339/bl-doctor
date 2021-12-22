<template>
	<view style="background-color: rgba(48, 153, 116, 1);height: 100vh;">
		<u-navbar back-text=" " @leftClick="back" safeAreaInsetTop back-icon-color="rgba(255, 255, 255, 1)"
			bg-color="rgba(48, 153, 116, 1)" back-icon-name="arrow-left" title=" " :border-bottom="false">
			<view slot="left">
				<u-icon color="rgba(255, 255, 255, 1)" size="16" name="arrow-left"></u-icon>
			</view>
		</u-navbar>
		<view class="content_area" v-if="show"> 
			<view class="title">
				<view class="circle"></view>
				{{content.title}}
				<view class="circle"></view>
			</view>
			<view class="content">
				<u-parse :content="content.content"></u-parse>
			</view>
			<view :class="['confirm_btn',text==0?'confirm_btn_active':'']" @click="confirm">
				{{text==0?'我保证信息真实，开始填写':text+'S后可点击'}}
			</view>
			<view class="check">
				确认即代表同意
				<view class="meta">
					《白龙诊疗补贴协议》
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import url from '@api/subsidy'
	export default {
		data() {
			return {
				content: '',
				text: 5,
				show:false,
				hospital_id:0,
				hospital_name:''
			};
		},
		mounted() {
			this.delay()
		},
		onLoad(option) {
			this.getSubsidy()
			this.hospital_id=option.hospital_id
			this.hospital_name=option.hospital_name
		},
		methods: {
			getSubsidy() {
				uni.showLoading()
				this.$axios({
					url: url.subsidy
				}).then(res => {
					if (res.code == 1) {
						this.content = res.data.data
						this.show=true
						uni.hideLoading()
					}
				})
			},
			confirm() {
				if (this.text != 0) {
					return
				}
				this.naviTo()
			},
			back() {
				uni.navigateBack({})
			},
			delay() {
				var timer = setInterval(() => {
					this.text--
					if (this.text <= 0) {
						clearInterval(timer)
					}
				}, 1e3)
			},
			naviTo() {
				uni.navigateTo({
					url: '/pages/d_and_t-subsidy/fill_form/fill_form?hospital_id='+this.hospital_id+"&hospital_name="+this.hospital_name
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content_area {
		margin: 0 22rpx;
		color: rgba(80, 80, 80, 1);
		background-color: rgba(255, 255, 255, 1);
		border-radius: 22rpx;
		text-align: center;

		.title {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			color: rgba(0, 0, 0, 1);
			font-size: 34rpx;
			font-weight: bold;
			display: flex;
			flex-direction: row;
			margin-top: 36rpx;

			.circle {
				width: 20rpx;
				height: 20rpx;
				background-color: rgba(48, 153, 116, 1);
				border-radius: 50%;
				margin: 0 26rpx;
			}
		}

		.content {
			padding: 22rpx 48rpx 58rpx 48rpx;
		}

		.confirm_btn {
			margin: auto;
			width: 622rpx;
			height: 100rpx;
			color: rgba(80, 80, 80, 1);
			background-color: rgba(229, 229, 229, 1);
			border-radius: 12rpx;
			font-size: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;

		}

		.confirm_btn_active {
			color: rgba(255, 255, 255, 1) !important;
			background-color: rgba(48, 153, 116, 1) !important;
		}

		.check {
			color: rgba(80, 80, 80, 1);
			font-size: 26rpx;
			display: flex;
			flex-direction: row;
			justify-content: center;
			padding-top: 44rpx;
			padding-bottom: 46rpx;

			.meta {
				color: rgba(48, 153, 116, 1);
				font-size: 26rpx;
				text-decoration: underline;
			}
		}
	}
</style>
