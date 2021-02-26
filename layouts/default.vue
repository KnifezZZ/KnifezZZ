<template>
  <a-layout>
    <a-layout-header> <Header :isMobile="isMobile" /> </a-layout-header>
    <a-layout-content ref="nuxtContent">
      <Nuxt />
    </a-layout-content>
    <a-layout-footer>
      <div>
        <span>本站已稳定运行了{{ settleTime }}</span>
        <span>共计{{info.VisitCount}}人访问</span>
      </div>
      <span> Powered by .NET 5 on ubuntu </span>
      <div v-if="isHomePage">
        <span>
          <a href="http://www.beian.miit.gov.cn" target="_blank" rel="nofollow">
            豫ICP备19046815号
          </a>
        </span>
        <span>
          <a
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=41010202002829"
            target="_blank"
            rel="nofollow"
          >
            豫公网安备 41010202002829号
          </a>
        </span>
      </div>
    </a-layout-footer>
    <a-back-top>
      <div class="back-top">
        <v-icon icon="rocket"></v-icon>
      </div>
    </a-back-top>
  </a-layout>
</template>
<script>
import 'static/css/default.less'
export default {
  data() {
    return {
      isMobile: false,
      settleTime: '1天',
      timer: null,
      info: {},
    }
  },
  computed: {
    isHomePage: function () {
      return this.$route.path === '/'
    },
  },
  methods: {
    difference(beginTime, endTime) {
      var dateBegin = new Date(beginTime)
      var dateEnd = new Date(endTime)
      var dateDiff = dateEnd.getTime() - dateBegin.getTime() //时间差的毫秒数
      var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)) //计算出相差天数
      var leave1 = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
      var hours = Math.floor(leave1 / (3600 * 1000)) //计算出小时数
      //计算相差分钟数
      var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
      var minutes = Math.floor(leave2 / (60 * 1000)) //计算相差分钟数
      //计算相差秒数
      var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
      var seconds = Math.round(leave3 / 1000)
      return dayDiff + '天' + hours + '小时' + minutes + '分钟' + seconds + '秒'
    },
    getAuthorInfo() {
      this.$axios.$get("BlogView/GetAuthorInfo?user='KnifeZ'").then((res) => {
        this.info = res
      })
    },
  },
  mounted() {
    let _this = this
    this.timer = setInterval(() => {
      _this.settleTime = _this.difference('2020/01/15 22:59:00', new Date())
    }, 1000)
    if (process.browser) {
      this.getAuthorInfo()
      let ua = navigator.userAgent
      this.isMobile = !!ua.match(/AppleWebKit.*Mobile.*/)
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
    }
  },
}
</script>
