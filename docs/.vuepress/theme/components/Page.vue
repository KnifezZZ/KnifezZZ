<template>
  <div id="yur-about">
    <Content />
    <Comment />
  </div>
</template>

<script>
import Comment from '@theme/components/Comment'
import { isPro, getTimeOut } from '../util'

export default {
  components: { Comment },
  props: {},
  data () {
    return {
      loading: true,
      isPro,
    }
  },
  computed: {},
  watch: {},
  beforeCreate () {
  },
  created () {
    this.initConfig()
    this.$nextTick(() => {
      setTimeout(() => {
        this.$store.dispatch('changeSetting', {
          key: 'curtain',
          value: false,
        })
        document.getElementsByTagName('body')[0].style.overflow = 'unset'
      }, getTimeOut(this.$store.state.settings.consoleTime))
    })
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
    },
  },
}
</script>

<style lang="less" scoped>
</style>
