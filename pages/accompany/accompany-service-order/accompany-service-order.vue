<template>
  <view class="accompany-service">
    <view class="item">
      <view class="servedperson" @click="changePatient">
        <image class="contentItemImg" src="../../../static/accompany-service/servedperson.png"></image>
        <text class="servedperson-text">被服务人</text>
        <view class="servedperson-right">
            <text class="servedperson-choose">{{patientCurent.name?patientCurent.name:'请选择'}}</text>
            <image class="contentItemChooseImg" src="../../../static/accompany-service/selectDownEmptyBlack.png"></image>
        </view>
      </view>
      <view class="line"></view>
      <view class="servedperson" @click="changeHospital">
        <image class="contentItemImg" src="../../../static/accompany-service/map.png"></image>
        <text class="servedperson-text">地址/医院？</text>
        <view class="servedperson-right">
            <text class="servedperson-choose">{{hospitalCurent.title?hospitalCurent.title:'请选择'}}</text>
            <image class="contentItemChooseImg" src="../../../static/accompany-service/selectDownEmptyBlack.png"></image>
        </view>
      </view>
    </view>
    <view class="item">
      <text class="orderdetails">订单详情</text>
      <view class="detailName">
        <view class="name">王春娟陪护服务</view>
        <view class="nameRemarks">注：单次服务1天为24小时</view>
        <view class="detailNameRight">
          <view class="detailNameRightT">
            <image class="dayImg" src="../../../static/accompany-service/reduce.png" @click="minServiceDays"></image>
            <text class="day">{{serviceDays}}天</text>
            <image class="dayImg" src="../../../static/accompany-service/add.png" @click="addServiceDays"></image>
          </view>
          <view class="detailNameRightB">￥{{totalPrice}}</view>
        </view>
      </view>
      <view class="orderdetails">服务开始时间</view>
      <view class="dateContainer">
        <view :class="['date',isCurrentTime(item) ?'active':'']" v-for="(item, index) in dateList" :key="index" @click="timeClick(index)">
          <view class="dateInner">
            <view class="dateText">{{getMonthAndDay1(item)}}</view>
            <view>{{getHoursAndMin1(item)}}</view>
          </view>
        </view>
        <!-- <view :class="['date',activeIndex === 0 ?'active':'']">
          <view class="dateInner">
            <view class="dateText">今天</view>
            <view>20:00</view>
          </view>
        </view>
        <view class="date active">
          <view class="dateInner">
            <view class="dateText">今天</view>
            <view>20:30</view>
          </view>
        </view>
        <view class="date disabled">
          <view class="dateInner">
            <view class="dateText">05/19</view>
            <view>08:00</view>
          </view>
        </view>
        <view class="date disabled">
          <view class="dateInner">
            <view class="dateText">05/19</view>
            <view>08:00</view>
          </view>
        </view> -->
        <view class="dateMore" @click="show = true">
          <view class="dateMoreInner">
            <view class="dateMoreText">更多</view>
            <view class="dateMoreText">时间</view>
          </view>
        </view>
      </view>
      <view class="orderdetails">就医凭证（选填）</view>
      <view class="subtitle">为了您的优质陪护体验，请尽量上传些照片</view>
      <view :style="{marginBottom: '53rpx'}">
          <image class="uploadItemImg" :src="item" v-for="(item, index) in imgList" :key="index"></image>
          <view class="uploadContainer" @click="choosePicture">+</view>
      </view>
      <view class="orderdetails">备注</view>
      <textarea :value="remarks" @input="upDataRemarks" class="pla-text" placeholder="有哪些要告诉陪护人员的？" />
    </view>
    <view class="item">
      <view class="servedperson" @click="changeCoupon">
        <text class="servedperson-text">优惠券？</text>
        <view class="servedperson-right">
            <text class="servedperson-choose coupon">{{couponCurent.title?couponCurent.title:'请选择'}}</text>
            <image class="contentItemChooseImg" src="../../../static/accompany-service/selectDownEmptyBlack.png"></image>
        </view>
      </view>
    </view>
    <view class="bottom">
      <text class="bottomText">共{{serviceDays}}天, 合计￥{{totalPrice}}</text>
      <view class="bottomBtn" @click="order">购买服务</view>
    </view>
    <template>
      <view>
        <u-datetime-picker
          :show="show"
          :value="value1"
          mode="datetime"
          @cancel="cancel"
          @confirm="confirm"
        ></u-datetime-picker>
      </view>
    </template>
    <template>
      <view>
        <u-picker :show="showPatientList" :columns="[patientList]" keyName="name" @cancel="cancel" @confirm="confirmPatient"></u-picker>
      </view>
    </template>
    <template>
      <view>
        <u-picker :show="showHospitalList" :columns="[hospitalList]" keyName="title" @cancel="cancel" @confirm="confirmHospital"></u-picker>
      </view>
    </template>
    <template>
      <view>
        <u-picker :show="showCouponList" :columns="[couponList]" keyName="title" @cancel="cancel" @confirm="confirmCoupon"></u-picker>
      </view>
    </template>
  </view>
