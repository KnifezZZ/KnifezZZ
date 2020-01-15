---

title: Yur主题的设置和改造，基于1.4.3

date: 2020-01-11
 
tags: 

  - VuePress

  - Yur

  - Blog

---

## 新增页面访问统计

### 1 开启评论并配置启用访问量
如何开启和配置请看<https://gleehub.com/other/vuepress-theme-yur-shi-yong-jiao-cheng.html#%E5%BC%80%E5%90%AF%E8%AF%84%E8%AE%BA>

使用`Valine`作为 blog的评论插件
在config.js中新增`visitor: true`到配置项

Valine会自动查找页面中class值为leancloud_visitors的元素，获取其id为查询条件。并将得到的值填充到其class的值为leancloud-visitors-count的子元素里.

### 2 添加页面阅读量

打开components/YurPost.vue并在class="post-header" div中末尾新增如下代码

````
    <div>
        作者： {{!$page.frontmatter.author?$themeConfig.author:$page.frontmatter.author}}
        发布于：
        {{ parseDate($page.frontmatter.date) }}
        <a-icon type="eye" />
        <span :id="$page.path" class="leancloud_visitors" :data-flag-title="$page.title">
          <i class="leancloud-visitors-count">1000000</i>
        </span>
    </div>
````
Valine会根据设定的path值自动填充访问量数据
![效果图](https://blog-1300352674.cos.ap-shanghai.myqcloud.com/undefined20200111113924.png)

### 3 添加网站访问量

打开components/YurPost.vue并在class="bottom-bar" div中末尾新增如下代码

````
    <a-icon type="eye" />
      <span id="/" class="leancloud_visitors" :data-flag-title="$page.title">
        <i class="leancloud-visitors-count">NaN</i>
    </span>
````
此处统计的是网站首页的访问量，可近似于网站访问量
![实际效果](https://blog-1300352674.cos.ap-shanghai.myqcloud.com/undefined20200111114128.png)

## 使用@vuepress/last-updated代替frontmatter配置

### 引入插件
plugins内添加插件==>

````
      ['@vuepress/last-updated'],
````
### 修改components/YurPost.vue

`ctrl+f`搜索 $page.frontmatter.update_date,并全部替换为`$page.lastUpdated`
运行`npm run dev`即可查看效果

### 移除piano组件

### component文件名称修改

### 底部footer修改

新增Vuepress链接，修改Author文案，添加访问量，网站开始时间

### 移除多余shadow效果
----

## 容块示例

::: primary
这是 ::: primary
:::

::: primaryLong
这是 ::: primaryLong
:::

::: success
这是 ::: success
:::

::: successLong
这是 ::: successLong
:::

::: tip
这是 ::: tip
:::

::: tipLong
这是 ::: tipLong
:::

::: warning
这是 ::: warning
:::

::: warningLong
这是 ::: warningLong
:::

::: error
这是 ::: errorLong
:::