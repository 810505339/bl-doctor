<template>
  <view class="wait-message">
    <map id="map" style="width: 100%; height: 100vh; z-index: 0; position: fixed;" scale="10" :latitude="latitude" :longitude="longitude" :markers="covers">
      <view class="map_mark">
        <cover-image class="controls-img" src="../../../static/escort-service/voice-yellow.png"></cover-image>
        <cover-view class="controls-title">{{notic}}</cover-view>
      </view>

      <view class="map_btn">
        <cover-view class="map_btn_bk"></cover-view>
        <view class="btn">
          <cover-view class="map_btn_left" @click="cancleOrder">取消订单</cover-view>
          <cover-view class="map_btn_right" @click="confirmOrder">修改订单</cover-view>
        </view>
      </view>

      <view class="call_active">
        <cover-view class="call_active_title">正在呼叫陪诊人员接单...</cover-view>
        <cover-view class="call_active_body">用时：{{time}}</cover-view>
      </view>
    </map>
  </view>
</template>

<script>
import {disptime} from '../../../utils/times'
import {createNamespacedHelpers} from 'vuex'
const { mapState } = createNamespacedHelpers('escort-service')
export default {
  data() {
    return {
	  	notic: '',
			markList: [],
			time: '',
      latitude: 39.909,
      longitude: 116.39742,
      covers: [
        {
					width: 20,
					height: 20,
          latitude: 39.909,
          longitude: 116.39742,
          iconPath: '../../../static/escort-service/location.png',
					label: {
							content: '我的位置',
						color: '#007AFF',
						fontSize: 12,
						borderWidth: 12,
						borderColor: '#007AFF',
						borderRadius: 5,
						padding: 5,
						textAlign: 'center',
						bgColor: '#563BFF'
					}
        },
        {
          latitude: 39.9219,
          longitude: 116.44355,
          iconPath: '../../../static/escort-service/location-blue.png',
		  		label: {
		  	  content: '服务地点',
						color: '#007AFF',
						bgColor: '#2a82e4'
					}
        }
      ]
    }
  },
	computed: {
    ...mapState(['user_info']),
    order_id() {
      return this.user_info.order_id || 'ABN670482458852'
    }
  },
  onLoad() {
		this.getAccompanying()
  	// this.getLocation()
		this.getNotic()
		this.createTime()
  },
	onUnload() {
		clearInterval(this.timer)
	},
	onReady() {
		this._mapContext = uni.createMapContext('map', this)
	},
	
  methods:{
		createTime() {
			let t = disptime()
			this.timer = setInterval(() => {
				console.log(1)
				this.time = t()
			}, 1000)
		},
	  getLocation() {
			uni.getLocation({
				type:'gcj02',
				success: (res) => {
					this.longitude = res.longitude
					this.latitude = res.latitude
					this.covers[0].latitude = this.latitude
					this.covers[0].longitude = this.longitude
					this.getAccompanying()
				}
			})
	  },
	  async getAccompanying() {
			const {data} = await this.$axios({
				url: '/api/users/accompanying/person?lng=' + this.longitude + '&lat=' + this.latitude
			})
			this.markList = data.list
			this.addMarkInMap()
	  },
	  async getNotic() {
		  const {data} = await this.$axios({
			  url: '/api/users/accompanying/order_tips'
		  })
		  this.notic = data.data
	  },
		addMarkInMap() {
			let markrs = []
			this.markList.forEach(item => {
				const params = {
					id : item.id,
					latitude: item.lat,
					longitude: item.lng,
					// joinCluster: true, // 指定了该参数才会参与聚合
					// iconPath:'../../../static/escort-service/location.png',
					// width: 20,
					// height: 20,
					callout: {
						content: item.realname,
						// color: '#FFFFFF',
						// bgColor: '#79D0C6',
						// padding: '10',
						// textAlign: 'center',
						// borderRadius: 20,
						// fontSize: 10,
						// display: 'ALWAYS'
					}
				}
				markrs.push(params)
			})
			markrs.forEach(item => {
				console.log(item, 'item')
				this._mapContext.addMarkers({
					markers: [item],
					clear: false,
					success(res){
						console.log('addMarkers', res)
					},
					fail(res) {
						console.log('addMarkers', res)
					}
				})
			})
		},
		async cancleOrder() {
			// TODO 取消订单 跳转到订单详情
			const res = await this.$axios({
        method: 'post',
        url: '/api/users/accompanying/cancel_order',
        data: {
          order_sn: this.order_id
        }
      })
      if(res.code !== 1) {
        uni.showToast({
          title: res.msg
        })
        return
      }
			uni.navigateTo({
        url: '' // 跳转到订单列表
      })
		},
		confirmOrder() {
			// 确认订单
			uni.redirectTo({
				url: '/pages/escort/in-service/in-service'
			})
		}
  }
}
</script>

<style lang="scss" scoped>
	.map_mark{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin: 20rpx;
	}
	.controls-img{
		width: 72rpx;
		height: 72rpx;
		background: #FFFFFF;
	}
	.controls-title{
		width: 710rpx;
		height: 72rpx;
		line-height: 72rpx;
		background: #FFFFFF;
	}
	.call_active{
		position: fixed;
		bottom: 280rpx;
		margin: 20rpx 40rpx;
		overflow: hidden;
	}
	.call_active_title{
		font-size: 40rpx;
		color: #505050;
		font-weight: bold;
	}
	.call_active_body{
		margin-top: 20rpx;
	}
	.map_btn{
		position: fixed;
		bottom: 40rpx;
		background-color: #FFFFFF;
		margin: 20rpx
	}
	.map_btn_bk{
		background-color: #FFFFFF;
		width: 710rpx;
		height: 370rpx;
		border-radius: 20rpx;
		position: absolute;
		bottom: 0;
	}
	.btn{
		width: 710rpx;
		display: flex;
		justify-content: space-between;
		padding: 0 5%;
		position: relative;
		bottom: 40rpx;
	}
	.map_btn_left{
		width: 298rpx;
		height: 88rpx;
		text-align: center;
		line-height: 88rpx;
		background: #e5e5e5;
		border-radius: 46rpx;
		border: 1px solid #e5e5e5;
	}
	.map_btn_right{
		width: 298rpx;
		height: 88rpx;
		text-align: center;
		line-height: 88rpx;
		background-color: #41ab85;
		border-radius: 46rpx;
		border: 1px solid #e5e5e5;
		color: #FFFFFF;
		margin-right: 10%;
	}
</style>
