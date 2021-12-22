<template>
  <view class="my_tabs">
    <view class="active_tab">
      <!-- <u-tabs style="width:50%" :list="list" @click="click"></u-tabs> -->
      <u-tabs style="width:53%" :list="list" @click="click"></u-tabs>
      <view @click="more_detail" v-if="more">更多</view>
    </view>
    <template v-if="index === 0">
      <!-- 名医棒 -->
      <FamousDoctor></FamousDoctor>
    </template>
    <template v-if="index === 1">
      <!-- 医院榜 -->
      <Hospital></Hospital>
    </template>
    <template v-if="index === 2">
      <!-- 陪护榜 -->
      <Escort></Escort>
    </template>
  </view>
</template>
<script>
import FamousDoctor from './famous-doctor.vue'
import Hospital from './hospital.vue'
import Escort from './escort.vue'
export default {
  props: {
    more: {
      type: Boolean,
      default: false
    }
  },
  components: {
    FamousDoctor,
    Hospital,
    Escort
  },
  data() {
    return {
      index: 0,
      list: [
        {
          name: '名医榜'
        },
        {
          name: '医院榜'
        },
        {
          name: '陪护榜'
        }
      ]
    }
  },
  methods: {
    click(item) {
      this.index = item.index
    },
    more_detail() {
      uni.navigateTo({
        url: '/pages/home/tabs'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.my_tabs {
  .active_tab {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #505050;
    font-size: 32rpx;
    view {
      margin-right: 40rpx;
    }
  }
}
</style>
