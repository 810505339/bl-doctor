<template>
<view class="classification-add-wrap">
  <view class="header">
    <view class="tag"></view>
    添加商品分类
  </view>
  <view class="wrap">
    <view >商品名称</view>
    <view class="input-wrap"><u--input class="input" v-model="classify_name"/></view>
  </view>
  <view>
    <u-button  @click="submit" class="sub-btn">提交</u-button>
  </view>
</view>
</template>

<script>
import { url} from '@/api/funeral'

export default {
  name: "classification-add",
  data(){
    return{
      classify_name:''
    }
  },
  methods:{
   async addApi(){
     const {data,code}=await this.$axios({url:url.add_shop_classify,data:{classify_name:this.classify_name},method:'post'})
      if(code===1)
      {
        uni.navigateTo({
          url: '/pages/funeral/classification'
        })
      }

    },
    submit(){
      this.addApi()
    }
  }
}
</script>

<style scoped lang="scss">
.classification-add-wrap{
  .header{
    padding: 10px;
    position: relative;
    .tag{
      position: absolute;
      left: 10rpx;
      background: #2a82e4;
      height: 30rpx;
      width: 4rpx;
      top:50%;
      transform: translateY(-50%);
    }
  }
  .wrap{
    display: flex;
    align-items: center;

    background: #FFFFFF;
    padding: 20rpx;
    .input-wrap{
      width: 60vw;
      margin-left: 50rpx;
      /deep/ .u-input{
        height: 30rpx;
      }

    }
    .input{
      width: 100%;
    }

  }
  .sub-btn{
    background: #41ab85;
    color:#FFFFFF;
    border-radius: 50rpx;
    margin:40rpx 20rpx ;
  }
}

</style>