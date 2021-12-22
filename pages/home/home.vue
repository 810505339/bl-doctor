<template>
  <view class="u-page">
    <u-navbar bg-color="#41ab85" :safeAreaInsetTop="true" rightIcon="chat" >
      <view class="my_nav" slot="left">
        <image class="image" src="../../static/escort-service/location-white.png"></image>
        {{location}}
      </view>
      <image slot="right" class="right_img"></image>
    </u-navbar>
    <u-navbar :safeAreaInsetTop="false">
      <view class="u-nav-slot" slot="left">
        <u--input prefixIcon="search" placeholder="搜索疾病、症状、科室、药品" border="surround" @focus="focus"></u--input>
      </view>
    </u-navbar>
    <view class="img">
      <image src="../../static/home/banner.jpg"></image>
    </view>
    <ScrollList></ScrollList>
    <Map></Map>
    <Tabs :more="more"></Tabs>
    <Recommend></Recommend>
    <view class="u-page__item">
      <u-tabbar :border="false" :value="value6" @change="change6" :fixed="true" :placeholder="true" :safeAreaInsetBottom="true">
        <u-tabbar-item v-for="(item,index) in tabbarList" :key="index" @click="goPage(item, index)">
          <view slot="text" class="home_text">
            <view :class="value6 === index ? 'activeColor' : 'inactiveColor'">{{item.title}}</view>
            <view :class="value6 === index ? 'active' : ''"></view>
          </view>
        </u-tabbar-item>
      </u-tabbar>
    </view>
  </view>
</template>

<script>
import ScrollList from './scrollList.vue'
import Map from './map.vue'
import Recommend from './recommend.vue'
import Tabs from './tabs.vue'
	export default {
    components: {
      ScrollList,
      Map,
      Recommend,
      Tabs
    },
		data() {
			return { 
        search: '',
				value6: 0,
        tabbarList: [
          {title: '首页', path: '/pages/home/home'},
          {title: '健康档案', path: '/pages/home/home'},
          {title: '我的问诊', path: '/pages/home/home'},
          {title: '个人中心', path: '/pages/home/home'}
        ],
        location: '',
        more: true
			}
		},
		mounted() {
      this.getContext()
		},
    onhide() {
      this.more = false
    },
		methods: {
			change6(name) {
        this.value6 = name
			},
      focus() {
        uni.navigateTo({
          url: '/pages/home/search'
        })
      },
      goPage(item, index) {
        if(this.value6 === index) return 
        uni.navigateTo({
          url: item.path
        })
      },
      getContext() {
        let that = this
        uni.getLocation({
					type:'gcj02',
					success: (res) => {
						const point = new plus.maps.Point(res.longitude, res.latitude);
						plus.maps.Map.reverseGeocode(
							point,
							{},
							event => {
								const address = event.address; // 转换后的地理位置
								const reg = /.+?(省|市|自治区|自治州|县|区)/g;
								const addressList=address.match(reg).toString().split(",");
                that.location = addressList[0]
							}
						)
					}
				})
      }
		},
	}
</script>

<style lang="scss" scoped>
.u-page{
  padding-bottom: 160rpx;
}
.home_text{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.active{
  width: 40rpx;
  border: 1px solid #41ab85;
}
.activeColor{
  color: #41ab85;
  font-size: 32rpx;
}
.inactiveColor{
  color: #505050;
  font-size: 32rpx;
}
.u-navbar{
  background: #41ab85;
}
.u-nav-slot{
  margin-top: 10rpx;
  width: 700rpx;
  background: #fff;
  border-radius: 38rpx;
  border: 1px solid #41ab85;
}
.u-border{
  border-style: none;
}
.img{
  padding: 15rpx 15rpx 0 15rpx;
  background: #FFFFFF;
  image{
    width: 720rpx;
    height: 250rpx;
  }
}
.my_nav{
  color: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
  .image{
    width: 40rpx;
    height: 40rpx;
  }
}
.right_img{
  width: 30rpx;
  height: 30rpx;
}
::v-deep .u-tabbar__placeholder{
  display: none;
}
</style>
