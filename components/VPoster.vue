<template>
  <div :style="`background-image:${url}`" class="rand-poster"></div>
</template>

<script>
export default {
  name: 'VPoster',
  props: {
    src: {
      type: String | null,
      required: true,
      default: function () {
        return null
      },
    },
  },
  data() {
    return {
      url: '',
    }
  },
  created() {
    var GeoPattern = require('geopattern')
    var pattern = GeoPattern.generate(this.src)
    this.url = pattern.toDataUrl()
  },
}
</script>
<style lang="less">
.rand-poster {
  width: 100%;
  height: 240px;
  margin: 0;
}
</style>
