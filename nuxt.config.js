export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'KnifeZ,博客记录',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '主业.net，略懂WPF、Winform,Xamarin,Vue,熟练掌握Sql Server/MySql/Sqlite的拼写，单机游戏爱好者' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'element-ui/lib/theme-chalk/index.css',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/element-ui',
    { src: '~plugins/baidu.js', ssr: false },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],
  /*
   ** axios proxy
   */
  axios: {
    proxy: true,
    prefix: '/api/',
    credentials: true
  },
  /*
   ** proxy
   */
  proxy: {
    '/api/': {
      target: 'https://blog.knifez18.com',
      // target:'http:localhost:5033',
      pathRewrite: {
        '^/api/': '/api/',
        changeOrigin: true
      }
    }
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true,
    transpile: [/^element-ui/],
  }
}
