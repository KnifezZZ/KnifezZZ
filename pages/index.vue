<template>
  <a-row>
    <div class="dash-center">
      <h1>{{ mainTitle }}</h1>
      <h2>{{ description }}</h2>
    </div>
    <a-col :sm="{ span: 24 }" :lg="{ span: 10, offset: 5 }">
      <blog-list-card :blogs="homeBlogs.Data"></blog-list-card>
    </a-col>
    <a-col :sm="{ span: 24 }" :lg="{ span: 6, offset: 1 }" class="hot-blogs">
      <h3><v-icon icon="fire" style="color: crimson"></v-icon> 阅读排行</h3>
      <blog-list :blogs="hotBlogs.Data"></blog-list>
    </a-col>
  </a-row>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      mainTitle: 'KnifeZ',
      description: '真正的大师，永远怀着一颗学徒的心',
    }
  },
  async asyncData({ $axios, app }) {
    $axios.$get('BlogView/BlogDetail?url=/')
    let res = await $axios.$post('BlogView/BlogList', {
      Page: 1,
      Limit: 10,
    })
    let resh = await $axios.$post('BlogView/BlogList', {
      Page: 1,
      Limit: 8,
      SortInfo: {
        Direction: 1,
        Property: 'VisitCount',
      },
    })
    return {
      homeBlogs: res,
      hotBlogs: resh,
    }
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
