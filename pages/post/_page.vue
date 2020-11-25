<template>
  <el-row :gutter="10">
    <el-col class="dash-center">
      <div class="breadcrumb" v-if="!blogData.IsSinglePage">
        <nuxt-link to="/">KnifeZ</nuxt-link>/
        <nuxt-link :to="`${cateUrl}`">{{ blogData.Blog_Category }}</nuxt-link>
      </div>
      <h1>{{ blogData.Title }}</h1>
      <p class="page-info">
        <span>
          <i class="el-icon-user"></i>
          {{ blogData.CreateBy }}
        </span>
        <el-tooltip
          effect="dark"
          v-show="blogData.UpdateTime"
          :content="`最后修改于:${updateDate}`"
          placement="bottom"
        >
          <span>
            <i class="el-icon-time"></i>
            {{ createDate }}
          </span>
        </el-tooltip>
        <span>
          <i class="el-icon-view"></i>
          {{ blogData.VisitCount }}
        </span>
      </p>
    </el-col>
    <el-col :sm="{ span: 24 }" :lg="{ span: 12, offset: 6 }">
      <el-card v-html="blogData.BodyText" class="page-body" />
      <el-card>
        <el-alert
          title="如果觉得文章帮助了您，可以请我喝杯咖啡"
          type="success"
          :closable="false"
          show-icon
        >
        </el-alert>
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
      </el-card>
    </el-col>
    <template v-if="!blogData.IsSinglePage">
      <el-col :sm="{ span: 24 }" :lg="{ span: 6 }" class="recommend-blog">
        <el-card>
          <h4><i class="el-icon-collection" />推荐阅读</h4>
          <ul>
            <li v-for="item in recommends" :key="item.ID">
              <nuxt-link :to="`/post/${item.Url}`">{{ item.Title }}</nuxt-link>
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :sm="{ span: 24 }" :lg="{ span: 6 }" class="hot-blogs">
        <h4><i class="el-icon-present" />热门文章</h4>
        <ul>
          <li v-for="item in hotBlogs" :key="item.ID">
            <el-card class="blog-list-item" shadow="hover">
              <nuxt-link :to="`/post/${item.Url}`">
                <el-tag effect="plain">{{ item.Blog_Category }}</el-tag>
                {{ item.Title }}
              </nuxt-link>
              <p class="tag">
                <span>
                  <i class="el-icon-view"></i>
                  {{ item.VisitCount }}
                </span>
                <span>{{ item.CreateTime }} by {{ item.CreateBy }}</span>
              </p>
            </el-card>
          </li>
        </ul>
      </el-col>
    </template>
  </el-row>
</template>

<script>
import "../../assets/styles/page.less";
import markdownItTocAndAnchor from "markdown-it-toc-and-anchor";
export default {
  name: 'posts',
  data () {
    return {
      blogData: {},
      category: {},
      pCateUrl: '',
      hotBlogs: [],
      innerBlogs: [],
    }
  },
  computed: {
    createDate: function () {
      return new Date(this.blogData.CreateTime).toLocaleString();
    },
    updateDate: function () {
      return new Date(this.blogData.UpdateTime).toLocaleString();
    },
    cateUrl: function () {
      let cateUri = '/categories' + this.category.Url;
      if (this.pCateUrl !== '') {
        cateUri = this.pCateUrl + '_' + this.category.Url.substring(1);
      }
      return cateUri;
    }
  },
  async asyncData ({ params, $axios, app }) {
    var hljs = require("highlight.js"); // https://highlightjs.org/
    var md = require("markdown-it")({
      breaks: true,
      html: true,
      highlight: function (str, lang) {
        // 生成行号
        let linesLength = str.split(/\n/).length - 1;
        let linesNum = "";
        for (let index = 0; index < linesLength; index++) {
          linesNum += '<span class="line-number">' + index + "</span><br>";
        }
        linesNum = '<div class="line-numbers-wrapper">' + linesNum + "</div>";
        if (lang === "") lang = "autoit";
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
              "</code></pre>" +
              linesNum +
              "</div>"
            );
          } catch (__) { }
        }
      },
    }).use(markdownItTocAndAnchor, { tocFirstLevel: 2 });
    let res = await $axios.$get("BlogView/BlogDetail?url=" + params.page);
    app.head.title = res.Title + ' KnifeZ';
    let innerBlogs = await $axios.$get("BlogView/GetInnerBlog?user=" + res.CreateBy + "&currDate=" + res.CreateTime)
    let recommends = await $axios.$get("BlogView/GetRecommendBlogs?title=" + res.title)
    let hotBlogs = await $axios.$post("BlogView/BlogList", {
      Page: 1,
      Limit: 6,
      BlogCategoryID: res.BlogCategoryID,
      SortInfo: {
        Direction: "desc",
        Property: "VisitCount",
      },
    })
    let bodytxt = md.render(res.BodyText);
    res.BodyText = bodytxt;
    return {
      blogData: res,
      category: res.BlogCategory,
      hotBlogs: hotBlogs.Data,
      recommends: recommends,
      innerBlogs: innerBlogs
    }
  },
  mounted () {
    let pCate = this.$store.state.menu.menus.find((x) => x.Id == this.category.ParentId);
    if (pCate !== undefined) {
      this.pCateUrl = pCate.Url;
    }
  }
}
</script>

<style>
</style>