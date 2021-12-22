<template>
  <view class="pay-escort-service">
		<!-- 办理类型 -->
		<view class="select-picker">
			<view class="flash">办理类型</view>
			<picker class="my_picker" selector-type="select" @change.stop="subsitutePicker" :value="subsitute_index" :range="select_subsituteList">
				<view class="uni-input">{{subsituteList[subsitute_index] && subsituteList[subsitute_index].title}}</view>
				<image class="img" src="../../../static/accompany-service/selectDown.png"></image>
			</picker>
		</view>
    <view class="tab">
      <escortTab :msgList="handleList"></escortTab>
    </view>
    <view class="switch">
      <uni-list>
        <uni-list-item title="是否邮寄" :switchChecked="switchCheck"  :show-switch="true"  @switchChange="switchChange" ></uni-list-item>
      </uni-list>
    </view>
		<!-- 指定快递 -->
		<view class="select-picker">
			<view class="flash">指定快递</view>
			<picker class="my_picker" selector-type="select" @change.stop="bindPickerChange" :value="express_index" :range="select_expressList">
				<view class="uni-input">{{expressList[express_index] && expressList[express_index].title}}</view>
				<image class="img" src="../../../static/accompany-service/selectDown.png"></image>
			</picker>
		</view>
		<view class="form">
			<uni-forms :modelValue="formData" ref="form" :rules="rules">
				<uni-forms-item label="收件人" required name="addressee">
					<uni-easyinput type="text" v-model="formData.addressee" placeholder="请输入收件人" />
				</uni-forms-item>
				<uni-forms-item label="电话" required name="mobile">
					<uni-easyinput type="text" v-model="formData.mobile" placeholder="请输入电话" />
				</uni-forms-item>
				<uni-forms-item label="收件地址" required name="address">
					<uni-easyinput type="textarea" v-model="formData.address" placeholder="请输入收件地址" />
				</uni-forms-item>
			</uni-forms>
		</view>
		<view class="attribute">
			注意：需要邮寄服务，邮费均采用到付方式
		</view>
		<escortActive :price="price" :url="'/pages/escort/substitute-handle/substitute-handle'"></escortActive>
		<view class="work">
			<uni-list>
				<uni-list-item
					title="加辛苦费(元)"
					note="加些辛苦费更容易接单哦~"
					:rightText="`${hard_price}` + '元'"
					link
					@click="hardHandle"
				></uni-list-item>
			</uni-list>
		</view>
		<escortNote></escortNote>
		<escortPay @payMoneyHandle="payMoneyHandle" :active="active" :money="money"></escortPay>
		<u-toast ref="uToast"></u-toast>
		<!-- 加班辛苦钱 -->
    <uni-model v-show="visible" isClose>
      <template #icon>
        <text class="close" @click="visible=false">x</text>
      </template>
      <template #body>
        <view>
          <view class="getreport">
            <view class="btn-body">
              <button v-for="item in hard_price_list" :key="item.id" class="choose" @click="chooseSubstitute(item)">{{item.price}}</button>
            </view>
          </view>
        </view>
      </template>
    </uni-model>
  </view>
</template>

