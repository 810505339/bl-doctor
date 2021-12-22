<template>
	<view class="set-page">
		<view class="u-demo-block">
			<u-scroll-list>
				<view class="scroll-list">
					<view
						class="scroll-list__line"
						v-for="(item, index) in menuArr"
						:key="index"
					>
						<view
							class="scroll-list__line__item"
							v-for="(item1, index1) in item"
							:key="index1"
							@click="toDetail(item1.path)"
							:class="[(index1 === item.length - 1) && 'scroll-list__line__item--no-margin-right']"
						>
							<image
								class="scroll-list__line__item__image"
								:src="item1.icon"
								mode=""
							></image>
							<text class="scroll-list__line__item__text">{{ item1.name }}</text>
						</view>
					</view>
				</view>
			</u-scroll-list>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			menuArr: [
				[
					{
						name: '专家问诊',
						path:'/pages/zjwz/jswz/index',
						icon: require('@/static/home/nine.jpg')
					},
					{
						name: '预约挂号',
						icon: require('@/static/home/sevenTeen.jpg')
					}, 
					{
						name: '陪诊服务',
						icon: require('../../static/home/twoti.png'),
						path: '/pages/escort/escort-service/escort-service'
					}, 
					{
						name: '陪护服务',
						path: '/pages/accompany/accompany-service/accompany-service',
						icon: require('../../static/home/peihu.png')
					}, 
					{
						name: '“孝”文化',
						icon: require('../../static/home/xiao.png'),
						path: '/pages/mourning-culture/mourning-culture'
					},
					{
						name: '报告检查',
						icon: require('../../static/home/jiancha.png')
					}, 
					{
						name: '体检服务',
            path:'/pages/examination/index/index',
						icon: require('../../static/home/tijian.png')
					}
				],
				[
					{
						name: '就诊缴费',
						icon: require('../../static/home/jiaofei.png')
					}, 
					{
						name: '添加病历',
						icon: require('../../static/home/bingli.png'),
						path: '/pages/zjwz/jswz/upload-case'
					}, 
					{
						name: '查找医院',
						icon: require('../../static/home/yiyuan.png'),
						path: '/pages/hospital-service/hospital-service'
					}, 
					{
						name: '院内导航',
						icon: require('../../static/home/daohang.png')
					},
					{
						name: '白龙医典',
						icon: require('../../static/home/yidian.png'),
            path: '/pages/medical/index'
					},
					{
						name: '大病筹款',
						icon: require('../../static/home/dabing.png'),
						path: '/pages/fundraising/fundraising'
					}, 
					{
						name: '诊疗补贴',
						icon: require('../../static/home/butie.png'),
            path: '/pages/d_and_t-subsidy/d_and_t-subsidy'
					}
				]
			]
		}
	},
	methods: {
		toDetail(url) {
			uni.navigateTo({ url })
		}
	}
}
</script>

<style lang="scss" scoped>
.set-page{
  padding: 0 20rpx;
  background: #FFFFFF
}
.scroll-list {
	@include flex(column);

	&__goods-item {

		&__image {
			width: 60px;
			height: 60px;
			border-radius: 4px;
		}

		&__text {
			color: #f56c6c;
			text-align: center;
			font-size: 12px;
			margin-top: 5px;
		}
	}

	&__show-more {
		background-color: #fff0f0;
		border-radius: 3px;
		padding: 3px 6px;
		@include flex(column);
		align-items: center;

		&__text {
			font-size: 12px;
			width: 12px;
			color: #f56c6c;
			line-height: 16px;
		}
	}

	&__line {
		@include flex;
		margin-top: 10px;

		&__item {
			margin-right: 10px;

			&__image {
				width: 61px;
				height: 48px;
			}

			&__text {
				margin-top: 5px;
				color: $u-content-color;
				font-size: 12px;
				text-align: center;
			}

			&--no-margin-right {
				margin-right: 0;
			}
		}
	}
}
.scroll-list__line__item{
  display: flex;
  flex-direction: column;
	align-items: center;
	width: 125rpx;
}
.scroll-list__line__item__image{
	width: 66rpx;
	height: 66rpx;
}
.scroll-list__line__item__text{
	font-size: 12px;
}
</style>
