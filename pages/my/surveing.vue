<template>
	<view>
		<div class="box">
			<div class="question">使用过程中，哪些功能让您觉得很赞（多选）</div>
			<view class="uni-list">
				<div class="options" v-for="(item,index) in items" :key=index @click="changeFlag(index)">
					 <radio style="transform:scale(0.7)" :value="item.value" :checked="item.checked" />
					<div>{{item.name}}</div>
				</div>
			</view>
		</div>
		<div class="continue">继续</div>
	</view>
</template>

<script>
	export default {
		data() { 
			return {
				items: [{
						value: 'USA',
						name: '陪护功能',
						checked: false
					},
					{
						value: 'CHN',
						name: '陪诊功能',
						checked: false
					},
					{
						value: 'BRA',
						name: '挂号功能',
						checked: false
					},
					{
						value: 'JPN',
						name: '体检功能',
						checked: false
					},
					{
						value: 'ENG',
						name: '电子病历功能',
						checked: false
					},
					{
						value: 'FRA',
						name: '都不方便',
						checked: false
					}
				]
			}
		},
		methods: {
			changeFlag(index){
				this.items[index].checked=!this.items[index].checked
			}
		}
	}
</script>

<style>
	.box{
		padding: 20rpx 30rpx;
	}
	.question{
		height: 48rpx;
		margin-left: 20rpx;
		color: rgba(80, 80, 80, 1);
		font-size: 32rpx;
		line-height: 48rpx;
		text-align: left;
		font-weight: bold;
	}
	.options{
		margin-top: 20rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		min-height: 56rpx;
		font-size: 32rpx;
	}
	.uni-list{
		background-color: transparent;
	}
	.uni-list::before{
		height: 0;
	}
	.uni-list::after{
		height: 0;
	}
	.continue{
		width: 84%;
		height: 96rpx;
		position: absolute;
		left: 7%;
		bottom: 50rpx;
		color: rgba(255, 255, 255, 1);
		background-color: rgba(65, 171, 133, 1);
		border-radius: 50rpx;
		font-size: 32rpx;
		line-height: 48rpx;
		display: flex;
		text-align: center;
		font-weight: bold;	
		justify-content: center;
		align-items: center;
	}
</style>
