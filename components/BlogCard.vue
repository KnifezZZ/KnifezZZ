<template>
  <a-card class="blog-list-item">
    <div v-if="item.PosterId">
      <h4>
        <nuxt-link :to="`/post/${item.Url}`">{{ item.Title }}</nuxt-link>
      </h4>
      <nuxt-link :to="`/post/${item.Url}`">
        <img :src="`/api/_file/getfile/${item.PosterId}`" width="100%" />
      </nuxt-link>
    </div>
    <div v-else>
      <nuxt-link :to="`/post/${item.Url}`">
        <v-poster :src="item.Url">
          <h4>
            <nuxt-link :to="`/post/${item.Url}`">{{ item.Title }}</nuxt-link>
          </h4>
        </v-poster>
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
