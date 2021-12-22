<template>
  <view class="escort_tab">
    <view class="escort_one" v-for="(item, index) in msgList" :key="index">
      <view :class="{user_point: true, second_point: index===1, three_point: index===2}"></view>
      <view class="doc_point">
        <uni-list>
          <uni-list-item :title="item.title" :note="item.note" link @click.passive="goItem(item)"></uni-list-item>
        </uni-list>
      </view>
    </view>
    <slot></slot>
  </view>
</template>

<script>
	export default {
		props: ['msgList'],
		methods: {
			goItem(item) {
				if(item.cb) return item.cb()
				if(item.to) {
					uni.navigateTo({
						url: item.to
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.escort_one{
		display: flex;
		align-items: center;
		border-bottom: 1px solid #e5e5e5;
		border-radius: 12rpx;
		background-color: #FFFFFF;
		padding-left: 20rpx;
		.user_point{
			width: 20rpx;
			height: 20rpx;
			background-color: #41ab85;
			border-radius: 12rpx;
		}
		.doc_point{
			width: 100%;
		}
		.second_point{
			width: 20rpx;
			height: 20rpx;
			background-color: #229eef;
			border-radius: 12rpx;
		}
		.three_point{
			width: 20rpx;
			height: 20rpx;
			background-color: #ff8d1a;
			border-radius: 12rpx;
		}
	}
</style>
