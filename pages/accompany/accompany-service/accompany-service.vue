<template>
  <view class="accompany-service">
    <cu-custom class="text-bold" :isBack="true">
				<block slot="content"><text class="title-color">陪护服务</text></block>
				<block slot="right"><text class="right-btn" @click="toOrder">订单</text></block>
		</cu-custom>
    <view class="header">
      <selectSearch 
      placeholder='搜索' 
      class="select-search"
      @searchBlur='searchBlur' 
      @determine='determine'
      ></selectSearch>
    </view>
    <view class="banner">
      <marquee
        class="affiche"
        align="left"
        behavior="scroll"
        direction="left"
        hspace="50"
        vspace="20"
        loop="-1"
        scrollamount="10"
        scrolldelay="0"
      >
        <view class="messageItem" v-for="(text, index) in ad" :key="index">
			<!-- <image class="messageImg" src="../../../static/escort-service/voice.png"></image> -->
			<image class="messageImg" :src="(text.user && text.user.avatar)?text.user.avatar:'../../../static/escort-service/voice.png'"></image>
			{{text.msg}}
			</view>
        <!-- <view class="messageItem">
			<image class="messageImg" src="../../../static/escort-service/voice.png"></image>
			张先生3分钟前预约了陪护服务
			</view>
        <view class="messageItem">
			<image class="messageImg" src="../../../static/escort-service/voice.png"></image>
			张先生3分钟前预约了陪护服务
        </view> -->
      </marquee>
      <view class="title">陪护服务</view>
      <view class="subTitle">您身边的贴身服务</view>
    </view>
    <view class="screen">
      <!-- <view class="screenItem active">综合排序</view> -->
      <view :class="['screenItem', optimalPrice === '1'?'active':'']" @click="changOptimalPrice('optimalPrice')">价格最优</view>
      <view :class="['screenItem', mostOrders === '1'?'active':'']" @click="changOptimalPrice('mostOrders')">订单最多</view>
      <view class="screenBtn" @click='openModal'>
        <text>筛选</text>
        <image class="screenBtnImg" src="../../../static/accompany-service/selectDownEmpty.png"></image>
      </view>
    </view>
    <view class="content">
      <view class="itemContainer" v-for="(text, index) in arr.data" :key="index" @click="toDetail(text.id)">
		  <image class="left" :src="text.headimg?text.headimg:'../../../static/accompany-service/avgatorLittle.png'"></image>
		  <view class="right">
			  <view class="nameAndPrice">
				  <view class="name">{{text.realname}}</view>
				  <view class="price">￥{{text.price || 0}}</view>
			  </view>
			  <view class="authenticationAndAppointment">
				<view class="authentication">
					<view class="authenticationItem">资质认证</view>
					<view class="authenticationItem" v-if="text.organization">企业认证</view>
				</view>
				<view class="appointment">{{text.service_num || 0}}预约</view>
			  </view>
			  <text class="text">简介：{{text.desc}}</text>
		  </view>
	  </view>
      <!-- <view class="itemContainer">
		  <image class="left" src="../../../static/escort-service/voice.png"></image>
		  <view class="right">
			  <view class="nameAndPrice">
				  <view class="name">王凤霞</view>
				  <view class="price">￥300</view>
			  </view>
			  <view class="authenticationAndAppointment">
				<view class="authentication">
					<view class="authenticationItem">资质认证</view>
					<view class="authenticationItem">资质认证</view>
				</view>
				<view class="appointment">3000+预约</view>
			  </view>
			  <text class="text">简介：心脑血管疾病护理及指导、疾病康复指导、老年人常见风险评估与指导、少儿上门打针、小简介：心脑血管疾病护理及指导、疾病康复指导、老年人常见风险评估与指导、少儿上门打针、小简介：心脑血管疾病护理及指导、疾病康复指导、老年人常见风险评估与指导、少儿上门打针、小</text>
		  </view>
	  </view>
      <view class="itemContainer">
		  <image class="left" src="../../../static/escort-service/voice.png"></image>
		  <view class="right">
			  <view class="nameAndPrice">
				  <view class="name">王凤霞</view>
				  <view class="price">￥300</view>
			  </view>
			  <view class="authenticationAndAppointment">
				<view class="authentication">
					<view class="authenticationItem">资质认证</view>
					<view class="authenticationItem">资质认证</view>
				</view>
				<view class="appointment">3000+预约</view>
			  </view>
			  <text class="text">简介：心脑血管疾病护理及指导、疾病康复指导、老年人常见风险评估与指导、少儿上门打针、小简介：心脑血管疾病护理及指导、疾病康复指导、老年人常见风险评估与指导、少儿上门打针、小简介：心脑血管疾病护理及指导、疾病康复指导、老年人常见风险评估与指导、少儿上门打针、小</text>
		  </view>
	  </view> -->
    </view>
    <view v-if="showModal" class="modalContainer" @click='closeModal'>
      <view class="modalContent" @click.stop='stopFn'>
        <view class="modalItem">
          <image class="modalItemImg" src="../../../static/accompany-service/selectDownEmptyBlack.png" @click='closeModal'></image>
          <view class="modalItemTitle">陪护类型</view>
          <view>
            <view :class="['modalItemBtn', type === '1'?'active':'']" @click="changeType('1')">生活类陪护</view>
            <view :class="['modalItemBtn', type === '2'?'active':'']" @click="changeType('2')">医疗类陪护</view>
          </view>
        </view>
        <view class="modalItem">
          <view class="modalItemTitle">性质</view>
          <view>
            <view :class="['modalItemBtn', in_type === '1'?'active':'']" @click="changIn_type('1')">个人</view>
            <view :class="['modalItemBtn', in_type === '2'?'active':'']" @click="changIn_type('2')">企业</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import selectSearch from "../../../components/select-search/select-search.vue";
