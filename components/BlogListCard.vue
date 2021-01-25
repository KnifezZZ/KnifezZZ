<template>
  <a-list
    :grid="grid"
    :data-source="blogs"
  >
    <a-list-item slot="renderItem" slot-scope="item, index">
      <a-card class="blog-list-item">
        <nuxt-link :to="`/post/${item.Url}`">
          <v-poster :src="item.PosterId" width="100%"></v-poster>
        </nuxt-link>
        <h4>
          <nuxt-link :to="`/post/${item.Url}`">{{ item.Title }}</nuxt-link>
        </h4>
        <p class="tag">
          {{ item.BlogCategory_Name }} |
          <span
            >{{ new Date(item.CreateTime).toLocaleString() }} by
            {{ item.CreateBy }}</span
          >
          <v-icon icon="eye"> {{ item.VisitCount }}</v-icon>
          <list-tag :item="item"></list-tag>
        </p>
      </a-card>
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

<style>
.card-cell {
  margin-bottom: 10px;
}
</style>
