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
    <view class="right" v-if="isShowFilter" @click="showMode">
      <view class="right-name">筛选</view>
      <image class="right-img" src="../../../../static/accompany-service/selectDown.png"></image>
    </view>
    <uni-popup ref="popup" background-color="#fff">
      <view class="popup">
        <view class="popup-item" @click="changePopupTab(popup.id)" v-for="(popup,index) in popupList" :key="index">{{popup.title}}</view>
      </view>
    </uni-popup>
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
    isShowFilter:{
      type:Boolean,
      default:true
    },
    city_id:{
      type:[Number,String]
    }
  },
  data(){
    // 
    return {
      packageTab:0,
      params:{
        city_id:'',//城市id
        pay_num:0, //销量排序(0 1)
        money:0,//   价格排序(0 1)
        synthesis:1,//综合排序 0 1 
        type_id:''//分类id
      },
      popupList:[]
    }
  },
  watch:{
    city_id(val){
      if(val){
        this.$emit('sreachData',this.params)
        this.getPhysicalExamType(this.city_id)
      }
    }
  },
  methods: {
    determine(item){
      this.params.city_id = item
      // 获取分类
      this.getPhysicalExamType(item)
      this.$emit('sreachData',this.params)
    },
    async getPhysicalExamType(item){
      const {data} = await this.$axios({
        url:`/api/users/physical_exam/physical_exam_type?city_id=${item}`
      })
      this.popupList = data.arr
    },
    showMode(){
      this.$refs.popup.open('center')
    },
    changePopupTab(id){
      this.params.type_id = id
      this.$emit('sreachData',this.params)
      this.$refs.popup.close()
    },
    changePackageTab(index){
      this.packageTab = index
      switch (index) {
        case 2:
          this.params = {
            ...this.params,
            synthesis:0,
            pay_num:0, 
            money:1
          }
          break;
        case 1:
          this.params = {
            ...this.params,
            synthesis:0,
            pay_num:1, 
            money:0
          }
          break;    
        default:
          this.params = {
            ...this.params,
            synthesis:1,
            pay_num:0, 
            money:0
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
  .popup{
  background: #fff;
  width: 704rpx;
  padding: 24rpx;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  .popup-item{
    font-size: 28rpx;
    padding: 7rpx 28rpx;
    border: 1rpx solid #999999;
    margin: 24rpx 24rpx;
    border-radius: 60rpx;
  }
}
</style>
