<template>
  <view class="accompany-service">
    <cu-custom class="text-bold" :isBack="true" bgColor='#f3f4f8'>
				<block slot="right">
          <view style="marginRight:28px">
            <image class="right-btn" @click="consulting" src="../../../static/accompany-service/consulting.png"></image>
            <image class="right-btn" @click="onShare" src="../../../static/accompany-service/onShare.png"></image>
          </view>
        </block>
		</cu-custom>
    <view class="accompany-service-item">
      <!-- <image class="accompany-service-item-avgator" src="../../../static/accompany-service/selectDownEmptyBlack.png"></image> -->
      <image class="accompany-service-item-avgator" :src="acc.headimg?acc.headimg:'../../../static/accompany-service/avgatorDefault.png'"></image>
      <view class="accompany-service-item-name">{{acc.realname}}</view>
      <view class="accompany-service-item-money">
        <view class="accompany-service-item-money-t">￥{{acc.price || 0}}</view>
        <view class="accompany-service-item-money-b">{{acc.service_num || 0}}预约</view>
      </view>
      <view class="accompany-service-item-tab">
        <view class="labelItem">资质认证</view>
        <view class="labelItem" v-if="acc.organization">企业认证</view>
      </view>
    </view>
    <view class="accompany-service-item" @click="toDetailTwo">
      <view class="contentItemTitle">
        个人简介
        <view class="more">
          更多
          <image class="moreImg" src="../../../static/accompany-service/selectDownEmptyBlack.png"></image>
        </view>
      </view>
      <view class="contentItemText">{{acc.desc}}</view>
    </view>
    <view class="accompany-service-item" v-if="acc.organization" @click="toOrganization">
      <view class="contentItemTitle">
        企业认证
        <view class="more">
          更多
          <image class="moreImg" src="../../../static/accompany-service/selectDownEmptyBlack.png"></image>
        </view>
      </view>
      <view class="contentItemText">{{acc.organization.title}}</view>
    </view>
    <view class="accompany-service-item">
      <view class="accompany-service-item-top">
        <view class="accompany-service-item-top-i" @click="changeTab('1')">
          <view class="accompany-service-item-top-t">详情</view>
          <view :class="['accompany-service-item-top-b', activePage === '1'?'active':'']"></view>
        </view>
        <view class="accompany-service-item-top-i" @click="changeTab('2')">
          <view class="accompany-service-item-top-t">评价</view>
          <view :class="['accompany-service-item-top-b', activePage === '2'?'active':'']"></view>
        </view>
      </view>
      <view class="accompany-service-item-contont-l" v-if="activePage === '1'">
        <view class="accompany-service-item-contont-l-p">
          <image class="accompany-service-item-contont-l-p-img" src="../../../static/accompany-service/serviceprocess.png"></image>
          服务流程
        </view>
        <view class="step">
          <view class="step-box">
            <image class="step-box-img first" src="../../../static/accompany-service/onlineorder.png"></image>
            <view class="step-text">线上下单</view>
          </view>
          <image class="step-img" src="../../../static/accompany-service/redarrow.png"></image>
          <view class="step-box blue">
            <image class="step-box-img" src="../../../static/accompany-service/onlinepayment.png"></image>
            <view class="step-text">在线支付</view>
          </view>
          <image class="step-img" src="../../../static/accompany-service/redarrow.png"></image>
          <view class="step-box yellow">
            <image class="step-box-img" src="../../../static/accompany-service/startservice.png"></image>
            <view class="step-text">开始服务</view>
          </view>
          <image class="step-img" src="../../../static/accompany-service/redarrow.png"></image>
          <view class="step-box green">
            <image class="step-box-img" src="../../../static/accompany-service/servicecompletion.png"></image>
            <view class="step-text">服务完成</view>
          </view>
        </view>
        <view class="accompany-service-item-contont-l-p">
          <image class="accompany-service-item-contont-l-p-img" src="../../../static/accompany-service/servicedetails.png"></image>
          服务详情
        </view>
        <!-- <view class="detail-container">注意事项：孕妇及高领患者，需要确定是否可以使用陪护服务，如无法使用，使用途中产生的一切后果，概不负责</view> -->
        <rich-text :nodes="content && content.content"></rich-text>
        <!-- <view class="service-title-contont">
          <view class="service-title-line"></view>
          服务范围
          <view class="service-title-line"></view>
        </view>
        <rich-text nodes="escortInfo.rules && escortInfo.rules.content"></rich-text>
        <view class="service-title-contont">
          <view class="service-title-line"></view>
          服务须知
          <view class="service-title-line"></view>
        </view>
        <rich-text nodes="escortInfo.rules && escortInfo.rules.content"></rich-text> -->
      </view>
      <view class="accompany-service-item-contont-r" v-else>
        <view class="accompany-service-item-contont-r-t">
          <view class="accompany-service-item-contont-r-t-item" v-for="(item, index) in tags" :key="index">{{item && item.title}}</view>
        </view>
        <view class="accompany-service-item-contont-r-b" v-if="acc.comment">
          <view class="list-box" v-for="(item, index) in acc.comment" :key="index">
            <!-- <image class="list-box-l" src="../../../static/accompany-service/avgatorLittle.png"></image> -->
            <image class="list-box-l" :src="(item.user && item.user.avatar)?item.user.avatar:'../../../static/accompany-service/avgatorLittle.png'"></image>
            <view class="list-box-r">
              <view class="list-box-r-name">{{item.user && item.user.nickname}}</view>
              <view class="list-box-r-date">{{item.created_at}}</view>
              <view class="list-box-r-desc">{{item.comment}}</view>
            </view>
            <view class="list-box-star">
              <uni-rate :size="16" :max="5" :touchable="false" :value="item.star" color="rgba(192, 229, 213, 1)" active-color="rgba(51, 177, 123, 1)"/>
            </view>
          </view>
          <!-- <view class="list-box">
            <image class="list-box-l" src="../../../static/accompany-service/avgatorLittle.png"></image>
            <view class="list-box-r">
              <view class="list-box-r-name">caffhaskda</view>
              <view class="list-box-r-date">2017-10-12</view>
              <view class="list-box-r-desc">这个课程还蛮好的，课程一旦购买后，需在规定时间内完成学习，然后提交作业并参加考试，每一科目都完成后才能进入最后的实践课程，即大作业！完成大作业，达到相应的分数，就可得获得相应科目的职业证书。</view>
            </view>
            <view class="list-box-star">
              <uni-rate :size="16" :max="5" :touchable="false" :value="0" color="rgba(192, 229, 213, 1)" active-color="rgba(51, 177, 123, 1)"/>
            </view>
          </view> -->
        </view>
      </view>
    </view>
    <view class="btn">
      <view class="btnL">在线咨询</view>
      <view class="btnR" @click="toOrder">立即预约</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      activePage: '1',    // tab切换，1是详情，2是评价   
      acc: {
        comment:[]
      },        //    
      content: {},    //    
      tags: [],    //    
      id: '',    //    
    }
  },
  onLoad(options) {
    let {id} = options;
    this.id = id;
    this.getDetail(id)
  },
  methods: {
    onShare() {
      console.log(123)
    },
    toOrder() {
      uni.navigateTo({
        url: '/pages/accompany/accompany-service-order/accompany-service-order?price='+this.acc.price+'&id='+this.id
      })
    },
    toDetailTwo() {
      uni.navigateTo({
        url: '/pages/accompany/accompany-service-detail-two/accompany-service-detail-two?id='+this.id
      })
    },
    toOrganization() {
      uni.navigateTo({
        url: '/pages/accompany/accompany-company-profile/accompany-company-profile?id='+this.acc.organization_id
      })
    },
    consulting() {
      console.log(123)
    },
    changeTab(value) {
      this.activePage = value;
    },
    async getDetail(id) {
      const { data } = await this.$axios({
        url: `/api/users/escort/detail`,
        data:{
          id
        }
      })
      console.log(data,'data')
      let {acc,content,tags} = data;
      this.acc = acc;
      this.content = content;
      this.tags = tags;
    }
  }
}
</script>

