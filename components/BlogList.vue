<template>
  <a-list :grid="grid" :data-source="blogs">
    <a-list-item slot="renderItem" slot-scope="item, index">
        <nuxt-link :to="`/post/${item.Url}`">{{index+1}}. {{ item.Title }}</nuxt-link>
        <!-- <v-icon icon="eye"> {{ item.VisitCount }}</v-icon>  -->
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
