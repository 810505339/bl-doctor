<template>
	<view class="com-order-binzhang-con" :style="{height:getHeight}">
		<movable-area>
			<movable-view direction="horizontal" :out-of-bounds="false" :friction='10' inertia :x='transfrom'
				:damping='40' :disabled='disabledMove' @change='bindchange' @touchend='bindtouchend'>
				<view class=" movable-view-item" style="">
					<view class="com-order-binzhang" :style="{height:getHeight}">
						<view class="flex justify-between align-items">
							<view class="flex align-items">
								<image src="" mode="" class="logo"></image>
								<text class="name">福祥寿衣店福祥寿</text>
								<u-icon name="arrow-right" size="18"></u-icon>
							</view>
							<view class="order-status">
								待送达{{getHeight}}
							</view>
						</view>
						<!-- 如果商品数量为1 -->
						<!-- 	<view class="flex align-items ">
							<view class="flex  align-items">
								<image src="" mode="" class="shop-photo marginRight24"></image>
								<text class="shop-text">纸牛【出殡专用】一堆寓意孝心一堆寓意孝心一堆寓意孝心</text>
							</view>
							<view class="shop-price">
								<view class="shop-price-one">￥720</view>
								<view class="shop-price-t">共1件</view>
							</view>
						</view> -->
						<!-- 如果商品数量大于1 -->
						<view class="flex align-items ">
							<view class="scroll-view" scroll-x='true' style=" touch-action: none;">
								<view class="flex  align-items acolumn item marginRight24">
									<image src="" mode="" class="shop-photo"></image>
									<text class="shop-text2">纸牛【出殡专用】一堆寓意孝心一堆寓意孝心一堆寓意孝心</text>
								</view>
								<view class="flex  align-items acolumn item marginRight24">
									<image src="" mode="" class="shop-photo"></image>
									<text class="shop-text2">纸牛【出殡专用】一堆寓意孝心一堆寓意孝心一堆寓意孝心</text>
								</view>
								<view class="flex  align-items acolumn item marginRight24">
									<image src="" mode="" class="shop-photo"></image>
									<text class="shop-text2">纸牛【出殡专用】一堆寓意孝心一堆寓意孝心一堆寓意孝心</text>
								</view>

							</view>

							<view class="shop-price">
								<view class="shop-price-one">￥720</view>
								<view class="shop-price-t">共1件</view>
							</view>
						</view>


						<view class="button-list flex flex-end">
							<view class="default">删除订单</view>
							<view class="default button-checkout">已完成</view>
							<view class="default button-checkout">再次购买</view>
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
		name: "com-order-binzhang",
		props: {
			// item: {
			// 	type: Object,
			// 	default: {
			// 		list: [1, 2]
			// 	}
			// ,
			// required: true,
			// validator: function(value) {
			// 	return value >= 0
			// }
			// }
		},
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
		},
		computed: {
			getHeight() {
				// this.item.list > 1 ? '440rpx' : '380rpx'
				return '440rpx' //this.item.list > 1 ? '440rpx' : '380rpx'
			}
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

	.acolumn {
		flex-direction: column;

	}

	.center {
		justify-content: center;
	}

	.justify-between {
		justify-content: space-between;
	}

	.flex-end {
		justify-content: flex-end;
	}

	.movable-view-item {
		width: 100%;
		height: 100%;
		display: flex;
	}

	.com-order-binzhang-con {
		width: 700rpx;
		overflow: hidden;
		margin: 0 auto;
		margin-bottom: 20rpx;
	}

	.com-order-binzhang {
		width: 700rpx;
		flex: 0 0 700rpx;
		padding: 20rpx 26rpx 34rpx;
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
			width: 72rpx;
			height: 72rpx;
			background-color: pink;
			margin-right: 18rpx;
		}

		.name {
			color: rgba(80, 80, 80, 1);
			font-size: 30rpx;
			font-weight: bold;
			max-width: 400rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.order-status {
			font-size: 30rpx;
			font-weight: bold;
			color: rgba(128, 128, 128, 1);

		}

		.scroll-view {
			width: 530rpx;
			white-space: nowrap;

			.item {
				display: inline-block;
				width: 156rpx;

			}
		}

		.shop-photo {
			width: 156rpx;
			height: 136rpx;
			background-color: pink;
			margin-bottom: 16rpx;
			display: block;
		}

		.shop-text {
			width: 300rpx;
			line-height: 44rpx;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
			color: rgba(80, 80, 80, 1);
			font-size: 30rpx;
		}

		.shop-text2 {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size: 30rpx;
			line-height: 44rpx;
			display: block;
			width: 156rpx;
			color: rgba(80, 80, 80, 1);
		}

		.shop-price {
			flex: 1;
			text-align: right;

			.shop-price-one {
				color: rgba(80, 80, 80, 1);
				font-size: 30rpx;
				font-weight: bold;
				line-height: 44rpx;
			}

			.shop-price-t {
				color: rgba(80, 80, 80, 1);
				font-size: 26rpx;
			}
		}



		.button-list {
			.default {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 166rpx;
				height: 60rpx;
				color: rgba(80, 80, 80, 1);
				border-radius: 32rpx;
				font-size: 30rpx;
				border: rgba(229, 229, 229, 1) solid 1rpx;
				box-sizing: border-box;
				margin-left: 22rpx;
			}
		}

		.button-checkout {
			background-color: rgba(128, 128, 128, 1);
			color: white !important;
		}

		.marginRight24 {
			margin-right: 24rpx;
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
