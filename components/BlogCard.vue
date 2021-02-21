<template>
  <a-card class="blog-list-item">
    <h4>
      <a-tag color="#512bd4" style="font-size: 1.6rem; padding: 3px 5px;">
        {{ item.BlogCategory_Name }}
      </a-tag>
      <nuxt-link :to="`/post/${item.Url}`">{{ item.Title }}</nuxt-link>
    </h4>
    <nuxt-link :to="`/post/${item.Url}`">
      <div v-if="item.PosterId">
        <img :src="`/api/_file/getfile/${item.PosterId}`" width="100%" />
      </div>
      <div v-else>
        <v-poster :src="item.Url"> </v-poster>
      </div>
    </nuxt-link>
    <p class="tag">
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
