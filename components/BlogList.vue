<template>
  <a-list :grid="grid" :data-source="blogs">
    <a-list-item slot="renderItem" slot-scope="item, index">
      <a-card class="blog-relate-item">
        <nuxt-link :to="`/post/${item.Url}`">{{ item.Title }}</nuxt-link>
        <p class="tag">
          <span>
            {{ new Date(item.CreateTime).toLocaleString() }}
          </span>
          <v-icon icon="eye"> {{ item.VisitCount }}</v-icon>
        </p>
      </a-card>
    </a-list-item>
  </a-list>
</template>

<script>
export default {
  name: 'BlogList',
  props: {
    blogs: Array,
    grid: { gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 },
  },
}
</script>

<style>
