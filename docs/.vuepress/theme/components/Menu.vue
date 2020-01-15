<template>
  <div id="yur-menu">
    <a-menu v-model="current" mode="horizontal" class="menu">
      <template v-for="userLink in userLinks">
        <template v-if="userLink.items">
          <a-sub-menu :key="userLink.key">
            <span slot="title" class="submenu-title-wrapper">
              <a-icon :type="userLink.icon" />
              {{userLink.text}}
              <a-icon type="caret-down" class="category" />
            </span>
            <a-menu-item-group>
              <a-menu-item v-for="subItem in userLink.items" :key="subItem.link">
                <router-link :to="subItem.link" :key="subItem.link">
                  <a-icon :type="subItem.icon" />
                  {{ subItem.text }}
                </router-link>
              </a-menu-item>
            </a-menu-item-group>
          </a-sub-menu>
        </template>
        <template v-else>
          <a-menu-item :key="userLink.link">
            <router-link :to="userLink.link">
              <a-icon :type="userLink.icon" v-if="userLink.icon" />
              {{userLink.text}}
            </router-link>
          </a-menu-item>
        </template>
      </template>

      <a-menu-item v-if="timeline" key="timeline">
        <router-link to="/timeline">
          <a-icon type="hourglass"></a-icon>时间线
        </router-link>
      </a-menu-item>
      <a-menu-item v-if="link" key="link">
        <router-link to="/link">友人帐</router-link>
      </a-menu-item>
      <a-menu-item v-if="about" key="about">
        <router-link to="/about">
          <a-icon type="robot"></a-icon>关于我
        </router-link>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    currentPage: {
      type: String,
      required: true,
    },
    userLinks: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      current: ['/'],
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
    },
    handleRoute () {
      this.current = [this.currentPage]
    },
  },
}
</script>

<style lang="less" scoped>
</style>
