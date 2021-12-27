<template>
  <view>
      <view class="order-item">
        <view>
          <view class="order-header">
            <view>
              #<text class="num">01</text>
            </view>
            <view>
              <u-button class="order-btn" shape="circle">接单</u-button>
            </view>
          </view>
        </view>
        <view class="order-context">
         <view class="user">
           <text>杨先生</text>
           <text>尾号9876</text>
         </view>
         <view  class="address">
          <text>1.2km</text>
          <text>
            点击查看配送地址<u-icon name="arrow-right"  size="14"/>
          </text>
         </view>
         <view class="context-img">
           <view>
             <u--image/>
           </view>
           <view>
             <u--image/>
           </view>
         </view>
        </view>
        <view></view>
        <view></view>
      </view>
  </view>
</template>

<script>

export default {
  name: "order-item",
  props:[''],
  data(){
    return{
      line:require('@/static/funeral/line.svg'),
      phone:require('@/static/funeral/phone.svg')
    }
  },

}
</script>

<style scoped lang="scss">
.order-item{
  margin: 24rpx;
  padding:  20rpx ;
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
    width: 81px;
    height: 29px;

  }
  .order-context{
    padding: 28rpx 0;
    position: relative;
    .user{
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
    }
  }
}

</style>