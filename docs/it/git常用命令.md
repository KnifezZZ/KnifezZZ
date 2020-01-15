---

title: git常用命令

date: 2019-05-05

tags:
  
  - git
  - 代码片段

---
## 配置全局账户

```` bash
$ git config --global user.name "your name"
$ git config --global user.email "youremail@qq.com"
````
## 克隆线上仓库

```` bash
$ git clone https://github.com/KnifezZZ/kzlayedit.git
````

## 导出git日志到log.txt
```` bash
$ git log --date=iso --pretty=format:'"%ad","%s"' >log.txt
````