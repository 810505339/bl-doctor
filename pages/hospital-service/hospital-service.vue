<template>
  <view class="hospital-box">
    <uni-forms ref="form">
      <view class="input-box u-demo-block__content">
        <uni-forms-item name="text">
          <u--input
            placeholder="搜医院、医生、科室、疾病"
            v-model="title"
            border="surround"
            shape="circle"
            prefixIcon="search"
            @input="getHospitalList"
          ></u--input>
        </uni-forms-item>
      </view>
    </uni-forms>
    <view class="content-box">
      <view class="list-box">
        <view class="list-select">
          <view class="area">
            <Address @determine="determine"></Address>
          </view>
          <!-- <view class="sort" @click="show = true">
            <text>综合排序</text>
            <image src="../../static/hospital-service/img2.svg" mode=""></image>
          </view> -->
        </view>
        <ul class="list-ul">
          <li
            class="list-item"
            v-for="(item, index) in lists"
            :key="index"
            @click="getHospitalInfo(item)"
          >
            <image
              class="medal"
              :src="item.img_url"
              mode=""
            ></image>
            <view class="right_content">
              <view class="item-con">
                <view class="item-name">
                  {{ item.title }}
                </view>
                <view class="item-sort">
                  {{ item.level }}
                </view>
              </view>
              <view class="item-area">
                {{ item.city.name }}
              </view>
            </view>
          </li>
        </ul>
      </view>
      <u-picker :show="show" :columns="columns" @cancel="close"></u-picker>
    </view>
  </view>
</template>

<script>
import Address from '../home/address.vue'
export default {
  components: {
    Address
  },
  data() {
    return {
      lat: 39.909,
      lng: 116.39742,
      title: '',
      city_id: '',
      show: false,
      lists: [],
      columns: [["黑龙江", "北京", "上海"]],
    };
  },
  onLoad(options) {
    this.title = options.name ? options.name : ''
    this.getLocation()
    // this.getHospitalList()
  },
  methods: {
    getLocation() {
			uni.getLocation({
				type:'gcj02',
				success: (res) => {
					this.lng= res.longitude
					this.lat = res.latitude
					this.getHospitalList()
				}
			})
	  },
    async getHospitalList() {
      if(!this.flag) {
        this.flag = true
        setTimeout(async () => {
          const {data} = await this.$axios({
            url: '/api/users/hospital/index',
            data: {
              lng: this.lng,
              lat: this.lat,
              title: this.title,
              city_id: this.city_id
            }
          })
          this.lists = data.arr.data
          this.flag = false
        },2000)
      }
    },
    getHospitalInfo(val) {
      uni.navigateTo({
        url: "/pages/hospital-service/hospital-info?id="+val.id,
      });
      uni.$emit("hospitalInfo", val);
    },
    close() {
      this.show = false;
    },
    determine(id) {
      this.city_id = id
    }
  },
};
</script>

<style lang="scss" scoped>
.hospital-box {
  height: 100%;
  width: 100%;
  .input-box {
    background-color: #ffffff;
    padding: 0 20rpx;
    height: 100rpx;
    .u-input {
      background-color: rgba(243, 244, 248, 1);
    }
  }
  .content-box {
    height: 92%;
    background-color: rgba(243, 244, 248, 1);
    padding: 10rpx;
    .list-box {
      height: 100%;
      width: 100%;
      overflow: auto;
      color: rgba(80, 80, 80, 1);
      background-color: rgba(255, 255, 255, 1);
      .list-select {
        height: 100rpx;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .sort,
        .area {
          flex: 1;
          height: 100rpx;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-left: 40rpx;
          image {
            height: 40rpx;
            width: 40rpx;
          }
        }
      }
      .list-ul {
        padding: 0;
        margin: 0;
      }
      .list-item {
        height: 80rpx;
        padding: 20rpx 0;
        border-bottom: 1rpx solid rgba(229, 229, 229, 1);
        display: flex;
        align-items: center;
        .medal {
          height: 40rpx;
          width: 48rpx;
          margin-left: 20rpx;
        }
        .right_content{
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-left: 20rpx;
          margin-right: 20rpx;
          .item-con {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            .item-name {
              color: rgba(0, 0, 0, 1);
              font-size: 28rpx;
              font-weight: bold;
            }
            .item-sort {
              color: rgba(128, 128, 128, 1);
              font-size: 24rpx;
            }
          }
          .item-area {
            color: rgba(128, 128, 128, 1);
            font-size: 24rpx;
          }
        }
        
      }
    }
  }
}
</style>
