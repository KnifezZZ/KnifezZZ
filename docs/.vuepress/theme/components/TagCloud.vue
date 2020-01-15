<template>
  <div id="yur-tag-cloud">
    <section v-if="tags.length">
      <Router-link
        v-for="(tag,index) in tags"
        :key="index"
        :to="`/tags/?type=${ tag }&page=1&pageSize=12`"
      >
        <a-tag @mouseover="handleMouseOver" @mouseout="handleMouseOut">{{ tag }}</a-tag>
      </Router-link>
    </section>
    <a-tag v-else>暂无标签</a-tag>
  </div>
</template>

<script>

export default {
  props: {
    tagList: {
      type: Array,
      default: undefined,
    },
    isHome: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      piano: false,
    }
  },
  computed: {
    tags () {
      return this.tagList ? this.tagList : Object.keys(this.$tags)
    },
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
    },
    handleMouseOver () {
    },
    handleMouseOut () {
    },
  },
}
</script>

<style lang="less" scoped>
</style>
