/*
 * @Author: yangzp
 * @Description: 
 * @Date: 2022-10-26 15:40:18
 * @FilePath: \trade-web\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getter'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
  },
  getters
});

export default store;
