<template>
  <view class="wrap">
    <view class="header-wrap">
      <view class="title">{{drug.title}}</view>
      <view class="sub">{{drug.desc}}</view>
    </view>
    <view>
      <u-parse :content="drug.content"/>
    </view>
  </view>
</template>

<script>
import url from '@/api/medical'

export default {
  name: "drugs-details",
  data(){
    return{
      drug:{}
    }
  },
  methods: {
    async getDrugDetail(id) {
      const {data} =await this.$axios({url: url.drugDetail, data: {id}})
      this.drug=data?.drug
      console.log(data.drug)
    }
  },
  onLoad({id}) {
    this.getDrugDetail(id)
  }
}
</script>

<style scoped lang="scss">
.wrap {

  padding-left: 32rpx;
  background: #FFFFFF;
  min-height: calc(100vh - 44px);
  .header-wrap{
    padding: 28rpx;
    border-bottom: 1rpx solid #d6d7d9;
  }

  .title {
    color: #505050;
    font-size: 34rpx;
    font-weight: bold;
  }

  .sub {
    margin-top: 10rpx;
    color: #a6a6a6;
    font-size: 26rpx;
  }
}


</style>