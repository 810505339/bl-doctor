<template>
  <view class="recommend">
    <view class="nav">
      <view>为您推荐</view>
      <!-- <view class="nav_rig">
        展开
        <u-icon name="arrow-right" size="16"></u-icon>
      </view> -->
    </view>
    <view class="u-page__item">
      <u-cell-group>
        <u-cell class="my_text" v-for="item in list" :key="item.id" :title="item.title" value="内容" :label="item.read+'浏览'" @click="goDetail(item.id)" center>
          <view slot="value">
            <image class="img" :src="item.thumb_img"></image>
          </view>
        </u-cell>
      </u-cell-group>
    </view>
    <view class="nav_video" v-for="item in list" :key="item.id">
      <view class="title">{{item.title}}</view>
      <view class="video" v-html="videoContent(item.video_url)"></view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const {data} = await this.$axios({
        url: '/api/index/article'
      })
      this.list = data.list.data
    },
    videoContent(videoSrc) {
      return `<video controls src="${videoSrc}" style="width:100%;"></video>`
    },
    goDetail(id) {
      uni.navigateTo({
        url: `/pages/examination/detail/information-detail?id=${id}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.nav{
  margin: 20rpx 20rpx 10rpx 20rpx;
  display: flex;
  justify-content: space-between;
  .nav_rig{
    display: flex;
  }
}
.u-page__item{
  margin: 0 20rpx;
  background: #FFFFFF;
}
.img{
  width: 220rpx;
  height: 140rpx;
}
.nav_video{
  margin: 0 20rpx;
  .title{
    color: #383838;
  }
  .video{
    z-index: 2;
    video{
      width: 710rpx;
      height: 260rpx;
      z-index: 2;
    }
  }
}
.my_text{
  height: 210rpx;
}
</style>