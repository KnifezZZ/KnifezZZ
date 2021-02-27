<template>
  <a-card class="blog-list-item" :hoverable="true">
    <span class="blog-cate-tag">
      {{ item.BlogCategory_Name }}
    </span>
    <template #cover>
      <nuxt-link :to="`/post/${item.Url}`">
        <div v-if="item.PosterId">
          <img :src="`/api/_file/getfile/${item.PosterId}`" width="100%" />
        </div>
        <div v-else>
          <v-poster :src="item.Url"> </v-poster>
        </div>
      </nuxt-link>
    </template>
    <a-card-meta>
      <template #title>
        <nuxt-link :to="`/post/${item.Url}`"> {{ item.Title }}</nuxt-link>
      </template>
      <template #description>
        <list-tag :item="item"></list-tag>
        {{ item.Description }}
      </template>
    </a-card-meta>
    <template class="ant-card-actions" #actions>
      <span
        >{{ new Date(item.CreateTime).toLocaleString() }} by
        {{ item.CreateBy }}</span
      >
      <v-icon icon="eye"> {{ item.VisitCount }}</v-icon>
      <v-icon icon="message-2"> {{ item.CommentCount }}</v-icon>
    </template>
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
