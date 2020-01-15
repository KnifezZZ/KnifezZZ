---
title: Sql查询中按IN排序
date: 2020-01-14
tags:

  - SQL
  - 代码片段

---

## Sql Server 按in排序

```` sql
select * from table where code in ('1,3,2,5')  order by charindex(code,'1,3,2,5')
````

## Sqlite 按in排序

```` sql
select * from table where code in ('1,3,2,5') order by INSTR('1,3,2,5',code)
````

