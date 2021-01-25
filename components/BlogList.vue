<template>
  <a-space direction="vertical">
    <a-card v-for="item in blogs" class="blog-list-item" :key="item.ID">
      <nuxt-link :to="`/post/${item.Url}`"
        >{{ item.Title }}</nuxt-link
      >
      <p class="tag">
        <span>
          {{ new Date(item.CreateTime).toLocaleString() }} by
          {{ item.CreateBy }}</span
        >
        <v-icon icon="eye"> {{ item.VisitCount }}</v-icon>
      </p>
    </a-card>
  </a-space>
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
  },
}
</script>

<style>
.card-cell {
  margin-bottom: 10px;
}
</style>
