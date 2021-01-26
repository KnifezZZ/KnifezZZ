<template>
  <a-row>
    <a-col class="dash-center">
      <h1>{{ currCategory.Name }}</h1>
      <h2>{{ currCategory.Text }}</h2>
    </a-col>
    <a-col :xl="{ span: 12, offset: 6 }" :sm="{ span: 24 }">
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
  name: 'category',
  data() {
    return {
      data: [],
      loading: true,
      loadingMore: false,
      showLoadingMore: false,
      currCategory: {},
      page: 1,
      totalCount: 0,
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
    let menus = this.$store.state.menu.menus
    this.currCategory = menus.find((x) => x.Url == this.$route.params.url)
    if (this.currCategory === undefined) {
      let pUrl = this.$route.path
      if (pUrl.indexOf('_') > -1) {
        pUrl = '/' + pUrl.split('_')[1]
      }
      this.currCategory = menus.find((x) => x.Url == pUrl)
    }
    this.fetchData((res) => {
      this.loading = false
      this.data = res.Data
      this.totalCount = res.Count
    })
  },
}
</script>
