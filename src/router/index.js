import Vue from 'vue';
import Router from 'vue-router';
import login from '@/views/login/Login';
import goodsList from '@/views/goods/goodsList';
import userList from '@/views/user/userList';

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/goodsList',
      name: "goodsList",
      component: goodsList
    },
    {
      path: '/user/userList',
      name: "userList",
      component: userList
    }
  ]
})
