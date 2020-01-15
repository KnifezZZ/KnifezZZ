---

title: Kz.layedit使用说明

description: 基于原版layedit编辑器新增了html源码模式、插入hr水平线、段落格式、字体颜色、字体背景色、批量上传图片、上传视频、上传附件、锚点、插入表格、插入自定义链接、全屏、预览、右键菜单优化以及一些参数设置

date: 2018-12-24 15:00:18

tags:

  - LayUI

  - JavaScript

  - 富文本编辑器

---

::: tip 功能简介
基于原版layedit编辑器新增了html源码模式、插入hr水平线、段落格式、字体颜色、字体背景色、批量上传图片、上传视频、上传附件、锚点、插入表格、插入自定义链接、全屏、预览、右键菜单优化以及一些参数设置
:::

## 项目介绍

首先欢迎使用 [Kz.layedit](http://knifez.gitee.io/kz.layedit/index.html)!
本项目基于layui.layedit富文本编辑器，在其之上拓展而来。

### 实验功能

undo\redo、字体、字体大小设置

在使用之前，请先认识几个已存在问题

### 目前存在问题（2018-12-20）

1、本编辑器基本不支持IE浏览器，甚至是IE12，由于个人能力原因，暂时放弃维护

2、虽然对移动端做了适配,但是使用体验不咋的,已经放弃治疗.以后估计只会优化界面,避免出现宽,高溢出的情况.但是操作体验上基本无法改进了...不建议移动端做富文本编辑

3、字体和字体大小设置存在一定问题，目前还没有头绪解决，估计短期内不好搞定

## 使用

### 基础配置

toolbar由tool参数配置，可自由调整顺序和内容。

``` javascript
tool: [
        'html'//源码模式
        ,'undo','redo' //撤销重做--实验功能，不推荐使用
        ,'code', 'strong', 'italic', 'underline', 'del',
        ,'addhr' //添加水平线
        ,'|', 'fontFomatt','fontfamily','fontSize', //段落格式，字体样式，字体颜色
        ， 'colorpicker', 'fontBackColor'//字体颜色，字体背景色
        , 'face', '|', 'left', 'center', 'right', '|', 'link', 'unlink'
        ，'image'//原版上传图片
        ，'images'//多图上传
        , 'image_alt'//上传图片拓展
        , 'attachment'//上传附件
        , 'video' //视频上传
        ,'anchors' //锚点
        , '|', 'table'//插入表格
        ,'customlink'//插入自定义链接
        ,'fullScreen'//全屏
        ，'preview'//预览
    ]
```

基础方法未做修改，详细见原版文档，: [layui.layeidt v1.0.9](https://www.layui.com/v1/doc/modules/layedit.html#use)

### 编辑器基本设置

| 参数名称                     |     类型 |                                                                        介绍                                                                        |
|:-----------------------------|---------:|:--------------------------------------------------------------------------------------------------------------------------------------------------:|
| 原版参数tool/hideTool/height |       -- |                                                               保持原版设置，未做改动                                                               |
| uploadImage                  |   object | 支持url、method、data、headers、accept、acceptMime、exts、size、field。 [layupload基本参数](https://www.layui.com/doc/modules/upload.html#options) |
| uploadVideo                  |   object | 支持url、method、data、headers、accept、acceptMime、exts、size、field。 [layupload基本参数](https://www.layui.com/doc/modules/upload.html#options) |
| uploadFiles                  |   object | 支持url、method、data、headers、accept、acceptMime、exts、size、field。 [layupload基本参数](https://www.layui.com/doc/modules/upload.html#options) |
| calldel                      |   object |                                                               图片/视频删除回调方法                                                                |
| devmode                      |     bool |                                                 开发者模式，控制插入链接时是否显示rel和target属性                                                  |
| autoSync                     |     bool |                                                     自动同步到textarea文本域设置，默认为false                                                      |
| onchange                     | function |                                                                  内容改变监听事件                                                                  |
| codeConfig                   |   object |                                                   插入代码设置，控制插入代码时是否显示代码选择框                                                   |
| quote                        |   object |                                                                  外部样式/js引用                                                                   |
| customTheme                  |   object |                                                                   视频自定义主题                                                                   |
| videoAttr                    |   string |                                                  video标签附加属性，可给插入的视频添加设置的属性                                                   |
| customlink                   |   object |                                        自定义链接，配置该项后，可插入一个指定href的a标签，只需设置text内容                                         |
| facePath                     |   string |                                               设置插入表情路径，解决表情图片地址为file://开头的问题                                                |
| rightBtn                     |   object |                                        右键菜单设置，包含type,customEvent，type设置为default/layBtn/custom                                         |
| previewAttr                  |   object |                                     预览样式设置，等同layer的offset和area规则，暂时只支持offset ,area两个参数                                      |

### 参数介绍

#### uploadImage/Video/Files

暴露layupload参数接口，具体参数介绍和使用查看[layupload基本参数](https://www.layui.com/doc/modules/upload.html#options)。Image和Video默认类型对应为图片和视频，url为必填项，其他可选可不选。同时size不能超过web设置。

上传支持后台重复验证

正常上传返回码为 {code:0,msg:"上传成功",data:{src:"服务器文件地址"}}；

上传异常返回码为 {code:1,msg:"上传失败",data:{src:"服务器文件地址"}}；

重复上传返回码为 {code:2,msg:"服务器已存在该文件",data:{src:"服务器重复文件地址"}}；

重复上传时会进行弹窗提示，是否调用服务器已存在文件路径。

uploadImage 默认值{accept: 'image',acceptMime: 'image/\*',exts: 'jpg|png|gif|bmp|jpeg',size: 1024 * 10,}

uploadVideo 默认值 {
                accept: 'video',
                acceptMime: 'video/*',
                exts: 'mp4|flv|avi|rm|rmvb',
                size: 1024 \* 10 \* 2,
            }

uploadFiles 默认值 {
                accept: 'file',
                acceptMime: 'file/*',
                size: '20480',}

示例：

```` javascript
            uploadImage: {
                url: 'your url',
                accept: 'image',
                acceptMime: 'image/*',
                exts: 'jpg|png|gif|bmp|jpeg',
                size: 1024 * 10,
                done: function (data) {
                    console.log(data);
                }
            }

            uploadVideo: {
                url: 'your url',
                accept: 'video',
                acceptMime: 'video/*',
                exts: 'mp4|flv|avi|rm|rmvb',
                size: 1024 * 10 * 2,
                done: function (data) {
                    console.log(data);
                }
            }

            uploadFiles: {
                url: 'your url',
                accept: 'file',
                acceptMime: 'file/*',
                size: '20480',
                done: function (data) {
                    console.log(data);
                }
            }
````

#### callDel文件删除回调参数

在删除已上传的图片和视频时，常常需要同步删除服务器文件，在使用时可配置此参数满足需要，该参数为删除已上传文件时的回调参数，post到后台删除服务器文件等操作
后台接受参数：

图片： imgpath --图片路径

视频： filepath --视频路径 imgpath --封面路径

附件： filepath --附件路径

示例：

``` javascript
        calldel: {
                url: 'your url',
                done: function (data) {
                    console.log(data);
                }
            }
```

#### devmode 开发者模式

默认为false,主要控制插入超链接时是否显示rel和target设置

#### autoSync 自动同步

默认为false，设置为true时编辑器内容改动则立即同步到textarea文本域

#### onchange 内容改变监听方法

配置此参数后，在编辑器内容变动时调用配置方法，实现监听效果和自定义处理。
content为编辑器内容文本（带html标签）

示例：

``` javascript
        onchange: function (content) {
                console.log(content);
            }
```

#### codeConfig 插入代码配置

若想使用原版，则无需配置该参数，或者将hide设置为false。
配置为true时，需设置default默认语言项。

``` javascript
        codeConfig: {
                hide: true,  //是否隐藏编码语言选择框
                default: 'javascript' //hide为true时的默认语言格式
            }
```

#### quote外部样式引用

编辑器引入外部样式，在编辑和预览时调用展示，预览时仅style有效，不引入js。

``` javascript
        quote:{
                style: ['Content/css.css'],
                //js: ['/Content/Layui-KnifeZ/lay/modules/jquery.js']
            }
```

#### customTheme 视频自定义主题 (自用)

该参数设置视频添加时是否附加样式class,暂时只支持video设置。
添加效果为

``` html
<div class="theme1" ><video ···>您的浏览器不支持video播放</video></div>
```

<p style="color:red">该设置也不支持修改时使用。。。</p>

``` javascript
            customTheme: {
                video: {
                    title: ['原版', 'custom_1', 'custom_2']
                    , content: ['', 'theme1', 'theme2']
                    , preview: ['', '/images/prive.jpg', '/images/prive2.jpg']
                }
            }
```

#### videoAttr 视频默认属性

设置video默认属性，在插入视频时自动追加。

``` javascript
videoAttr: ' preload="none" '
```

#### customlink 插入自定义链接

插入一个设置好href属性的链接，只需填写文本即可。暂时只支持三个属性设置，title为弹窗标题，href为要插入的链接地址，onmouseup为插入链接的onmouseup属性。

``` javascript
        customlink:{
                title: '插入layui官网'
                , href: 'https://www.layui.com'
                ,onmouseup:''
            }
```

#### facePath 表情路径

设置插入表情路径，解决表情图片地址为file://开头的问题

#### rightBtn 右键菜单设置

主要有两个参数type和customEvent。type控制右键菜单的类型，共有三个属性 default,laybtn,custom。

default为浏览器默认右键菜单，不做任何修改。

layBtn为编辑器设置的右键菜单，根据点击的是p标签、img标签、video标签、td/tr标签来展示不同属性。

custom为自定义标签，配置该属性后必须配置customEvent。可自由设置右键点击事件。

``` javascript
 rightBtn: {
                type: "layBtn",//default|layBtn|custom  浏览器默认/layedit右键面板/自定义菜单 default和layBtn无需配置customEvent
                customEvent: function (targetName, event) {
                    //根据tagName分类型设置
                    switch (targetName) {
                        case "img":
                            alert("this is img");
                            break;
                        default:
                            alert("hello world");
                            break;
                    };
                    //或者直接统一设定
                    //alert("all in one");
                }
            }
```

#### previewAttr 预览样式设置

预览样式设置，等同layer的offset和area规则，暂时只支持offset ,area两个参数，参数设置等同于layer参数设置

--以上内容适用于kz.layedit v1.0.3.2 beta版本或更高。

感谢各位使用、star、捐赠和反馈！

<https://gitee.com/KnifeZ/Kz.layedit/>