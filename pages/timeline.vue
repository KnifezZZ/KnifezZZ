<template>
  <a-row>
    <a-col class="dash-center">
      <h1>{{ title }}</h1>
    </a-col>
    <a-col :sm="{ span: 24 }" :lg="{ span: 12, offset: 6 }">
      <div
        v-infinite-scroll="handleInfiniteOnLoad"
        class="category-infinite-container"
        :infinite-scroll-disabled="busy"
        :infinite-scroll-distance="10"
      >
        <a-timeline>
          <a-timeline-item v-for="item in data" :key="item.Url">
            <a-card class="blog-list-item">
              <p>
                <v-icon icon="time"></v-icon>
                {{ new Date(item.CreateTime).toLocaleString() }}
              </p>
              <h4>
                <nuxt-link :to="`/post/${item.Url}`">{{
                  item.Title
                }}</nuxt-link>
              </h4>
              <p class="tag">
                <span> {{ item.CreateBy }}</span>
                <v-icon icon="eye"> {{ item.VisitCount }}</v-icon>
                <list-tag :item="item"></list-tag>
              </p>
            </a-card>
          </a-timeline-item>

          <div v-if="loading && !busy" class="category-loading-container">
            <a-spin />
          </div>
        </a-timeline>
      </div>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: 'timeline',
  data() {
    return {
      data: [],
      title: '时间轴',
      loading: false,
      busy: false,
      page: 0,
      totalCount: 1,
    }
  },
  methods: {
    fetchData(callback) {
      this.$axios
        .$post('BlogView/BlogList', {
          Page: this.page,
          Limit: 20,
        })
        .then((res) => {
          callback(res)
        })
    },
    handleInfiniteOnLoad() {
      this.loading = true
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
  mounted() {
    document.title = this.title + '-' + document.title
  },
}
</script>

<style></style>