</template>

<script>
import escortNote from '../../escort/escort-common/escort-note.vue';
import {uploadUrl} from '../../../utils/request.js';
import {getStorage} from '../../../utils/cookies.js';
import {getYearToMin,getMonthAndDay,getHoursAndMin} from '../../../utils/times.js';
export default {
  components: {
    escortNote
  },
  data() {
    return {
      remarks: '',    // 备注
      serviceDays:1,  // 服务天数
      price:0,  // 单价
      imgList:[
        // 'http://service-white-gragon.ascetic.top/storage/images/698acefe882f0218f175650eb23a8a67.jpg',
        // 'http://service-white-gragon.ascetic.top/storage/images/698acefe882f0218f175650eb23a8a67.jpg',
        // 'http://service-white-gragon.ascetic.top/storage/images/698acefe882f0218f175650eb23a8a67.jpg'
      ],  
      show:false,
      value1: Number(new Date()),
      patientList: [],    // 患者列表
      patientCurent: {},    // 
      hospitalList: [],    // 医院列表
      hospitalCurent: {},    // 
      couponList: [],    // 优惠券列表
      couponCurent: {},    // 
      showPatientList: false,    // 
      showHospitalList: false,    // 
      showCouponList: false,    // 
      id: '',    // 
      dateList: [],    // 
    }
  },
  onLoad(options) {
    let {price = 0,id} = options;
    this.price = Number(price);
    this.id = id;
    this.getPatientList();
    this.getHospitalList();
    this.getCouponList();
    let dateNow = Date.now();
    let date1 = dateNow + 1000*60*30*1;
    let date2 = dateNow + 1000*60*30*2;
    let date3 = dateNow + 1000*60*30*3;
    let date4 = dateNow + 1000*60*30*4;
    this.dateList = [date1,date2,date3,date4];
    this.value1 = date1;
  },
  computed: {
    totalPrice() {
      var price = this.price
      var serviceDays = this.serviceDays
      return (price * serviceDays).toFixed(2)
    }
  },
  methods: {
    async order(){
      let {id,patientCurent,hospitalCurent,value1,serviceDays,imgList,remarks,couponCurent} = this;
      const data = await this.$axios({
        url: `/api/users/escort/order`,
        data: {
          escort_id: id,
          patient_id: patientCurent.id,
          hospital_id: hospitalCurent.id,
          days: serviceDays,
          stime: value1,
          voucher: imgList.join(','),
          remarks: remarks,
          coupon_id: couponCurent.id,
        },
        method:'POST'
      });
    },
    getMonthAndDay1(value){
      return getMonthAndDay(value)
    },
    getHoursAndMin1(value){
      return getHoursAndMin(value)
    },
    timeClick(index){
      this.value1 = this.dateList[index];
    },
    isCurrentTime(item){
      return (this.getMonthAndDay1(item) === this.getMonthAndDay1(this.value1)) && (this.getHoursAndMin1(item) === this.getHoursAndMin1(this.value1))
    },
    cancel() {
      this.show = false;
      this.showPatientList = false;
      this.showHospitalList = false;
      this.showCouponList = false;
    },
    confirm({value}) {
      // let year = new Date(value).getFullYear();
      // let month = new Date(value).getMonth() + 1;
      // let day = new Date(value).getDate();
      // let hours = new Date(value).getHours();
      // let mins = new Date(value).getMinutes();
      // this.value1 = year+'-'+month+'-'+day+' '+hours+':'+mins;
      this.value1 = getYearToMin(value);
      this.cancel();
    },
    confirmPatient({value}) {
      this.patientCurent = value[0];
      this.cancel();
    },
    confirmHospital({value}) {
      this.hospitalCurent = value[0];
      this.cancel();
    },
    confirmCoupon({value}) {
      console.log(value)
      this.couponCurent = value[0];
      this.cancel();
    },
    async getPatientList() {
      const { data } = await this.$axios({
        url: `/api/users/patient/index`
        });
      let {arr} = data;
      this.patientList = arr;
    },
    async getHospitalList() {
      // uni.getLocation({
      //   type: 'gcj02',
      //   success: res => {
          const { data } = await this.$axios({
            url: `/api/users/hospital/index`,
            data: {
              lat: 39.909,
              lng: 116.39742,
            }
          });
          let {data:hospitalList} = data.arr || {};
          this.hospitalList = hospitalList;
      //   }
      // })
      
    },
    async getCouponList() {
      const { data } = await this.$axios({
        url: `/api/users/coupon/list`
        });
      let {list} = data;
      this.couponList = list;
    },
    changePatient() {
      this.showPatientList = true;
    },
    changeHospital() {
      this.showHospitalList = true;
    },
    changeCoupon() {
      this.showCouponList = true;
    },
    upDataRemarks(e) {
      this.remarks = e.detail.value;
    },
    addServiceDays() {
      let serviceDays = this.serviceDays || 1;
      this.serviceDays = this.serviceDays + 1;
    },
    minServiceDays() {
      let serviceDays = this.serviceDays || 1;
      if(serviceDays -1 < 1){
        this.serviceDays = 1;
      }else{
        this.serviceDays = this.serviceDays - 1;
      }
    },
    choosePicture() {
      let length = (this.imgList || []).length;
      // if(length>=9){
      //   uni.showToast({
      //     title: '最多只能上传9张',
      //     icon: 'none'
      //   })
      //   return;
      // }
      //上传图片
      uni.chooseImage({ // 从本地相册选择图片或使用相机拍照。
        count: 1, //默认选择1张图片
        sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
        success: (res) => {
          let filePath = res.tempFilePaths[0];
          uni.uploadFile({ //将本地资源上传到开发者服务器
            url: uploadUrl('/api/upload_img'), //接口地址
            filePath: filePath, //图片地址
            name: 'file',
            header: {
              Authorized: getStorage()
            },
            success: (res) => {
              if (res.statusCode == 200) {
                let data = JSON.parse(res.data) || {};
                let url = data && data.data && data.data && data.data.url;
                if(url){
                  this.imgList.push(url);
                  // this.imgList.push(uploadUrl(url));
                }else{
                  uni.showToast({
                    title: '上传失败',
                    icon: 'none'
                  })
                }
              }
            }
          });
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
page {
  height: 100%;
  background-color: #f3f4f8;
}
.accompany-service {
  padding: 20rpx 26rpx;
  padding-bottom: 140rpx;

  .item {
    width: 100%;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 11rpx;
    margin-bottom: 22rpx;
    padding: 21rpx;
    box-sizing: border-box;

    // 第一部分
    .servedperson {
      position: relative;
      height: 60rpx;
      line-height: 60rpx;
      text-align: left;

      .contentItemImg {
        width: 53rpx;
        height: 53rpx;
        vertical-align: middle;
        margin-right: 18rpx;
      }

      .servedperson-text {
        color: rgba(80, 80, 80, 1);
        font-size: 28rpx;
        text-align: left;
        font-weight: bold;
        vertical-align: middle;
      }

      .servedperson-right {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 13rpx;

        .servedperson-choose {
          color: rgba(80, 80, 80, 1);
          font-size: 28rpx;
          text-align: left;
          vertical-align: middle;

          &.coupon {
            color: rgba(65, 171, 133, 1);
	          font-weight: bold;
          }
        }

        .contentItemChooseImg {
          transform: rotate(-90deg);
          width: 48rpx;
          height: 48rpx;
          vertical-align: middle;
        }
      }
    }

    .line {
      // position: relative;
      // left: 50%;
      // transform: translateX(-50%);
      width: 609rpx;
      height: 2rpx;
      color: rgba(80, 80, 80, 1);
      background-color: rgba(229, 229, 229, 1);
      margin: 20rpx auto;
    }

    // 第二部分
    .orderdetails {
      color: rgba(80, 80, 80, 1);
      font-size: 28rpx;
      line-height: 150%;
      text-align: left;
      font-weight: bold;
    }

    .detailName {
      height: 216rpx;
      position: relative;
      margin-top: 48rpx;
      
      .name {
        width: 276rpx;
        height: 71rpx;
        line-height: 71rpx;
        color: rgba(80, 80, 80, 1);
        background-color: rgba(65, 171, 133, 1);
        border-radius: 36rpx;
        font-size: 28rpx;
        text-align: center;
        margin-bottom: 19rpx;
      }

      .nameRemarks {
        color: rgba(80, 80, 80, 1);
        font-size: 28rpx;
        line-height: 150%;
        text-align: left;
        white-space: nowrap;
      }

      .detailNameRight {
        position: absolute;
        top: 0;
        right: 47rpx;

        .detailNameRightT {
          margin-bottom: 57rpx;
          .dayImg {
            width: 66rpx;
            height: 66rpx;
            vertical-align: middle;
          }

          .day {
            margin: 0 20rpx;
            color: rgba(80, 80, 80, 1);
            font-size: 28rpx;
            line-height: 150%;
            vertical-align: middle;
          }
        }

        .detailNameRightB {
          color: rgba(255, 87, 51, 1);
          font-size: 36rpx;
          line-height: 150%;
          text-align: left;
          font-weight: bold;
        }
      }
    }

    .dateContainer {
      position: relative;
      margin-top: 24rpx;
      margin-bottom: 48rpx;

      .date {
        position: relative;
        margin-right: 20rpx;
        color: rgba(65, 171, 133, 1);
        background-color: rgba(255, 255, 255, 1);
        border-radius: 11rpx;
        font-size: 28rpx;
        border: rgba(166, 166, 166, 1) solid 2rpx;
        text-align: center;
        font-weight: bold;
        display: inline-block;
        vertical-align: middle;
        width: 120rpx;
        height: 120rpx;

        &.active {
          color: rgba(255, 255, 255, 1);
          background-color: rgba(65, 171, 133, 1);
          border-color: rgba(65, 171, 133, 1);
        }

        &.disabled {
          color: rgba(166, 166, 166, 1);
	        background-color: rgba(243, 244, 248, 1);
          border-color: rgba(243, 244, 248, 1);
          font-weight: normal;
        }

        .dateInner {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          .dateText {
            margin-bottom: 10rpx;
          }
        }
      }

      .dateMore {
        position: absolute;
        top: 0;
        right: -21rpx;
        width: 88rpx;
        height: 122rpx;
        color: rgba(80, 80, 80, 1);
        background-color: rgba(255, 255, 255, 1);
        font-size: 28rpx;
        line-height: 122rpx;
        box-shadow: 0px 0px 23rpx 0px rgba(0,0,0,0.5);
        text-align: center;

        .dateMoreInner {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);

          .dateMoreText {
            white-space: nowrap;
            line-height: 40rpx;
          }
        }
      }
    }

    .subtitle {
      color: rgba(166, 166, 166, 1);
      font-size: 24rpx;
      line-height: 150%;
      text-align: left;
      margin-bottom: 25rpx;
    }

    .uploadItemImg {
      width: 176rpx;
      height: 176rpx;
      margin-right: 20rpx;
      margin-bottom: 20rpx;
      vertical-align: bottom;
    }

    .uploadContainer {
      display: inline-block;
      height: 120rpx;
      width: 120rpx;
      line-height: 120rpx;
      text-align: center;
      font-size: 28px;
      color: rgba(153, 153, 153, 1);
	    background-color: rgba(243, 244, 248, 1);
      vertical-align: bottom;
    }

    .pla-text {
      width: 624rpx;
	    height: 171rpx;
      color: rgba(80, 80, 80, 1);
	    background-color: rgba(243, 244, 248, 1);
      padding: 22rpx 16rpx;
    }

    // 第三部分

  }

  .bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 120rpx;
    line-height: 120rpx;
    background-color: rgba(255, 255, 255, 1);

    .bottomText {
      color: rgba(80, 80, 80, 1);
      font-size: 28rpx;
      line-height: 150%;
      font-weight: bold;
      margin-left: 142rpx;
      margin-right: 28rpx;
      vertical-align: middle;
    }

    .bottomBtn {
      display: inline-block;
      vertical-align: middle;
      width: 242rpx;
      height: 76rpx;
      color: rgba(255, 255, 255, 1);
      background-color: rgba(65, 171, 133, 1);
      border-radius: 38rpx;
      font-size: 28rpx;
      line-height: 76rpx;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
