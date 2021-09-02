import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './style/index.scss'
import store from './store'
import './utils/day.js' 
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible' //rem适配基准值
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
