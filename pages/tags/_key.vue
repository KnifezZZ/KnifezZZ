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
      <a-list :data-source="data" :loading="loading" item-layout="horizontal">
        <template #loadMore>
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
        </template>
        <a-list-item slot="renderItem" slot-scope="item, index">
          <blog-card :item="item"></blog-card>
        </a-list-item>
      </a-list>
    </a-col>
  </a-row>
</template>

<script>
import message from 'ant-design-vue/lib/message'
export default {
  name: 'tag',
  data() {
    return {
      data: [],
      loading: true,
      loadingMore: false,
      showLoadingMore: false,
      page: 1,
      totalCount: 0,

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
    onLoadMore() {
      if (this.page * 20 >= this.totalCount) {
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
  beforeMount() {
    this.fetchData((res) => {
      this.loading = false
      this.data = res.Data
      this.totalCount = res.Count
    })
  },
}
</script>
