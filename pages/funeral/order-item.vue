<template>
  <view>
      <view class="order-item">
        <view>
          <view class="order-header">
            <view>
              #<text class="num">0{{index+1}}</text>
            </view>
            <view>
              <u-button class="order-btn" shape="circle" v-if="
              order.order_status===1
              || order.order_status===2"   @click="btn">{{btnText}}</u-button>

             <view v-else>
               {{btnText}}
             </view>
            </view>
          </view>
        </view>
        <view class="order-context">
         <view class="user">
           <text class="name">杨先生</text>
           <text class="phone">尾号9876</text>
         </view>
         <view  class="address">
          <text>1.2km</text>
          <text>
            点击查看配送地址<u-icon name="arrow-right"  size="14"/>
          </text>
         </view>
         <view class="context-img">
           <view class="img-wrap">
             <u--image :src="phone" width="25" height="25"/>
           </view>
           <view class="img-wrap">
             <u--image :src="line" width="25" height="25"/>
           </view>
         </view>
        </view>
        <view  class="order-context" v-if="order.order_status===1|| order.order_status===2">
          <view class="delivered" >
            <text v-if="order.order_status===1">待接单</text>
            <text v-if="order.order_status===2">准备中，待配送</text>
          </view>

          <view  class="context-img">
            <u-button class="order-btn" shape="circle" @click="ready">准备完成</u-button>
          </view>
        </view>
        <view class="order-list-wrap">
          <view class="remarks-wrap" v-if="order.order_note">
            <text class="tag">备注</text>
            <text class="text">{{order.order_note}}</text>
          </view>
          <view class="order-list-title">{{order.goods_info.length}}件商品</view>
          <view class="shop-list" :class="{over:order.open}">
              <view class="shop-item" v-for=" goods in order.goods_info" :key="goods.goods_id">
                <text>{{goods.shop_name}}</text>
                <text>*{{goods.goods_num}}</text>
                <text>￥{{goods.goods_price}}</text>
              </view>
            <view class="shop-item">
              <view>小计</view>
              <view>￥{{total}}</view>
            </view>
          </view>
          <view class="open-wrap" @click="open">
            <text class="open">{{openText}}</text>
            <u-icon name="arrow-up" size="18"/>
          </view>
        </view>
      </view>
  </view>
</template>

<script>
import {url} from '@api/funeral'
export default {
  name: "order-item",
  props:['order','index'],
  data(){
    return{
      line:require('@/static/funeral/line.svg'),
      phone:require('@/static/funeral/phone.svg')
    }
  },
  computed:{
    btnText(){
      let text=''
     switch (this.order.order_status)
     {
       case 0:
         text='未支付'
             break;
       case 1:
         text='接单'
         break;
       case 2:
         text='立即出单'
         break;
       case 3:
         text='待收货'
         break;
       case 4:
         text='已完成'
         break;
     }
    return text

    },
    total(){
      let total=0
      this.order.goods_info.map(item=> total+=item.goods_num*item.goods_price)
      return  total
    },
    openText(){
      return  this.order.open?'收起':'展开完整订单'
    },



  },
  methods:{
    open(){

      this.order.open=!this.order.open
    },
    //出单
    async orderOutApi(){
     const {data,code}= await this.$axios({url:url.orderOut,data:{
         order_sn:this.order.order_sn
       },method:'post'})

      if(code===1)
      {
        this.order.order_status=3
      }

    },
    //订单完成
    async orderReadyApi(){
      console.log(this.order.order_sn)
      const {data,code}= await this.$axios({url:url.orderReady,method:'post',data:{
          order_sn:this.order.order_sn
        }})

      if(code===1)
      {
        this.order.order_sn=3
      }

    },
    //接单
    async orderReceivingApi(){
      const {data,code}= await this.$axios({url:url.orderReceiving,method:'post',data:{
          order_sn:this.order.order_sn
        }})

      if(code===1)
      {
        this.order.order_status=2
      }

    },
   async btn()
    {
            if(this.order.order_status===1)
            {
           await   this.orderReceivingApi()
            }

            if(this.order.order_status===2)
            {
            await  this.orderOutApi()
            }
    },
    async ready(){
     await this.orderReadyApi()
    }
  }

}
</script>

<style scoped lang="scss">
.order-item{
  margin: 24rpx;
  padding:  30rpx ;
  border-radius: 20rpx;
  background: #FFFFFF;
  .num{
    font-size: 48rpx;
    font-weight: bold;
    color:#505050;
    line-height: 100%;
  }
  .order-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px dashed #999999;
    padding-bottom: 20rpx;
  }
  .order-btn{
    background: #41ab85;
    color:#ffffff;
    min-width: 81px;
    height: 29px;

  }
  .order-context{
    padding: 28rpx 0;
    position: relative;
    border-bottom: 1px dashed #999999;
    .user{
      .name{
        font-weight: bold;
        font-size: 34rpx;
      }
      .phone{
        font-size: 24rpx;
      }
      text+text{
        margin-left:5px ;
      }
    }
    .address{
      text+text{
        margin-left:5px ;

      }

      .u-icon{
        display: inline-block;
      }
    }
    .context-img{
      position: absolute;
      display: flex;
      align-items: center;
      right: 0;
      top:50%;
      transform: translateY(-50%);
      .img-wrap+.img-wrap{
        margin-left: 50rpx;
      }



    }
    .delivered{
      font-weight: bold;
      color:#505050;
    }

  }
  .order-list-wrap{
    .remarks-wrap{
      background: #f8f4e7;
      padding: 15rpx;
      box-sizing: border-box;
      border-radius: 10rpx;
      margin-top: 10rpx;
      .tag{
        background: #ff8d1a;
        color:#ffffff;
        font-size: 24rpx;
        border-radius: 10rpx;
        padding: 5rpx 10rpx ;
        margin-right:20rpx;
      }
      .text{
        color:#505050;
        font-size: 28rpx;
        font-weight: bold;
      }
    }
    .order-list-title{
      color:#505050;
      font-size: 38rpx;
      font-weight: bold;
      padding: 10rpx 0;
    }
    .shop-list{
      height: 144rpx;
      overflow: hidden;

      .shop-item{
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      padding-bottom: 10rpx;
      border-bottom: 1px dashed #999999;
    }
    .over{
      overflow: auto;
      height:auto;
    }
  }
  .open-wrap{
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20rpx;
    .open{
      margin-right: 20rpx;
    }
  }
}

</style>