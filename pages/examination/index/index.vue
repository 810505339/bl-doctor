<template>
  <view class="examination-service">
    <cu-custom class="text-bold" :isBack="true" bgColor='#f3f4f8'>
      <block slot="content">体检服务</block>
      <!-- <block slot="right">
        <text class="right-text" @click="rightClick">订单</text>
      </block> -->
		</cu-custom>
    <select-search 
      placeholder='请在这里输入' 
      class="select-search"
      @searchBlur='searchBlur' 
      @determine='getContext'>
      </select-search>
    <view class="banner-box">
      <image class="banner" src="../../../static/examination/banner.png"></image>
      <view class="tag">
        <view v-for="(item, index) in list" :key="index" class="item" @click="jump(item.url)">
          <view class="bg" :style="{background:item.bgColor}">
            <image class="img" :src="item.uri"></image>
          </view>
          <view class="tag-name">{{item.tagName}}</view>
        </view>
      </view>
    </view>
    <view class="examination-cotent">
      <scroll-view scroll-x="true" class="scroll-nav">
        <block v-for="(item,index) in navList" :key="index">
            <view class="nav-item" @click="changeNav(item,index)"> 
              <view :class="[{'active-nav': currentNav==index }]">{{item.title}}</view>
              <view v-if="currentNav==index" class="active-line"></view>
            </view>
        </block>
      </scroll-view>
      <good-card :list="goodsList" @jumpCardDetail="jumpCardDetail"></good-card>
    </view>
    <view class="examination-recommend">
      <view class="recommend-title">体检百科</view>
      <block v-for="(item,index) in recommendList" :key="index">
        <view class="recommend-card" @tap="jumpDetail(item)">
          <image :src="item.img_url" class="recommend-img"></image>
          <view class="recommend-introduce">
            <view class="recommend-name">{{item.title}}</view>
            <view class="recommend-info">{{item.read}}阅读</view>
          </view>
        </view>
      </block>
    </view>
    <view v-if="false" class="lucky" @click="lucky">
      <image src="../../../static/examination/lucky.png" class="lucky-img"></image>
      <view class="lucky-title">点我抽奖</view>
    </view>
  </view>
</template>

