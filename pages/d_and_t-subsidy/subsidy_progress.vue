<template>
	<view style="background-color: white;height: 100%;overflow: auto;">
		<u-navbar back-text=" " safeAreaInsetTop title-bold back-icon-color="rgba(153, 153, 153, 1)" @leftClick="back"
			back-icon-name="arrow-left" title="补贴进度" title-color="rgba(80, 80, 80, 1)" :border-bottom="false">
		</u-navbar>
		<view class="imgGroup">
			<u--image src="/static/d_and_t-subsidy/top_img.jfif" width="100%" height="300rpx">
			</u--image>
		</view>
		<view class="log" >
			<view class="time_line_box" v-if="!show">
				<u-time-line class="none">
					<u-time-line-item nodeTop="7" class="green">
						<template v-slot:node>
							<view class="u-node">
								<view class="circle">
									<view class="circle_heart">

									</view>
								</view>
							</view>
						</template>
						<template v-slot:content>
							<view>
								<view class="u-order-title">
									<view class="status">
										资料已提交
									</view>
								</view>
								<view class="u-order-desc">
									已递交至后台补贴审核部门，请您耐心等待，有进度更新会以<view
										style="color: rgba(48, 153, 116, 1);display:inline;margin: 0 5rpx;">消息通知</view>
									的方式提醒您。
								</view>
							</view>
						</template>
					</u-time-line-item>
					<u-time-line-item nodeTop="7"  :class="{'green':subsidy_detail.status>0?true:false}">
						<template v-slot:node>
							<view class="u-node">
								<view class="circle">
									<view class="circle_heart">
					
									</view>
								</view>
							</view>
						</template>
						<template v-slot:content>
							<view>
								<view class="u-order-title">
									<view class="status">
										后台审核中
									</view>
								</view>
								<view class="u-order-desc">
									后台工作人员已经收到您的补贴申请，请您近期请留意您的电话和消息通知，后台人员可能会与您核实情况
								</view>
							</view>
						</template>
					</u-time-line-item>
					<u-time-line-item nodeTop="7" :class="{'green':subsidy_detail.status>1?true:false}">
						<template v-slot:node>
							<view class="u-node">
								<view class="circle" :style="{'backgroundColor':subsidy_detail.status>0?'':'rgba(229, 229, 229, 1)'}">
									<view class="circle_heart">
					
									</view>
								</view>
							</view>
						</template>
						<template v-slot:content>
							<view>
								<view class="u-order-title">
									<view class="status" style="color: rgba(48, 153, 116, 1);">
										审核通过
									</view>
								</view>
								<view class="u-order-desc">
									恭喜您，您的审核已通过，请耐心等待您的补贴款到账吧，预计需要7-15个工作日哦~ 龙儿偷偷告诉你：到账后会有消息提醒，希望您能打开消息提醒哦~
								</view>
							</view>
						</template>
					</u-time-line-item>
					<u-time-line-item nodeTop="7" >
						<template v-slot:node>
							<view class="u-node">
								<view class="circle" :style="{'backgroundColor':subsidy_detail.status>1?'':'rgba(229, 229, 229, 1)'}">
									<view class="circle_heart">
					
									</view>
								</view>
							</view>
						</template>
						<template v-slot:content>
							<view>
								<view class="u-order-title">
									<view class="status" style="color:rgba(212, 48, 48, 1)">
										审核失败
									</view>
								</view>
								<view class="u-order-desc" style="padding-bottom: 0;">
									很遗憾，您的资料未通过审核，请您重新递交资料。如有疑问，请<view style="color: rgba(48, 153, 116, 1);display:inline;margin: 0 5rpx;">联系客服</view>
								</view>
							</view>
						</template>
					</u-time-line-item>
				</u-time-line>
			</view>
			<u-empty v-else mode="list" text="暂无数据"></u-empty>
		</view>
		<view class="btn_group" v-if="!show">
			<view class="button" style="border: rgba(48, 153, 116, 1) solid 1rpx;">
				重新上传
			</view>
			<view class="button" @click="cancel">
				取消申请
			</view>
			<view class="button">
				失败原因
			</view>
		</view>
		<view class="btn" v-if="!show">
			去补贴钱包
		</view>
	</view>
</template>

