<template>
  <view>
    <u-list
        @scrolltolower="scrolltolower"

    >
      <u-list-item
          v-for="(needle, index) in needleList"
          :key="index"
      >
        <view class="need-item-wrap">
          <view class="need-header">
            <view class="title">{{needle.title}}</view>
            <view class="sub">{{needle.desc}}</view>
          </view>
          <view class="content">
            <u-cell-group :border="false" v-show="needle.list.length>0">
              <u-cell
                  :title="item.title"
                  isLink
                  :url="`/pages/medical/needle-details?id=${item.id}`"
                  :border="false"
                  v-for="item in needle.list"
                  :key="item.id"
              />
            </u-cell-group>
            <view v-show="needle.list.length<=0" class="no-more">
              暂无更多
            </view>
          </view>
        </view>

      </u-list-item>
      <view v-show="!loading&&finish">
        <view   class="loading" >
          暂无更多
        </view>
      </view>
      <view class="loading" v-show='loading'>
        <u-loading-icon  mode="circle" text="加载中..."/>
      </view>
    </u-list>
  </view>
</template>

<script>
import url from "@/api/medical";

export default {
  name: "find-needle",
  data() {
    return {
      needleList: [],
      loading:false,
      finish:false,
      page:0
    }
  },
  methods: {
    async getNeedleType() {
      this.page = this.page + 1;
      this.loading = true;
      this.finish = false;
      const {data} = await this.$axios({url: url.needleType,data:{page:this.page}})
      this.needleList = [...this.needleList,...data?.list?.data]
      console.log( data?.list?.total)
      this.loading = false;
      if (this.needleList.length >= data?.list?.total) {
        this.finish = true
      }
    },
    scrolltolower(){
      if(!this.finish&&!this.loading)
      {
        this.getNeedleType()
      }
    }

  },
  created() {
    this.getNeedleType()
  }
}
</script>

<style scoped lang="scss">

.need-item-wrap{
  background: #FFFFFF;
  margin: 24rpx 18rpx;
  padding: 18rpx 24rpx;
  border-radius: 20rpx;
  position: relative;
  .title{
    color:#505050;
    font-weight: bold;
    font-size: 34rpx;
    position: relative;
    display: inline-block;
    &:before{
      content: '';
      background-color: rgba(65, 171, 133, 0.3);
      height: 6rpx;
      width: 100%;
      border-radius: 16rpx;
      position: absolute;
      z-index: 10;
      bottom: 0;
    }
  }
  /deep/.u-cell__body{
    padding: 15px 0;
  }
  .sub{
    color:#a6a6a6;
    font-size: 26rpx;
    margin: 10rpx 0;
  }
  .content{
    min-height: 400rpx;
  }
  .no-more{

    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 10;
    color:#a6a6a6;
  }
}.loading{
   font-size: 26rpx;
   text-align: center;
   line-height: 50px;
 }
</style>