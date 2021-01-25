<template>
  <a-row>
    <a-col :sm="{ span: 24 }" :lg="{ span: 6, offset: 4 }">
      <h1>{{ currClass.Name }}</h1>
      <nuxt-link
        class="category-tag"
        v-for="personalTag in personalClass"
        :to="`/tags/${personalTag.Name}`"
        :key="personalTag.ID"
      >
        <a-tag effect="plain" size="large" :hit="false">{{
          personalTag.Name
        }}</a-tag>
      </nuxt-link>
    </a-col>
    <a-col :sm="{ span: 24 }" :lg="{ span: 10 }">
      <div
        v-infinite-scroll="handleInfiniteOnLoad"
        class="category-infinite-container"
        :infinite-scroll-disabled="busy"
        :infinite-scroll-distance="10"
      >
        <a-list :data-source="data">
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-card class="blog-list-item">
              <nuxt-link :to="`/post/${item.Url}`">
                <v-poster :src="item.PosterId" width="100%"></v-poster>
              </nuxt-link>
              <h4>
                <nuxt-link :to="`/post/${item.Url}`">{{
                  item.Title
                }}</nuxt-link>
              </h4>
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
          </a-list-item>
          <div v-if="loading && !busy" class="category-loading-container">
            <a-spin />
          </div>
        </a-list>
      </div>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: 'tag',
  data() {
    return {
      data: [],
      loading: false,
      busy: false,
      page: 0,
      totalCount: 1,

      tagBlogs: [],
      personalClass: [],
      currClass: [],
      TagColors: [],
    }
  },
  async asyncData({ $axios, params, app }) {
    let res = await $axios.$get('BlogView/GetBlogClassification')
    app.head.title = params.key + ' KnifeZ'
    return {
      personalClass: res,
      currClass: res.find((x) => x.Name == params.key),
    }
  },
  methods: {
    fetchData(callback) {
      this.$axios
        .$post('BlogView/BlogList', {
          SelectedBlogClassificationMiddleIDs: [this.currClass.ID],
          Page: this.page,
          Limit: 20,
        })
        .then((res) => {
          callback(res)
        })
    },
    handleInfiniteOnLoad() {
      const data = this.data
      if (this.page * 20 >= this.totalCount) {
        this.busy = true
        this.loading = false
        return
      }
      this.page++
      this.fetchData((res) => {
        this.data = data.concat(res.Data)
        this.totalCount = res.Count
        this.loading = false
      })
    },
  },
}
</script>
