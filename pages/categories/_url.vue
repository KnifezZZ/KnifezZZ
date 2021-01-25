<template>
  <a-row>
    <a-col class="dash-center">
      <h1>{{ currCategory.Name }}</h1>
      <h2>{{ currCategory.Text }}</h2>
    </a-col>
    <a-col>
      <div
        v-infinite-scroll="handleInfiniteOnLoad"
        class="category-infinite-container"
        :infinite-scroll-disabled="busy"
        :infinite-scroll-distance="10"
      >
        <a-list
          :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4 }"
          :data-source="data"
        >
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
  name: 'category',
  data() {
    return {
      data: [],
      loading: false,
      busy: false,
      currCategory: {},
      page: 0,
      totalCount: 1,
    }
  },
  methods: {
    fetchData(callback) {
      this.$axios
        .$post('BlogView/BlogList', {
          BlogCategoryID: this.currCategory.Id,
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
  beforeMount() {
    let menus = this.$store.state.menu.menus
    this.currCategory = menus.find((x) => x.Url == this.$route.params.url)
    if (this.currCategory === undefined) {
      let pUrl = this.$route.path
      if (pUrl.indexOf('_') > -1) {
        pUrl = '/' + pUrl.split('_')[1]
      }
      this.currCategory = menus.find((x) => x.Url == pUrl)
    }
  },
}
</script>
