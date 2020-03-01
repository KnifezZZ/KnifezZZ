---
title: '.net Core 3.0以上修改视图后刷新浏览器不变问题'
date: 2020-03-01 13:24:56
tags:
  - dotnet core
  - Razor
---

在使用WTM框架时发现修改razor页面时，无论怎么刷新页面都不会变，除非重新生成，后来查阅文档发现需要启用运行时编译

官方文档： <https://docs.microsoft.com/zh-cn/aspnet/core/mvc/views/view-compilation?view=aspnetcore-3.0>

### 解决方法
1. 安装 `Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation`;
2. 在Program.cs中`ConfigureServices`修改如下

```` csharp

                     webBuilder.ConfigureServices(x =>
                    {
                        x.AddSignalR();
                        x.AddFrameworkService();
                        x.AddLayui();
                        x.AddSwaggerGen(c =>
                        {
                            c.SwaggerDoc("v1", new OpenApiInfo { Title = "HXJQ.UniWeb API", Version = "v1" });
                            var bearer = new OpenApiSecurityScheme()
                            {
                                Description = "JWT Bearer",
                                Name = "Authorization",
                                In = ParameterLocation.Header,
                                Type = SecuritySchemeType.ApiKey

                            };
                            c.AddSecurityDefinition("Bearer", bearer);
                            var sr = new OpenApiSecurityRequirement();
                            sr.Add(new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer"
                                }
                            }, new string[] { });
                            c.AddSecurityRequirement(sr);
                        });
                        //自动刷新前端页面 需引用 Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation
                        x.AddRazorPages().AddRazorRuntimeCompilation();
                        //end
                    });
````
