<template>
  <a-card class="blog-list-item">
    <h4>
      <nuxt-link :to="`/post/${item.Url}`">{{ item.Title }}</nuxt-link>
    </h4>
    <div v-if="item.PosterId">
      <nuxt-link :to="`/post/${item.Url}`">
        <v-poster :src="item.PosterId" width="100%"></v-poster>
      </nuxt-link>
    </div>
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
</template>

<script>
import VPoster from './VPoster'
export default {
  name: 'BlogList',
  components: {
    VPoster,
  },
  props: {
    item: Object,
  },
}
</script>

<style>
.card-cell {
  margin-bottom: 10px;
}
</style>
