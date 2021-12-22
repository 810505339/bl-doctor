<template>
  <view class="order_message">
    <!-- 地图 -->
    <map id="map" style="width: 750rpx; height: 440rpx;" :latitude="latitude" :longitude="longitude" :markers="covers"></map>
    <!-- 服务中 -->
    <view class="wait_pay">
      <view class="time">
        服务中
      </view>
      <view class="text">接单2分钟内取消订单不扣费，超时将收取30%手续费</view>
      <view class="btn">
        <button @click="cancleOrder">取消订单</button>
        <button @click="confirmOrder">已完成</button>
      </view>
    </view>
    <view class="finished_info">
      <view class="icon_info">
        <image src="../../../static/escort-service/user.png"></image>
        <view class="info_name"> 
          <view>{{userInfo.accompanying && userInfo.accompanying.realname}}</view>
          <view>陪诊量 {{userInfo.order_num || 0}}  综合评分{{userInfo.star || 0}}</view>
        </view>
      </view>
      <view class="steps">
        <uni-steps :options="progress" direction="column" :active="1">
        </uni-steps>
      </view>
    </view>
    <!-- 陪诊订单 -->
    <view class="nav_list">
      <view>陪诊订单</view>
      <escortTab class="escortTab" :msgList="user_list"></escortTab>
    </view>
    <!-- 订单信息 -->
    <view class="order_list">
      <uni-list>
        <uni-list-item title="下单时间" :rightText="userInfo.created_at"></uni-list-item>
        <uni-list-item title="订单金额" :rightText="userInfo.order_price"></uni-list-item>
        <uni-list-item title="陪诊时间" :rightText="userInfo.atime"></uni-list-item>
        <uni-list-item title="订单编号" :rightText="userInfo.order_sn"></uni-list-item>
        <uni-list-item title="备注信息" :rightText="userInfo.remarks || '暂未填写'"></uni-list-item>
      </uni-list>
    </view>
    <!-- 就医凭证 -->
    <!-- <view class="tips">
      <view class="tips_title">就医凭证</view>
      <view class="tips_img">
        <image src="../../../static/escort-service/voice.png"></image>
        <image src="../../../static/escort-service/voice.png"></image>
        <image src="../../../static/escort-service/voice.png"></image>
        <image src="../../../static/escort-service/voice.png"></image>
      </view>
    </view> -->
    <view class="footer_btn">
      <button @click="confirmOrder">已完成</button>
      <button class="primary" @click="chatInline">立即咨询</button>
    </view>

  </view>
</template>

