<template>
  <view>
    <view class="set_password">
      <uni-forms ref="form">
        <uni-forms-item>
          <uni-easyinput type="number" @input="changeMobile" :placeholder="text" />
        </uni-forms-item>
        <uni-forms-item>
          <uni-easyinput type="password" @input="changePassword" :placeholder="passwordText" />
        </uni-forms-item>
      </uni-forms>
    </view>
    <slot></slot>
  </view>
</template>

<script>
export default {
  props: ['text', 'passwordText'],
  methods: {
    changeMobile(value) {
      this.$emit('update:mobile', value)
    },
    changePassword(value) {
      this.$emit('update:password', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.set_password{
    margin: 40rpx;
  }
::v-deep .is-input-border[data-v-abe12412] {
  border-radius: 52rpx;
}
::v-deep .is-input-border[data-v-abe12412]{
  height: 96rpx;
}
</style>