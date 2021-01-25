<template>
  <a-layout>
    <a-layout-header> <Header :isMobile="isMobile" /> </a-layout-header>
    <a-layout-content> <Nuxt /></a-layout-content>
    <a-layout-footer>
      <span>&copy; 2019-Now</span>
      <span>
        Powered by .NET 5, Based on
        <a href="https://github.com/KnifezZZ/KnifeZ.Virgo"> KnifeZ.Virgo </a>
        development
      </span>
      <template v-if="isHomePage">
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
      </template>
    </a-layout-footer>
  </a-layout>
</template>
<script>
import 'static/css/default.less'
export default {
  data() {
    return {
      isMobile: false,
    }
  },
  computed: {
    isHomePage: function () {
      return this.$route.path === '/'
    },
  },
  mounted() {
    if (process.browser) {
      let ua = navigator.userAgent
      this.isMobile = !!ua.match(/AppleWebKit.*Mobile.*/)
    }
  },
}
</script>
