<template>
  <view>
    <view v-for="medical in medicalList" :key="medical.id" class="medical-item" @click="handleClick(medical)">
      <view class="image" :style="{backgroundColor:medical.color}">
        <u--image :src="medical.icon" width="32px" height="32px"/>
      </view>
      <view class="context">
        <view class="title">{{ medical.title }}</view>
        <view class="sub">{{ medical.sub }}</view>
      </view>
      <view class="icon">
        <u-icon name="arrow-right" color="#000000" size="18"/>
      </view>
    </view>
  </view>
</template>

<script>

import drugs from '@/static/medical/drugs.png'
import health from '@/static/medical/health.png'
import life from '@/static/medical/life.png'
import needle from '@/static/medical/needle.png'
import virus from '@/static/medical/virus.png'


export default {
  name: "index",
  data() {
    return {
      medicalList: [
        {
          id: 0,
          title: '查药品',
          icon: drugs,
          sub: '服用前先看下说明书',
          color: '#41ab85',
          url:'/pages/medical/find-drugs'
        },
        {
          id: 1,
          title: '查疾病',
          icon: virus,
          sub: '各类疑难杂症汇总',
          color: '#8f6fd7',
          url:'/pages/medical/find-virus'
        },
        {
          id: 2,
          title: '查疫苗',
          icon: needle,
          sub: '接种秘籍',
          color: '#2a82e4',
          url:'/pages/medical/find-needle'
        },
        {
          id: 3,
          title: '养生知识',
          icon: health,
          sub: '养生要从这里开始',
          color: '#43cf7c',
          url:'/pages/medical/health'
        },
        {
          id: 4,
          title: '生活手册',
          icon: life,
          sub: '各类生活经验，码住',
          color: '#ff8d1a',
          url:'/pages/medical/life'
        },
      ]
    }
  },
  methods: {
    handleClick(medical){
      console.log(medical)
      uni.navigateTo({
        url:medical.url
      })
    }
  }
}
</script>

<style scoped lang="scss">
.medical-item {
  background: #ffffff;
  display: flex;
  align-items: center;
  flex-direction:row;
  flex:1;
  position: relative;
  padding: 56rpx 40rpx;
  box-sizing: content-box;

  &:after {
    content: '';
    border-bottom: 1px solid rgb(214, 215, 217);
    transform: scaleY(0.5);
    position: absolute;
    width: 100%;
    bottom: 0;
  }




  .image {
    width: 88rpx;
    height: 88rpx;
    border-radius: 32rpx;
    position: relative;

    /deep/ .u-transition {
      .u-image {
        width: 100%;
        height: 100%;

        image {
          position: absolute;
          z-index: 10;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }

      width: 100%;
      height: 100%;
    }
  }
  .context{
    margin-left: 18rpx;
    .title{
      font-weight: bold;
      font-size: 36rpx;
      margin-bottom: 5rpx;
    }
    .sub{
      font-size: 24rpx;
      color:#a6a6a6;
    }
  }
  .icon{
    position: absolute;
    right: 10rpx;

  }
}


</style>