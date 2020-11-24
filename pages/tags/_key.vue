<template>
  <el-row>
    <el-col :sm="{ span: 24 }" :lg="{ span: 6, offset: 4 }">
      <h1>{{ currClass.Name }}</h1>
      <nuxt-link
        class="ptag"
        v-for="personalTag in personalClass"
        :to="`/tags/${personalTag.Name}`"
        :key="personalTag.ID"
      >
        <el-tag effect="plain" size="large" :hit="false">{{
          personalTag.Name
        }}</el-tag>
      </nuxt-link>
    </el-col>
    <el-col :sm="{ span: 24 }" :lg="{ span: 10 }">
      <ul
        class="infinite-list"
        v-infinite-scroll="load"
        :infinite-scroll-disabled="isLoadDisabled"
        style="overflow: auto"
      >
        <li v-for="item in tagBlogs" :key="item.ID">
          <el-card class="blog-list-item" shadow="hover">
            <h4>
              <nuxt-link :to="`/post/${item.Url}`">{{ item.Title }}</nuxt-link>
            </h4>
            <p class="tag">
              {{ item.Blog_Category }} /
              <span>{{ item.CreateTime }}</span>
            </p>
          </el-card>
        </li>
      </ul>
      <el-alert
        v-if="isLoadDisabled"
        title="没有更多了"
        type="info"
        :closable="false"
        show-icon
      ></el-alert>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'tag',
  data () {
    return {
      tagBlogs: [],
      personalClass: [],
      currClass: [],
      page: 1,
      TagColors: [],
      isLoadDisabled: false,
    }
  },
  async asyncData ({ $axios, params, app }) {
    let res = await $axios.$get('BlogView/GetBlogClassification');
    app.head.title = params.key + ' KnifeZ';
    return {
      personalClass: res,
      currClass: res.find((x) => x.Name == params.key)
    }
  },
  methods: {
    load () {
      if (this.personalClass.length > 0) {
        this.$axios.$post("BlogView/BlogList", {
          SelectedBlogClassificationMiddleIDs: [this.currClass.ID],
          Page: this.page,
          Limit: 20,
        }).then((res) => {
          res.Data.forEach((element) => {
            this.tagBlogs.push(element);
          });
          if (this.page * 20 >= res.Count) {
            this.isLoadDisabled = true;
          }
          this.page++;
        });
      }
    }
  }
}
</script>

<style>
</style>