<script>
import selectSearch from "../../../components/select-search/select-search.vue"
import goodCard from "../components/uni-card/uni-card.vue"
export default {
  components: {
    selectSearch,
    goodCard
  },
  data () {
    return {
      list: [
        { uri: '../../../static/examination/report.png', tagName: '体检报告', bgColor: '#41ab85',url:'/pages/examination/report/index' },
        { uri: '../../../static/examination/people.png', tagName: '体检套餐', bgColor: '#2a82e4',url:'/pages/examination/package/package' },
        { uri: '../../../static/examination/people.png', tagName: '团检预约', bgColor: '#8c6bd7',url:'/pages/examination/inspection/inspection' },
        { uri: '../../../static/examination/people.png', tagName: '报告解读', bgColor: '#e77630' ,url:'/pages/examination/unscramble/unscramble'}
      ],
      navList:[],
      currentNav:0,
      city_id:'',
      goodsList:[],
      title:'',
      recommendList:[]
    }
  },
  methods: {
    // 获取体检分类
    async getContext(value,title = this.title){
      this.city_id = value
      const {data} = await this.$axios({
        url: `/api/users/physical_exam/physical_exam_type?city_id=${value}&title=${title}`
      })
      this.navList = data.arr || []
      this.getGoodList(this.navList.length?data.arr[0].id:1)
      this.getRecommendList()
    },
    // 获取推荐列表
    async getRecommendList(){
      const {data} = await this.$axios({
        url: `/api/users/physical_exam/article`
      })
      this.recommendList = data.list.data
    },
    // 获取商品卡片
    async getGoodList(type_id){
      const {data} = await this.$axios({
        url: `/api/users/physical_exam/physical_exam_list?type_id=${type_id}`
      })
      this.goodsList = data.list
    },
    // 切换体检类型
    changeNav(item,index){
      this.currentNav = index
      this.getGoodList(item.id)
      this.getRecommendList()
    },
    // 搜索框失焦事件
    searchBlur(value) {
      this.title = value
      this.getContext(this.city_id,value)
    },
    // 抽奖
    async lucky(){
      const luckrer = await this.$axios({
        url: `/api/users/physical_exam/lottery`,
        method:'POST'
      });
      uni.showToast({
        title: luckrer.msg,
        duration: 2000
      });
    },
    // 跳转二级页面
    jump(url){
      uni.navigateTo({
        url
      }) 
    },
    // 百科
    jumpDetail(item){
      uni.navigateTo({
        url:`/pages/examination/detail/information-detail?id=${item.id}`
      })
    },
    // 商品卡片跳转
    jumpCardDetail(item){
      uni.navigateTo({
        url:`/pages/examination/detail/examination-detail?id=${item.id}`
      })
    }
  }
}
</script>
<style lang="scss" scoped>
page {
  height: 100%;
  background-color: #f3f4f8;
}
.right-text{
	color: rgba(80, 80, 80, 1);
	font-size: 30rpx;
	line-height: 55rpx;
	font-weight: bold;
  margin-right: 18rpx;
}
.examination-service{
  overflow-y: scroll;
  .select-search{
    padding: 0 24rpx;
    background-color: #ffffff;
    box-sizing: border-box;
  }
  .banner-box {
    width: 100%;
    height: 474rpx;
    background-color: #ffffff;
    padding-top: 16rpx;
    box-sizing: border-box;
    .banner {
      height: 268rpx;
      width: 680rpx;
      display: block;
      margin: 0 auto ;
    }
    .tag {
      display: flex;
      margin-top: 26rpx;
      .item {
        width: 25%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .bg {
          width: 96rpx;
          height: 96rpx;
          border-radius: 32rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          .img {
            width: 62rpx;
            height: 62rpx;
            display: block;
          }
        }
        .tag-name {
          color: #505050;
          font-size: 28rpx;
          line-height: 42rpx;
          margin-top: 8rpx;
        }
      }
    }
  }
  .examination-cotent{
    margin-top: 22rpx;
    width: 100%;
    background-color:#ffffff ;
    .scroll-nav{
      height: 88rpx;
      white-space: nowrap;
      .nav-item{
        margin-right: 40rpx;
        display: inline-block;
        margin-left: 12rpx;
        line-height: 88rpx;
        height: 88rpx;
        font-size: 32rpx;
        font-weight: 300;
        color: #101010;
        position: relative;
        .active-nav{
          color:#505050;
          font-size: 32rpx;
          font-weight: bold;
        }
        .active-line{
          width: 48rpx;
          height: 8rpx;
          background-color: #41ab85;
          position: absolute;
          top:76rpx;
          left: 40rpx;
        }
      }
    }
    .goods-card{
      background-color: #ffffff;
      display: flex;
      margin: 28rpx 28rpx 0;
      padding-bottom:32rpx;
      border-bottom: 1rpx solid #a6a6a6;
      &:nth-last-child(1){
        border-bottom: none;
      }
      .good-img{
        width: 182rpx;
        height: 132rpx;
        display: block;
      }
      .good-introduce{
        display: flex;
        flex-direction: column;
        margin-left: 22rpx;
        .good-name{
          display: flex;
          .goods-name-left{
            font-size: 28rpx;
            line-height: 42rpx;
          }
          .goods-name-right{
            width: 32rpx;
            height: 32rpx;
            border-radius: 12rpx;
            background-color: #d43030;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20rpx;
            color: #ffffff;
            margin-top: 6rpx;
          }
        }
        .good-info{
          display: flex;
          justify-content: space-between;
          margin-top: 44rpx;
          width: 468rpx;
          .good-price{
            line-height: 48rpx;
            color: #ff5733;
            font-size: 32rpx;
          }
          .good-appointments{
            color:#a6a6a6;
            font-size: 28rpx;
            line-height: 42rpx;
          }
        }
      }
    }
  }
  .examination-recommend{
    margin-top: 18rpx;
    background-color: #ffffff;
    padding: 18rpx 26rpx 0;
    margin-bottom: 282rpx;
    .recommend-title{
      font-size: 32rpx;
      font-weight: bold;
      color: #505050;
      padding: 22rpx 0 28rpx;
    }
    .recommend-card{
      display: flex;
      padding: 22rpx 0 26rpx;
      border-bottom: 1rpx solid #a6a6a6;
      &:nth-last-child(1){
        border-bottom:none;
      }
      .recommend-img{
        width: 182rpx;
        height: 118rpx;
        display: block;
      }
      .recommend-introduce{
        margin-left: 18rpx;
        .recommend-name{
          color: #505050;
          font-size: 28rpx;
          line-height: 42rpx;
          font-weight: bold;
        }
        .recommend-info{
          margin-top: 40rpx;
          font-size: 22rpx;
          color: #a6a6a6;
          line-height: 36rpx;
        }
      }
    }
  }
  .lucky{
    position: fixed;
    bottom: 184rpx;
    right: 20rpx;
    height: 202rpx;
    width: 120rpx;
    .lucky-img{
      width: 120rpx;
      height: 170rpx;
      display: block;
    }
    .lucky-title{
      width: 112rpx;
      height: 48rpx;
      position: absolute;
      bottom: 0;
      right: 0;
      background-color: #ff5733;
      color:#ffffff;
      font-size: 24rpx;
      border-radius: 32rpx;
      line-height: 48rpx;
      text-align: center;
    }
  }
}
scroll-view ::-webkit-scrollbar{
  height: 0;
  width: 0;
  background-color: transparent;
}
</style>
