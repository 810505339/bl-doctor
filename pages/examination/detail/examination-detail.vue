<template>
  <view>
    <image :src="info.img_url" class="img"></image>
    <view class="content">
      <view class="content-card">
        <view class="content-card-title">{{info.title}}</view>
        <view class="content-card-hospital">{{info.showHospital}}</view>
        <view class="content-card-bottom">
          <view class="content-card-bottom-price">
            <view class="content-card-bottom-price-lable">参考价格</view>
            <view class="content-card-bottom-price-value">￥{{info.price}}</view>
          </view>
          <view class="content-card-bottom-reserve">已预约{{info.reserve_number}}人</view>
        </view>
      </view>
      <view class="content-del">
        <view class="content-del-title">详情</view>
        <view v-html="info.content" class="content-del-info"></view>
      </view>
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
					url: `/api/users/physical_exam/physical_exam_detail?id=${this.id}`
				})
        let showHospital = ''
        data.data.type.hospital.forEach(item => {
          showHospital += `${item.hospital.title}、`
        });
        this.info = {...data.data,showHospital:showHospital.slice(0,-1)}
        // console.log(data.data)
        // this.info = data.article
			}
		}
	}
</script>

<style lang="scss" scoped>
.img{
  width: 100%;
  height: 648rpx;
  display: block;
}
.content{
  margin-top: 96rpx;
  padding: 0 20rpx 0 22rpx;
  &-card{
    padding: 24rpx;
    background: #ffffff;
    &-title{
      color: rgba(80, 80, 80, 1);
	    font-size: 32rpx;
	    line-height: 72rpx;
	    font-weight: bold;
    }
    &-hospital{
      margin-top: 8rpx;
      color: rgba(128, 128, 128, 1);
	    font-size: 24rpx;
	    line-height: 54rpx;
    }
    &-bottom{
      display: flex;
      justify-content: space-between;
      &-price{
        display: flex;
        color: rgba(56, 56, 56, 1);
        font-size: 28rpx;
        font-weight: bold;
        &-lable{
          line-height: 54rpx;
          margin-right: 30rpx;
        }
        &-value{
          color: rgba(255, 87, 51, 1);
          font-size: 36rpx;
        }
      }
      &-reserve{
        color: rgba(166, 166, 166, 1);
        font-size: 28rpx;
        line-height: 63rpx;
      }
    }
  }
  &-del{
    margin-top: 20rpx;
    color: #ffffff;
    &-title{
      color: rgba(80, 80, 80, 1);
      font-size: 32rpx;
      line-height: 76rpx;
      font-weight: bold;
    }
    &-info{
      margin-top: 24rpx;
      color: rgba(80, 80, 80, 1);
      font-size: 28rpx;      
    }
  }
}
</style>
