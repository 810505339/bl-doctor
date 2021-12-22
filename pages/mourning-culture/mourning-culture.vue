<template>
  <view class="mourning-box">
    <view class="m-top">
      <view class="title">什么是“孝”文化？</view>
      <p class="m-top-content">
        每个人都有生老病死，我们自己也是，父母也是，我们都要敢于面对，孝顺父母是我们中华传统美德的重中之重，但当父母驾鹤西去那天，我们也应让他们体体面面，漂漂亮亮的离去。
      </p>
    </view>
    <view class="m-action">
      <view class="title">我们应该为去世的他做些什么？</view>
      <view
        class="action-item"
        v-for="(item, index) in actionList"
        :key="index"
      >
        <view class="item-title title"> {{ item.title }}</view>
        <p>{{ item.content }}</p>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      actionList: [
        {
          title: "小殓",
          content:
            "为尸体净身整容，穿上寿衣。这个步骤要尽早，甚至有时在断气之前就进行。",
        },
        {
          title: "报丧",
          content:
            "正式通知远近各处的亲友死亡时间、情况和葬礼安排。经常有严格的形势和顺序规定。亲友携带礼品、礼金、挽联、花圈等从外地来参加葬礼",
        },
      ],
    };
  },
};
</script>
<style scoped lang="scss">
.mourning-box {
  height: 1536rpx;
  width: 750rpx;
  padding: 20rpx;
  box-sizing: border-box;
  .title {
    height: 60rpx;
    color: rgba(80, 80, 80, 1);
    font-size: 40rpx;
    text-align: left;
    font-weight: bold;
    line-height: 60rpx;
  }
  .m-top-content {
    margin: 16rpx 0;
  }
  .m-action {
    .title {
      margin: 20rpx 0;
    }
    .action-item {
      margin-bottom: 20rpx;
    }
    .item-title {
      display: flex;
      align-items: center;
    }
    .item-title::before {
      content: "";
      height: 40rpx;
      width: 8rpx;
      margin-right: 14rpx;
      background-color: #000000;
    }
  }
}
</style>
