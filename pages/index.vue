<template>
  <el-row :gutter="10">
    <div class="dash-center">
      <h1>{{ mainTitle }}</h1>
      <h2>{{ description }}</h2>
    </div>
    <el-col
      :sm="{ span: 24 }"
      :lg="{ span: 8, offset: 6 }"
      class="latest-blogs"
    >
      <h3><i class="el-icon-hot-water" /> 最新发布</h3>
      <ul>
        <li v-for="item in homeBlogs.Data" :key="item.ID">
          <BlogListCard :item="item"></BlogListCard>
        </li>
      </ul>
    </el-col>

    <el-col :sm="{ span: 24 }" :lg="{ span: 8 }" class="hot-blogs">
      <h4><i class="el-icon-present" />热门博文</h4>
      <ul>
        <li v-for="item in hotBlogs.Data" :key="item.ID">
          <el-card class="blog-list-item" shadow="hover">
            <nuxt-link :to="`/post/${item.Url}`">
              <el-tag effect="plain">{{ item.Blog_Category }}</el-tag>
              {{ item.Title }}
            </nuxt-link>
            <p class="tag">
              <span>{{ item.CreateTime }}</span>
              <span>
                <i class="el-icon-view"></i>
                {{ item.VisitCount }}
              </span>
            </p>
          </el-card>
        </li>
      </ul>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      mainTitle: "KnifeZ",
      description: "真正的大师，永远怀着一颗学徒的心。",
    }
  },
  async asyncData ({ $axios, app }) {
    $axios.$get("BlogView/BlogDetail?url=/");
    let res = await $axios.$post("BlogView/BlogList", {
      Page: 1,
      Limit: 15,
    })
    let resh = await $axios.$post("BlogView/BlogList", {
      Page: 1,
      Limit: 8,
      SortInfo: {
        Direction: "desc",
        Property: "VisitCount",
      },
    })
    return {
      homeBlogs: res,
      hotBlogs: resh
    }
  },
  mounted () {
    console.log("by KnifeZ");
  }
}
</script>