<script>
	import url from '@api/subsidy'
	export default {
		data() {
			return {
				subsidy_detail: {},
				show:true
			};
		},
		onLoad() {
			this.getSubsidyDetail()
		},
		methods: {
			cancel(){
				this.$axios({
					url: url.subsidy_cancel
				}).then(res => {
					uni.showToast({
						title:res.msg
					})
				},res=>{
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
				})
			},
			getSubsidyDetail() {
				this.$axios({
					url: url.subsidy_detail
				}).then(res => {
					if (res.code == 1) {
						if(res.data.data.length){
							this.show=true
						}
						this.subsidy_detail = res.data.data
					}
				})
			},
			back() {
				uni.navigateBack({})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.imgGroup {
		margin: 20rpx 26rpx 60rpx 26rpx;
	}

	.circle {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(48, 153, 116, 1);

		.circle_heart {
			width: 20rpx;
			height: 20rpx;
			border-radius: 50%;
			background-color: white;
		}
	}

	.log {
		margin: auto;
		// margin-top: 32rpx;
		// width: 654rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		padding: 0rpx 46rpx 0rpx 16rpx;

		.label {
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 800;
			color: #333333;
			padding-bottom: 32rpx;
		}

		.time_line_box {
			padding: 0 16rpx;

			.u-order-title {
				display: flex;
			}

			.status {
				font-size: 38rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: rgba(0, 0, 0, 1);
			}

			.time {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				line-height: 17px;
				color: #41AE37;
				display: flex;
				align-items: center;
				padding-left: 16rpx;
			}

			.u-order-desc {
				padding-top: 8rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular;
				color: #6D7278;
				display: inline;
				padding-bottom: 46rpx;
			}

			.none {
				// &:not(:first-child) {
				// 	.status {
				// 		color: #CCCCCC !important;
				// 	}

				// 	.time {
				// 		color: #CCCCCC !important;
				// 	}

				// 	.u-order-desc {
				// 		color: #CCCCCC !important;
				// 	}
				// }

				&:last-child {
					::v-deep .u-time-axis {
						&::before {
							border: 0;
						}
					}

				}


				/deep/ .u-time-axis {
					// padding-bottom: 32rpx;
				}
			}

			/deep/ .u-time-axis-item {
				margin-bottom: 0;
			}

		}

		.icon {
			width: 22rpx;
			height: 22rpx;
			background: #D8D8D8;
			border-radius: 50%;
		}
	}

	.btn_group {
		display: flex;
		flex-direction: row;
		padding: 10rpx 0 0 74rpx;

		.button {
			margin-right: 36rpx;
			width: 144rpx;
			height: 60rpx;
			color: rgba(80, 80, 80, 1);
			background-color: rgba(255, 255, 255, 1);
			border-radius: 10rpx;
			font-size: 24rpx;
			border: rgba(166, 166, 166, 1) solid 2rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.btn {
		width: 614rpx;
		height: 96rpx;
		margin: auto;
		margin-top: 72rpx;
		margin-bottom: 10rpx;
		color: rgba(255, 255, 255, 1);
		background-color: rgba(65, 171, 133, 1);
		border-radius: 50rpx;
		font-size: 32rpx;
		font-weight: bold;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.green{
		/deep/ .u-time-axis-item {
			&::after {
				content: " ";
				position: absolute;
				left: -40rpx;
				top: 5px;
				width: 2rpx;
				bottom: 0;
				border-left: 2rpx solid rgba(48, 153, 116, 1);
				-webkit-transform-origin: 0 0;
				transform-origin: 0 0;
				-webkit-transform: scaleX(0.5);
				transform: scaleX(0.5);
			}
		}
	}
	.no{
		/deep/ .u-time-axis-item {
			&::after {
				content: " ";
				position: absolute;
				left: -40rpx;
				top: 5px;
				width: 2rpx;
				bottom: 0;
				border-left: 2rpx solid rgba(229, 229, 229, 1);
				-webkit-transform-origin: 0 0;
				transform-origin: 0 0;
				-webkit-transform: scaleX(0.5);
				transform: scaleX(0.5);
			}
		}
	}
	
	/deep/ .u-time-axis {
		&::before {
			border: 0;
		}
	}
</style>
