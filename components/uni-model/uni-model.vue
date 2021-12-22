<template>
  <view>
    <view class="show-box-bg wx-login-box">
      <view class="conten">
        <view class="titl">
          <view>{{ textmsg.title || '代取报告' }}</view>
          <view>
            <slot name="icon"></slot>
          </view>
        </view>
        <view class="text">
          <slot name="body">
            <rich-text :nodes="textmsg.content"></rich-text>
          </slot>
        </view>
        <view class="text" style="margin-bottom: 50rpx;">{{ textmsg.contentTwo || '' }}</view>
        <template v-if="!isClose">
          <view :class="['btn-box']">
            <view class="cancel" @tap="$emit('cancel')">{{ textmsg.cancel }}</view>
            <view class="confirm" @tap="$emit('confirm',textmsg.type)">{{ textmsg.confirm }}</view>
          </view>
        </template>
      </view>
    </view>
  </view>
</template>

<script>
    export default {
        props: {
            textmsg: {
                type: Object,
                default: () => ({})
            },
            isClose: {
                type: Boolean,
                default: false
            }
        },
        methods:{
            operation(e){
                let type = e
                this.$emit('operation',type)
            },
        }
    }
</script>

<style scoped lang="scss">
    .wx-login-box {
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 901;
        .conten {
            width: 85%;
            // height: 400upx;
            background-color: #FFFFFF;
            z-index: 1000;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            border-radius: 14upx;
            overflow: hidden;
            .titl {
                width: 90%;
                height: 80rpx;
                font-size: 28rpx;
                padding: 0 5%;
                text-align: center;
                line-height: 140rpx;
				border-bottom: 1px solid #999999;
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #505050;
            }
            .text {
                width: 90%;
                font-size: 28rpx;
                padding: 0 5%;
                text-align: center;
				color: #505050;
            }
            .memberY {
                width: 90%;
                font-size: 28rpx;
                color: #FFCC00;
                padding: 0 5%;
                text-align: center;
            }
            .memberB {
                width: 90%;
                font-size: 28rpx;
                color: #007AFF;
                padding: 0 5%;
                text-align: center;
            }
            .btn-box {
                width: 100%;
                height: 90rpx;
                display: flex;
                border-top: 2rpx solid #969696;
                .cancel {
                    width: 50%;
                    height: 100%;
                    font-size: 40rpx;
                    color: #999;
                    text-align: center;
                    line-height: 89rpx;
                    border-right: 2rpx solid #969696;
                }
                .confirm {
                    width: 50%;
                    height: 100%;
                    font-size: 40rpx;
                    color: #ffcc00;
                    text-align: center;
                    line-height: 99rpx;
                }
            }
        }
        
    }
    .isClose{
		display: none !important;
	}
</style>
