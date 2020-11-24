<template>
  <el-card class="card-cell">
    <nuxt-link :to="`/post/${item.Url}`">
      <img
        :src="
          require('static/images/default-pic-' +
            Math.floor(Math.random() * 5) +
            '.jpg')
        "
        class="image"
        style="width: 100%"
    /></nuxt-link>
    <div class="blog-list-item">
      <h4>
        <nuxt-link :to="`/post/${item.Url}`">{{ item.Title }}</nuxt-link>
      </h4>
      <p class="tag">
        {{ item.Blog_Category }} /
        <span>{{ item.CreateTime }} by {{ item.CreateBy }}</span>
        <span>
          <i class="el-icon-view"></i>
          {{ item.VisitCount }}
        </span>
        <list-tag :item="item"></list-tag>
      </p>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "BlogList",
  props: {
    item: Object
  }
}
</script>

<style>
.card-cell {
  margin-bottom: 10px;
}
</style>