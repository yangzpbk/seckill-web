/*
 * @Author: yangzp
 * @Description: 
 * @Date: 2022-09-26 11:22:41
 * @FilePath: \trade-web\src\api\secKillApi.js
 */

// const url = process.env.SECKILL_APP_URL;
const secKillApi = {
  // 公共服务
  common: {
    // 数据字典加载
    toLogin: '/sec/api/login/toLogin',
  },
  user: {
    queryUserList: "/sec/api/user/queryUserList",
    ifLogin: "/sec/api/login/ifLogin"
  }
};

export default secKillApi;
