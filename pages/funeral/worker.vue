<template>
   <view class="worker-wrap">
     <u-navbar
         :placeholder="true"
         :safeAreaInsetTop="true"
     >
       <view slot="left">
          订单
       </view>
       <view slot="right">
         <view>
           <u-search placeholder="请输入搜索内容" :actionStyle="{color:'#ffffff'}"  :showAction="false"  />
         </view>
       </view>
     </u-navbar>
      <view class="worker-tabs">
        <u-tabs :list="tabsList"  lineColor="#41ab85" @click="tabClick"/>
      </view>
      <order-item/>
   </view>
</template>

<script>
import OrderItem from "./order-item";
export default {
  name: "worker",
  components: {OrderItem},
  data(){
    return{
      tabsList:[{name:'进行中'},{name:'历史单'},{name:'预定单'}]
    }
  },
  methods:{
    tabClick(){

    }
  }
}
</script>

<style scoped lang="scss">
.worker-wrap{
  min-height: 100vh;

}
/deep/ .u-tabs{
  background: #FFFFFF;
}
/deep/.u-navbar__content__left{
  font-weight: bold;
  view{
    font-size: 36rpx;
  }
}
.worker-tabs{
  background: #FFFFFF;
}
/deep/.u-navbar__content__right{
  right: auto;
  width:80vw;
  display:block;
  position: relative;
}
/deep/ .u-tabs{
  width: 60vw;
  font-weight: bold;
}
</style>