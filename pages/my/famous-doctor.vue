<template>
  <view class="famous_doctor">
    <view class="search_id">
      <view @click="initIndex(0)" :class="{'address': true, 'active': index===0}">
        <Address @determine="determine"></Address>
      </view>
      <view @click="initIndex(1)" :class="{'address': true, 'active': index===1}">
        <u-cell-group>
          <u-cell :title="cellTitle" style="width: 200rpx;">
            <u-icon slot="right-icon" name="arrow-down-fill" size="12"></u-icon>
          </u-cell>
        </u-cell-group>
      </view>
      <view @click="initIndex(2)" :class="{'address': true, 'active': index===2}">接诊最多</view>
      <view @click="initIndex(3)" :class="{'address': true, 'active': index===3}">评分最高</view>
    </view>
    <view class="detail_list">
      <UnDetail :list="contentList" needVisible></UnDetail>
    </view>
    <u-picker keyName="title" :show="showPicker" :columns="columns" @cancel="cancel" @confirm="confirm" @change="changeHandler"></u-picker>
  </view>
</template>

<script>
import Address from './address.vue'
import UnDetail from './unDeatil.vue'
export default {
  components: {
    Address,
    UnDetail
  },
  data() {
    return {
      index: 0,
      showPicker: false,
      columns: [],
      columnData: [],
      cellTitle: '科室',
      city_id: '',
      section_id: '',
      receive: 0,
      scoring: 0,
      contentList: []
    }
  },
  mounted() {
    this.getPackerList()
    this.getContent()
  },
  methods: {
    async getContent() {
      const {data} = await this.$axios({
        url: '/api/users/doctor/list',
        data: {
          city_id: this.city_id,
          section_id: this.section_id,
          receive: this.receive, 
          scoring: this.scoring
        }
      })
      this.contentList = data.list.data.data
    },
    async getPackerList() {
      const {data} = await this.$axios({
        url: '/api/hospital/section_list'
      })
      const arr = data.list.map(item => {
        return {
          id: item.id,
          title: item.title
        }
      })
      this.columns.push(arr)
      data.list.forEach(item => {
        const arr = item.children && item.children.map(child => {
          return {
            id: child.id,
            title: child.title
          }
        })
        this.columnData.push(arr)
      })
      let firstArr = this.columnData.slice(0, 1)
      this.columns.push(...firstArr)
    },
    determine(value) {
      this.city_id = value
    },
    initIndex(index) {
      this.index = index
      if(index === 1) {
        this.showPicker = true
      }
      if(this.receive) {
        this.receive = 0
        this.scoring = 0
      } else {
        this.receive = 1
        this.scoring = 1
      }
      this.getContent()
    },
    confirm(item) {
			console.log(item);
      this.showPicker = false
      if(item.value[1]) {
        this.section_id = item.value[1].id
      }
      let arrTitleArr = item.value.map(item => item&&item.title)
      this.cellTitle = arrTitleArr[0]
      
      this.getContent()
    },
    cancel() {
      this.showPicker = false
    },
    changeHandler(e) {
      const {
        columnIndex,
        index,
        picker
      } = e
      if(columnIndex === 0) {
        picker.setColumnValues(1, this.columnData[index])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.famous_doctor{
  margin: 0 20rpx;
  margin-top: 20rpx;
  overflow: hidden;
  .search_id{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .address{
      border-radius: 28rpx;
      width: 170rpx;
      height: 52rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24rpx;
      background: #FFFFFF;
    }
  }
}
.active{
  background: #41ab85 !important;
  color: #FFFFFF;
}
.detail_list{
  border-radius: 12rpx;
  box-sizing: border-box;
}
::v-deep .active .u-cell__title-text[data-v-1c4434ae]{
  color: #FFFFFF;
}
::v-deep .active .u-cell__body[data-v-1c4434ae]{
  color: #FFFFFF;
}
</style>