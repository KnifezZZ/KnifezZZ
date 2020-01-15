<template>
  <div id="yur-content">
    <ClientOnly>
      <Banner v-if="isHome" />
      <Categories v-else-if="isCategories" :category="currentPage" />
      <Posts v-else-if="isPosts" />
      <Tags v-else-if="isTags" />
      <Timeline v-else-if="isTimeline" />
      <Link v-else-if="isLink" />
      <About v-else-if="isAbout" />
      <Post v-else-if="isPost" />
      <Page v-else-if="isSinglePage" />
    </ClientOnly>
    <a-back-top>
      <div class="ant-back-top-content">
        <div class="ant-back-top-icon" />
      </div>
    </a-back-top>
  </div>
</template>

<script>
import Banner from '@theme/components/Banner'
import Categories from '@theme/components/Categories'
import Page from '@theme/components/Page'
import Post from '@theme/components/Post'
import Posts from '@theme/components/Posts'
import Tags from '@theme/components/Tags'
import Timeline from '@theme/components/Timeline'
import Link from '@theme/components/Link'
import About from '@theme/components/About'
import { isBuild } from '../util'

export default {
  components: { Banner, Categories, Page, Post, Posts, Tags, Timeline, Link, About },
  props: {
    currentPage: {
      type: String,
      required: true,
    },
    currentPost: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      timeline: false,
      link: false,
      about: false,
    }
  },
  computed: {
    isHome () {
      return this.currentPage === '/'
    },
    isCategories () {
      return this.$categories.includes(this.currentPage) && !this.currentPost
    },
    isPosts () {
      return this.currentPage === 'posts'
    },
    isTags () {
      return this.currentPage === 'tags'
    },
    isTimeline () {
      return this.currentPage === 'timeline' && this.timeline
    },
    isLink () {
      return this.currentPage === 'link' && this.link
    },
    isAbout () {
      return this.currentPage === 'about' && this.about
    },
    isPost () {
      return this.$categories.includes(this.currentPage) && this.currentPost
    },
    isSinglePage () {
      return this.currentPage === 'pages'
    }
  },
  watch: {},
  beforeCreate () {
  },
  created () {
    this.initConfig()
  },
  beforeMount () {
  },
  mounted () {
  },
  beforeUpdate () {
  },
  updated () {
  },
  beforeDestroy () {
  },
  destroyed () {
  },
  methods: {
    initConfig () {
      const { timeline, link, about } = this.$themeConfig
      if (timeline) {
        this.timeline = true
      }
      if (link) {
        this.link = true
      }
      if (about) {
        this.about = true
      }
      if (!isBuild() && !this.isHome && !this.isCategories && !this.isPosts && !this.isTags && !this.isTimeline && !this.isLink && !this.isAbout && !this.isPost) {
        this.$router.push('/404')
      }
    },
  },
}
</script>

<style lang="less" scoped>
</style>
