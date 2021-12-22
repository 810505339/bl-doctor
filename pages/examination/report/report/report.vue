<template>
  <view class="examination-report">
    <cu-custom class="text-bold" :isBack="true" bgcolor="#f3f4f8">
      <block slot="content">体检报告</block>
      <block slot="right">
        <text class="right-text" @click="rightClick">我的报告</text>
      </block>
    </cu-custom>
    <select-search placeholder="搜索" class="select-search" @searchBlur="searchBlur" @determine="getContext"></select-search>
    <view class="examination-content">
      <block v-for="(item, index) in list" :key="index">
        <view class="examination-content-item" @tap="jump(item)">
          <view class="examination-content-item-left">
            <view class="examination-content-item-left-name">{{item.title}}</view>
            <view class="examination-content-item-left-time">{{item.address}}</view>
          </view>
          <u-icon name="arrow-right" size="30" color="#909399"></u-icon>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
import selectSearch from '@/components/select-search/select-search.vue';
export default {
  components: {
    selectSearch,
  },
  data() {
    return {
      list: [],
      inputValue:'',
      lng:'',
      lat:'',
      city_id:'',
      patient_id:''
    };
  },
  onLoad(options) {
    this.patient_id = options.patient_id
    this.handleLocation()
  },
  methods: {
    // 搜索框失焦事件
    searchBlur(value) {
      this.inputValue = value
      this.getContext(this.city_id)
    },
    handleLocation(){
      uni.getLocation({
        type: 'gcj02',
        success: res => {
          this.lng = res.longitude 
          this.lat = res.latitude
        }
      })
    },
    async getContext(value) {
      this.city_id = value
      const {data} = await this.$axios({
        url: '/api/users/physical_exam/mechanism',
        data:{
          city_id:this.city_id,
          keywords:this.inputValue,
          lng:this.lng,
          lat:this.lat
        }
			})
      this.list = data.arr.data
    },
    jump(item) {
      uni.navigateTo({
        url: `/pages/examination/report/people-verificat/people-verificat?patient_id=${this.patient_id}&hospital_id=${item.id}&title=${item.title}`
      });
    },
    rightClick(){
      uni.navigateTo({
        url:'/pages/mine-order/mine-order'
      })
    }
  },
};
</script>
<style lang="scss" scoped>
.select-search {
  padding: 0 24rpx;
  background-color: #ffffff;
  box-sizing: border-box;
}
.right-text {
  color: rgba(80, 80, 80, 1);
  font-size: 30rpx;
  line-height: 55rpx;
  font-weight: bold;
  margin-right: 18rpx;
}
.examination-content {
  margin-top: 14rpx;
  &-item {
    background: #ffffff;
    display: flex;
    padding: 46rpx 26rpx;
    margin-bottom: 1rpx;
    align-items: center;
    justify-content: space-between;
    &-left {
      &-name {
        color: rgba(80, 80, 80, 1);
        font-size: 36rpx;
        line-height: 48rpx;
        font-weight: bold;
      }
      &-time {
        color: rgba(166, 166, 166, 1);
        font-size: 24rpx;
        line-height: 36rpx;
        margin-top: 10rpx;
      }
    }
    &-right {
      color: rgba(166, 166, 166, 1);
      font-size: 24rpx;
      line-height: 36rpx;
      &.color {
        color: #41ab85;
      }
    }
  }
}
</style>
