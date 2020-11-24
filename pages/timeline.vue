<template>
  <el-row>
    <el-col class="dash-center">
      <h1>{{ title }}</h1>
    </el-col>
    <el-col :sm="{ span: 24 }" :lg="{ span: 12, offset: 6 }">
      <el-card>
        <el-timeline
          v-infinite-scroll="load"
          :infinite-scroll-disabled="isLoadDisabled"
          style="overflow: auto"
        >
          <template v-for="item in allblogs">
            <el-timeline-item
              :timestamp="item.CreateTime"
              :key="item.ID"
              placement="top"
            >
              <el-card class="blog-list-item">
                <h4>
                  <nuxt-link :to="`/post/${item.Url}`">
                    {{ item.Title }}
                  </nuxt-link>
                </h4>
                <p class="tag">
                  {{ item.Blog_Category }} /
                  <span>{{ item.CreateTime }} by {{ item.CreateBy }}</span>
                  <list-tag :item="item"></list-tag>
                </p>
              </el-card>
            </el-timeline-item>
          </template>
        </el-timeline>
        <el-alert
          v-if="isLoadDisabled"
          title="没有更多了"
          type="info"
          :closable="false"
          show-icon
        ></el-alert>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'timeline',
  data () {
    return {
      allblogs: [],
      title: "时间轴",
      page: 1,
      isLoadDisabled: false
    }
  },
  methods: {
    load () {
      this.$axios.$post("BlogView/BlogList", {
        Page: this.page,
        Limit: 30,
      }).then((res) => {
        res.Data.forEach((element) => {
          this.allblogs.push(element);
        });
        if (this.page * 20 >= res.Count) {
          this.isLoadDisabled = true;
        }
        this.page++;
      });
    }
  },
  mounted () {
    document.title = this.title + "-" + document.title;
  }
}
</script>

<style>
</style>