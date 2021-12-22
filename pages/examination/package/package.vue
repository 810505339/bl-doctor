<template>
  <view class="examination-package">
    <view class="top" :style="style">
      <text class="cuIcon-back top-icon" @click="goBack"></text>
      <view class="top-tab" :style="[{height:titleBarHeight + 'px'}]">
        <view class="tab-item" @click="changeTab(1)">
          <view class="tab-item-tag">体检套餐</view>
          <view v-if="currentTab == 1" class="active"></view>
        </view>
        <view class="tab-item" @click="changeTab(2)">
          <view class="tab-item-tag">体检机构</view>
          <view v-if="currentTab == 2" class="active"></view>
        </view>
      </view>
    </view>
    <block v-if="currentTab == 1">
      <top-nav :list="[{label:'综合',value:1},{label:'销量',value:0},{label:'价格',value:0}]" @sreachData="sreachData"></top-nav>
      <uniCard :list="goodsList" @jumpDetail="jump"></uniCard>
    </block>
    <block v-if="currentTab == 2">
      <top-nav-other :list="[{label:'销量',value:0},{label:'价格',value:0}]" @sreachData="sreachData1"></top-nav-other>
      <uniCardOther :list="goodsList" @jumpDetail="jump"></uniCardOther>
    </block>
  </view>
</template>

<script>
import topNav from '../components/top-nav/top-nav.vue'
import topNavOther from '../components/top-nav/top-nav-other.vue'
import uniCard from '../components/uni-card/uni-card.vue'
import uniCardOther from '../components/uni-card/uni-card-other.vue'
import UIcon from '../../../uni_modules/uview-ui/components/u-icon/u-icon.vue'
export default {
  components: {
    uniCard,
    topNav,
    topNavOther,
    uniCardOther,
    UIcon
  },
  data () {
    return {
      currentTab:1,
      goodsList:[],
      city_id:'',
      statusBar: this.StatusBar,
      customBar: this.CustomBar,
    }
  },
  computed: {
    style() {
      let statusBar = this.statusBar
      let titleBarHeight = this.customBar - this.statusBar
      var style = `height:${titleBarHeight}px;padding-top:${statusBar}px;backgroundColor:#fff`
      return style
    },
    titleBarHeight(){
      return this.customBar - this.statusBar
    }
  },
  methods: {
    goBack(){
      uni.navigateBack({
        delta: 1
      })
    },
    async sreachData(parms){
      const {data} = await this.$axios({
        url:'/api/users/physical_exam/physical_exam_list',
        data:parms
      })
      this.city_id = parms.city_id
      data.list.forEach(item=>{ 
        this.goodsList.push({
          ...item,tagName:item.project.split(',')
        })
      })
    },
    changeTab(current){
      this.currentTab = current
    },
    async sreachData1(parms){
      this.city_id = parms.city_id
      const {data} = await this.$axios({
        url:'/api/users/physical_exam/mechanism',
        data:parms
      })
      this.goodsList = data.arr.data
    },
    jump(item){
      uni.navigateTo({
        url:`/pages/examination/package/package-detail/package-detail?city_id=${this.city_id}&title=${item.title}`
      })
    }
  } 
}
</script>
<style lang="scss" scoped>
@import '@/components/colorui/icon.css';
.examination-package{
  .top{
    position: relative;
    &-icon{
      position: absolute;
      top: 18rpx;
      left: 18rpx;
    }
    &-tab{
    display: flex;
    justify-content: center;
    align-items: center;
    .tab-item{
      display: flex;
      flex-direction: column;
      align-items: center;
      &:nth-child(1){
        margin-right: 32rpx;
      }
      .tab-item-tag{
        font-size: 32rpx;
        font-weight: bold;
        color: #505050;
      }
      .active{
        width: 48rpx;
        height: 8rpx;
        background: #41ab85;
        border-radius: 32rpx;
      }
    }

  }
  }

}

</style>
