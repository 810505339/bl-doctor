<template>
  <view class="container">
    <u-navbar title="首页">
      <view slot="right">
        <image src="../../static/hospital-service/img8.svg" mode=""></image>
        <image src="../../static/hospital-service/img9.svg" mode=""></image>
        <image src="../../static/hospital-service/img10.svg" mode=""></image>
        <image src="../../static/hospital-service/img11.svg" mode=""></image>
      </view>
    </u-navbar>
    <view class="business-box">
      <view class="infor">
        <view class="infor-top">
          <view class="infor-name">
            <view class="name">{{ business.name }}</view>
            <view class="textDef"
              >销量{{ business.sales }}&nbsp;&nbsp;评分{{
                business.score
              }}</view
            >
          </view>
          <view class="infor-img">
            <image :src="business.src" mode=""></image>
          </view>
        </view>
        <view class="infor-con"> 介绍：{{ business.infor }} </view>
      </view>
      <view style="background-color: #fff">
        <u-tabs class="tabs" :list="list" @click="click"></u-tabs>
      </view>
      <view v-if="tabs == 0" class="list">
        <tree-select
          :navList="navList"
          :navIndex="navIndex"
          @vanClick="vanClick"
        >
          <view class="goods-box">
            <view class="goods" v-for="(item, index) in goodsList" :key="index">
              <image :src="item.src" class="goods-img"></image>
              <view class="goods-infor">
                <view class="name">{{ item.name }}</view>
                <view class="num">销量{{ item.num }}</view>
                <view class="price-box">
                  <text>￥{{ item.price }}</text
                  >&nbsp;&nbsp;
                  <text class="price">￥{{ item.costPrice }}</text>
                  <image
                    src="@/static/hospital-service/img12.svg"
                    v-if="add"
                    @click="addGoods(item)"
                  ></image>
                  <image
                    src="@/static/hospital-service/img13.svg"
                    v-else
                    @click="delGoods"
                  ></image>
                </view>
              </view>
            </view>
          </view>
        </tree-select>
        <view class="settlement">
          <image
            @click="showCat"
            src="@/static/hospital-service/img14.png"
          ></image>
          <view class="goods-num">{{ goodsNum }}</view>
          <text>￥{{ goodsPrice }}</text>
          <u-button
            type="primary"
            text="结算"
            shape="circle"
            class="btn"
            @click="submit"
          ></u-button>
        </view>
        <u-popup :show="show" mode="bottom" @close="close" @open="open">
          <view class="shop-cat">
            <view class="cat-title">
              <text>已选商品</text>
              <view class="clear">
                <image src="@/static/hospital-service/img15.svg"></image>
                <text @click="clearCats">清空</text>
              </view>
            </view>
            <view class="cat-item" v-for="(item, index) in cats" :key="index">
              <image class="cat-img" :src="item.src"></image>
              <view class="goods-item">
                <text>{{ item.name }}</text>
                <view class="goods-bottom">
                  <text>￥{{ item.price }}</text>
                  <view class="control">
                    <image
                      src="@/static/hospital-service/img12.svg"
                      @click="controlAdd(item)"
                    ></image>
                    <text>{{ item.num }}</text>
                    <image
                      src="@/static/hospital-service/img13.svg"
                      @click="controlDel(item)"
                    ></image>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </u-popup>
      </view>
      <view v-if="tabs == 1" class="business">
        <view class="bus-item">
          <text class="bus-name">商家地址</text>
          <view class="bus-content"
            >黑龙江省哈尔滨市道外区南头道撒撒肯定就哈克</view
          >
          <image src="@/static/hospital-service/img16.svg"></image>
        </view>
        <view class="bus-item">
          <text class="bus-name">联系商家</text>
          <view class="bus-content">0451-652****</view>
          <image src="@/static/hospital-service/img17.svg"></image>
        </view>
        <view class="bus-item">
          <text class="bus-name">认证信息</text>
          <view class="bus-content">
            <image src="@/static/hospital-service/img18.svg"></image>
            <text>平台已认证</text>
          </view>
        </view>
        <view class="bus-item1">
          <text class="bus-name">商家公告</text>
          <p class="bus-notice">
            哈尔滨殡葬服务,拥有专业的团队,收费透明,让逝者有一份尊严,免费咨询,安慰方式,祭奠服务,表达精神,传承孝道,百世圆满殡仪服务公司,让亲人多一份安慰
          </p>
        </view>
      </view>
      <view v-if="tabs == 2" class="complaint">
        <u-gap height="5"></u-gap>
        <view style="padding: 10rpx">投诉理由</view>
        <u-gap height="5"></u-gap>
        <view class="com-infor" @click="complaintShow = true"
          >{{ query.complaint }}
          <image src="@/static/hospital-service/img19.svg"></image>
        </view>
        <u-gap height="5"></u-gap>
        <view style="padding: 10rpx">详情描述</view>
        <u-gap height="5"></u-gap>
        <u--textarea
          v-model="query.value"
          placeholder="请输入描述"
        ></u--textarea>
        <u-gap height="5"></u-gap>
        <view style="padding: 10rpx">上传图片</view>
        <u-gap height="5"></u-gap>
        <u-upload
          :fileList="fileList1"
          @afterRead="afterRead"
          @delete="deletePic"
          name="1"
          multiple
          :maxCount="10"
          action="链接地址"
        ></u-upload>
        <view class="submitCom" @click="submitCom">提交</view>
        <u-picker
          :show="complaintShow"
          :columns="complaintColumns"
          @cancel="complaintShow = false"
          @confirm="confirm"
        ></u-picker>
      </view>
    </view>
  </view>
