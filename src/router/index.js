/*
 * @Author: yangzp
 * @Description: 
 * @Date: 2022-09-25 00:35:27
 * @FilePath: \trade-web\src\router\index.js
 */
import Vue from 'vue';
import Router from 'vue-router';
import login from '@/views/login/Login';
import userList from '@/views/user/userList';

Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/user/userList',
      name: "userList",
      component: userList,
      meta: { requireAuth: true }
    }
  ]
});

// router.beforeEach(async (to, from, next) => {
//   //查询cookie信息
//   // const flag = await this.$store.dispatch('validate');
//   if (to.meta.requireAuth == true) { // 需要登录权限进入的路由
//     if (!flag) {     // 获取不到登录信息
//       next({
//         path: '/'
//       })
//     } else {      // 获取到登录信息，进行下一步
//       return next();
//     }
//   } else {       // 不需要登录权限的路由直接进行下一步
//     return next();
//   }
// })

export default router
