---
title: 【mkm】框架及数据库设计

date: 2019-11-16 09:05:10

tags:

  - MUD

  - 数据库设计

---
## 数据库设计

### 人物表 - PlayerInfo

| 字段       | 描述         | 类型     |
|------------|--------------|----------|
| ID         | 唯一编码     | GUID     |
| Name       | 姓名         | nvarchar |
| NickName   | 称号         | nvarchar |
| BirthPlace | 出生地       | nvarchar |
| Sex        | 性别         | int      |
| Sect       | 门派（废弃） | int      |
| IsAlive    | 是否陨落     | bool     |

### 人物属性表 - PlayerAttribute
AttributeType区分属性作用
  - 战斗属性 如血量、防御、真元等
  - 判定属性 如洞府数量、道友数量，学习技能数量，可学习技能级别等


| 字段          | 描述       | 类型     |
|---------------|------------|----------|
| ID            | 唯一编码   | GUID     |
| FK_PlayerGuid | 关联角色ID | nvarchar |
| AttrName      | 属性名称   | nvarchar |
| AttrValue     | 属性值     | int      |
| AttributeType | 类型       | int      |

### 人物特性表 - PlayerSpecial

| 字段          | 描述       | 类型     |
|---------------|------------|----------|
| ID            | 唯一编码   | GUID     |
| FK_PlayerGuid | 关联角色ID | nvarchar |
| Strength      | 根骨       | int      |
| Perception    | 体魄       | int      |
| Endurance     | 魅力       | int      |
| Intelligence  | 悟性       | int      |
| Agility       | 敏捷       | int      |
| Luck          | 福源       | int      |

### 角色资产表 - PlayerProperty

TypeId区分类型
  - 战斗技能
  - 生活技能
  - 特殊技能
  - 其他、、

| 字段          | 描述       | 类型     |
|---------------|------------|----------|
| ID            | 唯一编码   | GUID     |
| FK_PlayerGuid | 关联角色ID | nvarchar |
| TypeId        | 类型       | int      |
| ItemName      | 资产名称   | string   |
| Level         | 资产级别   | int      |
| Value         | 掌握经验   | int      |

### 人物状态表 - PlayerState

| 字段          | 描述       | 类型     |
|---------------|------------|----------|
| ID            | 唯一编码   | GUID     |
| FK_PlayerGuid | 关联角色ID | nvarchar |
| StateLevel    | 境界       | int      |
| LevelExp      | 经验       | int      |
| LifeRemark    | 寿元       | int      |
| MaxLifeTime   | 最大寿元   | int      |
| CurrentLife   | 当前寿元   | int      |
| Energy        | 精力       | int      |
| Money         | 灵石       | int      |
| Gold          | 仙玉       | int      |

## 装备 - equipment

分类
武器

逻辑--
可设置装备属性值
可附魔升级
可参与战斗逻辑

| 字段    | 描述     | 类型     |
|---------|----------|----------|
| ID      | 唯一编码 | GUID     |
| Type    | 类型     | int      |
| Name    | 装备名称 | nvarchar |
| Attack  | 伤害     | int      |
| Defense | 防御     | int      |
| Worth   | 价值     | int      |

## 技能

| 字段              | 描述     | 类型     |
|-------------------|----------|----------|
| ID                | 唯一编码 | GUID     |
| Type              | 类型     | nvarchar |
| Level             | 品阶     | nvarchar |
| Name              | 装备名称 | nvarchar |
| LearningCondition | 学习条件 | int      |
| Defense           | 防御     | int      |
| Worth             | 价值     | int      |

## 洞府

## 地图

## 任务

## NPC

### 普通NPC
### 怪物

## 门派

### 生平记录表

### 人物-NPC关系表





