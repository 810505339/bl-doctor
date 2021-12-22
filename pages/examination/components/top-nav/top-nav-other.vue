<template>
  <view class="package-top">
    <view class="left">
      <uni-address v-if="isShowAddress" @determine="determine"></uni-address>
      <view :class="['package-top-tab',isShowAddress?'marginLeft':'']">
        <block v-for="(item,index) in list" :key="index">
          <view :class="['package-top-tab-item',packageTab == index ? 'active':'']" @click="changePackageTab(index)">{{item.label}}</view>
        </block>
      </view>
    </view>
  </view>
</template>

<script>
import uniAddress from '../../../../components/address/address.vue'

export default {  
  components: {
    uniAddress
  },
  props:{
    list: {
      type: Array,
      default: []
    },
    isShowAddress:{
      type:Boolean,
      default:true
    },
  },
  data(){
    return {
      packageTab:0,
      params:{
        city_id:'',//城市id
        pay_num:1, //销量排序(0 1)
        money:0,//   价格排序(0 1)
        lng:'',
        lat:''
      }
    }
  },
  methods: {
    determine(item){
      this.params.city_id = item
      this.getContext()
    },
    getContext() {
      uni.getLocation({
        type: 'gcj02',
        success: res => {
          this.params.lng = res.longitude
          this.params.lat = res.latitude
        }
      })
      this.$emit('sreachData',this.params)
    },
    changePackageTab(index){
      this.packageTab = index
      switch (index) {
        case 1:
          this.params = {
            ...this.params,
            pay_num:1, 
            money:0
          }
          break;    
        default:
          this.params = {
            ...this.params,
            pay_num:0, 
            money:1
          }
          break;
      }
      this.$emit('sreachData',this.params)
    }
  }
};
</script>
<style lang="scss" scoped>
  .package-top{
    height: 96rpx;
    width: 100%;
    background: #fff;
    position: relative;
    .left {
      height: 100%;
      padding-left: 36rpx;
      display: flex;
      align-items: center;
      .package-top-tab{
        display: flex;
        &.marginLeft{
          margin-left: 22rpx;
        }
        &-item{
          font-size: 30rpx;
          color: #505050;
          margin-right: 46rpx;
          &:nth-last-child(1){
            margin-right: 0;
          }
          &.active{
            color: #000000;
            font-weight: bold;
          }
        }
      }
    }

    .right{
      display: flex;
      align-items: center;
      position: absolute;
      right: 36rpx;
      top: 18rpx;
      .right-name{
        font-size: 28rpx;
        color:#505050;
      }
      &-img{
        width: 60rpx;
        height: 60rpx;
        display: block;
        margin-left: 10rpx;
      }
    }
  }
</style>
