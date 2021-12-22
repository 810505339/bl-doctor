<template>
  <view>
    <u-navbar title="选择被服务的人" bg-color="#FFFFFF" :safeAreaInsetTop="true" rightText="新增" @leftClick="leftClick" @rightClick="rightClick">
      <u-icon slot="left" name="arrow-left"></u-icon>
    </u-navbar>
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
	import {createNamespacedHelpers} from 'vuex'
	const { mapMutations, mapState } = createNamespacedHelpers('escort-service')
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad(options) {
			Object.keys(options).forEach(key => {
				this.key = key
				this.index = options[key]
				// 设置一个参数 为了新增再返回来 做判断
				this.change_route({key, value: this.index})
			})

			this.getInfoList()
		},
		computed: {
			...mapState(['nav_list'])
		},
		methods:{
			...mapMutations(['change_nav_list', 'change_route']),
			async getInfoList() {
				const {data} = await this.$axios({
					url: '/api/users/patient/index'
				})
				this.list = data.arr
			},
			goBack(item) {
				const {id, name, mobile} = item
				const obj = {
					user_id: id,
					title: name,
					note: mobile
				}
				this.change_nav_list({key: this.key, index: this.index, value: obj})
				const back = this.nav_list[this.key][this.index].back
				const flag = this.nav_list[this.key][this.index].id
				uni.redirectTo({
					url: back +'?id=' + flag
				}) 
			},
			leftClick() {
				uni.navigateBack()
			},
			rightClick() {
				// 去新增页
				uni.navigateTo({
					url: '/pages/zjwz/jswz/add-patient'
				})
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
