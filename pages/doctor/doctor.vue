<template>
  <view>
    <u-navbar leftText="返回" :safeAreaInsetTop="true">
      <view class="u-nav-left" slot="left">
        <view class="left-work">工作台</view>
        <u-cell-group>
          <u-cell @click="openSheet" :title="title">
            <image
              slot="right-icon"
              class="u-cell-icon"
              src="../../static/accompany-service/selectDownEmptyBlack.png"
              mode="widthFix"
          ></image>
          </u-cell>
        </u-cell-group>
        <u-action-sheet :show="show" @close="close" @select="select" :actions="actions" :closeOnClickOverlay="false"></u-action-sheet>
      </view>
      <view class="right_title" slot="right">
        <u-icon name="server-fill" color="#41ab85" size="20"></u-icon>
        <text>客服</text>
      </view>
    </u-navbar>
    <view class="notice">
      <u-notice-bar
        :text="user_info.tags" 
        speed="120"
        step
        direction="row"
        color="rgba(80, 80, 80, 1)"
				bgColor="#ffffff"
        icon=""
      ></u-notice-bar>
    </view>
    <view class="card_doctor">
      <image :src="user_info.data && user_info.data.face_image"></image>
      <view class="card_doctor_info">
        <view class="card_doctor_name">{{user_info.data && user_info.data.realname}} 名字</view>
        <view class="card_doctor_time">
          <text>加入{{user_info.data && user_info.data.join_time}}天&nbsp;</text>
          <text>&nbsp; 服务患者{{user_info.data && user_info.data.patient_count}}人</text>
          <text>&nbsp; 评价★{{user_info.data && user_info.data.appraise}}</text>
        </view>
        <view class="card_doctor_mate">
          <view>我的名片</view>
          <view>展示信息</view>
        </view>
      </view>
    </view>

    <view class="scroll-list-0">
      <view class="scroll-list-item">
        <view>{{user_info.data && user_info.data.today_accompanying}}</view>
        <view>今日接诊</view>
      </view>
      <view class="scroll-list-item">
        <view>{{user_info.data && user_info.data.month_accompanying}}</view>
        <view>本月接诊</view>
      </view>
      <view class="scroll-list-item">
        <view>{{user_info.data && user_info.data.total_price}}</view>
        <view>累计收益</view>
      </view>
      <view class="scroll-list-item">
        <view>{{user_info.data && user_info.data.read_num}}</view>
        <view>主页访问量</view>
      </view>
    </view>

    <view class="scroll-list-1">
      <view class="scroll-list-item">
        <image src=".../../static/doctor/图标81.svg"></image>
        <view>向我咨询</view>
      </view>
      <view class="scroll-list-item">
        <image src="../../static/doctor/图标 81 (1).svg"></image>
        <view>提醒上线</view>
      </view>
      <view class="scroll-list-item">
        <image src="../../static/doctor/图标 81 (2).svg"></image>
        <view>我的患者</view>
      </view>
      <view class="scroll-list-item">
        <image src="../../static/doctor/图标 81 (3).svg"></image>
        <view>接诊设置</view>
      </view>
    </view>
    <view class="scroll-list-2">
      <view class="scroll-list-item">
        <image src="../../static/doctor/图标 85.svg"></image>
        <view>收益钱包</view>
      </view>
      <view class="scroll-list-item">
        <image src="../../static/doctor/图标 85 (1).svg"></image>
        <view>诊断建议</view>
      </view>
      <view class="scroll-list-item">
        <image src="../../static/doctor/图标 85 (2).svg"></image>
        <view>我的公告</view>
      </view>
      <view class="scroll-list-item">
        <image src="../../static/doctor/图标 85 (3).svg"></image>
        <view>我的评价</view>
      </view>
    </view>
    <view class="change_img">
      <image class="image" src="../../static/doctor/图片4.png"></image>
    </view>

    <view class="reception_nav">
      <view class="reception_content_title">进阶攻略</view>
      <view class="reception_nav_item" v-for="item in list" :key="item.id">
        <view class="reception_nav_item_left">
          <view>{{item.title}}</view>
          <view>{{item.read}}浏览</view>
        </view>
        <image :src="item.thumb_img"></image>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      title: '在线',
      actions: [
        {
          name: '在线',
        },
        {
          name: '离线',
        }
      ],
      text: [],
      user_info: {},
      list: []
    }
  },
  mounted() {
    this.getReceptionList()
    this.getHeaderList()
  },
  methods: {
    async getReceptionList() {
      const {data} = await this.$axios({
        url: '/api/index/strategy',
        data: {
          page: 1
        }
      })
      this.list = data.list.data
    },
    async getHeaderList() {
      const {data} = await this.$axios({
        url: '/api/doctor/work'
      })
      this.user_info = data
    },
    openSheet() {
      this.show = true
    },
    close() {
      this.show = false
    },
    select(e) {
      this.title = e.name
    }
  }
}
</script>

