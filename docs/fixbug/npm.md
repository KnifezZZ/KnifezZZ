---

title: 'NPM错误记录'

date: 2020-02-13

tags:

  - NPM

---

本文为记录个人使用npm时遇到的问题和解决方案。

## npm install卡在checking installable status

出现该问题的原因大致有三种

 - 修改过仓库源（淘宝源之类的）
 - 远程仓库连接
 - 旧的npm缓存与项目冲突

### 解决方案
打开资源管理器，地址栏输入`C:\Users\用户名\AppData\Roaming` ,用户名为你的电脑用户名称

找到 npm和npm-cache文件夹然后删除;重新打开终端进行`npm install`即可

## npm ERR! code ELIFECYCLE

经过尝试为`webpack-dev-server`的版本太高，3.以上的不行。降到2.11.3一下左右即可

