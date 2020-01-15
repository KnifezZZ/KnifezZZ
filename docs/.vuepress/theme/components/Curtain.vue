<template>
  <div id="yur-curtain">
    <h1>{{ title }}</h1>
    <p>{{introduce}}</p>
    <a-spin class="spin" :tip="tip" />
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      title: 'KnifeZ',
      introduce: 'hello world',
      tip: '页面准备中...',
      textShadow: '#e91e63',
    }
  },
  computed: {},
  watch: {},
  beforeCreate () {
  },
  created () {
    this.initConfig()
  },
  beforeMount () {
  },
  mounted () {
    this.$store.dispatch('changeSetting', {
      key: 'consoleTime',
      value: new Date().getTime(),
    })
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
      const { curtain, about } = this.$themeConfig
      if (curtain) {
        const { tip } = curtain
        if (tip) {
          this.tip = tip
        }
        this.title = about.name
        this.introduce = about.introduction
      }
    },
  },
}
</script>

<style lang="less" scoped>
</style>
