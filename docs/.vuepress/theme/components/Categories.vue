<template>
  <div id="yur-categories">
    <Posts :category="category" />
  </div>
</template>

<script>
import Posts from '@theme/components/Posts'

export default {
  components: { Posts },
  props: {
    category: {
      type: String,
      required: true,
    },
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  beforeCreate () {
  },
  created () {
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
  methods: {},
}
</script>

<style lang="less" scoped>
</style>
