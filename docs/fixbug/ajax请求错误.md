---
title: 'ajax请求webservice错误Request format is invalid: application/json;utf-8'
date: 2020-01-14
tags:

  - Ajax

---

## 解决办法：

在 `<system.webServer>`节点下加以下配置节点即可
```` xml
<handlers>
    <add name="ScriptHandlerFactory" verb="*" path="*.asmx" preCondition="integratedMode" type="System.Web.Script.Services.ScriptHandlerFactory, System.Web.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35" />
    <add name="ScriptHandlerFactoryAppServices" verb="*" path="*_AppService.axd" preCondition="integratedMode" type="System.Web.Script.Services.ScriptHandlerFactory, System.Web.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35" />
</handlers>

````
> 来自 <http://blog.csdn.net/baogreat/article/details/38981637> 
