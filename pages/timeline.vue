<template>
  <a-row>
    <a-col class="dash-center">
      <h1>{{ title }}</h1>
    </a-col>
    <a-col :sm="{ span: 24 }" :lg="{ span: 12, offset: 6 }">
      <a-timeline style="margin-top: 20px">
        <a-timeline-item v-for="item in data" :key="item.Url">
          <a-card class="blog-list-item">
            <p>
              <v-icon icon="time"></v-icon>
              {{ new Date(item.CreateTime).toLocaleString() }}
            </p>
            <h4>
              <nuxt-link :to="`/post/${item.Url}`">{{ item.Title }}</nuxt-link>
            </h4>
            <p class="tag">
              <span> {{ item.CreateBy }}</span>
              <v-icon icon="eye"> {{ item.VisitCount }}</v-icon>
              <list-tag :item="item"></list-tag>
            </p>
          </a-card>
        </a-timeline-item>
        <div
          :style="{
            textAlign: 'center',
            margin: '12px',
            height: '32px',
            lineHeight: '32px',
          }"
        >
          <a-spin v-show="loadingMore" />
          <a-button v-if="showLoadingMore" @click="onLoadMore">
            加载更多
          </a-button>
        </div>
      </a-timeline>
    </a-col>
  </a-row>
</template>

<script>
import message from 'ant-design-vue/lib/message'
export default {
  name: 'timeline',
  data() {
    return {
      data: [],
      title: '时间轴',
      loadingMore: false,
      showLoadingMore: true,
      page: 1,
      totalCount: 0,
    }
  },
  methods: {
    fetchData(callback) {
      this.$axios
        .$post('BlogView/BlogList', {
          Page: this.page,
          Limit: 10,
        })
        .then((res) => {
          callback(res)
        })
    },
    onLoadMore() {
      if (this.page * 10 >= this.totalCount) {
        this.showLoadingMore = false
        message.info('已加载到最后一页~')
        return
      }
      this.page++
      this.loadingMore = true
      this.fetchData((res) => {
        this.totalCount = res.Count
        this.data = this.data.concat(res.Data)
        this.loadingMore = false
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'))
        })
      })
    },
  },
  mounted() {
    document.title = this.title + '-' + document.title

    this.fetchData((res) => {
      this.loading = false
      this.data = res.Data
      this.totalCount = res.Count
    })
  },
}
</script>

<style></style>
