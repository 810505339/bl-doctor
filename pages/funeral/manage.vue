<template>
 <view>
   <u-navbar
       :placeholder="true"
       :safeAreaInsetTop="true"
   >
     <view slot="left" class="nav-left">
       <text class="text">
         管理
       </text>
       <view class="sub">
         <u-badge :isDot="true" type="success"/>
         <view>
           手动接单中
         </view>
       </view>
     </view>
   </u-navbar>
   <view class="nav-list">

     <view v-for="item in list" :key="item.text" class="nav-item">
       <view class="img-wrap" :style="{background:item.bg}">
         <u-icon  size="30" :name="item.icon"/>
       </view>
       <view class="nav-text">
         {{item.text}}
       </view>
     </view>
   </view>
   <view class="management-wrap">
     <view class="header">
       <view class="title">经营数据</view>
       <view>详情</view>
     </view>
     <view class="context">
       <view></view>
       <view></view>
       <view></view>
     </view>
   </view>
 </view>
</template>

<script>
import {url} from '@/api/funeral'
export default {
  name: "manage",
  data() {
    return {
      list: [
        {
          text: '订单管理',
          bg: '#2a82e4',
          icon: require('@/static/funeral/dd.svg')
        },
        {
          text: '商品管理',
          bg: '#41ab85',
          icon: require('@/static/funeral/sp.svg')
        },
        {
          text: '顾客管理',
          bg: '#ff8d1a',
          icon: require('@/static/funeral/gk.svg')
        },
        {
          text: '财务对账',
          bg: '#00baad',
          icon: require('@/static/funeral/cw.svg')
        },
      ]
    }
  },
  methods:{
    funeral_shop_adminApi(){
      this.$axios({url:url.funeral_shop_admin,method:'post'})
    }
  },
  onLoad(){

  }

}
</script>

<style scoped lang="scss">
.nav-list{
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  background: #FFFFFF;
  padding:  10rpx  0;
  .nav-item{
    flex: 1;
    text-align: center;
    .img-wrap{
      border-radius: 50rpx;
      width: 48px;
      height: 48px;
      display: inline-block;
      position: relative;
    }
    /deep/.u-icon{
      position: absolute;
      top:50%;
      left: 50%;
      transform: translate(-50%,-50%);

    }
    .nav-text{
      font-size: 24rpx;
      font-weight: bold;
    }
  }
}
.nav-left{
  display: flex;
  align-items: center;

}
/deep/.u-navbar__content__left {
  display: flex;
  .text
  {
    font-size: 36rpx;
    font-weight: bold;
  }
  .sub{
    width: 200rpx;
    height: 50rpx;
    box-sizing: border-box;
    background: #f3f4f8;
    padding: 10rpx;
    border-radius: 30rpx;
    margin-left: 10rpx;
    position: relative;
    display: flex;
    align-items: center;

    .u-badge--dot{
      width: 12px;
      height: 12px;
      margin-right: 10rpx;
    }
  }


}
/deep/ .u-navbar__content__left--hover{
  opacity: 1;
}
.management-wrap{
  padding: 36rpx 24rpx;
  .header{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .title{
    font-size: 32rpx;
    font-weight: bold;
  }
  .context{
    background: #FFFFFF;
  }
}



</style>