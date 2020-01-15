---
title: '[abp+ant design vue]abp vue迁移antd(一)'

description: '将abp的前端代码迁移到ant desgin vue,同时取消使用typescript'

date: 2020-01-03

tags:
  - ABP
  
  - VUE

  - dotnet core
  
  - ant-design-vue
---
::: tip
- 本文前提是您已初步了解node.js和npm。
- 由于个人非专业前端，所以前端搭建的模板来自于懒猴子CG,基于vuex,UI库选用了ant design vue,抛弃了惯用的iView。
- 同时也为了减少学习成本，没有使用TypeScript，去除了i18n国际化配置。
:::

## 整体结构

项目静态文件存储于`static`文件夹内；页面置于`pages`内，不再是`views`。


## 引入abp所需npm组件

在根目录找到`package.json`，然后修改dependencies如下，主要是引入abp-web-resources和signalr
```` json
  "dependencies": {
    "@aspnet/signalr": "^1.0.0",
    "abp-web-resources": "^4.2.0",
    "ant-design-vue": "^1.4.4",
    "axios": "^0.19.0",
    "enquire.js": "^2.1.6",
    "less": "^3.10.3",
    "less-loader": "^5.0.0",
    "scriptjs": "^2.5.9",
    "vue": "^2.5.2",
    "vue-router": "^3.0.1",
    "vuex": "^3.1.2"
  },
````
然后执行`npm install`,安装依赖项。

## abp前端方法迁移
第一步肯定是将abp的原有方法迁移过来。

主要分为lib内的方法迁移，router修改，store迁移，保证登录功能正常。

### lib文件夹迁移


