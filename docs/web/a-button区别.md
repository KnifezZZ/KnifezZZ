---

title: a标签和button按钮的区别

date: 2018-12-24 15:00:18

tags:

  - Html

---

## button标签定义和用法 

`<button>`定义一个按钮。 

在button元素内部，您可以放置内容，比如文本或图像。这是该元素与使用input元素创建的按钮之间的不同之处。 
`<button>`控件与`<input type="button">`相比，提供了更为强大的功能和更丰富的内容。`<button>`与`</button>`标签之间的所有内容都是按钮的内容，其中包括任何可接受的正文内容，比如文本或多媒体内容。例如，我们可以在按钮中包括一个图像和相关的文本，用它们在按钮中创建一个吸引人的标记图像。 

唯一禁止使用的元素是图像映射，因为它对鼠标和键盘敏感的动作会干扰表单按钮的行为。 

请始终为按钮规定type属性。InternetExplorer的默认类型是"button"，而其他浏览器中（包括W3C规范）的默认值是"submit"。 

### 浏览器支持 

所有主流浏览器都支持`<button>`标签。 

重要事项：如果在HTML表单中使用button元素，不同的浏览器会提交不同的值。InternetExplorer将提交`<button>`与`<button/>`之间的文本，而其他浏览器将提交value属性的内容。请在HTML表单中使用input元素来创建按钮。 

### 注意事项

在使用`<button>`标签时很容易想当然的当成`<input type="button">`使用，这很容易产生以下几点错误用法： 

通过`$('#customBtn').val()`获取`<button id="customBtn" value="test">`按钮`</button>`value的值,在IE(IE内核)下这样用到得的是值是“按钮”，而不是“test”，非IE下得到的是“test”。 
这一点要和`<input type="button">`区分开。 

通过这两种方式$('#customBtn').val()，$('#customBtn').attr('value')在不同浏览器的获得值，如下： 

| Browser/Value | $('#customBtn').val() | $('#customBtn').attr('value') |
|---------------|-----------------------|-------------------------------|
| Firefox13.0   | test                  | test                          |
| Chrome15.0    | test                  | test                          |
| Opera11.61    | test                  | test                          |
| Safari5.1.4   | test                  | test                          |
| IE9.0         | 按钮                  | 按钮                          |

## 备注

`<button>`标签放到了`<form>`表单内，你会发现点击这个button变成了提交，相当于`<input type="submit"/> `,此时点击button页面会刷新，触发form提交操作。