<script>
// 代为办理
import escortTab from '../../../components/escort-tab/escort-tab.vue'
import escortActive from '../escort-common/escort-active.vue'
import escortNote from '../escort-common/escort-note.vue'
import escortPay from '../escort-common/escort-pay.vue'
import {createNamespacedHelpers} from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('escort-service')
import {accAdd, Subtr} from '../../../utils/money'
export default {
  components: {
    escortTab,
		escortActive,
		escortNote,
		escortPay
  },
  data() {
    return {
			active: false,
			expressList: [],
			select_expressList: [],
			express_index: 0,
			switchCheck: false,
			subsituteList: [],
			select_subsituteList: [],
			subsitute_index: 0,
			formData: {
				addressee: '',
				mobile: '',
				address: ''
			},
			rules: {
				addressee: {
					rules: [{
						required: true,
						errorMessage: '请输入姓名',
					}]
				},
				mobile: {
					rules: [{
						required: true,
						format: 'mobile',
						errorMessage: '请输入正确的手机号',
					}]
				},
				address: {
					rules: [{
						required: true,
						errorMessage: '请输入收件地址',
					}]
				}
			},
			remarks: '', // 备注
			pay: '', // 支付金额
			hard_price: 0, // 辛苦费
			hard_price_list: [], // 辛苦费列表
			visible: false
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
		handleList() {
			return this.nav_list.handle
		},
		money() { // 最终支付的金额
			if(this.price) {
				return Subtr(accAdd(this.pay, this.hard_price), this.price)
			}
			return accAdd(this.pay, this.hard_price)
		}
	},
  onLoad() {
		this.getPayMoney()
		this.getSubsitudeList()
		this.getExpress()
  },
  methods: {
		...mapMutations(['change_order_id']),
		async getPayMoney() { // 获取页面的金额
			const {data} = await this.$axios({
				url: '/api/accompanying/price'
			})
			this.pay = data.data.service_price
			this.get_price = data.data.get_price
			this.hard_price_list = data.hard_price
		},
		async getSubsitudeList() {
			const {data} = await this.$axios({
				url: '/api/accompanying/transact'
			})
			this.subsituteList = data.arr
			this.select_subsituteList = this.subsituteList.map(item => item.title)
		},
		async getExpress() { // 获取快递列表
			const {data} = await this.$axios({
				url: '/api/index/logistics'
			})
			this.expressList = data.list
			this.select_expressList = data.list.map(item => item.title)
		},
		subsitutePicker(e) { // 代办类型
			this.subsitute_index = e.target.value
		},
    switchChange({value}) { // 开启按钮
      this.switchCheck = value
    },
		bindPickerChange(e){ // 切换快递名称索引
			this.express_index = e.target.value
		},
		payMoneyHandle() { // 点击支付按钮
			this.$refs.form.validate(async validate => {
				if(!validate) {
					const subId = this.subsituteList[this.subsitute_index].id
					const {addressee, mobile, address} = this.formData
					const patient_id = this.handleList[0].user_id
					const hospital_id = this.handleList[1].hospital_id || 12
					const data = {
						type: 2, // 下单类型 (1 即时单 2 代办 3 预约单)
						patient_id, // 患者id
						hospital_id, // 医院id
						coupon_id: this.coupon_id, // 优惠券id
						is_get: this.managerPrice ? 1 : 0, // 是否代取报告(1是0否)
						remarks: this.remarks, // 备注
						is_mail: this.switchCheck ? 1 : 0, // 是否邮寄(1是0否)
						hard_price: this.hard_price, // 辛苦费
						transact_id: subId, // 代办类型
						logistics_id: 3, // 物流id
						mail_name: addressee, // 收件人姓名
						mail_mobile: mobile, // 电话
						mail_address: address // 地址
					}
					try{
						this.active = true
						const res = await this.$axios({
							method: 'post',
							url: '/api/users/accompanying/order',
							data
						})
						this.change_order_id(res.data.order_sn) // 存储订单号
						this.active = false
						if(res.code !== 1) { // 下单失败
							uni.showToast({
								title: res.msg,
							})
							return
						}
						uni.redirectTo({
							url: '/pages/escort/wait-message/wait-message'
						})
					} catch(e) {
						this.active = false
						this.$refs.uToast.show({
							type: 'error',
							message: e.msg,
						})
					}
				}
			})
		},
		hardHandle() { // 点击辛苦费
			this.visible = true
		},
		chooseSubstitute(item) { // 选择辛苦费
			this.visible = false
			this.hard_price = item.price
		}
  }
}
</script>

<style lang="scss" scoped>
.pay-escort-service {
  margin: 20rpx;
  padding-bottom: 200rpx;
  .tab {
    margin-top: 20rpx;
  }
  .switch{
    margin-top: 20rpx;
  }
  .form{
	  background-color: #FFFFFF;
	  margin-top: 20rpx;
  }
  .attribute{
	  color: #d43030;
	  font-size: 28rpx;
	  margin-top: 20rpx;
  }
  .activity{
	  margin-top: 20rpx;
  }
  .work{
	  margin-top: 20rpx;
  }
	.select-picker{
		background: #FFFFFF;
		margin-top: 20rpx;
		display: flex;
		padding: 20rpx;
		align-items: center;
		.flash{
			color: #505050;
			font-size: 28rpx;
		}
		.my_picker{
			margin-left: 30rpx;
			flex: 1;
			.uni-input{
				position: absolute;
				left: 28%;
				top: -20rpx;
				color: #383838;
			}
			.img{
				width: 40rpx;
				height: 40rpx;
				float: right;
			}
		}
	}
}
.getreport{
		display: flex;
		text-align: left;
		flex-direction: column;
		margin: 10rpx 0;
		.btn-body{
			display: flex;
			align-items: center;
			margin: 10rpx 0;
			flex-wrap: wrap;
			button{
				margin: 10rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
	.close{
		font-size: 36rpx;
	}
	.choose{
		width: 20%;
		height: 60rpx;
		background-color: $uni-color-primary;
		color: #FFFFFF;
		font-size: 36rpx;
	}
::v-deep .picker>div{
	display: flex ;
	justify-content: space-between;
}
::v-deep .is-input-border[data-v-abe12412]{
	border: none;
}
::v-deep .uni-forms-item__inner[data-v-61dfc0d0]{
	padding-bottom: 0;
	border-bottom: 1px solid #e5e5e5;
	padding: 20rpx
}
::v-deep .uni-list--border-top {
  display: none !important;
}
::v-deep .uni-list--border-bottom {
  display: none !important;
}
::v-deep .uni-list::before{
		height: 0;
	}
	::v-deep .uni-list:after{
		height: 0;
	}
</style>
