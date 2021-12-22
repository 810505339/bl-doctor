<template>
  <view>
    <cu-custom class="text-bold" :isBack="true" bgcolor="#f3f4f8">
      <block slot="content">选择被服务的人</block>
    </cu-custom>
    <uni-list>
      <uni-list-item v-for="(item,index) in list" :title="item.name" :key="index" :note="`${item.gender_type}` + `${item.age}` + '岁'" link thumb-size="lg" @click="goBack(item)">
        <template slot="header">
          <view :class="{header_icon: item.relation_type==='本人', no_header_icon: item.relation_type!=='本人'}">{{item.relation_type.slice(0,1)}}</view>
        </template>
        <template slot="body">
          <view class="body_text">
            <view class="info_title">
              <text>{{item.name}}</text>
              <text>{{item.relation_type}}</text>
            </view>
            <view class="info_footer">
              <text>{{item.gender_type}}</text>
              <text class="age">{{item.age}}岁</text>
            </view>
          </view>
        </template>
      </uni-list-item>
    </uni-list>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.getInfoList()
		},

		methods:{
			async getInfoList() {
				const {data} = await this.$axios({
					url: '/api/users/patient/index'
				})
				this.list = data.arr
			},
			goBack(item) {
        uni.navigateTo({ url: `/pages/examination/report/report/report?patient_id=${item.id}` });
			},
			leftClick() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header_icon{
		width: 70rpx;
		height: 70rpx;
		background-color: rgba(65, 171, 133, 1);
		border-radius: 36rpx;
		text-align: center;
		line-height: 70rpx;
		color: #FFFFFF;
		font-size: 28rpx;
	}
	.no_header_icon{
		width: 70rpx;
		height: 70rpx;
		background-color: rgba(42, 130, 228, 1);
		border-radius: 36rpx;
		text-align: center;
		line-height: 70rpx;
		color: #FFFFFF;
		font-size: 28rpx;
	}
	.body_text{
		margin-left: 10rpx;
		.info_title{
			font-size: 32rpx;
			color: rgba(80, 80, 80, 1);
			font-weight: bold;
			line-height: 52rpx;
			text:nth-child(2) {
				width: 62rpx;
				height: 36rpx;
				font-size: 24rpx;
				color: #FFFFFF;
				background-color: rgba(176, 203, 233, 1);
				border-radius: 12rpx;
				padding: 5rpx;
				margin-left: 16rpx;
				font-weight: normal;
			}
		}
		.info_footer{
			font-size: 24rpx;
			color: rgba(166, 166, 166, 1);
			.age{
				margin-left: 10rpx;
			}
		}
	}
	::v-deep .uni-list-item__container{
		align-items: center;
	}
	::v-deep .uni-list-item{
		height: 180rpx;
	}
</style>
