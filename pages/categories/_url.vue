<template>
  <el-row :gutter="20">
    <el-col class="dash-center">
      <h1>{{ currCategory.Text }}</h1>
      <h2>{{ currCategory.Description }}</h2>
    </el-col>
    <el-row
      class="infinite-list"
      v-infinite-scroll="load"
      :infinite-scroll-disabled="isLoadDisabled"
      style="overflow: auto"
      :gutter="20"
      v-loading="loading"
    >
      <el-col
        v-for="item in cateBlogs"
        :key="item.ID"
        style="display: inline-block"
        :sm="{ span: 24 }"
        :lg="{ span: 8 }"
      >
        <BlogListCard :item="item"></BlogListCard>
      </el-col>
      <el-alert
        v-if="isLoadDisabled"
        title="没有更多了"
        type="info"
        :closable="false"
        show-icon
      ></el-alert>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "category",
  data () {
    return {
      loading: true,
      isLoadDisabled: false,
      cateBlogs: [],
      currCategory: {},
      page: 1,
    }
  },
  methods: {
    load () {

      this.$axios.$post("BlogView/BlogList", {
        BlogCategoryID: this.currCategory.Id,
        Page: this.page,
        Limit: 20,
      }).then((res) => {
        res.Data.forEach((element) => {
          this.cateBlogs.push(element);
        });
        this.loading = false;
        if (this.page * 20 >= res.Count) {
          this.isLoadDisabled = true;
        }
        this.page++;
      });
    }
  },
  mounted () {
    let menus = this.$store.state.menu.menus;
    this.currCategory = menus.find(
      (x) => x.Url == this.$route.params.url
    );
    if (this.currCategory === undefined) {
      let pUrl = this.$route.path
      if (pUrl.indexOf('_') > -1) {
        pUrl = '/' + pUrl.split('_')[1]
      }
      this.currCategory = menus.find(
        (x) => x.Url == pUrl
      );
    }
    this.load();
  }
}
</script>

<style>
</style>