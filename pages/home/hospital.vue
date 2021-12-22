<template>
  <view class="hospital">
    <view class="search_id">
      <view @click="initIndex(0)" :class="{'address': true, 'active': index===0}">
        <Address @determine="determine"></Address>
      </view>
      <view @click="initIndex(1)" :class="{'address': true, 'active': index===1}">
        <u-cell-group>
          <u-cell :title="cellTitle">
            <u-icon slot="right-icon" name="arrow-down-fill" size="12"></u-icon>
          </u-cell>
        </u-cell-group>
      </view>
      <view @click="initIndex(2)" :class="{'address': true, 'active': index===2}">搜索最多</view>
      <view @click="initIndex(3)" :class="{'address': true, 'active': index===3}">距离最近</view>
    </view>
    <u-picker keyName="title" :show="showPicker" :columns="columns" @cancel="cancel" @confirm="confirm"></u-picker>
    <view class="content_item" v-for="item in contentList" :key="item.id">
      <image :src="item.img_url"></image>
      <view class="content_item_right">
        <view class="right_address">
          <view>{{item.title}}</view>
          <view>{{item.distance}}km</view>
        </view>
        <view class="right_hospital">
          <view>{{item.level}}</view>
          <view v-for="(it,i) in item.tags" :key="i" class="right_hospital_item">{{it}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Address from './address.vue'
export default {
  components: {
    Address
  },
  data() {
    return {
      index: 0,
      cellTitle: '类型',
      city_id: '',
      type: 1,
      search: 0,
      distance: 0,
      lng: '',
      lat: '',
      showPicker: false,
      columns: [[
        {title: '综合医院', id: 1},
        {title: '专科医院', id: 2}
      ]],
      contentList: []
    }
  },
  mounted() {
    this.getList()
    this.getContent()
  },
  methods: {
    getList() {
      uni.getLocation({
        type:'gcj02',
        success: (res) => {
          this.lng=res.longitude
					this.lat = res.latitude
          this.getContent()
        }
      })
      
    },
    async getContent() {
      const {data} = await this.$axios({
        url: '/api/users/hospital/index',
        data: {
          city_id: this.city_id,
          type: this.type,
          search: this.search,
          distance: this.distance,
          lng: this.lng,
          lat: this.lat
        }
      })
      this.contentList = data.arr.data
    },
    initIndex(index) {
      this.index = index
      if(index === 1) {
        this.showPicker = true
      }
      if(this.distance) {
        this.search = 0
        this.distance = 0
      } else {
        this.search = 1
        this.distance = 1
      }
      this.getContent()
    },
    determine(value) {
      this.city_id = value
    },
    confirm(item) {
      this.type = item.value[0].id
      this.showPicker = false
      this.getContent()
    },
    cancel() {
      this.showPicker = false
    }
  }
}
</script>

<style lang="scss" scoped>
.hospital{
  margin: 0 20rpx;
  margin-top: 20rpx;
  overflow: hidden;
  .search_id{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .address{
      border-radius: 28rpx;
      width: 170rpx;
      height: 52rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24rpx;
      background: #FFFFFF;
    }
  }
  .content_item{
    margin-top: 20rpx;
    padding: 20rpx;
    background: #FFFFFF;
    display: flex;
    image{
      width: 100rpx;
      height: 100rpx;
    }
    .content_item_right{
      flex: 1;
      margin-left: 20rpx;
      display: flex;
      flex-direction: column;
      .right_address{
        display: flex;
        justify-content: space-between;
        align-items: center;
        view:nth-child(1){
          color: #505050;
          font-weight: bold;
          font-size: 32rpx;
        }
        view:nth-child(2){
          color: #808080;
          font-size: 28rpx;
        }
      }
      .right_hospital{
        display: flex;
        view{
          color: #808080;
        }
        view:nth-child(1){
          color: #41ab85;
          font-size: 28rpx;
        }
        .right_hospital_item{
          margin-left: 20rpx;
        }
      }
    }
  }
}
.active{
  background: #41ab85 !important;
  color: #FFFFFF;
}
.detail_list{
  border-radius: 12rpx;
}
::v-deep .active .u-cell__title-text[data-v-1c4434ae]{
  color: #FFFFFF;
}
::v-deep .active .u-cell__body[data-v-1c4434ae]{
  color: #FFFFFF;
}
</style>