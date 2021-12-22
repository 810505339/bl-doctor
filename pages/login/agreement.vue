<template>
  <view>
    <rich-text :nodes="nodes"></rich-text>
  </view>
</template>

<script>
export default {
  data() {
    return {
      nodes: ''
    }
  },
  mounted() {
    const { agree } = this.$route.query
    this.index = agree || 0
    console.log(111)
    this.getInfo()
  },
  methods: {
    async getInfo() {
      // /protocol/use   软件使用许可协议  get
      // /protocol/statement   法律声明与隐私权政策   get
      // /protocol/Service    白龙医疗平台服务条款  get
      const url = [
        '/api/protocol/use',
        '/api/protocol/statement',
        '/api/protocol/Service'
      ]
      const {data} = await this.$axios({
        url: url[this.index]
      })
      this.nodes = data.data.content
    }
  }
}
</script>