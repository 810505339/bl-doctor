import Vue from 'vue'
import Vuex from 'vuex'
import rootModules from './rootModules.js'
Vue.use(Vuex)

const files = require.context('./modules', false, /\.js$/)

files.keys().forEach(key => {
	const store = files(key).default
	const moduleName = key.replace(/^\.\//, '').replace(/\.js$/, '')
	// 添加模块
	rootModules.modules = rootModules.modules ? rootModules.modules : {},
	rootModules.modules[moduleName] = store
	rootModules.modules[moduleName].namespaced = true
})
const store = new Vuex.Store(rootModules)
export default store
