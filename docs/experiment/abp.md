---
title: 【ABP】 动态菜单修改过程asp.netcore+vue

description: abp动态菜单的修改，无论用什么框架，第一件事情就是实现动态菜单，从数据库中读取菜单配置项输出前台，网上翻了一大堆翻译文档，也看了官方英文文档，关键点在于如何实现NavigationProvider和在前端调用abp.nav.menus.MainMenu

date: 2019-11-22 11:26:10
tags:

  - ABP

  - VUE

  - dotnet core


---
::: tip long
无论用什么框架，第一件事情就是实现动态菜单，从数据库中读取菜单配置项输出前台，网上翻了一大堆翻译文档，也看了官方英文文档，关键点在于如何实现``NavigationProvider``和在前端调用``abp.nav.menus.MainMenu``。
:::

## 后台处理

### 1、建表UiMenu

```` c#
 public class UiMenu : FullAuditedEntity<int>, IMustHaveTenant
    {
        public int Pid { get; set; }
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [Required]
        [StringLength(50)]
        public string DisplayName { get; set; }
        [Required]
        [StringLength(50)]
        public string MenuType { get; set; }
        [StringLength(200)]
        public string Path { get; set; }
        [StringLength(500)]
        public string CustomData { get; set; }
        [StringLength(200)]
        public string Remark { get; set; }
        public string Icon { get; set; }
        public string Action { get; set; }
        public int Order { get; set; }
        public int TenantId { get; set; }
    }
````

### 2、实现MyNavigationProvider

在Core项目里新建文件夹`Navigations`,新建类``MyNavigationProvider``,需继承`NavigationProvider`。

如下实现UiMneu的仓储操作对象

````C#
        private readonly IRepository<UiMenu> _repository;
        public MyNavigationProvider(IRepository<UiMenu> repository)
        {
            _repository = repository;
        }
````

然后重写``SetNavigation``。

````C#
            var allMenus = _repository.GetAllList();
            foreach (var item in allMenus)
            {
                if (item.Pid>0)
                {
                    //子项
                    context.Manager.MainMenu.GetItemByName(allMenus.Find(p => p.Id == item.Pid).Name).AddItem(
                        new MenuItemDefinition(
                           item.Name,
                           new LocalizableString(item.DisplayName, MyConsts.LocalizationSourceName),
                           url: item.Path,
                           icon: item.Icon,
                           isVisible: item.IsDeleted,
                           requiredPermissionName: ""
                            )
                        );
                }
                else
                {
                    //父级菜单
                    context.Manager.MainMenu.AddItem(new MenuItemDefinition(
                           item.Name,
                           new LocalizableString(item.DisplayName, MyConsts.LocalizationSourceName),
                           url: item.Path,
                           icon: item.Icon,
                           isVisible:item.IsDeleted,
                           requiredPermissionName:""//配置权限，可在UiMenu表中新加字段配置
                           ));
                }
            }
````

至于如何对菜单表进行增删改查维护，不是本篇主题，故略过。

## 前端实现

前端实现的主要是依靠官方提供的方法``abp.nav.menus.MainMenu``

### 1、创建router帮助方法 router-util.ts

````typescript

import main from '../views/main.vue'
//import ParentView from '@/components/parent-view'
// 加载路由菜单,从localStorage拿到路由,在创建路由时使用
//  @函数: 引入组件
export const lazyLoadingCop = file => require('../views' + file + '.vue').default
class RouterHelper {
  dynamicRouterAdd(): Array<Router> {
    let dynamicRouter = []
    window.abp.nav.menus.MainMenu.items.forEach(el => {
      let obj = {
        path: '/' + el.name,
        name: el.name,
        icon: el.icon,
        permission: undefined,
        meta: { title: el.displayName },
        component: 'main',
        children: [],
      }
      if (el.items.length > 0) {
        el.items.forEach(child => {
          obj.children.push({
            path: child.name,
            name: child.name,
            icon: child.icon,
            permission: undefined,
            meta: { title: child.displayName },
            component: child.url,
            children: null,
          })
        })
        dynamicRouter.push(obj)
      } else {
        dynamicRouter.push({
          path: '/' + el.items[0].name,
          name: el.items[0].name,
          icon: el.items[0].icon,
          permission: undefined,
          meta: { title: el.items[0].displayName },
          component: el.items[0].url,
          children: [],
        })
      }
    });
    dynamicRouter = this.filterAsyncRouter(dynamicRouter)
    return dynamicRouter
  }

  // @函数: 遍历后台传来的路由字符串，转换为组件对象
  filterAsyncRouter(asyncRouterMap) {
    const accessedRouters = asyncRouterMap.filter(route => {
      if (route.component) {
        if (route.component === 'main' || route.component.name === 'main') { // Main组件特殊处理
          route.component = main
        }
        // else if (route.component === 'parentView') { // parentView组件特殊处理
        //  route.component = ParentView
        // }
        else {
          route.component = lazyLoadingCop(route.component)
        }
      }
      if (route.children && route.children.length) {
        route.children = this.filterAsyncRouter(route.children)
      }
      return true
    })
    return accessedRouters
  }

}
const routerHelper = new RouterHelper();
export default routerHelper;

````

`parentView`为多级菜单，如果有需求可以使用，该组件摘自iView admin 2.0

解释：

循环`abp.nav.menus.MainMenu.items`，将其格式转换为`Router`。方便菜单调用。

### 2、修改router/index.ts

找到router/index.ts，
在`beforeEach`方法里添加如下代码

````typescript
        let dyRouters = RouterHelper.dynamicRouterAdd()
        dyRouters.forEach(element => {
            appRouters.push(element);
        });
        router.addRoutes(appRouters)
````

注意引用 `import RouterHelper from '../lib/router-util'`

## 总结

一开始没有丝毫头绪，后台参照使用iview admin时构建的方法进行尝试，加之刚刚接触typescript，用起来不是特别顺手，问题的关键在于`router/router.ts`->appRouters处无法获得`abp.nav.menus.MainMenu.items`在store/modules/app里虽然可以获取，但是router中不存在，无法正常点击跳转，taglist同样也无从获取。

最终想到这种不是很完美的方法，前端仍然需要进行循环转换Model。但终归是实现了动态菜单，可以进行下一步操作了。
