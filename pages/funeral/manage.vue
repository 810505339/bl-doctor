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
       <view class="item">
         <view class="title">今日接单</view>
         <view>{{data.operating_data.turnover_today }}</view>
       </view>
       <view class="item">
         <view class="title">今日营业额</view>
         <view>{{data.operating_data.orders_today}}</view>
       </view>
       <view class="item">
         <view class="title">本月接单</view>
         <view>{{data.operating_data.turnover_month }}</view>
       </view>
     </view>
   </view>
   <view class="management-wrap">
     <view class="header">
       <view class="title">店铺公告</view>
       <view>编辑</view>
     </view>
     <view class="notice">
       <u-icon :name="notice" size="20" class="icon"/>
        {{data.notice}}
     </view>
   </view>

   <view class="management-wrap">
     <view class="header">
       <view class="title">商家学院</view>
       <view>全部</view>
     </view>
     <view class="business-list">
       <view v-for="item in data.business_college" :key="item.id" class="business-item">
         <view>
           <view class="title">{{item.title}}</view>
           <view class="time">{{item.updated_at}}</view>
         </view>
         <view class="img">
           <u--image :src="item.cover_img"  width="118" height="75"/>
         </view>
       </view>

     </view>
   </view>

 </view>
</template>

<script>
import {url} from '@/api/funeral'
import notice from '@/static/funeral/notice.svg'

export default {
  name: "manage",
  data() {
    return {
      list: [
        {
          text: '订单管理',
          bg: '#2a82e4',
          icon: require('@/static/funeral/dd.svg'),
          url:''
        },
        {
          text: '商品管理',
          bg: '#41ab85',
          icon: require('@/static/funeral/sp.svg'),
          url:''
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
      ],
      data:{},
      notice:notice
    }
  },
  methods:{
   async funeral_shop_adminApi(){
     const {data}=await this.$axios({url:url.funeral_shop_admin,method:'post'})
     console.log(data)
     this.data=data
    }
  },
  onLoad(){
        this.funeral_shop_adminApi()
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
    margin-top: 20rpx;
    height: 160rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    text-align: center;
    font-weight: bold;

    .item{
        view {
          font-size:30rpx;
        }
      .title{
        font-size: 24rpx;
        font-weight: normal;
      }
      flex: 1;
      text-align: center;
    }
  }
  .notice{
    background: #FFFFFF;
    margin-top: 20rpx;
    padding: 12rpx 10rpx 12rpx 70rpx;
    border-radius: 20rpx;
    position: relative;
    .icon{
      position: absolute;
      left: 20rpx;
      top:50%;
      transform: translateY(-50%);
    }
  }
}

.business-list{
  background: #FFFFFF;
  padding: 20rpx;
  border-radius: 20rpx;
  margin-top: 20rpx;

  .img{
    width:120px ;
    height: 80px;
    /deep/ .u-image, /deep/ .u-transition{
      height: 100%;
    }

  }
  .title{

  }

  .business-item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20rpx 0;
    padding-bottom: 20rpx;
    border-bottom: 1px #e5e5e5 solid;

  }
}



</style>