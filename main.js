import App from './App'
import { request } from './utils/request.js'
import store from './store/index.js'
import uView from '@/uni_modules/uview-ui'
import tim from './commen/tim/tim.js'
import commen from './commen/commen.js'
import TIM from '@/modules/tim-js-sdk'
// #ifndef VUE3
import Vue from 'vue'
import cuCustom from './components/colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)


Vue.prototype.$axios = request
Vue.config.productionTip = false
Vue.prototype.tim = tim.tim  			//tim sdk 引入后生成的tim服务
Vue.prototype.$TIM = TIM				//tim 的状态/事件 常量
Vue.prototype.$commen = commen
App.mpType = 'app'
Vue.use(uView)
const app = new Vue({
    store,
    ...App
})

app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'

export function createApp() {
    const app = createSSRApp(App)
    return {
        app
    }
}

// #endif