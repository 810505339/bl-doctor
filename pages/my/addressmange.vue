<template>
	<view style="padding-top: 20rpx;">
		<scroll-view scroll-y="true" style="height: 1060rpx;">
			<view>
				<div class="block" v-for="(item,index) in addressList">
					<div class="about-address" >
						<span class="default" v-if="item.default">默认</span>
						<span class="city-address">{{item.province}}&ensp;{{item.city}}</span>
					</div>
					<div class="middle-block">
						<div class="details-address">{{item.address}}</div>
							<image class="edit" src="./asset/edit.svg"></image>
					</div>
					<div class="people">
						<div class="name">{{item.name}}</div>   
						<div class="phone">{{item.phone}}</div>
					</div>
				</div>
			</view>
		</scroll-view>
		<div class="add">
			<image class="add-image" src="./asset/add.svg"></image>
			<span>新建地址</span>
		</div>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressList:[
					{
						"default":true,
						"province":"黑龙江省",
						"city":"哈尔滨市",
						"address":"学院路街道 幸福家园小区蓝月a栋4单元602",
						"name":"于珠珠",
						"phone":"17604536542"
					},
					{
						"default":false,
						"province":"黑龙江省",
						"city":"哈尔滨市",
						"address":"学院路街道 幸福家园小区蓝月a栋4单元602",
						"name":"于珠珠",
						"phone":"17604536542"
					},
					{
						"default":false,
						"province":"黑龙江省",
						"city":"哈尔滨市",
						"address":"学院路街道 幸福家园小区蓝月a栋4单元602",
						"name":"于珠珠",
						"phone":"17604536542"
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.block{
		margin: 0 auto;
		margin-bottom:20rpx;
		padding: 20rpx 26rpx;
		width: 634rpx;
		height: 200rpx;
		background-color: rgb(255,255,255,1);
	}
	.about-address{
		align-items: center;
	}
	.default{
		width: 74rpx;
		height: 40rpx;
		margin-top: 6rpx;
		margin-right: 20rpx;
		color: rgba(255, 255, 255, 1);
		background-color: rgba(65, 171, 133, 1);
		border-radius: 10rpx;
		font-size: 24rpx;
		line-height: 150%;
		text-align: center;
		display: block;
		float: left;
	}
	.city-address{
		height: 40rpx;
		color: rgba(128, 128, 128, 1);
		font-size: 28rpx;
		line-height: 40rpx;
		text-align: left;
		align-items: center;
	}
	.middle-block{
		display: flex;
		align-items: flex-start;
		text-align: center;
		align-items: center;
		/* justify-content: center; */
	}
	.details-address{
		width: 542rpx;
		height: 96rpx;
		color: rgba(80, 80, 80, 1);
		font-size: 32rpx;
		line-height: 150%;
		text-align: left;
		font-weight: bold;
	}
	.edit{
		margin-left: 40rpx;
		width: 36rpx;
		height: 36rpx;
	}
	.people{
		height: 42rpx;
		font-size: 28rpx;
		line-height: 150%;
		display: flex;
	}
	.name{
		width: 100rpx;
		color: rgba(128, 128, 128, 1);
		text-align: left;
	}
	.phone{
		width: 184rpx;
		color: rgba(128, 128, 128, 1);
		text-align: left;
	}
	.add{
		position: absolute;
		left: 5%;
		width: 90%;
		height: 96rpx;
		bottom: 46rpx;
		color: rgba(255, 255, 255, 1);
		background-color: rgba(65, 171, 133, 1);
		border-radius: 50rpx;
		font-size: 32rpx;
		line-height: 96rpx;
		font-weight: bold;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.add-image{
		width: 50rpx;
		height: 50rpx;
	}
	
</style>
