<template>
	<view>
		<view class="condition"><u-search inputAlign="left" height="70" v-model="serch" shape="round" placeholder="搜索医生、擅长、专治"  @clear="clear" focus :animation ="false" @custom="searchClick" @search="searchClick"></u-search></view>
		<view>
			<view class="detail_list"><UnDetail :list="contentList" needVisible></UnDetail></view>
		</view>
		</view>
</template>

<script>
import UnDetail from './unDeatil.vue';
export default {
	components: {
		UnDetail
	},
	data() {
		return {
			city_id: '',
			section_id: '',
			receive: 0,
			scoring: 0,
			contentList: [],
			serch:''
		};
	},
	mounted() {
		this.getContent();
	},
	methods: {
		async getContent() {
			const { data } = await this.$axios({
				url: '/api/users/doctor/list',
				data: {
					city_id: this.city_id,
					section_id: this.section_id,
					receive: this.receive,
					scoring: this.scoring
				}
			});
			this.contentList = data.list.data.data;
		},
		clear(){
			this.serch = '';
		},
		searchClick(){
			console.log("搜索")
		}
	}
};
</script>

<style lang="scss" scoped>
.detail_list {
	border-radius: 12rpx;
	box-sizing: border-box;
}
.condition{
	background-color: rgba(255, 255, 255, 1);
	padding: 20rpx;
}

::v-deep .u-search__action{
	display: none;
}
</style>
