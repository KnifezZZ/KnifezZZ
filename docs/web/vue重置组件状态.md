---

title: 'vue重置组件状态 vue-typed-js'

date: 2020-02-13

tags:

  - VUE

---

在使用`vue-typed-js`时，想要通过按钮来控制一句话打取消重打来实现过场文字效果，搜索一番发现typed.js有触发reset和start方法来实现，但vue版的没有这个功能。

然后结合vue的特性决定通过直接强制刷新DOM来达到重置组件的效果，这样可以重置一些组件的动画和内部初始数据。

## 强制重新生成 DOM 的实现

原理：强制重新生成 DOM 可以通过 Vue 中的 key 来实现。在 Vue 更新 Dom 时，如果 key 值相同则会对原有组件进行复用，如果不同，则会重新生成。

## 代码示例

```` vue
<template>
  <div>
    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <vue-typed-js
        :key="current"
        :typeSpeed="240"
        :strings="[steps[current].content]"
        @onComplete="showButton()"
      >
        <h3>
          &nbsp;&nbsp;
          <span class="typing"></span>
        </h3>
      </vue-typed-js>
    </div>
    <div class="steps-action">
      <a-button v-if="current < steps.length - 1&&isTypedOk" type="primary" @click="next">继续</a-button>
      <a-button
        v-if="current == steps.length - 1"
        type="primary"
        @click="$message.success('Processing complete!')"
      >完成</a-button>
      <a-button v-if="current>0" style="margin-left: 8px" @click="prev">返回</a-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      current: 0,
      isTypedOk: false,
      steps: [{
        title: '1',
        content: '11111'
      },
      {
        title: '2',
        content: '22222'
      },
      {
        title: '3',
        content: '3333'
      },
      {
        title: 'Last',
        content: 'Last-content'
      }
      ]
    }
  },
  methods: {
    showButton () {
      this.isTypedOk = true
    },
    next () {
      this.isTypedOk = false
      this.current++
    },
    prev () {
      this.current--
    }
  },
  mounted () {

  }
}
</script>
<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 10px;
}

.steps-action {
  margin-top: 24px;
}
</style>


````

