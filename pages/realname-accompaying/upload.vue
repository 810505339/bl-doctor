<template>
  <view>
    <u-upload
      :fileList="fileList"
      @afterRead="afterRead"
      @delete="deletePic"
      multiple
      :maxCount="1"
    >
      <image :src="url" mode="widthFix" style="width: 250rpx;height: 150rpx;"></image>
    </u-upload>
  </view>
</template>

<script>
import { getStorage } from '../../utils/cookies'
export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    fileList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    // 删除图片
    deletePic(event) {
      this.fileList.splice(event.index, 1)
    },
    // 新增图片
    async afterRead(event) {
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file)
      lists.map((item) => {
        this.fileList.push({
          ...item,
          status: 'uploading',
          message: '上传中'
        })
      })
      const result = await this.uploadFilePromise(lists[0].thumb)
      let item = this.fileList[0]
      this.fileList.splice(0, 1, Object.assign(item, {
        status: 'success',
        message: '',
        url: result
      }))
      this.$emit('get_idcard', result.url)
    },
    uploadFilePromise(url) {
      return new Promise((resolve) => {
        uni.uploadFile({
          url: 'http://service-white-gragon.ascetic.top/api/upload_img', // 仅为示例，非真实的接口地址
          filePath: url,
          name: 'file',
          header: {
            Authorized: getStorage()
          },
          success: (res) => {
            const data = JSON.parse(res.data)
            if(data.code === -1) {
              uni.$u.toast(data.msg)
              uni.navigateTo({
                url: '/pages/login/login'
              })
            }
            resolve(data.data)
          }
        })
      })
    }
  }
}
</script>