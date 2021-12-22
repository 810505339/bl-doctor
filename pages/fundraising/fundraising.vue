<template>
  <view class="fundraising">
    <image class="img" src="../../static/home/banner.jpg"></image>
    <view class="phote">
      <view class="phote_item" v-for="item in list" :key="item.id">
        <image :src="item.img_url"></image>
        <view>{{item.title}}</view>
      </view>
      <view class="phote_item phote_item_end">
        <view>更多平台敬请期待</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await this.$axios({
        url: '/api/hospital/raise_money'
      })
      this.list = res.data.list
    }
  }
}
</script>


<style lang="scss" scoped>
.fundraising{
  height: 100%;
}
.img{
  width: 750rpx;
  height: 300rpx;
}
.phote{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 156rpx;
  margin: 0 20rpx;
  .phote_item{
    height: 100%;
    margin-top: 20rpx;
    padding: 0 0 0 10rpx;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 345rpx;
    box-sizing: border-box;
    border-radius: 12rpx;
    image{
      width: 114rpx;
      height: 114rpx;
    }
    view{
      flex: 1;
      text-align: center;
      color: #383838;
      font-weight: bold;
      font-size: 32rpx;
    }
  }
  .phote_item_end{
    view{
      color: #a6a6a6;
      font-weight: normal;
    }
  }
}
</style>