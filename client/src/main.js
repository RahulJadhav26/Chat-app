import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketio from 'vue-socket.io'
import socketio from 'socket.io-client'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vuescroll from 'vuescroll'

var socket = socketio('http://localhost:8000')

Vue.use(VueSocketio, socket)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(vuescroll, {
  ops: {
    // The global config
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
