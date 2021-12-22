<template>
  <view class="health-detail">
    <view class="title">
      {{data.title}}
    </view>
    <view>
      <u-parse :content="data.content"/>
    </view>
  </view>
</template>

<script>
import url from '@api/medical'
export default {
  name: "health-detail",
  data(){
    return{
      data:{}
    }
  },
  methods:{
    async getArticleDetail (id){
    const{data}=  await  this.$axios({url:url.articleDetail,data:{id}})
      this.data=data.article
      console.log(this.data)
    }
  },
  onLoad({id}){
    this.getArticleDetail(id)
  }
}
</script>

<style scoped lang="scss">

uni-page-body{
  background: #FFFFFF;
}
.health-detail{
  padding:10rpx;
}
.title{
  color:#505050;
  font-size: 38rpx;
  font-weight: bold;
  letter-spacing:1px;
  line-height:44rpx;
  padding-bottom: 10rpx;

}

</style>