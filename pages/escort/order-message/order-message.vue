<template>
  <view class="order_message">
    <!-- 地图 -->
    <map
      id="map"
      style="width: 750rpx; height: 440rpx"
      :latitude="latitude"
      :longitude="longitude"
      :markers="covers"
    ></map>
    <!-- 代支付 -->
    <view class="wait_pay">
      <view class="time">
        待支付
        <text>{{userInfo.time_out}}</text>
      </view>
      <view class="text">请尽快完成支付，否则会影响您的进度</view>
      <view class="btn">
        <button @click="cancleOrder">取消订单</button>
        <button :loading="active" :disabled="active" @click="payMoneyHandle">去支付</button>
      </view>
    </view>
    <!-- 被服务人信息 -->
    <view class="service_info">
      <view class="title">被服务人信息</view>
      <view class="info">
        <view class="name">
          <image src="../../../static/escort-service/user.png"></image>
          <view>{{ userInfo.patient && userInfo.patient.name }}</view>
        </view>
        <view class="name">
          <image src="../../../static/escort-service/location-blue.png"></image>
          <view>{{ userInfo.hospital && userInfo.hospital.title }}</view>
        </view>
      </view>
      <!-- 陪诊服务 -->
      <!-- <view class="user_info">
        <view class="id_card">
          <image src="../../../static/escort-service/voice.png"></image>
          <view class="id_card_rate">
            <view>
              {{ userInfo.accompanying && userInfo.accompanying.realname || '***' }}
              {{ userInfo.transact && userInfo.transact.title }}
            </view>
            <view class="id_card_rate_line">
              <view>{{ userInfo.order_num || 0 }}单</view>
              <view></view>
              <view>{{ userInfo.star || 0 }}评分</view>
            </view>
          </view>
        </view>
        <view class="id_phone">
          <image src="../../../static/escort-service/message.png"></image>
          <image @click="callphone" src="../../../static/escort-service/phone.png"></image>
        </view>
      </view> -->
    </view>
    <!-- 订单信息 -->
    <view class="order_list">
      <uni-list>
        <uni-list-item
          title="选购服务"
          :rightText="userInfo.transact && userInfo.transact.title"
        ></uni-list-item>
        <uni-list-item
          title="订单金额"
          :rightText="userInfo.order_price"
        ></uni-list-item>
        <uni-list-item
          title="下单时间"
          :rightText="userInfo.created_at"
        ></uni-list-item>
        <uni-list-item
          title="服务开始时间"
          :rightText="userInfo.atime"
        ></uni-list-item>
        <uni-list-item
          title="订单编号"
          :rightText="userInfo.order_sn"
        ></uni-list-item>
        <uni-list-item
          title="备注信息"
          :rightText="userInfo.remarks"
        ></uni-list-item>
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
    <!-- 联系客服  -->
    <button class="chat_inline">
      <image src="../../../static/escort-service/eye.png"></image>
      <text>联系客服</text>
    </button>
  </view>
</template>

<script>
import {Model_data_click} from '../../../utils/times'
import escortTab from '../../../components/escort-tab/escort-tab.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('escort-service')
export default {
  components: {
    escortTab,
  },
  data() {
    return {
      active: false,
      user_list: [],
      userInfo: {},
      latitude: 39.909,
      longitude: 116.39742,
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
          },
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
      return this.user_info.order_id || 'ABN728327435022'
    },
  },
  mounted() {
    this.getOrderList()
  },
  methods: {
    ...mapMutations(['change_order_id']),
    async getOrderList() {
      const { data } = await this.$axios({
        url: '/api/users/accompanying/detail?order_sn=' + this.order_id,
      })
      this.userInfo = data.data
      this.userInfo.time_out = Model_data_click(this.userInfo.time_out)
    },
    callphone() {
      const { mobile } = this.userInfo.accompanying
      uni.makePhoneCall({
        phoneNumber: mobile //仅为示例
      })
    },
    // 点击支付时候的参数
    async payMoneyHandle() { // 点击支付
      this.active = true
      const data = {...this.userInfo}
      const res = await this.$axios({
        method: 'post',
        url: '/api/users/accompanying/order',
        data
      })
      this.change_order_id(res.data.order_sn) // 存储订单号
      this.active = false
      if(res.code !== 1) { // 下单失败
        uni.showToast({
          title: res.msg
        })
        return
      }
      uni.redirectTo({
        url: '/pages/escort/wait-message/wait-message'
      })
    },
    // 取消订单 跳转到订单详情
    async cancleOrder() { // 取消订单
      try {
        await this.$axios({
          method: 'post',
          url: '/api/users/accompanying/cancel_order',
          data: {
            order_sn: this.order_sn
          }
        })
        uni.navigateTo({
          url: '/pages/mine-order/mine-order' // 跳转到订单列表
        })
      } catch(e) {
        uni.showToast({
          title: e.msg
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.order_message {
  padding-bottom: 80rpx;
}
.wait_pay {
  margin-left: 20rpx;
  background: #fff;
  width: 630rpx;
  height: 168rpx;
  padding: 40rpx;
  .time {
    font-weight: bold;
    color: #505050;
    font-size: 32rpx;
    text {
      color: #41ab85;
      font-weight: bold;
      margin-left: 20rpx;
    }
  }
  .text {
    color: #a6a6a6;
    font-size: 24rpx;
    margin: 20rpx 0;
  }
  .btn {
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
.service_info {
  width: 670rpx;
  margin: 40rpx 20rpx;
  .title {
    color: #505050;
    font-size: 32rpx;
  }
  .info {
    background: #ffffff;
    width: 670rpx;
    margin-top: 40rpx;
    padding: 0 20rpx;
    .name {
      display: flex;
      align-items: center;
      padding: 25rpx 0;
      image {
        width: 52rpx;
        height: 52rpx;
      }
      view {
        margin-left: 20rpx;
      }
    }
    view:nth-child(1) {
      border-bottom: 1px solid #e5e5e5;
    }
  }
  .user_info {
    width: 670rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    margin-top: 20rpx;
    padding: 20rpx;
    .id_card {
      display: flex;
      flex: 1;
      image {
        width: 82rpx;
        height: 82rpx;
      }
      .id_card_rate {
        display: flex;
        flex-direction: column;
        color: #000000;
        font-size: 28rpx;
        margin-left: 24rpx;
        .id_card_rate_line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #505050;
          font-size: 20rpx;
          line-height: 30rpx;
          view:nth-child(2) {
            height: 30rpx;
            border: 1px solid #999999;
            margin: 0 10rpx;
          }
        }
      }
    }
    .id_phone {
      image {
        width: 82rpx;
        height: 82rpx;
      }
      image:nth-child(1) {
        margin-right: 20rpx;
      }
    }
  }
}
.order_list {
  margin: 20rpx;
}
.tips {
  margin: 34rpx 20rpx;
  .tips_img {
    display: flex;
    justify-content: space-around;
    image {
      width: 140rpx;
      height: 140rpx;
    }
  }
}
.chat_inline {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10rpx 0;
  margin-top: 80rpx;
  font-size: 28rpx;
  color: #505050;
  image {
    width: 64rpx;
    height: 64rpx;
    margin-right: 20rpx;
  }
}
::v-deep .uni-list--border-top {
  display: none !important;
}
::v-deep .uni-list--border-bottom {
  display: none !important;
}
::v-deep .uni-steps__column-text[data-v-1ec1e3f6] {
  border-bottom-width: 0px !important;
}
</style>
