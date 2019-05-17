//vuex babel-polyfill
import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
 
import user from './modules/user'
import error from './modules/error'
 
Vue.use(Vuex)
 
export default new Vuex.Store({
  modules: {
    user,
    error
  }
})