<template>
  <header id="yur-header">
    <a-popover v-model="visible" trigger="click" placement="rightBottom">
      <template slot="content">
        <div id="yur-mobile-menu">
          <a-menu v-model="current" mode="inline" class="menu">
            <template v-for="userLink in userLinks">
              <template v-if="userLink.items">
                <a-sub-menu :key="userLink.key">
                  <span slot="title">
                    <a-icon :type="userLink.icon" />
                    {{userLink.text}}
                  </span>
                  <a-menu-item-group>
                    <a-menu-item
                      v-for="subItem in userLink.items"
                      :key="subItem.link"
                      @click="changeVisible"
                    >
                      <router-link :to="subItem.link">
                        <a-icon :type="subItem.icon" v-if="subItem.icon" />
                        {{ subItem.text }}
                      </router-link>
                    </a-menu-item>
                  </a-menu-item-group>
                </a-sub-menu>
              </template>
              <template v-else>
                <a-menu-item>
                  <router-link
                    :to="userLink.link"
                    :key="userLink.link"
                    @click="changeVisible"
                  >{{userLink.text}}</router-link>
                </a-menu-item>
              </template>
            </template>
            <a-menu-item v-if="timeline" key="timeline" @click="changeVisible">
              <router-link to="/timeline">时间线</router-link>
            </a-menu-item>
            <a-menu-item v-if="link" key="link" @click="changeVisible">
              <router-link to="/link">友人帐</router-link>
            </a-menu-item>
            <a-menu-item v-if="about" key="about" @click="changeVisible">
              <router-link to="/about">关于我</router-link>
            </a-menu-item>
          </a-menu>
        </div>
      </template>
      <a-icon type="align-right" class="menu-icon" />
    </a-popover>
    <a-row>
      <a-col :xxl="4" :xl="5" :lg="5" :md="24" :sm="24" :xs="24">
        <router-link id="yur-logo" to="/">
          <img :src="logo" :alt="title" />
          <span class="head-title">{{ title }}</span>
        </router-link>
      </a-col>
      <a-col :xxl="20" :xl="19" :lg="19" :md="0" :sm="0" :xs="0">
        <Search v-if="$themeConfig.search !== false && $page.frontmatter.search !== false" />
        <Menu :current-page="currentPage" :user-links="userLinks" />
      </a-col>
    </a-row>
  </header>
</template>

<script>
import Search from '@theme/components/Search'
import Menu from '@theme/components/Menu'

export default {
  components: { Search, Menu },
  props: {
    currentPage: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      loading: true,
      current: ['/'],
      visible: false,
      userLinks: [],
      title: '凉风有信',
      logo: require('../media/images/logo.png'),
      nameplate: {
        width: '86px',
        height: '36px',
        text: [
          {
            fontSize: '20',
            textAnchor: 'middle',
            x: '50%',
            y: '50%',
            textTransform: 'uppercase',
            fill: 'none',
            stroke: '#3498db',
            textShadow: '0 0 1px #3498db',
            strokeWidth: '1px',
            strokeDasharray: '90 310',
            animate: {
              attributeName: 'stroke-dashoffset',
              begin: '-1.5s',
              dur: '6s',
              from: '0',
              to: '-400',
              repeatCount: 'indefinite',
            },
          },
          {
            fontSize: '20',
            textAnchor: 'middle',
            x: '50%',
            y: '50%',
            textTransform: 'uppercase',
            fill: 'none',
            stroke: '#f39c12',
            textShadow: '0 0 1px #f39c12',
            strokeWidth: '1px',
            strokeDasharray: '90 310',
            animate: {
              attributeName: 'stroke-dashoffset',
              begin: '-3s',
              dur: '6s',
              from: '0',
              to: '-400',
              repeatCount: 'indefinite',
            },
          },
          {
            fontSize: '20',
            textAnchor: 'middle',
            x: '50%',
            y: '50%',
            textTransform: 'uppercase',
            fill: 'none',
            stroke: '#e74c3c',
            textShadow: '0 0 1px #e74c3c',
            strokeWidth: '1px',
            strokeDasharray: '90 310',
            animate: {
              attributeName: 'stroke-dashoffset',
              begin: '-4.5s',
              dur: '6s',
              from: '0',
              to: '-400',
              repeatCount: 'indefinite',
            },
          },
          {
            fontSize: '20',
            textAnchor: 'middle',
            x: '50%',
            y: '50%',
            textTransform: 'uppercase',
            fill: 'none',
            stroke: '#9b59b6',
            textShadow: '0 0 1px #9b59b6',
            strokeWidth: '1px',
            strokeDasharray: '90 310',
            animate: {
              attributeName: 'stroke-dashoffset',
              begin: '-6s',
              dur: '6s',
              from: '0',
              to: '-400',
              repeatCount: 'indefinite',
            },
          },
        ],
      },
      timeline: false,
      link: false,
      about: false,
    }
  },
  computed: {},
  watch: {
    $route: 'handleRoute',
  },
  beforeCreate () {
  },
  created () {
    this.initConfig()
    this.handleRoute()
  },
  beforeMount () {
  },
  mounted () {
    this.loading = false
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
      const { title } = this.$site
      const { nav, logo, nameplate, timeline, link, about } = this.$themeConfig
      if (nav) {
        nav.forEach(item => {
          if (item.items) {
            item.items.forEach(sub => {
              const { link, key } = sub
              if (link && !key) {
                if (link.charAt(0) === '/') {
                  sub.key = link.split('/')[1]
                  sub.link = `${link}?page=1&pageSize=12`
                }
              }
            })
          } else {
            const { link, key } = item
            if (link && !key) {
              if (link.charAt(0) === '/') {
                item.key = link.split('/')[1]
                item.link = `${link}?page=1&pageSize=12`
              }
            }
          }
        })
        this.userLinks = nav
      }
      if (title) {
        this.title = title
      }
      if (logo) {
        this.logo = this.$withBase(logo)
      }
      if (nameplate) {
        const { width, height, text } = nameplate
        if (width) {
          this.nameplate.width = width
        }
        if (height) {
          this.nameplate.height = height
        }
        if (text) {
          this.nameplate.text = text
        }
      }
      if (timeline) {
        this.timeline = true
      }
      if (link) {
        this.link = true
      }
      if (about) {
        this.about = true
      }
    },
    handleRoute () {
      this.current = [this.currentPage]
    },
    changeVisible () {
      this.visible = false
    },
  },
}
</script>

<style lang="less" scoped>
</style>
