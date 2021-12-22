<template>
  <view>
    <cu-custom class="text-bold" :isBack="true" bgcolor="#f3f4f8">
      <block slot="content">详情</block>
    </cu-custom>
    <view class="content">
      <view class="content-title">{{info.title}}</view>
      <image :src="info.img_url" class="content-img"></image>
      <view v-html="info.content" class="content-del"></view>
    </view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
        id:'',
				info: {}
			}
		},
    mounted(){
      this.id = this.$route.query.id
      this.getData()
    },

		methods:{
			async getData() {
				const {data} = await this.$axios({
					url: `/api/index/article_detail?id=${this.id}`
				})
        this.info = data.article
			}
		}
	}
</script>

<style lang="scss" scoped>
.content{
  margin-top: 6rpx;
  padding: 0 20rpx 0 22rpx;
  &-title{
    color: rgba(80, 80, 80, 1);
    font-size: 36rpx;
    line-height: 90rpx;
    font-weight: bold;
  }
  &-img{
    width: 100%;
    height: 298rpx;
    display: block;
  }
  &-del{
    margin-top: 36rpx;
    	color: rgba(80, 80, 80, 1);
      font-size: 28rpx;
      line-height: 150%;
  }
}
</style>
