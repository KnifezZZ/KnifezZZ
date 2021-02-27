<template>
  <a-card style="margin-top: 10px">
    <a-comment v-for="(comment, index) in comments" :key="index">
      <template #actions>
        <span>{{ new Date(comment.CreateTime).toLocaleString() }}</span>
        <span key="comment-nested-reply-to" @click="mentionHe(comment.NickName)"
          >回复</span
        >
      </template>
      <template #author>
        #{{ index + 1 }}楼
        <a :href="`mailto:${comment.Email}`" :title="comment.Email">
          {{ comment.NickName }}
        </a>
      </template>
      <template #content>
        <p>{{ comment.Body }}</p>
      </template>
    </a-comment>
    <h4>
      发表评论 <a-button type="primary" @click="submitComment">提交</a-button>
    </h4>
    <a-input-group size="large">
      <a-row :gutter="8">
        <a-col :span="8">
          <a-input
            addonBefore="邮箱"
            placeholder="您的邮箱"
            v-model:value="email"
          />
        </a-col>
        <a-col :span="8">
          <a-input
            addonBefore="昵称"
            placeholder="您的昵称"
            v-model:value="name"
          />
        </a-col>
      </a-row>
    </a-input-group>
    <a-mentions
      rows="5"
      placeholder="评论支持@来通知其他用户"
      v-model:value="commentBody"
    >
      <a-mentions-option value="afc163">afc163</a-mentions-option>
      <a-mentions-option value="zombieJ">zombieJ</a-mentions-option>
      <a-mentions-option value="yesmeck">yesmeck</a-mentions-option>
    </a-mentions>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      commentBody: '',
      email: '',
      name: 'guest',
      data: [],
    }
  },
  props: {
    comments: {
      type: Array,
      default: [],
    },
  },
  methods: {
    submitComment() {
      debugger
      this.$axios
        .$post('BlogView/AddComment', {
          NickName: this.name,
          Email: this.email,
          Body: this.commentBody,
        })
        .then((res) => {
          debugger
          this.data.push(res)
        })
    },
    mentionHe(person) {
      this.commentBody = this.commentBody + '@' + person + '\n'
    },
  },
  created() {
    this.data = this.comments
  },
}
</script>

<style lang="scss" scoped></style>
