<template>
  <view class="select-hospital">
    <view class="search">
      <u--input @input="getHospitalList" class="input" v-model="title" prefixIcon="search" placeholder="搜索医院名称" border="surround"></u--input>
    </view>
    <view class="address">
      <Address></Address>
    </view>
    <view class="list_item" v-for="item in lists" :key="item.id" @click="selectHos(item)">
      <image :src="item.img_url"></image>
      <view class="list_item_right">
        <view class="list_item_content">
          <view>{{item.title}}</view>
          <view class="next">
            <view>{{item.level}}</view>
            <view v-for="(cur,index) in item.tags" :key="index">{{cur}}</view>
          </view>
        </view>
        <!-- <view class="money">￥50元</view> -->
      </view>
    </view>
  </view>
</template>

<script>
import Address from '../home/address.vue'
import {createNamespacedHelpers} from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('escort-service')
export default {
  components: {
    Address
  },
  data() {
    return {
      lists: [],
      lat: 39.909,
      lng: 116.39742,
      title: '',
      city_id: ''
    }
  },
  computed: {
    ...mapState(['nav_list'])
  },
  onLoad(options) {
    this.getLocation()
    Object.keys(options).forEach(key => {
      this.key = key
      this.index = options[key]
    })
  },
  methods: {
    ...mapMutations(['change_nav_list']),
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
        }, 2000)
      }
    },
    selectHos(item) { // 格式固定为了会诊数据，别人要想存储数据可以自己定一个vuex方法
      if(this.key && this.index) {
        const obj = {
          title: item.title,
          note: item.register_phone
        }
        this.change_nav_list({key: this.key, index: this.index, value: obj})
        const back = this.nav_list[this.key][this.index].back
        const flag = this.nav_list[this.key][this.index].id
        uni.redirectTo({
          url: back +'?id=' + flag
        })
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.select-hospital{
  height: 100%;
}
.search{
  background: #FFFFFF;
  padding: 0 20rpx;
  .input{
    background: #f3f4f8;
  }
}
.address{
  background: #FFFFFF;
  padding: 20rpx;
}
.list_item{
  margin: 20rpx;
  display: flex;
  align-items: center; 
  background: #ffffff;
  padding: 20rpx;
  image{
    width: 48rpx;
    height: 48rpx;
  }
  .list_item_right{
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .list_item_content{
      display: flex;
      flex-direction: column;
      margin-left: 20rpx;
      .next{
        display: flex;
        color: #505050;
        view:nth-child(1) {
          color: #41ab85;
        }
        view{
          margin-right: 20rpx;
        }
      }
    }
    .money{
      color: #ff8d1a;
    }
  }
}
</style>