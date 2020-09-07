require('dotenv').config()
// eslint-disable-next-line no-unused-vars
const { FIREBASE_KEY } = process.env
const siteName = 'Nowhere Unofficial Website'
const description = 'Nowhere Monitoring System 2.0'

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'spa',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: siteName,
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no',
      },
      {
        hid: 'description',
        name: 'description',
        content: description,
      },
      { hid: 'og:site_name', property: 'og:site_name', content: siteName },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://nowhere.system-2.net',
      },
      { hid: 'og:title', property: 'og:title', content: siteName },
      {
        hid: 'og:description',
        property: 'og:description',
        content: description,
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://nowhere.system-2.net/icon.png',
      },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@gericass' },
      { hid: 'twitter:creator', name: 'twitter:creator', content: '@gericass' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        innerHTML: `
        (function(d) {
          var config = {
            kitId: 'urr4fne',
            scriptTimeout: 3000,
            async: true
          },
          h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
        })(document);
    `,
        type: 'text/javascript',
        charset: 'utf-8',
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/base.scss', '@/assets/css/ress.css'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ['~/plugins/firebase'],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  styleResources: {
    scss: ['@assets/css/_constants.scss'],
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  loadingIndicator: {
    name: 'cube-grid',
    color: '#ffffff',
    background: 'black',
  },
  build: {
    extend(config, ctx) {
      if (config.module) {
        config.module.rules.push({
          test: /\.(vert|frag)$/i,
          use: ['raw-loader'],
        })
        // config.module.rules.push({
        //   test: /\.obj$/,
        //   loader: 'webpack-obj-loader',
        // })
        config.module.rules.push({
          test: /\.json$/,
          loader: 'json-loader',
          type: 'javascript/auto',
        })
        config.module.rules.push({
          test: /\.(obj|mtl|gltf|glb)$/i,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        })
        config.module.rules.unshift({
          test: /\.worker\.js$/,
          loader: 'worker-loader',
        })
        config.output.globalObject = 'this'
      }
    },
  },
}
