export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    // 網頁標題
    title: '悅慶資訊 | Macnet',
    htmlAttrs: {
      // 中文網頁
      lang: 'zh-Hant'
    },
    meta: [
      { charset: 'UTF-8' },
      // RWD
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // 網頁描述
      { hid: 'description', name: 'description', content: '悅慶資訊成立於西元1998年，主要以電腦軟硬體、系統整合、軟體開發、網頁開發、企業產品開發、資訊管理專業顧問，服務領域主要為金融、產險、壽險、公部門、電商平台、醫療系統、科技產業等等大型企業。' },
      { name: 'format-detection', content: 'telephone=no' },
      // 作者
      { name: 'author', content: 'Macnet' },
      // 版權
      { name: 'copyright', content: 'Macnet' },
      // 追蹤索引
      { name: 'robots', content: 'index, follow' },
      // 內容描述
      { name: 'description', content: '本頁描述，不要超過 155 個字元。' },
      // 關鍵字(可捨棄)
      { name: 'keywords', content: '關鍵字1, 關鍵字2' },
      // Fb
      { name: 'og:title', content: 'fb的標題(文章標題)' },
      { name: 'og:description', content: 'fb的描述' },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: 'fb上的網址' },
      { name: 'og:image', content: '圖片網址' },
      { name: 'og:site_name', content: 'Site Name, i.e. Moz' },
      { name: 'fb:admins', content: 'Facebook numeric ID' },
      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@publisher_handle' },
      { name: 'twitter:title', content: 'Page Title' },
      { name: 'twitter:description', content: 'Page description less than 200 characters' },
      { name: 'twitter:creator', content: '@author_handle' },
      // Twitter summary card with large image must be at least 280x150px
      { name: 'twitter:image:src', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'normalize.css/normalize.css',
    '~/assets/scss/all.scss',
    'locomotive-scroll/dist/locomotive-scroll.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/locomotive.js',
      ssr: false
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
    // '@nuxt/postcss8'
  ],
  /*
  ** CSS資源位置
  */
  styleResources: {
    scss: [
      '~/assets/scss/abstracts/*.scss',
      '~/assets/scss/base/*.scss',
      '~/assets/scss/layouts/*.scss'
    ],
    // Hoisting @use
    hoistUseStatements: true
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      compact: false
    },
    postcss: null,
    transpile: [
      'three'
    ]
  }
}
