module.exports = {
    base: '/blog/',
    dest: 'blog',
    title: 'KnifeZ的研究记录',
    description: '热爱游戏的程序猿,.Net苦手，精通C#、.net core的拼写。在撸vue',
    head: [
        ['meta', {
            name: 'viewport',
            content: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
        }],
        ['meta', { name: 'X-UA-Compatible', content: 'ie=edge' }],
        ['meta', { name: 'theme-color', content: '#3c67bd' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        // ['script', {
        //     'data-ad-client': 'ca-pub-7802529615129872',
        //     async: 1,
        //     src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
        // }],
    ],

    // 多语言
    locales: {
        '/': {
            lang: 'zh-CN',
        },
    },

    evergreen: true,

    // theme: 'yurk',
    themeConfig: {
        // 站点地址
        site: 'https://www.knifez18.com',

        // 博主名称
        author: 'KnifeZ',

        // 博主名称跳转链接
        authorLink: 'https://www.knifez18.com',

        // 站点 Logo
        logo: '/image/logo.svg',
        // banner: '/20171231/banner.png',
        startYear: 2019,
        // 首页按钮，type 默认：default，可选：primary dashed danger link
        bannerButtons: [
            { text: '阅读博文', link: '/posts/?page=1&pageSize=12', type: 'primary' },
            { text: '关于我', link: '/about', type: 'default' },
        ],

        // 时间线
        timeline: true,

        //导航栏
        nav: [
            {
                text: '博文', icon: 'book', items: [
                    { text: '编程技术', icon: 'code', link: '/it/' },
                    { text: '前端', icon: 'global', link: '/web/' },
                    { text: '工作分享', icon: 'coffee', link: '/work-share/' },
                    { text: '随笔', icon: 'forward', link: '/archive/' },
                ]
            },
            { text: 'MUD开发', icon: 'gift', link: '/mud/' },
            { text: '挖坑试验', icon: 'experiment', link: '/experiment/' },
            { text: 'Bug记录', icon: 'tool', link: '/fixbug/' }
        ],

        // valine配置，打开此功能需配置
        comment: 'valine',
        valine: {
            appId: 'HdhA6NP2WkeVmSREGzAseQDy-gzGzoHsz',
            appKey: 'v8Nz1xBsHA6coUGOLPwa3zdu',
            placeholder: '在这里写下你的留言丨支持 MarkDown 语法',
            notify: true,
            verify: true,
            visitor: true,
            avatar: 'retro',
            pageSize: 8,
            recordIP: true,
        },

        //百度自动推送
        baiDuAuthPush: false,

        //百度统计
        // baiDuTongJi: 'token', // https://hm.baidu.com/hm.js?token

        // 在线聊天
        // crisp: '',

        // 打赏
        reward: [
            '/reward/alipay.jpg',
            '/reward/wechat.png',
        ],
        // // 友链
        // link: {
        //     // 封面图
        //     banner: '/20171231/summer-solstice-strawberry-moon.gif',
        //     blog: [
        //         {
        //             title: '凉风有信',                                                                  // 站点名称
        //             subtitle: '责难无以成事',                                                           // 站点描述
        //             link: 'https://gleehub.com/',                                                      // 站点网址
        //             logo: 'https://static.xmt.cn/cc50c217cbe342ce951324583f2c6139.png',                // 头像或者 Logo
        //             color: '#3c67bd',                                                                  // 主题色
        //         },
        //         {
        //             title: '阿业战记',
        //             subtitle: '提升码农亩产，掰直码农方向',
        //             link: 'https://eeee.im/',
        //             logo: 'https://eeee.im/avatar.jpg',
        //             color: '#3c67bd',
        //         },
        //     ],
        // },

        //关于我配置
        about: {
            banner: '/20171231/first-day-of-spring-2016-northern-hemisphere.gif',   // 封面图
            avatar: '/image/hero.jpg',   // 头像链接
            name: 'KnifeZ',                                                          // 博主名称
            introduction: '学的越多,懂得越少',                                            // 简介
        },

        //页脚配置
        footer: [
            [   // 推荐资源
                {
                    title: 'Yur Cli',
                    subtitle: 'Yur 主题快速搭建工具',
                    link: 'https://github.com/ioim/vuepress-theme-yur-cli',
                }
            ],
            [   // 相关信息
                {
                    title: '豫ICP备19046815号',
                    link: 'http://www.beian.miit.gov.cn',
                    type: 'safety-certificate'
                },
                {

                    title: '豫公网安备 41010202002829号',
                    link: 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=41010202002829',
                    type: 'file-protect'
                }
            ],
            [   // 其它
                {
                    title: 'GitHub',                        // 标题
                    link: 'https://github.com/knifezZZ/',      // 跳转链接
                    type: 'github',                         // 图标，这里获取：https://vue.ant.design/components/icon-cn/
                    theme: 'filled',                        // 图标类型，可选：filled（实心）丨outlined（默认：描线）丨twoTone（双色）
                },
                {
                    title: 'KnifeZRed@qq.com',
                    link: 'mailto:KnifeZRed@qq.com',
                    type: 'mail',
                    theme: 'outlined',
                }
            ],
        ],

        // 落下帷幕
        curtain: {
            tip: '页面准备中...',   // 提示语
        },

        // 打字特效
        ityped: {
            typeSpeed: 300,           // 正常速度
            backSpeed: 100,           // 反向速度
            startDelay: 300,          // 开始延迟（毫秒）
            backDelay: 300,           // 反向延迟（毫秒）
            loop: true,               // 循环
            showCursor: true,         // 显示指针
            placeholder: false,       // 占位
            disableBackTyping: false, // 禁用反向输入
            cursorChar: '丨',         // 指针字符
        },
    },
    //插件管理
    plugins: {
        'sitemap': {
            hostname: 'https://www.knifez18.com',
        }
    },

    // MarkDown 扩展
    markdown: {
        lineNumbers: true,
        anchor: { permalink: true, permalinkBefore: true, permalinkSymbol: '#' },
        toc: { includeLevel: [2, 3] },
    },

    //host: 'localhost',
    port: '2234',
};