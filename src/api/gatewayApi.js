const comPrefix = '/gatewayService/gateway/'; // 服务前缀

// 网关服务操作API
const gatewayApi = {
  // 登录服务
  login: comPrefix + 'login',
  logOut: comPrefix + 'logout',
  getLoginInfo: comPrefix + 'loginInfo'
};

export default gatewayApi;