<style lang="scss" scoped>
.notice{
  margin: 20rpx 20rpx 0 20rpx;
}
::v-deep .u-notice-bar[data-v-24c07869] {
  border-radius: 32rpx;
  font-size: 10px;
}
.card_doctor{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 20rpx 20rpx;
  image{
    width: 80rpx;
    height: 80rpx;
  }
  .card_doctor_info{
    .card_doctor_name {
      font-size: 18px;
      font-weight: bold;
      margin-left: 20rpx;
      color: rgba(80, 80, 80, 1);
    }
    .card_doctor_time {
      font-size: 12px;
      margin-left: 20rpx;
      color: rgba(166, 166, 166, 1);
      text{
        margin-right: 10rpx;
      }
    }
    .card_doctor_mate {
      display: flex;
      margin-left: 20rpx;
      margin-top: 20rpx;
      view{
        font-size: 12px;
        background: #FFFFFF;
        padding: 0 10rpx;
        border-radius: 10px;
        color: rgba(80, 80, 80, 1);
      }
      view:nth-child(2) {
        margin-left: 40rpx;
      }
    }
  }
}
.scroll-list-0{
  height: 172rpx;
  margin: 0 20rpx;
  display: flex;
  box-sizing: border-box;
  .scroll-list-item{
    flex: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    view:nth-child(2){
      margin-top: 10rpx;
      font-size: 14px;
      color: rgba(80, 80, 80, 1);
    }
  }
}
.scroll-list-1{
  height: 172rpx;
  background: rgba(65, 171, 133, 1);
  margin: 20rpx;
  display: flex;
  box-sizing: border-box;
  .scroll-list-item{
    flex: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    font-size: 12px;
    image{
      width: 60rpx;
      height: 60rpx;
    }
    view{
      margin-top: 10rpx;
    }
  }
}
.scroll-list-2{
  height: 172rpx;
  margin: 20rpx;
  display: flex;
  box-sizing: border-box;
  .scroll-list-item{
    flex: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    image{
      width: 60rpx;
      height: 60rpx;
    }
    view{
      margin-top: 10rpx;
    }
  }
}
.change_img{
  margin: 0 20rpx;
  .image{
    width: 710rpx;
    height: 206rpx;
  }
}
.u-navbar{
  background: #f3f4f8;
}
.reception_content{
  margin: 0 30rpx;
  .reception_content_title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    view{
      color: rgba(80, 80, 80, 1);
      font-size: 18px;
    }
    .reception_content_title_right{
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
    }
  }
  .user_info{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40rpx;
    .user_info_left{
      view{
        line-height: 60rpx;
      }
      view:last-child{
        color: red;
      }
    }
    .to_reception{
      width: 132rpx;
      height: 132rpx;
      border-radius: 50%;
      background: rgba(65, 171, 133, 1);
      text-align: center;
      line-height: 132rpx;
      color: #FFFFFF;
      font-weight: bold;
    }
  }
}
.reception_nav{
  margin: 0 30rpx;
  .reception_content_title{
    margin-top: 20rpx;
    color: rgba(80, 80, 80, 1);
    font-size: 18px;
  }
  .reception_nav_item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #FFFFFF;
    padding: 25rpx 20rpx;
    border-bottom: 1px solid #ccc;
    image{
      width: 222rpx;
      min-width: 222rpx;
      height: 146rpx;
    }
    .reception_nav_item_left{
      view:nth-child(1) {
        font-size: 14px;
        font-weight: bold;
        color: rgba(56, 56, 56, 1);
      }
      view:nth-child(2) {
        font-size: 14px;
        color: rgba(56, 56, 56, 1);
      }
    }
  }
}
::v-deep .u-navbar__content{
  background: #f3f4f8 !important;
}
::v-deep .u-cell__title-text[data-v-1c4434ae]{
  font-size: 14px;

}
::v-deep .u-cell__body[data-v-1c4434ae]{
  box-sizing: border-box;
  background: #FFFFFF;
  padding: 5rpx 15rpx;
  margin-left: 20rpx;
  border-radius: 16px;
}
.u-nav-left{
  display: flex;
  align-items: center;
  justify-content: center;
}
.right_title{
  display: flex;
  align-items: center;
  justify-content: center;
  text{
    margin-left: 10rpx;
    font-size: 14px;
    color: rgba(80, 80, 80, 1);
  }
}
.left-work{
  font-size: 18px;
  font-weight: bold;
  color: rgba(80, 80, 80, 1);
}
::v-deep .u-cell__title-text{
  min-width: 35px !important;
}
.u-cell-icon{
  width: 40rpx;
  height: 40rpx;
}
::v-deep .u-line{
  border-bottom: none !important;
}
</style>