</template>
<script>
import treeSelect from "../medical/tree-select.vue";
export default {
  components: { treeSelect },
  data() {
    return {
      list: [{ name: "服务" }, { name: "商家" }, { name: "投诉" }],
      navList: [{ title: "棺材" }, { title: "骨灰盒" }, { title: "一条龙" }],
      navIndex: 0,
      business: {
        name: "御福祥寿材",
        sales: 1625,
        score: 4.5,
        src: "@/static/hospital-service/img.png",
        infor:
          "介绍：本店承接各教派丧葬，寿材众多，已服务数以千计已仙逝的人，大众口碑，值得信赖，给您的亲人、朋的亲",
      },
      goodsList: [],
      goodsList2: [
        {
          src: "",
          name: "金丝檀木棺材",
          num: 2,
          price: 5888,
          costPrice: 9999,
        },
        {
          src: "",
          name: "金丝檀木棺材",
          num: 2,
          price: 5888,
          costPrice: 9999,
        },
      ],
      goodsList1: [
        {
          src: "",
          name: "乌木棺材",
          num: 2,
          price: 12888,
          costPrice: null,
        },
        {
          src: "",
          name: "乌木棺材",
          num: 2,
          price: 12888,
          costPrice: null,
        },
      ],
      add: true,
      goodsNum: 0,
      goodsPrice: 5888,
      show: false,
      cats: [
        {
          src: "",
          name: "顶级棺材（不腐烂）",
          price: 5888,
          num: 1,
        },
        {
          src: "",
          name: "顶级棺材（不腐烂）",
          price: 5888,
          num: 1,
        },
        {
          src: "",
          name: "顶级棺材（不腐烂）",
          price: 5888,
          num: 1,
        },
        {
          src: "",
          name: "顶级棺材（不腐烂）",
          price: 5888,
          num: 1,
        },
      ],
      tabs: 0,
      fileList1: [],
      complaintShow: false,
      complaintColumns: [["虚假信息", "言而无信"]],
      query: {
        complaint: "请选择理由",
        value: "",
        src: "",
      },
    };
  },
  mounted() {
    this.goodsList = [...this.goodsList2];
  },
  methods: {
    click(item) {
      this.tabs = item.index;
    },
    vanClick(val) {
      this.navIndex = val;
      if (val == 0) {
        this.goodsList = [...this.goodsList2];
      } else {
        this.goodsList = [...this.goodsList1];
      }
    },
    addGoods(val) {
      this.goodsPrice += val.price;
      this.goodsNum++;
    },
    delGoods() {},
    close() {
      this.show = false;
    },
    open() {
      this.show = true;
    },
    controlAdd(val) {
      val.num++;
    },
    controlDel(val) {
      if (val.num) {
        val.num--;
      }
    },
    clearCats() {
      this.cats = [];
      this.show = false;
    },
    // 结算
    submit() {},
    // 购物车
    showCat() {
      if (this.cats.length) this.show = true;
    },
    // 删除图片
    deletePic(event) {
      this[`fileList${event.name}`].splice(event.index, 1);
    },
    // 新增图片
    async afterRead(event) {
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file);
      let fileListLen = this[`fileList${event.name}`].length;
      lists.map((item) => {
        this[`fileList${event.name}`].push({
          ...item,
          status: "uploading",
          message: "上传中",
        });
      });
      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].thumb);
        let item = this[`fileList${event.name}`][fileListLen];
        this[`fileList${event.name}`].splice(
          fileListLen,
          1,
          Object.assign(item, {
            status: "success",
            message: "",
            url: result,
          })
        );
        fileListLen++;
      }
    },
    submitCom() {},
    confirm(val) {
      this.complaintShow = false;
      this.query.complaint = val.value[0];
    },
  },
};
</script>
<style scoped lang="scss">
.container {
  width: 750rpx;
  overflow: hidden;
  .right {
    display: flex;
    image {
      height: 52rpx;
      width: 52rpx;
      margin-left: 10rpx;
    }
  }
  .business-box {
    position: absolute;
    top: 200rpx;
    border-radius: 12rpx;
    .infor {
      background-color: #ffffff;
      padding: 10rpx;
    }
    .infor-top {
      display: flex;
      align-items: center;
      .infor-name {
        flex: 1;
        .name {
          font-size: 36rpx;
          color: #000000;
          font-weight: bold;
          margin-bottom: 10rpx;
        }
        .textDef {
          color: rgba(166, 166, 166, 1);
        }
      }
      .infor-img {
        height: 100rpx;
        width: 100rpx;
      }
    }
    .infor-con {
      height: 72rpx;
      color: rgba(166, 166, 166, 1);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      line-height: 35rpx;
    }
  }
  .tabs {
    width: 375rpx;
    background-color: #ffffff;
  }
  .list {
    width: 100%;
    .goods-box {
      .goods {
        height: 136rpx;
        display: flex;
        margin-bottom: 20rpx;
        .goods-img {
          width: 136rpx;
          height: 136rpx;
        }
        .goods-infor {
          flex: 1;
          .name {
            font-weight: bold;
          }
          .num {
            font-size: 20rpx;
            color: rgba(128, 128, 128, 1);
          }
          .price-box {
            position: relative;
            .price {
              color: rgba(166, 166, 166, 1);
              text-decoration: line-through;
            }
            image {
              position: absolute;
              right: 20rpx;
              top: 50%;
              margin-top: -19rpx;
              height: 38rpx;
              width: 38rpx;
            }
          }
        }
      }
    }
  }
  .settlement {
    position: fixed;
    bottom: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    height: 96rpx;
    background-color: #ffffff;
    width: 100%;
    image {
      height: 68rpx;
      width: 68rpx;
    }
    text {
      padding-left: 20rpx;
      font-weight: bold;
    }
    .goods-num {
      position: absolute;
      top: 10rpx;
      left: 60rpx;
      height: 30rpx;
      width: 30rpx;
      text-align: center;
      line-height: 24rpx;
      font-size: 20rpx;
      background-color: rgba(255, 87, 51, 1);
      color: #ffffff;
      border-radius: 50%;
    }
    .btn {
      height: 56rpx;
      width: 180rpx;
      position: absolute;
      right: 20rpx;
      color: #ffffff;
      background: #000000;
    }
  }
  .shop-cat {
    padding: 10rpx;
  }
  .cat-title {
    height: 36rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .clear {
      image {
        height: 30rpx;
        width: 30rpx;
      }
    }
  }
  .cat-item {
    height: 172rpx;
    display: flex;
    margin-bottom: 10rpx;
    .cat-img {
      height: 136rpx;
      width: 136rpx;
    }
    .goods-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .goods-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .control {
          width: 200rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;
          image {
            height: 38rpx;
            width: 38rpx;
          }
        }
      }
    }
  }
  .business {
    padding: 0 10rpx;
    margin-top: 20rpx;
    background-color: #ffffff;
    .bus-item {
      background-color: #ffffff;
      border-bottom: 1px solid #dbdada;
      padding: 10rpx 0;
      display: flex;
      align-items: center;
      .bus-name {
        color: rgba(80, 80, 80, 1);
        font-size: 28rpx;
        font-weight: bold;
      }
      image {
        height: 56rpx;
        width: 56rpx;
      }
      .bus-content {
        width: 516rpx;
        padding: 0 15rpx;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: flex;
        align-items: center;
        image {
          height: 42rpx;
          width: 42rpx;
        }
      }
    }
    .bus-item1 {
      background-color: #ffffff;
      padding: 10rpx 0;
      display: flex;
      .bus-name {
        color: rgba(80, 80, 80, 1);
        font-size: 28rpx;
        font-weight: bold;
      }
      .bus-notice {
        width: 580rpx;
        padding: 0 15rpx;
        white-space: pre-wrap;
      }
    }
  }
  .complaint {
    position: relative;
    .com-infor {
      height: 96rpx;
      color: rgba(80, 80, 80, 1);
      display: flex;
      align-items: center;
      padding: 10rpx;
      background: #ffffff;
      position: relative;
      image {
        position: absolute;
        right: 20rpx;
        top: 50%;
        margin-top: -28rpx;
        height: 56rpx;
        width: 56rpx;
      }
    }
    .submitCom {
      position: fixed;
      bottom: 0;
      width: 100%;
      background-color: rgba(65, 171, 133, 1);
      font-size: 32rpx;
      text-align: center;
      height: 96rpx;
      line-height: 96rpx;
      font-weight: bold;
    }
  }
}
</style>