export default {
  components: {
    selectSearch
  },
  data() {
    return {
      showModal:false,
      cityId:'',
      escorList:[],
      optimalPrice:'1',     // 价格最优  0  1
      mostOrders:'1',       // 订单最多  0  1
      type:'3',       //  1 生活类 2 医疗类 3 都可以
      in_type:'1',       //  1 个人 2 企业 
      ad:[],       //  跑马灯数据 
      arr:{
        data:[]
      },       //  list 数据
      arrBackups:{
        data:[]
      },       //  list 数据
    };
  },
  onLoad() {
    
  },
  methods: {
    searchBlur(value) {
      this.arr = {...this.arrBackups,data:this.arrBackups.data.filter(item=>item.realname.includes(value))}
    },
    determine(cityId) {
      this.cityId = cityId;
      this.getList();
    },
    closeModal() {
      this.showModal = false;
    },
    openModal() {
      this.showModal = true;
    },
    stopFn() {
      
    },
    changOptimalPrice(str) {
      let status = this[str];
      if(status === '1'){
        this[str] = '0';
      }else{
        this[str] = '1';
      }
      this.getList();
    },
    changIn_type(str) {
      this['in_type'] = str;
      this.getList();
    },
    changeType(str) {
      let type = this['type'];
      if((type === '1' && str === '1') || (type === '2' && str === '2')) {
        this['type'] = '3';
      }else if(type === '1' && str === '2'){
        this['type'] = '2';
      }else if(type === '2' && str === '1'){
        this['type'] = '1';
      }else if(type === '3'){
        this['type'] = str;
      }
      this.getList();
    },
    toDetail(id) {
      uni.navigateTo({
        url: '/pages/accompany/accompany-service-detail/accompany-service-detail?id='+id
      })
    },
    toOrder() {
      uni.navigateTo({
        url: '/pages/mine-order/mine-order'
      })
    },
    async getList() {
      const { data } = await this.$axios({
        url: `/api/users/escort/list`,
        data: {
						// title   名称
            // city_id  市id
            // price  价格排序(0 1)
            // order  订单排序(0 1)
            // type    筛选(陪护类型)
            title:'',
            city_id:this.cityId,
            price:this.optimalPrice,
            order:this.mostOrders,
            type:this.type,
            in_type:this.in_type,
				}
      });
      let {ad,arr} = data;
      this.ad = ad;
      this.arr = arr;
      this.arrBackups = arr;
    }
  }
};
</script>

