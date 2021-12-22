<template>
  <view class="tree-select">
    <view class="nav">
      <view class="nav-item" :class="{active:i===navIndex}" @click="vanClick(i)" v-for="(nav,i) in navList" :key="i">
        {{ nav.title }}
      </view>
    </view>
    <view class="context">
      <slot/>


    </view>
  </view>
</template>

<script>
export default {
  name: "tree-select",

  props: {
    navList: {
      type: Array,
      default: () => []
    },
    navIndex: {
      type:Number,
      default:()=>0
    }
  },
  methods: {
    vanClick(i) {
      this.$emit('update:navIndex',i)
      this.$emit('vanClick', i)

    }
  }

}
</script>

<style scoped lang="scss">

.tree-select {
  display: flex;
  .nav {
    width: 240rpx;
    background: #f3f4f8;
    min-height: calc(100vh - 176rpx);

    .nav-item{
      padding: 11.5px 15px;
      font-size: 14px;
      text-align: center;
      box-sizing: content-box;

    }
    .active{
      background: #FFFFFF;
      font-weight: bold;
      position: relative;
      &:after{
        content: "";
        position: absolute;
        width: 3px;
        height: 24px;
        background: #41ab85;
        left: 0;
        border-radius: 5px;
      }
    }
  }

  .context {
    background: #FFFFFF;
    flex: 1;
    font-weight: bold;
  }
}

</style>