<script>
import escortTab from '../../../components/escort-tab/escort-tab.vue'
import {createNamespacedHelpers} from 'vuex'
const { mapState } = createNamespacedHelpers('escort-service')
export default {
  components: {
    escortTab
  },
  data() {
    return {
      user_list: [],
      userInfo: {},
      progress: [{title: 'sm'}],
      latitude: '',
      longitude: '',
      covers: [
        {
          width: 20,
          height: 20,
          latitude: 39.909,
          longitude: 116.39742,
          iconPath: '../../../static/escort-service/location.png',
          label: {
            content: '我的位置',
            color: '#FFFFFF',
            fontSize: 12,
            borderWidth: 12,
            borderColor: '#007AFF',
            borderRadius: 5,
            padding: 5,
            textAlign: 'center',
            bgColor: '#563BFF',
          }
        },
        {
          latitude: 39.9219,
          longitude: 116.44355,
          iconPath: '../../../static/escort-service/location.png',
          label: {
            content: '服务地点',
            color: '#fff',
            bgColor: '#2a82e4',
          },
        },
      ],
    }
  },
  computed: {
    ...mapState(['user_info']),
    order_id() {
      return this.user_info.order_id
    }
  },
  mounted() {
    this.getOrderList()
  },
  methods: {
    // TODO steps状态和样式 目前给什么数据直接展示
    async getOrderList() {
      const {data} = await this.$axios({
        url: '/api/users/accompanying/detail?order_sn=' + this.order_id
      })
      this.userInfo = data.data
      // 以下是服务中展示陪诊订单的内容
      const {patient = {}, hospital = {}, mobile, progress = []} = this.userInfo
      const user = {
        title: patient.name,
				note: patient.mobile,
      }
      const doctor = {
        title: hospital.title,
				note: hospital.address,
      }
      this.progress = progress.map(item => {
        item.title = item.msg
        item.desc = item.created_at
        return item
      })
      this.user_list = [user, doctor]
    },
    async cancleOrder() { // 取消订单
      const res = await this.$axios({
        method: 'post',
        url: '/api/users/accompanying/cancel_order',
        data: {
          order_sn: this.order_sn
        }
      })
      if(res.code !== 1) {
        uni.showToast({
          title: res.msg
        })
        return
      }
      this.confirmOrder()
    },
    confirmOrder() {// 已完成或者取消订单
      uni.navigateTo({
        url: '' // 跳转到订单列表
      })
    },
    // 跳转到立即咨询页面
    chatInline() { // 立即咨询
      uni.navigateTo({
        url: '/pages/zjwz/zjhz/singleRoom'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.order_message{
  padding-bottom: 80rpx;
}
.finished_info{
  margin: 20rpx;
  padding: 10rpx 0;
  background: #ffffff;
  .icon_info{
    display: flex;
    align-items: center;
    padding: 20rpx 0 0 20rpx;
    image{
      width: 58rpx;
      height: 58rpx;
    }
    .info_name{
      margin-left: 20rpx;
      view:nth-child(1) {
        font-size: 28rpx;
        color: #505050;
        font-weight: bold;
      }
      view:nth-child(2) {
        font-size: 20rpx;
        color: #a6a6a6;
      }
    }
  }
  .steps{
    margin-top: 20rpx;
    margin-left: 10rpx;
  }
}
.nav_list{
  margin: 0 20rpx;
  view:nth-child(1) {
    color: #505050;
    font-size: 32rpx;
    font-weight: bold;  
  }
  .escortTab{
    margin-top: 20rpx;
  }
}
.wait_pay{
  margin-left: 20rpx;
  background: #fff;
  width: 630rpx;
  height: 168rpx;
  padding: 40rpx;
  .time{
    font-weight: bold;
    color: #505050;
    font-size: 32rpx;
    text{
      color: #41ab85;
      font-weight: bold;
      margin-left: 20rpx;
    }
  }
  .text{
    color: #a6a6a6;
    font-size: 24rpx;
    margin: 20rpx 0;
  }
  .btn{
    font-size: 28rpx;
    button {
      display: inline-block;
      vertical-align: middle;
	    height: 52rpx;
      font-size: 28rpx;
      line-height: 52rpx;
      border-radius: 32rpx;
    }
    button:nth-child(2) {
      background: #41ab85;
      color: #fff;
      margin-left: 20rpx;
    }
  }
}
.order_list{
  padding: 20rpx;
}
.tips{
  margin: 34rpx 20rpx;
  .tips_img {
    display: flex;
    justify-content: space-around;
    image{
      width: 140rpx;
      height: 140rpx;
    }
  }
}
.footer_btn{
  display: flex;
  margin: 80rpx 20rpx 0 20rpx;
  .primary{
    color: #fff;
    background: #41ab85;
    margin-left: 20rpx;
  }
  button{
    flex: 1;
    border-radius: 46rpx;
  }
  button:nth-child(1) {
    background: #e5e5e5;
  }
}
::v-deep .uni-list--border-top {
  display: none !important;
}
::v-deep .uni-list--border-bottom {
  display: none !important;
}
::v-deep .uni-steps__column-text[data-v-1ec1e3f6]{
  border-bottom-width: 0px !important;
}
::v-deep uni-button:after{
  border: 0px !important;
}
</style>
