/*
 * @Author: yangzp
 * @Description: 
 * @Date: 2022-09-25 00:35:27
 * @FilePath: \trade-web\src\main.js
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import request from './utils/myRequest';
import md5 from 'js-md5';
import './style/index.css';
import animated from 'animate.css';
import store from './store';


import secKillApi from './api/secKillApi';


Vue.prototype.$md5 = md5;
Vue.prototype.$get = request.get;
Vue.prototype.$post = request.post;
Vue.prototype.$put = request.put;
Vue.prototype.$upload = request.upload;
Vue.prototype.$download = request.download;
Vue.prototype.secKillApi = secKillApi;

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(animated);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
