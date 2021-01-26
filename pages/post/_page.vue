<template>
  <a-row>
    <a-col class="dash-center">
      <div class="breadcrumb" v-if="!blogData.IsSinglePage">
        <nuxt-link to="/">KnifeZ</nuxt-link>/
        <nuxt-link :to="cateUrl">{{ blogData.BlogCategory_Name }}</nuxt-link>
      </div>
      <h1>{{ blogData.Title }}</h1>
      <p class="page-info">
        <span>
          <v-icon icon="user"></v-icon>
          {{ blogData.CreateBy }}
        </span>

        <a-tooltip>
          <template slot="title">
            {{ updateDate }}
          </template>
          <span>
            <v-icon icon="time"></v-icon>
            {{ createDate }}
          </span>
        </a-tooltip>
        <span>
          <v-icon icon="eye"></v-icon>
          {{ blogData.VisitCount }}
        </span>
      </p>
    </a-col>
    <a-col :sm="{ span: 24 }" :lg="{ span: 12, offset: 6 }">
      <a-card v-html="blogData.BodyText" class="page-body" />
      <a-card>
        <a-alert
          message="如果觉得文章帮助了您，可以请我喝杯咖啡"
          type="info"
          show-icon
        />
        <div style="text-align: center">
          <p>
            <img
              :src="require('static/images/reward/alipay.jpg')"
              style="width: 30%"
            />
            <img
              :src="require('static/images/reward/wechat.jpg')"
              style="width: 30%"
            />
          </p>
        </div>
        <template v-if="!blogData.IsSinglePage">
          <h4>#Tags</h4>
          <list-tag :item="blogData"></list-tag>
          <div class="innernews">
            <template v-if="innerBlogs.PreBlog">
              <p>
                <span>上一篇：</span>
                <nuxt-link :to="`/post/${innerBlogs.PreBlog.Url}`">{{
                  innerBlogs.PreBlog.Title
                }}</nuxt-link>
              </p>
            </template>
            <template v-if="innerBlogs.NextBlog">
              <p>
                <span>下一篇：</span>
                <nuxt-link :to="`/post/${innerBlogs.NextBlog.Url}`">{{
                  innerBlogs.NextBlog.Title
                }}</nuxt-link>
              </p>
            </template>
          </div>
        </template>
      </a-card>
    </a-col>
    <template v-if="!blogData.IsSinglePage">
      <a-col :sm="{ span: 24 }" :lg="{ span: 5 }" class="recommend-blog">
        <a-card>
          <h4><v-icon icon="thumb-up"></v-icon> 推荐阅读</h4>
          <blog-list
            :blogs="recommends"
          >
          </blog-list>
        </a-card>
      </a-col>
      <a-col :sm="{ span: 24 }" :lg="{ span: 20, offset: 2 }" class="hot-blogs">
        <h4><v-icon icon="fire" style="color: crimson"></v-icon> 热门文章</h4>
        <blog-list-card
          :blogs="hotBlogs"
          :grid="{ gutter: 16, xs: 1, md: 3, lg: 3 }"
        >
        </blog-list-card>
      </a-col>
    </template>
  </a-row>
</template>

<script>
import 'static/css/page.less'
// import markdownItTocAndAnchor from "markdown-it-toc-and-anchor";
export default {
  name: 'posts',
  data() {
    return {
      blogData: {},
      pCateUrl: '',
      hotBlogs: [],
      innerBlogs: [],
    }
  },
  computed: {
    createDate: function () {
      return new Date(this.blogData.CreateTime).toLocaleString()
    },
    updateDate: function () {
      if (this.blogData.UpdateTime) {
        return (
          '最后修改于' + new Date(this.blogData.UpdateTime).toLocaleString()
        )
      }
      return '暂无修改'
    },
    cateUrl: function () {
      let cateUri = this.categoryUrl
      if (this.pCateUrl !== '') {
        cateUri = this.pCateUrl + '_' + this.categoryUrl.substring(1)
      }
      return cateUri
    },
  },
  async asyncData({ params, $axios, app }) {
    var hljs = require('highlight.js')
    var md = require('markdown-it')({
      breaks: true,
      html: true,
      highlight: function (str, lang) {
        // 生成行号
        let linesLength = str.split(/\n/).length - 1
        let linesNum = ''
        for (let index = 0; index < linesLength; index++) {
          linesNum += '<span class="line-number">' + index + '</span><br>'
        }
        linesNum = '<div class="line-numbers-wrapper">' + linesNum + '</div>'
        if (lang === '') lang = 'autoit'
        if (lang && hljs.getLanguage(lang)) {
          try {
            return (
              '<div class="language-' +
              lang +
              ' line-numbers-mode"><pre class="language-' +
              lang +
              '"><code class="language-' +
              lang +
              '">' +
              hljs.highlight(lang, str).value +
              '</code></pre>' +
              linesNum +
              '</div>'
            )
          } catch (__) {}
        }
      },
    })
    //.use(markdownItTocAndAnchor, { tocFirstLevel: 2 });
    let res = await $axios.$get('BlogView/BlogDetail?url=' + params.page)
    app.head.title = res.Title + ' KnifeZ'
    let innerBlogs = await $axios.$get(
      'BlogView/GetInnerBlog?user=' +
        res.CreateBy +
        '&currDate=' +
        res.CreateTime
    )
    let recommends = await $axios.$get(
      'BlogView/GetRecommendBlogs?title=' + res.title
    )
    let hotBlogs = await $axios.$post('BlogView/BlogList', {
      Page: 1,
      Limit: 6,
      BlogCategoryId: res.BlogCategoryId,
      SortInfo: {
        Direction: 1,
        Property: 'VisitCount',
      },
    })
    let bodytxt = md.render(res.BodyText)
    res.BodyText = bodytxt
    return {
      blogData: res,
      categoryUrl: res.BlogCategory_Url,
      parentCate: res.BlogCategory_Parent,
      hotBlogs: hotBlogs.Data,
      recommends: recommends,
      innerBlogs: innerBlogs,
    }
  },
  mounted() {
    if (this.parentCate) {
      this.pCateUrl = this.parentCate.Url
    }
  },
}
</script>

<style></style>
