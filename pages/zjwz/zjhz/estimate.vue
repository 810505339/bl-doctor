<template>
	<view class="fwpj">
	 <uni-card isShadow @click="clickCard">
		 <h3>咨询医生</h3>
		<view class="uni-flex uni-row" style="-webkit-justify-content: space-between;justify-content: space-between;background-color: #f3f4f8;padding: 10px;border-radius: 8px;">
			<view class="text">
				<view class="uni-flex uni-row">
					<view class="text">
						<image class="uni-media-list-logo" :src="doctor.uri"></image>
					</view>
					<view class="text">
						<view>
							<span class="doctor">{{doctor.doctor}}</span>
							<span v-for="(itemChild, indexChild) in doctor.professional"
							:key="indexChild" class="professional">{{itemChild}}</span>
						</view>
						<view>
							<span>{{doctor.hospital}}</span>
							<span class="hospital">{{doctor.department}}</span>
						</view>
					</view>
				</view>
			</view>
			<view class="text"  style="padding-top: 15px;">
				<uni-icons type="forward" color="#999" size="16" />
			</view>
		</view>
	 </uni-card>
	 <uni-card isShadow>
		 <view class="uni-flex uni-row" style="padding: 15px 0;">
		 	<h3>服务评价</h3>
		 	<view class="text" style="margin: 10px 10px 15px 10px;">
				<uni-rate :value="5" @change="onRateChange"
				 :is-fill="false" :max="5" :margin="10"/>
			</view>
			<view class="text">{{rate}}</view>
		 </view>
	 	<view class="uni-textarea" >
	 		<textarea @blur="bindTextAreaBlur" auto-height style="min-height: 100px;"
			 placeholder-style="color:#cacdd1" placeholder="请对医生进行评价,可以帮助更多的患者"/>
		</view>
	 	<view>
			<u-checkbox-group
									v-model="checkboxValue1"
									placement="column"
									@change="checkboxChange"
								>
									<u-checkbox
										:customStyle="{marginBottom: '8px'}"
										v-for="(item, index) in checkboxList1"
										:key="index"
										:label="item.name"
										:name="item.name"
										activeColor="#41AB85"
									>
									</u-checkbox>
								</u-checkbox-group>

		</view>
	 </uni-card>
	 <uni-card isShadow>
	 		 <h3>评价标签</h3>
			 <view class="uni-flex uni-row" style="flex-wrap: wrap;">
			 	<view class="tag-view" v-for="(item, index) in tagList" :key="index" style="margin: 5px;">
			 		<uni-tag :circle="true" :inverted="!inverted[item.id]" :text="item.text" type="theme" @click="setInverted(item)" />
			 	</view>
			 </view>
	 </uni-card>
  </view>
</template>

<script>
	import uniCard from '@/components/uni-card/uni-card.vue';
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	import uniRate from '@/components/uni-rate/uni-rate.vue';
	import uniTag from '@/components/uni-tag/uni-tag.vue';
	import expertUrl from '@/api/expertConsulation'
	export default {
		components: {
			uniCard,uniIcons,uniRate,uniTag
		},
	  data() {
		return {
			doctor:{id:4, uri:'/static/examination/goods-img.jpg',
				doctor:'王守仁',professional:['主任医师',' 教授'], state:1,
				hospitalLevel:'三甲',hospital:'北京协和医院',department :'皮肤性病科', 
				good:['双眼皮环切手术','包皮环切手术','荨麻疹治疗']
			},
			checkboxValue1: ['匿名评价'],
			checkboxList1: [{
				name: '匿名评价',
				disabled: false
			}],
			rate:"很好",
			rateIndex:5,
			itemInverted: true,
			tagList:[],
			inverted:{},
			comments:[],
			text:'',
			isanonymous:1,
		}
	  },
	  mounted(){
		// this.initData()
	  },
	  created() {
	    this.getCommentTags()
	  },
	   computed:{
	   },
	  methods: {
		clickCard() {
			uni.showToast({  
				title: '点击卡片',
				icon: 'none'
			})
		},
		checkboxChange(n) {
			console.log('change', n);
			if(n.length>0){
				this.isanonymous = 1
			}else{
				this.isanonymous = 0
			}
		},
		bindTextAreaBlur: function (e) {
			console.log(e.detail.value)
			this.text = e.detail.value
		},
		setInverted(item, idx) {
			if(this.comments.length == 3 && this.inverted[item.id]!=true){
				uni.showToast({
					title: '最多添加三个标签',
					icon: 'none'
				})
				return
			}
			this.$set(this.inverted, item.id, !this.inverted[item.id]);
			if(this.inverted[item.id]==true){
				this.comments.push(item.id)
			}
			else{
				let index = this.comments.indexOf(item.id)
				this.comments.splice(index,1)
			}
			console.log(this.comments)
		},
		onRateChange(e){
			console.log('rate发生改变:' + JSON.stringify(e))
			this.rateIndex = e.value
			switch(e.value) {
			     case 1:
			        this.rate = "很差"
			        break;
			     case 2:
			       this.rate =  "差"
					break;
				case 3:
				   this.rate = "一般"
				   break;
				case 4:
				  this.rate =  "好"
				   break;
				   case 5:
					 this.rate =  "很好"
					  break;
			} 
		},
		async getCommentTags() {
			const {data} = await this.$axios({
			  url: expertUrl.getCommentTagList
			})
			console.log("------------TagList:", data.list)
			this.tagList = data.list
		},
		async setComments(){
			let data = {
				doctor_id: this.doctor.id,
				star: this.rateIndex,
				text: this.text,
				tags_id: this.comments,
				anonymous: this.isanonymous,
			}
			console.log("------提交评价：", data)
			const res = await this.$axios({
				method: 'post',
				url: expertUrl.doctorComment,
				data:data
			})
			console.log(res)
		},
	  },
	  onNavigationBarButtonTap(e) {
	  	console.log(e)
		this.setComments()
	  },
	  

	  
	}
</script>

<style lang="scss" scoped>
	.fwpj{
		.doctor{
			font-size: 20px;font-weight: bold;margin-right: 10px;
		}
		.professional{
			color: gray;
		}
		.hospital{
			margin-left: 10px;
		}
	}
</style>