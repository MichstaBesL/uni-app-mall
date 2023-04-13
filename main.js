import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// 引入uview ui库
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

import {myRequery} from "./util/api.js"
Vue.prototype.$myRequery = myRequery

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif