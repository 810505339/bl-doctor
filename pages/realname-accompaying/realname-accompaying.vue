<template>
  <view class="steps-one">
    <ActiveStepBar :stepList="stepList"></ActiveStepBar>
    <view class="user_form">
      <text class="u-demo-block__title">完善实名信息</text>
      <u--form class="form" labelPosition="top" :model="userInfo" :rules="rules" ref="form">
        <u-form-item label="姓名" prop="realname" borderBottom>
          <u--input v-model="userInfo.realname" border="none" placeholder="请输入真实姓名"></u--input>
        </u-form-item>
        <u-form-item label="性别" prop="gender" borderBottom @click="showSex = true; hideKeyboard()">
          <u-input v-model="userInfo.gender" disabled disabledColor="#ffffff" placeholder="请选择性别" border="none"></u-input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label="身份证号" prop="idnumber" borderBottom>
          <u--input v-model="userInfo.idnumber" border="none" placeholder="请输入身份证号"></u--input>
        </u-form-item>
        <u-form-item label="身份证照片">
          <view class="card_top">
            <Upload :fileList="fileListUp" :url="'../../static/doctor/图片 88.png'" @get_idcard="get_idcard_front" />
            <view class="card_top_ren">人面像</view>
          </view>
          <view class="card_top">
            <Upload :fileList="fileListDown" :url="'../../static/doctor/图片 89.png'" @get_idcard="get_dcard_backend" />
            <view class="card_top_ren">国徽像</view>
          </view>
        </u-form-item>
      </u--form>
    </view>
    <u-button class="footer_btn" text="下一步" @click="submit"></u-button>
    <u-action-sheet :show="showSex" :actions="actions" title="请选择性别" @close="showSex = false" @select="sexSelect"></u-action-sheet>
  </view>
</template>

<script>
import ActiveStepBar from '../../components/active-step-bar/active-step-bar.vue'
import Upload from './upload.vue'
export default {
  components: {
    ActiveStepBar,
    Upload
  },
  data() {
    return {
      stepList: [
        {title: '填写信息', value: 1},
        {title: '通过验证', value: 2}
      ],
      showSex: false,
      actions: [
        {
          name: '男',
          id: 1
        },
        {
          name: '女',
          id: 2
        }
      ],
      userInfo: {},
      fileListUp: [],
      fileListDown: [],
      rules: {
        realname: {
          type: 'string',
          required: true,
          message: '请填写姓名',
          trigger: ['blur', 'change']
        },
        gender: {
          type: 'string',
          max: 1,
          required: true,
          message: '请选择男或女',
          trigger: ['blur', 'change']
        },
        idnumber: {
          type: 'string',
          required: true,
          message: '请填写姓名',
          trigger: ['blur', 'change']
        }
      }
    }
  },
  computed: {
    flag() {
      return this.fileListUp.length && this.fileListDown.length
    } 
  },
  methods: {
    sexSelect(e) {
      this.userInfo.gender = e.name
    },
    submit() {
      // 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
      this.$refs.form.validate().then(async res => {
        if(this.flag) {
          const gender = this.actions.filter(item => item.name === this.userInfo.gender)
          try {
            // await this.$axios({
            //   method: 'post',
            //   url: '/api/accompanying/index/in',
            //   data: {
            //     ...this.userInfo,
            //     gender: gender[0].id
            //   }
            // })
            uni.navigateTo({
              url: '/pages/realname-accompaying/result'
            })
          } catch(e) {
            uni.$u.toast(e.msg)
          }
        } else {
          uni.$u.toast('请上传身份证')
        }
      }).catch(errors => {
        uni.$u.toast('校验失败12')
      })
    },
    hideKeyboard() {
      uni.hideKeyboard()
    },
    get_idcard_front(url) {
      this.userInfo.idcard_front = url
    },
    get_dcard_backend(url) {
      this.userInfo.dcard_backend = url
    }
  }
}
</script>

<style lang="scss" scoped>
uni-page-body{
  background: #FFFFFF;
  padding: 20rpx;
}
.user_form{
  margin-top: 40rpx;
  .u-demo-block__title{
    display: block;
    color: rgba(80, 80, 80, 1);
    font-size: 16px;
    font-weight: bold;
  }
  .form{
    margin-top: 30rpx;
  }
}
.card_top{
  margin-left: 20px;
  text-align: center;
  .card_top_ren {
    margin-top: 20rpx;
    color: rgba(80, 80, 80, 1);
	  font-size: 14px;
  }
}
.footer_btn{
  background: rgba(65, 171, 133, 1);
  font-size: 16px;
  color: #FFFFFF;
  font-weight: bold;
  border-radius: 25px;
  margin-top: 10px;
}
::v-deep .u-form-item__body__left{
  width: 100% !important;
}
</style>