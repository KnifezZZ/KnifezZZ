---
title: IIS网站日志分析

description: 'iis日志分析可以得到蜘蛛爬取情况，ip访问记录等信息'

tags:
  - IIS

date: 2019-12-24 14:34:47

---

::: tip 分析网站日志有什么用

- 网站不收录时查看日志有没有蜘蛛抓取
- 网站点击异常时查看日志查找异常ip、ua等记录
- 查看网站有没有异常访问，如大量不存在的页面链接访问记录等
:::

<!-- more -->

## iis日志的一般形式

```` log
#Software: Microsoft Internet Information Services 7.5
#Version: 1.0
#Date: 2019-12-23 00:00:05
#Fields: date time s-ip cs-method cs-uri-stem cs-uri-query s-port cs-username c-ip cs(User-Agent) sc-status sc-substatus sc-win32-status time-taken
2019-12-23 00:00:10 172.17.79.153 GET /news/409.html - 443 - 180.117.98.146 Mozilla/5.0+(Windows+NT+10.0;+Win64;+x64)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Chrome/51.0.2704.106+Safari/537.36 200 0 0 170
2019-12-23 00:00:10 172.17.79.153 GET /i/ssxc(111).jpg - 443 - 110.249.201.195 Mozilla/5.0+(Macintosh;+Intel+Mac+OS+X+10_13_6)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Chrome/67.0.3396.99+Safari/537.36 404 0 0 46

2019-12-23 00:01:14 172.17.79.153 GET /technique/cases31.html - 443 - 83.150.226.106 Mozilla/5.0+(compatible;+Baiduspider/2.0;++http://www.baidu.com/search/spider.html) 200 0 0 93
2019-12-23 00:01:37 172.17.79.153 GET /robots.txt - 80 - 66.249.71.71 Mozilla/5.0+(compatible;+Googlebot/2.1;++http://www.google.com/bot.html) 301 0 0 47

2019-12-23 00:02:20 172.17.79.153 GET /news/37.html - 80 - 173.82.90.226 Mozilla/5.0+(Windows+NT+6.1)+AppleWebKit/536.11+(KHTML,+like+Gecko)+Chrome/20.0.1132.57+Safari/536.11 301 0 0 187
2019-12-23 00:02:21 172.17.79.153 GET /news/37.html - 443 - 173.82.90.226 Mozilla/5.0+(Windows+NT+6.1)+AppleWebKit/536.11+(KHTML,+like+Gecko)+Chrome/20.0.1132.57+Safari/536.11 200 0 0 407

2019-12-23 00:09:56 172.17.79.153 GET /i9l/ VR-HHl=kZCzBOmvEPZ8W2l7kMCDQXKWw7HTU54CdadQnatEE2U+cz5EI1vxm3wKgtKjPlml+2pw8H1VB9rIUtVd&-ZAD=Ptxd3L30orZdz 443 - 104.166.89.250 - 404 0 0 531
2019-12-23 00:10:01 172.17.79.153 GET /i9l/ - 443 - 104.166.89.250 - 404 0 0 546
````

### 字段解释

- date 访问日期
- time 访问时间
- s-ip --
- cs-method 访问方式（一般为GET或post）
- cs-uri-stem 访问页面/文件
- cs-uri-query 查询参数
- s-port 端口**[443为https，80为http]**
- cs-username 用户名
- c-ip 客户端IP
- cs(User-Agent) 用户UA
- sc-status http状态码（200,404,301,302,500等）
- sc-substatus 同上   辅助标识
- sc-win32-status 同上 辅助标识
- time-taken 访问时长

### 访问时间

 格林尼治标准时间，与北京时间相差8个小时

## 客户端IP分析

<https://www.ipip.net/ip.html>

把获取的ip放进去查询，分析ip所属地区和是否真人概率

## 服务器返回状态码

200表示正常

404则说明用户没有访问到实际页面

301/302一般为访问的老地址跳转或者是输入了http地址跳转到https的情况

## 用户UA

查看访问用户的操作系统、浏览器型号、内核版本等信息
测试地址：<https://www.dute.org/user-agent>

> （操作系统 位数（32/64）） 浏览器内核  浏览器型号/浏览器版本

### 常见浏览器的 User Agent

1、Chrome

Win 7：

Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.163 Safari/535.1

macOS：

Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36

2、Firefox
Win 7：
Mozilla/5.0 (Windows NT 6.1; WOW64; rv:6.0) Gecko/20100101 Firefox/6.0
macOS：
Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:69.0) Gecko/20100101 Firefox/69.0
3、Safari
Win 7：
Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50
macOS：
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Safari/605.1.15

### 常见网络爬虫的 User Agent

> 一般情况下包含spider或bot的基本为蜘蛛

百度：Baiduspider

Google：Googlebot

Bing：Bingbot

360搜索：360Spider

搜狗：SogouSpider

有道：YoudaoBot

> 检查蜘蛛真假

> **tracert ip**，
如果显示cralw.baidu.com，且出现baidusipider， 类似于（baiduspider-123-125-71-48.crawl.baidu.com ［123.125.71.48］），则说明这个IP是真实的百度蜘蛛。出现crawl.sogou.com则表示是搜狗蜘蛛。
![20191224165605.png](https://blog-1300352674.cos.ap-shanghai.myqcloud.com/undefined20191224165605.png)

- **nslookup ip** 
如果返回找不到则为假蜘蛛
![20191224165819.png](https://blog-1300352674.cos.ap-shanghai.myqcloud.com/undefined20191224165819.png)
