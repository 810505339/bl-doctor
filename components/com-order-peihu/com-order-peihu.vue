<template>
	<view class="com-order-peihu-con">
		<movable-area>
			<!-- bindtouchend="bindtouchend"	bindchange='bindchange'     -->
			<movable-view direction="horizontal" :out-of-bounds="false" :friction='10' inertia :x='transfrom'
				:damping='40' :disabled='disabledMove' @change='bindchange' @touchend='bindtouchend'>
				<view class="movable-view-item" style="">
					<view class="com-order-peihu">
						<view class="flex justify-between align-items">
							<view class="flex align-items">
								<image src="" mode="" class="logo"></image>
								<text class="name">{{item.patient.name}}</text>
							</view>
							<view class="order-status flex align-items">
								待支付 <u-count-down :time="30 * 60 * 60 * 1000" format="HH:mm:ss"></u-count-down>
							</view>
						</view>
						<view class="flex align-items colorFont">
							<text class="time">时间</text>
							<text>{{item.created_at}}</text>
						</view>
						<view class="flex align-items colorFont">
							<text class="address">医院</text>
							<text>{{item.hospital.title}}</text>
						</view>
						<view class="button-list flex flex-end">
							<view class="default">删除订单</view>
							{{item.order_status}}{{item.pay_status}}
							<!-- <view class="default">客服介入</view> -->
							<view class="default button-checkout">去支付</view>
							<view class="default button-checkout">再次服务</view>
						</view>
					</view>
					<view class="flex align-items center delete" style="">
						删除
					</view>
				</view>
			</movable-view>
		</movable-area>
	</view>

</template>

<script>
	export default {
		name: "com-order-peihu",
		props:['item'],
		data() {
			return {
				disabledMove: false, //是否禁用滑动事件
				transfrom: 0, //移动的距离
				detail: null, //移动的数据
			};
		},
		methods: {
			bindchange(e) {
				this.detail = e.detail
			},
			bindtouchend(e) {
				let {
					detail,
				} = this
				let x = detail.x
				let transx = 0;
				if (!detail) {
					return
				}
				if (x < -50) {
					transx = -1000
				} else {
					transx = -0
				}
				this.transfrom = 1
				this.$nextTick(function() {
					this.transfrom = transx
				})
			},
		}
	}
</script>

<style lang="scss">
	movable-area {
		width: 700rpx;
		margin: 0 auto;
		height: 100%;
	}

	movable-view {
		width: 100%;
		height: 100%;
		width: 892rpx;
	}

	.flex {
		display: flex;
	}

	.align-items {
		align-items: center;
	}

	.justify-between {
		justify-content: space-between;
	}

	.center {
		justify-content: center;
	}

	.flex-end {
		justify-content: flex-end;
	}

	.movable-view-item {
		width: 100%;
		height: 100%;
		display: flex;
	}

	.com-order-peihu-con {
		width: 700rpx;
		height: 330rpx;
		overflow: hidden;
		margin: 0 auto;
		margin-bottom: 20rpx;
	}

	.com-order-peihu {
		width: 700rpx;
		height: 330rpx;
		padding: 26rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		color: rgba(80, 80, 80, 1);
		background-color: rgba(255, 255, 255, 1);
		border-radius: 12px;

		view,
		text {
			line-height: 1;
		}



		.logo {
			width: 50rpx;
			height: 50rpx;
			background-color: pink;
			border-radius: 50%;
			margin-right: 24rpx;
		}

		.name {
			color: rgba(80, 80, 80, 1);
			font-size: 30rpx;
			font-weight: bold;
			max-width: 300rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.order-status {
			color: rgba(65, 171, 133, 1);
			font-size: 30rpx;
			font-weight: bold;
		}

		/deep/.u-count-down__text {
			color: rgba(65, 171, 133, 1);
			font-size: 30rpx;
			font-weight: bold;
		}

		.colorFont {
			color: rgba(56, 56, 56, 1);
			font-size: 30rpx;
			font-weight: bold;
		}

		.time,
		.address {
			color: rgba(128, 128, 128, 1);
			font-size: 30rpx;
			flex: 0 0 80rpx;
		}

		.button-list {
			.default {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 280rpx;
				height: 60rpx;
				color: rgba(80, 80, 80, 1);
				border-radius: 32rpx;
				font-size: 30rpx;
				border: rgba(229, 229, 229, 1) solid 1rpx;
				box-sizing: border-box;
				margin-left: 24rpx;
			}
		}

		.button-checkout {
			background-color: rgba(65, 171, 133, 1);
			color: white !important;
		}

	}

	.delete {
		width: 172rpx;
		height: 100%;
		margin-left: 20rpx;
		color: rgba(255, 255, 255, 1);
		background-color: rgba(212, 48, 48, 1);
		font-size: 17px;
		text-align: center;
		font-weight: bold;
	}
</style>
