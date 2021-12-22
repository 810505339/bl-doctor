<template>
  <view class="pay-escort-service">
    <escortTab :msgList="escortList"></escortTab>
    <escortActive :price="price" :url="'/pages/escort/pay-escort-service/pay-escort-service'"></escortActive>
    <escortManager :visible.sync="visible" :rightText="managerPrice"></escortManager>
    <escortNote :remarks.sync="remarks"></escortNote>
    <escortPay @payMoneyHandle="payMoneyHandle" :money="payMoney" :active="active"></escortPay>
    <u-toast ref="uToast"></u-toast>
    <!-- 代取弹窗 -->
    <uni-model v-show="visible" isClose>
      <template #icon>
        <text class="close" @click="visible=false">x</text>
      </template>
      <template #body>
        <view>
          <view class="getreport">
            <view class="btn-body">
              <view>
                <button class="choose" @click="chooseSubstitute">是</button>
                <button class="default" @click="noSubstitute">否</button>
              </view>
              <view>代取报告{{managerPrice}}元/次</view>
            </view>
          </view>
        </view>
      </template>
    </uni-model>
  </view>
</template>

<script>
	import escortActive from '../escort-common/escort-active.vue'
	import escortManager from '../escort-common/escort-manager.vue'
 	import escortTab from '../../../components/escort-tab/escort-tab.vue'
	import escortNote from '../escort-common/escort-note.vue'
	import escortPay from '../escort-common/escort-pay.vue'
	import {createNamespacedHelpers} from 'vuex'
	const { mapState, mapMutations } = createNamespacedHelpers('escort-service')
	import {accAdd, Subtr} from '../../../utils/money'
	export default {
		components:{
			escortTab,
			escortActive,
			escortManager,
			escortNote,
			escortPay
		},
		data() {
			return {
				visible: false,
				active: false,
				remarks: '', // 备注
				managerPrice: '', // 代取金额
				pay: '' // 初始化支付金额
			}
		},
		computed: {
			...mapState(['user_info', 'nav_list']),
			price() { // 优惠券金额
				return this.user_info.active_info.price
			},
			coupon_id() { // 优惠券id
				return this.user_info.active_info.id
			},
			escortList() {
				return this.nav_list.escort
			},
			payMoney() { // 最终支付的金额
				if(this.price) {
					return Subtr(accAdd(this.pay, this.managerPrice), this.price)
				}
				return accAdd(this.pay, this.managerPrice)
			}
		},
		onLoad() {
			this.getPayMoney()
		},
		methods:{
			...mapMutations(['change_order_id']),
			async getPayMoney() {
				const {data: {data}} = await this.$axios({
					url: '/api/accompanying/price'
				})
				this.pay = data.service_price
				this.managerPrice = data.get_price
				this.get_price = data.get_price
			},
			chooseSubstitute() {
				this.visible = false
				if(!this.managerPrice) {
					this.managerPrice = this.get_price
				}
			},
			noSubstitute() {
				this.managerPrice = 0
				this.visible = false
			},
			async payMoneyHandle() {
				this.active = true
				const patient_id = this.escortList[0].user_id
				const hospital_id = this.escortList[1].hospital_id || 12
				const data = {
					type: 1, // 下单类型 (1 即时单 2 代办 3 预约单)
					patient_id, // 患者id
					hospital_id, // 医院id
					coupon_id: this.coupon_id, // 优惠券id
					is_get: this.managerPrice ? 1 : 0, // 是否代取报告(1是0否)
					remarks: this.remarks // 备注
				}
				try{
					const res = await this.$axios({
						method: 'post',
						url: '/api/users/accompanying/order',
						data
					})
					this.change_order_id(res.data.order_sn) // 存储订单号
					this.active = false
					if(res.code !== 1) { // 下单失败
						// 去订单页面
						uni.navigateTo({
							url: '/pages/mine-order/mine-order'
						})
					}
					uni.redirectTo({
						url: '/pages/escort/wait-message/wait-message'
					})
				}catch(e) {
					this.active = false
					this.$refs.uToast.show({
						type: 'error',
						message: e.msg,
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pay-escort-service{
		margin: 20rpx;
	}
	::v-deep .uni-list--border-top{
		display: none !important;
	}
	::v-deep .uni-list--border-bottom{
		display: none !important;
	}
	::v-deep .uni-list::before{
		height: 0;
	}
	::v-deep .uni-list:after{
		height: 0;
	}
	.getreport{
		display: flex;
		text-align: left;
		flex-direction: column;
		margin: 10rpx 0;
		.btn-body{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 10rpx 0;
			view{
				display: flex;
				button{
					text-align: center;
					line-height: 44rpx;
				}
				button:nth-child(2) {
					margin-left: 20rpx;
				}
			}
		}
	}
	.close{
		font-size: 36rpx;
	}
	.default{
		width: 112rpx;
		height: 44rpx;
		background-color: #383838;
		color: #FFFFFF;
		font-size: 24rpx;
	}
	.choose{
		width: 112rpx;
		height: 44rpx;
		background-color: $uni-color-primary;
		color: #FFFFFF;
		font-size: 24rpx;
	}
</style>
