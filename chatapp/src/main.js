import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import storage from './util/storage'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import SvgIcon from '_c/svgIcon/SvgIcon'
import VueLazyLoad from 'vue-lazyload'
import './assets/fonts/iconfont.css'
import '@/assets/fonts/iconfont.js'
import './assets/styles/global.scss'
const EventBus = new Vue()
Vue.config.productionTip = false
Vue.prototype.$bus = EventBus
Vue.prototype.$storage = storage

Vue.use(VueLazyLoad, {
  loading: require('./assets/imgs/load.gif'),
  error: require('./assets/imgs/default.jpg')
})
Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('http://www.9nine.site')
}))
Vue.component('svg-icon', SvgIcon)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
