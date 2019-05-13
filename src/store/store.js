//vuex babel-polyfill
import 'babel-polyfill'
import Vue from 'vue';
import Vuex from 'vuex';
 
import auth from './modules/auth';
import wallet from './modules/wallet';
import error from './modules/error';
 
Vue.use(Vuex);
 
export default new Vuex.Store({
  modules: {
    auth,
    wallet,
    error
  }
});