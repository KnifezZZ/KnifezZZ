<template>
  <el-container id="knifez-blog">
    <el-container>
      <el-header>
        <HeaderBar class="mobile-header" />
      </el-header>
      <el-main>
        <Nuxt />
      </el-main>
      <el-backtop target="#knifez-blog" :visibility-height="100"></el-backtop>
    </el-container>
    <el-footer>
      <span>&copy; 2019-Now</span>
      <span>Powered By KNIFEZ</span>
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
    </el-footer>
  </el-container>
</template>
<script>
import "../assets/styles/default.less";
export default {
  data () {
    return {
    }
  },
  computed: {
    isHomePage: function () {
      return this.$route.path === '/'
    }
  },
  mounted () {
  }
}
</script>
