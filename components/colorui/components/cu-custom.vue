<template>
  <view>
    <view class="cu-custom" :style="[{height:CustomBar + 'px',backgroundColor:'#fff'}]">
      <view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'']">
        <view class="action" @tap="BackPage" v-if="isBack">
          <text class="cuIcon-back"></text>
          <slot name="backText"></slot>
        </view>
        <view class="content" :style="[{top:StatusBar + 'px'}]">
          <slot name="content" @tap="centerClick"></slot>
        </view>
        <view class="action" :style="[{top:StatusBar + 'px'}]">
          <slot name="action"></slot>
        </view>
        <slot name="right"></slot>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      StatusBar: this.StatusBar,
      CustomBar: this.CustomBar
    }
  },
  name: 'cu-custom',
  computed: {
    style() {
      var StatusBar = this.StatusBar
      var CustomBar = this.CustomBar
      var bgImage = this.bgImage
      var bgColor = this.bgColor
      var style = `height:${CustomBar}px;padding-top:${StatusBar}px;background-color:${bgColor}`
      if (this.bgImage) {
        style = `${style}background-image:url(${bgImage});`
      }
      return style
    }
  },
  props: {
    bgColor: {
      type: String,
      default: ''
    },
    isBack: {
      type: [Boolean, String],
      default: false
    },
    bgImage: {
      type: String,
      default: ''
    },
    isCustomClick: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    BackPage() {
      if (this.isCustomClick) {
        this.$emit('custom-click')
        return false
      }
      if (getCurrentPages().length < 2 && 'undefined' !== typeof __wxConfig) {
        let url = '/' + __wxConfig.pages[0]
        return uni.redirectTo({ url })
      }
      uni.navigateBack({
        delta: 1
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../main.css';
@import '../icon.css';
</style>

