<template>
  <a-menu-item :key="routeChildren.path" @click.capture="handleLink">
    <v-icon :icon="routeChildren.meta.icon"></v-icon>
    {{ routeChildren.meta.title }}
  </a-menu-item>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    item: {
      type: Object,
      default() {
        return null
      },
    },
    routeChildren: {
      type: Object,
      default: () => null,
    },
  },
  methods: {
    isExternal(path) {
      return /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/.test(path)
    },
    handleLink() {
      const routePath = this.routeChildren.path
      const target = this.routeChildren.meta.target
      if (target === '_blank') {
        if (this.isExternal(routePath)) window.open(routePath)
        else if (this.$route.path !== routePath) window.open(routePath.href)
      } else {
        if (this.isExternal(routePath)) {
          window.location.href = routePath
        } else if (this.$route.path !== routePath) {
          this.$router.push(routePath)
        }
      }
    },
  },
}
</script>