<style lang="scss" scoped>
page {
  height: 100%;
  background-color: #f3f4f8;
}
.accompany-service {
  // background-color: rgba(243, 244, 248, 1);

  .title-color {
    color: rgba(56, 56, 56, 1);
  }

  .right-btn {
    margin-right: 26rpx;
    color: rgba(80, 80, 80, 1);
    font-size: 28rpx;
    line-height: 150%;
    font-weight: bold;
  }

  .header {
    height: 96rpx;
    color: rgba(56, 56, 56, 1);
    background-color: rgba(255, 255, 255, 1);
    font-size: 32rpx;
    line-height: 96rpx;
    text-align: center;
    font-weight: bold;

    .select-search{
      padding: 0 24rpx;
      background-color: #fff;
      box-sizing: border-box;
    }
  }
  .banner {
    position: relative;
    height: 285rpx;
    background: url(../../../static/accompany-service/banner-bg.png) no-repeat
      center;
    background-size: 100% 100%;

    .affiche {
      position: absolute;
      left: 0;
      //   width: 100%;
      top: 20rpx;
      .messageItem {
        display: inline-block;
        margin-left: 28rpx;
        // width: 408rpx;
        height: 51rpx;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 32rpx;
        line-height: 51rpx;
        text-align: center;

        // width: 326px;
        color: rgba(255, 255, 255, 1);
        font-size: 24rpx;
        padding: 0 28rpx;

        .messageImg {
          width: 35rpx;
          height: 35rpx;
          border-radius: 50%;
          vertical-align: middle;
          margin-right: 11rpx;
        }
      }
    }

    .title {
      position: absolute;
      width: 144px;
      height: 52rpx;
      left: 384rpx;
      top: 88rpx;
      color: rgba(255, 255, 255, 1);
      font-size: 36rpx;
      line-height: 150%;
      text-align: left;
      font-weight: bold;
    }

    .subTitle {
      position: absolute;
      width: 192rpx;
      height: 36rpx;
      left: 336rpx;
      top: 144rpx;
      color: rgba(255, 255, 255, 1);
      font-size: 24rpx;
      line-height: 150%;
      text-align: left;
      font-weight: bold;
    }
  }

  .screen {
    position: relative;
    height: 110rpx;
    line-height: 110rpx;

    .screenItem {
      display: inline-block;
      height: 51rpx;
      color: rgba(80, 80, 80, 1);
      background-color: rgba(255, 255, 255, 1);
      border-radius: 11px;
      font-size: 24rpx;
      line-height: 51rpx;
      text-align: center;
      padding: 0 10rpx;
      margin-right: 65rpx;

      &.active {
        color: rgba(255, 255, 255, 1);
	      background-color: rgba(65, 171, 133, 1);
      }

      &:first-child{
        margin-left: 26rpx;
      }
    }

    .screenBtn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 40rpx;
      display: inline-block;
      width: 116rpx;
      height: 51rpx;
      text-indent: 20rpx;
      color: rgba(255, 255, 255, 1);
      background-color: rgba(65, 171, 133, 1);
      border-radius: 11rpx;
      font-size: 24rpx;
      line-height: 51rpx;
      text-align: left;
      margin-left: 18rpx;

      .screenBtnImg {
        width: 44rpx;
	      height: 44rpx;
        vertical-align: middle;
      }
    }
  }

  .content {
    padding: 24rpx 0 300rpx 24rpx;
    .itemContainer {
      width: 680rpx;
      height: 254rpx;
      background-color: rgba(255, 255, 255, 1);
      border-radius: 11px;
      margin-bottom: 20rpx;
      padding-top: 30rpx;

	  .left {
		  margin-left: 46rpx;
		  margin-right: 18rpx;
		  vertical-align: top;
		  width: 100rpx;
		  height: 100rpx;
		  border-radius: 50%;
	  }

	  .right {
		  display: inline-block;
		  vertical-align: top;
		  width: 500rpx;
		  height: 235rpx;

		  .nameAndPrice {
			  overflow: hidden;
			  .name {
				  float: left;
				  color: rgba(80, 80, 80, 1);
				  font-size: 32rpx;
				  line-height: 150%;
				  font-weight: bold;
			  }
			  .price {
				  float: right;
				  width: 90px;
				  color: rgba(255, 141, 26, 1);
				  font-size: 32rpx;
				  line-height: 150%;
				  font-weight: bold;
				  text-align: right;
			  }
		  }

		  .authenticationAndAppointment {
			.authentication {
				width: 360rpx;
				display: inline-block;
				overflow-x: auto;
				overflow-y: hidden;

				.authenticationItem {
					display: inline-block;
					height: 32rpx;
					color: rgba(80, 80, 80, 1);
					background-color: rgba(255, 255, 255, 1);
					border-radius: 18rpx;
					font-size: 24rpx;
					line-height: 32rpx;
					border: rgba(48, 153, 116, 1) solid 2px;
					text-align: center;
					margin-right: 14rpx;
					padding: 0 10rpx;
				}
			}

			.appointment {
				float: right;
				height: 36rpx;
				color: rgba(80, 80, 80, 1);
				font-size: 24rpx;
				line-height: 150%;
				text-align: right;
			}
		  }

		  .text {
			color: rgba(80, 80, 80, 1);
			font-size: 24rpx;
			line-height: 150%;
			text-align: left;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 3;
			overflow: hidden;
		  }
		}
	  }

	  
  }

  .modalContainer {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);

    .modalContent {
      position: absolute;
      left: 0;
      top: 570rpx;
      width: 100%;
      height: 391rpx;
      background-color: rgba(255, 255, 255, 1);
      border-radius: 11rpx;
      padding-top: 44rpx;

      .modalItem {
        position: relative;
        padding-left: 32rpx;
        position: relative;
        padding-bottom: 29rpx;
        margin-top: 14rpx;

        .modalItemImg {
          transform: rotate(180deg);
          position: absolute;
          top: 0;
          right: 46rpx;
          width: 44rpx;
	        height: 44rpx;
        }

        &:first-child {
          border-bottom: 2rpx solid rgba(80, 80, 80, 1);
        }

        .modalItemTitle {
          color: rgba(80, 80, 80, 1);
          font-size: 28rpx;
          line-height: 42rpx;
          text-align: left;
          font-weight: bold;
          margin-bottom: 20rpx;
        }

        .modalItemBtn {
          display: inline-block;
          width: 176rpx;
          height: 61rpx;
          color: rgba(128, 128, 128, 1);
          background-color: rgba(243, 244, 248, 1);
          border-radius: 11rpx;
          font-size: 24rpx;
          line-height: 61rpx;
          text-align: center;
          margin-right: 62rpx;

          &.active {
            color: rgba(255, 255, 255, 1);
	          background-color: rgba(65, 171, 133, 1);
          }
        }
      }
    }
  }
}
</style>
