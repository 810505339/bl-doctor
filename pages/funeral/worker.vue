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
     <view class="nav-list-wrap">
        <view v-for="(nav,index) in navList" class="nav-item" @click="navClick(index,nav)" :class="{active:navIndex===index}">{{nav.title}}</view>
     </view>
     <view  class="loading-wrap" v-if="loading" >
       <u-loading-icon  mode="circle"/>
     </view>
     <view v-if="!shop_order_info &&!loading"     class="on-more">暂无更多</view>
     <view  v-if="!loading" v-for="(order,index) in shop_order_info" :key="order.id">
       <order-item :order="order" :index="index"/>
     </view>
      <order-tab-bar/>
   </view>
</template>

<script>
import OrderItem from "./order-item";
import {url} from '@api/funeral';
import OrderTabBar from "./order-tab-bar";
export default {
  name: "worker",
  components: {OrderTabBar, OrderItem},
  data(){
    return{
      params:{
        order_type:0,
        order_status:''
      },
      tabsList:[
          {name:'进行中',order_type:0},
          {name:'历史单',order_type:1},
          {name:'预定单',order_type:2}
      ],
      navList:[
          {title:'全部',order_status:''},
          {title: '待接单',order_status:1},
          {title:'带出单',order_status:2},
      ],
      navIndex:0,
      shop_order_info:[],
      loading:false,

    }
  },
  methods:{
    tabClick(e){
      this.params.order_type=e.order_type
    },
   async orderApi(){
      this.loading=true
     const {data}= await this.$axios({url:url.order,data:{...this.params},method:'post'})
     this.loading=false
     this.shop_order_info=data?.shop_order_info?.map(item=>({...item,open:false}))
    },
    navClick(i,nav){
      this.navIndex=i
      this.params.order_status=nav.order_status

    }
  },
  watch:{
    params:{
      deep:true,
      handler(nVal){


          this.orderApi()

      }
    }
  },
  onLoad(){
    this.orderApi()
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
.nav-list-wrap{
  display: flex;
  padding-top: 20rpx;

  .nav-item{
    background: #FFFFFF;
    color:#383838;
    margin: 0 10rpx;
    width: 160rpx;
    height: 60rpx;
    text-align: center;
    border-radius: 40rpx;
    border: rgba(229, 229, 229, 1) solid 2px;
    box-sizing: border-box;


  }
  .active{
    background: #d6efe6;
    border-color: #41ab85;
  }
}
.on-more{
  text-align: center;
  position: relative;
  top:20px;
}
.loading-wrap{
  height: 80vh;
  position: relative;
  .u-loading-icon{
    position: absolute;
    top:30%;
    left: 50%;
    transform: translateY(-50%,-50%);
  }
}
</style>