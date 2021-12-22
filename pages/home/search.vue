<template>
  <view class="search">
    <u-navbar bg-color="#FFFFFF" :safeAreaInsetTop="true">
      <view class="u-nav-slot" slot="left">
        <u-icon name="arrow-left" size="20" @click="leftClick"></u-icon>
        <u-input v-model="keywords" class="search_input" prefixIcon="search" placeholder="哈医大四院"></u-input>
      </view>
      <view slot="right" @click="searchInfo">搜索</view>
    </u-navbar>
    <view class="history">
      <view class="history_search">
        <view>搜索历史</view>
        <u-icon @click="deleteSearch" name="trash-fill" size="16"></u-icon>
      </view>
      <view class="history_list">
        <view v-for="log in allList.log" :key="log.id">{{log.keywords}}</view>
      </view>
    </view>
    <view class="history">
      <view class="history_search">
        <view>热门搜索</view>
        <view class="hot_right">
          <!-- <u-icon name="reload" color="#41ab85" size="20"></u-icon>
          <text>换一批</text>-->
        </view>
      </view>
      <view class="history_list">
        <view v-for="hot in allList.hot" :key="hot.id">{{hot.keywords}}</view>
      </view>
    </view>
    <view class="search_top">
      <view class="search_top_title">
        <image src="../../static/search/hot.png"></image>
        <text>搜索榜单</text>
      </view>
      <view class="search_top_content" v-for="(item,index) in allList.list" :key="item.id">
        <view class="search_top_item">
          <template v-if="index<3">
            <image v-if="index===0" src="../../static/search/hot1.png"></image>
            <image v-if="index===1" src="../../static/search/hot2.png"></image>
            <image v-if="index===2" src="../../static/search/hot3.png"></image>
          </template>
          <view v-else class="index_title">{{++index}}</view>
          <image class="img" :src="item.img_url"></image>
          <view class="search_top_item_dec">
            <view class="tit">{{item.title}}</view>
            <view class="fans">{{item.search_num}}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      allList: [],
      keywords: ''
    }
  },
  mounted() {
    this.getSearchList()
  },
  methods: {
    // 点击所有跳转到找医院页面
    searchInfo() {
      uni.navigateTo({
        url: `/pages/hospital-service/hospital-service?name=${this.keywords}`
      })
    },
    async getSearchList() {
      const {data} = await this.$axios({
        url: '/api/users/hospital/search'
      })
      this.allList = data
    },  
    async deleteSearch() {
      const res = await this.$axios({
        method: 'post',
        url: '/api/users/hospital/search_delete'
      })
      if(res.code === 1) {
        this.getSearchList()
      }
    },
    leftClick() {
      uni.navigateBack()
    }
  }
}
</script>

<style lang="scss" scoped>
.u-nav-slot{
  display: flex;
  justify-content: center;
  align-items: center;
  .search_input{
    width: 570rpx;
    border-radius: 36rpx;
    background: #f3f4f8;
    margin-left: 10rpx;
  }
}
.history{
  background: #FFFFFF;
  padding: 26rpx 20rpx 20rpx 20rpx;
  .history_search{
    display: flex;
    justify-content: space-between;
    .hot_right{
      display: flex;
      justify-content: center;
      align-items: center;
      color: #41ab85;
    }
  }
  .history_list{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    view{
      background: #f3f4f8;
      color: #505050;
      border-radius: 32rpx;
      padding: 0 10rpx;
      margin-top: 20rpx;
      margin-left: 20rpx;
      font-size: 28rpx;
    }
  }
}
.search_top{
  display: flex;
  flex-direction: column;
  margin: 36rpx 20rpx;
  .search_top_title{
    margin-bottom: 20rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    image{
      width: 40rpx;
      height: 40rpx;
    }
    text{
      color: #ff5733;
      font-size: 16px;
      margin-left: 10rpx;
    }
  }
  .search_top_content{
    .search_top_item{
      padding: 20rpx 20rpx;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      border-bottom: 1px solid #e5e5e5;
      background: #FFFFFF;
      .img{
        margin-left: 20rpx;
      }
      image{
        width: 62rpx;
        height: 62rpx;
      }
      view{
        .tit{
          color: #505050;
          font-size: 28rpx;
          font-weight: bold;
        }
        .fans{
          color: #505050;
          font-size: 20rpx;
        }
      }
      .index_title{
        margin: 0 25rpx 0 20rpx;
      }
      .search_top_item_dec{
        margin-left: 30rpx;
      }
    }
  }
}
::v-deep .u-navbar__content__left[data-v-95dec1ae], .u-navbar__content__right[data-v-95dec1ae] {
  padding: 0 26rpx 0 10rpx ;
}
::v-deep .u-navbar__content__right__text{
  color: #41ab85;
}
::v-deep .u-border{
  border-width: 0px;
  border-style: none;
}
</style>