<template>
  <a-list :grid="grid" :data-source="blogs">
    <a-list-item slot="renderItem" slot-scope="item, index">
      <blog-card :item="item"></blog-card>
    </a-list-item>
  </a-list>
</template>

<script>
import VPoster from './VPoster'
export default {
  name: 'BlogList',
  components: {
    VPoster,
  },
  props: {
    blogs: Array,
    grid: { gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 },
  },
}
</script>