<style lang="scss" scoped>
page {
  height: 100%;
  background-color: #f3f4f8;
}
.accompany-service {
  position: relative;
  box-sizing: border-box;
  padding: 64rpx 30rpx;

  .right-btn {
    width: 43rpx;
    height: 43rpx;

    &:first-child {
      margin-right: 27rpx;
    }
  }

  .accompany-service-item {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 19rpx;
    background-color: rgba(255, 255, 255, 1);
    padding: 25rpx;
    min-height: 170rpx;

    .accompany-service-item-avgator {
      position: absolute;
      left: 32rpx;
      top: 23rpx;
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
    }

    .accompany-service-item-name {
      position: absolute;
      left: 184rpx;
      top: 31rpx;
      color: rgba(80, 80, 80, 1);
      font-size: 36rpx;
      line-height: 150%;
      text-align: left;
      font-weight: bold;
    }

    .accompany-service-item-money {
      position: absolute;
      top: 32rpx;
      right: 21rpx;

      .accompany-service-item-money-t {
        color: rgba(255, 141, 26, 1);
        font-size: 32rpx;
        line-height: 150%;
        text-align: left;
        font-weight: bold;
      }

      .accompany-service-item-money-b {
        color: rgba(80, 80, 80, 1);
        font-size: 24rpx;
        line-height: 150%;
        text-align: left;
      }
    }

    .accompany-service-item-tab {
      position: absolute;
      left: 184rpx;
      top: 99rpx;
      width: 350rpx;

      .labelItem {
        display: inline-block;
        height: 32rpx;
        color: rgba(80, 80, 80, 1);
        border-radius: 11rpx;
        font-size: 24rpx;
        line-height: 32rpx;
        border: rgba(48, 153, 116, 1) solid 2rpx;
        text-align: center;
        margin-right: 13rpx;
        padding: 0 3rpx;
      }
    }

    .contentItemTitle {
      position: relative;
      margin-bottom: 16rpx;
      color: rgba(56, 56, 56, 1);
      font-size: 32rpx;
      line-height: 72rpx;
      text-align: left;
      font-weight: bold;

      &::before {
        position: absolute;
        top: 42rpx;
        left: 30rpx;
        content: '';
        width: 100rpx;
        height: 6rpx;
        background: rgba(65, 171, 133, 1);
        filter: blur(6rpx);
        z-index: 100;
      }

      .more {
        position: absolute;
        top: 0rpx;
        right: 20rpx;

        .moreImg {
          transform: rotate(-90deg);
          width: 39rpx;
          height: 39rpx;
          margin-left: 14rpx;
          vertical-align: middle;
        }
      }
    }

    .contentItemText {
      color: rgba(80, 80, 80, 1);
      font-size: 28rpx;
      line-height: 150%;
      text-align: left;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }

    .accompany-service-item-top {
      .accompany-service-item-top-i {
        display: inline-block;
        margin-right: 30rpx;
        text-align: center;
        font-size: 0;

        .accompany-service-item-top-t {
          color: rgba(56, 56, 56, 1);
          font-size: 32rpx;
          line-height: 150%;
          text-align: left;
          font-weight: bold;
        }

        .accompany-service-item-top-b {
          display: inline-block;
          width: 40rpx;
          height: 8rpx;
          background-color: #fff;
          border-radius: 5rpx;

          &.active {
            background-color: rgba(65, 171, 133, 1);
          }
        }
      }
    }

    .accompany-service-item-contont-l {
      .accompany-service-item-contont-l-p {
        margin: 46rpx 0 30rpx 0;
        color: rgba(80, 80, 80, 1);
        font-size: 28rpx;
        line-height: 150%;
        text-align: left;
        font-weight: bold;

        .accompany-service-item-contont-l-p-img {
          width: 45rpx;
          height: 45rpx;
          margin-right: 11rpx;
          vertical-align: middle;
        }
      }

      .step {
        margin-bottom: 100rpx;

        .step-box {
          display: inline-block;
          width: 95rpx;
          height: 95rpx;
          color: rgba(80, 80, 80, 1);
          background-color: rgba(42, 172, 228, 1);
          border-radius: 34rpx;
          position: relative;
          vertical-align: middle;

          &.blue {
            background-color: rgba(65, 171, 133, 1);
          }

          &.yellow {
            background-color: rgba(255, 141, 26, 1);
          }

          &.green {
            background-color: rgba(0, 186, 173, 1);
          }

          .step-box-img {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            width: 90rpx;
            height: 90rpx;

            &.first {
              width: 53rpx;
              height: 53rpx;
            }
          }

          .step-text {
            position: absolute;
            left: 0;
            bottom: -40rpx;
            color: rgba(80, 80, 80, 1);
            font-size: 24rpx;
            line-height: 150%;
            font-weight: bold;
            white-space: nowrap;
          }
        }

        .step-img {
          width: 44rpx;
          height: 44rpx;
          margin: 0 13rpx;
          vertical-align: middle;
        }
      }

      .detail-container {
        padding: 22rpx;
        background-color: rgba(248, 236, 236, 1);
        border-radius: 11rpx;
        line-height: 150%;
        color: rgba(212, 48, 48, 1);
        font-size: 24rpx;
        text-align: left;
        margin-bottom: 27rpx;
      }

      .service-title-contont {
        text-align: center;
        color: rgba(80, 80, 80, 1);
        font-size: 32rpx;
        line-height: 150%;
        font-weight: bold;
        margin: 32rpx 0;

        .service-title-line {
          display: inline-block;
          width: 31rpx;
          height: 4rpx;
          color: rgba(80, 80, 80, 1);
          background-color: rgba(65, 171, 133, 1);
          margin: 0 15rpx;
          vertical-align: middle;
        }
      }
    }

    .accompany-service-item-contont-r {
      padding: 25rpx 20rpx;

      .accompany-service-item-contont-r-t {
        margin-bottom: 28rpx;
        .accompany-service-item-contont-r-t-item {
          display: inline-block;
          height: 52rpx;
          color: rgba(80, 80, 80, 1);
          background-color: rgba(243, 244, 248, 1);
          border-radius: 32rpx;
          font-size: 28rpx;
          line-height: 52rpx;
          text-align: center;
          margin-right: 23rpx;
          vertical-align: middle;
          padding: 0 20rpx;
        }
      }

      .accompany-service-item-contont-r-b {
        padding: 28rpx 25rpx;

        .list-box {
          position: relative;

          .list-box-l {
            width: 58rpx;
            height: 58rpx;
            vertical-align: top;
            margin-right: 20rpx;
          }

          .list-box-r {
            display: inline-block;
            width: 450rpx;

            .list-box-r-name {
              color: rgba(80, 80, 80, 1);
              font-size: 25rpx;
              line-height: 44rpx;
              text-align: left;
            }

            .list-box-r-date {
              color: rgba(166, 166, 166, 1);
              font-size: 27rpx;
              line-height: 44rpx;
              text-align: left;
            }

            .list-box-r-desc{
              color: rgba(60, 74, 84, 1);
              font-size: 23rpx;
              line-height: 150%;
              text-align: left;
            }
          }

          .list-box-star {
            position: absolute;
            top: 20rpx;
            right: 20rpx;

            .star-img {
              width: 32rpx;
              height: 32rpx;
              vertical-align: middle;
            }
          }
        }
      }
    }
  }

  .btn {
    position: fixed;
    left: 0;
    bottom: 0rpx;
    height: 96rpx;
    width: 100%;
    background-color: rgba(255, 255, 255, 1);

    .btnL,.btnR {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 312rpx;
      height: 79rpx;
      color: rgba(255, 255, 255, 1);
      border-radius: 41rpx;
      font-size: 28rpx;
      line-height: 79rpx;
      text-align: center;
      font-weight: bold;

      &.btnL {
        left: 30rpx;
        background-color: rgba(42, 130, 228, 1);
      }

      &.btnR {
        right: 30rpx;
        background-color: rgba(65, 171, 133, 1);
      }
    }
  }
}
</style>
