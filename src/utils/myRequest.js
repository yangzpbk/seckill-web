import axios from 'axios';
import ElementUI from 'element-ui';
// import moment from 'moment';
import router from '../router';

// moment.locale('zh-cn');

// 统一配置
const myRequest = axios.create({
  responseType: 'json',
  validateStatus(status) {
    // 200 外的状态码都认定为失败
    return status === 200;
  }
});

// 添加响应拦截器
myRequest.interceptors.response.use(function(response) {
  // 对响应数据做点什么
  return response;
}, function(error) {
  // log.error(error);
  if (error.response === undefined) {
    // 请求被重定向时直接跳转至错误页面
    // 防止同时重复请求时重复提示
    if (window.location.href.indexOf('ssoErr') === -1) {
      router.push('/ssoErr');
      ElementUI.MessageBox.confirm('您的登录已过期，请重新登录或跳转', '提示', {
        confirmButtonText: '确定',
        showCancelButton: false,
        closeOnClickModal: false,
        type: 'warning',
        showClose: false
      }).then(() => {
        sessionStorage.clear();
        // location.reload();
        // window.close();
      });
    }
  }
  // 对响应错误做点什么
  // console.log('error', error, error.response.status);
  let errorMessage = '';
  if (error.response.data === null) {
    errorMessage = '系统内部异常，请联系网站管理员';
  } else {
    errorMessage = error.response.statusText;
  }
  switch (error.response.status) {
    case 404:
      ElementUI.Notification({
        title: '系统提示',
        message: '很抱歉，资源未找到',
        type: 'info'
      });
      break;
    case 403:
      break;
    case 401:
      // ElementUI.MessageBox.confirm('您当前暂未登录，或被登出，请重新登陆', '提示', {
      //   confirmButtonText: '确定',
      //   showCancelButton: false,
      //   closeOnClickModal: false,
      //   type: 'warning',
      //   showClose: false
      // }).then(() => {
      //   sessionStorage.clear();
      //   store.state.tagsbar.visitedViews.splice(0, store.state.tagsbar.visitedViews.length);
      //   router.push('/login');
      //   location.reload();
      //   window.close();
      // });
      break;
    default:
      ElementUI.Notification({
        title: '系统提示',
        message: errorMessage,
        type: 'info'
      });
      break;
  }
  return Promise.reject(error);
});

const request = {
    post(url, params,nobody) {
    // if(!nobody){
    //   params = formatParams(params);
    // }
    return myRequest.post(url, params, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
  put(url, params,nobody) {
    // if(!nobody){
    //   params = formatParams(params);
    // }
    return myRequest.put(url, params, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
  get(url, params) {
    let _params;
    if (Object.is(params, undefined)) {
      _params = '';
    } else {
      _params = '?';
      for (const key in params) {
        if (params.hasOwnProperty(key) && params[key] !== null) {
          _params += `${key}=${params[key]}&`;
        }
      }
    }
    return myRequest.get(`${url}${_params}`);
  },
  delete(url, params) {
    let _params;
    if (Object.is(params, undefined)) {
      _params = '';
    } else {
      _params = '?';
      for (const key in params) {
        if (params.hasOwnProperty(key) && params[key] !== null) {
          _params += `${key}=${params[key]}&`;
        }
      }
    }
    return myRequest.delete(`${url}${_params}`);
  },
  export(url, params = {}) {
    ElementUI.Message({
      message: '导出数据中'
    });
    return myRequest.post(url, params, {
      transformRequest: [(params) => {
        let result = '';
        Object.keys(params).forEach((key) => {
          if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
            result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&';
          }
        });
        return result;
      }],
      responseType: 'blob'
    }).then((r) => {
      const content = r.data;
      const blob = new Blob([content]);
      const fileName = `${new Date().getTime()}_导出结果.xlsx`;
      if ('download' in document.createElement('a')) {
        const elink = document.createElement('a');
        elink.download = fileName;
        elink.style.display = 'none';
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href);
        document.body.removeChild(elink);
      } else {
        navigator.msSaveBlob(blob, fileName);
      }
    }).catch((r) => {
      console.error(r);
      ElementUI.Message({
        message: '导出失败'
      });
    });
  },
  /**
     * @param {type} url---请求地址
     * @param {type} params---请求入参
     * @param {type} filename---下载后的文件名
     * @msg: 文件下载
     */
  download(url, params, filename, callback) {
    // ElementUI.Message({
    //   message: '文件传输中'
    // });
    // params = formatParams(params);
    return new Promise((resolve, reject) => {
      myRequest.post(url, params,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          responseType: 'blob',
          onDownloadProgress: function(progressEvent) { // 原生获取上传进度的事件
            if (progressEvent.lengthComputable) {
              // 属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
              // 如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
              callback(progressEvent);
            }
          }
        }
      ).then((res) => {
        if(!filename) {
          //  不指定文件名，使用系统响应的文件名
          filename = res.headers['content-disposition'].replace(/^.*filename=(")?|"$/g, '');
          filename = decodeURIComponent(filename);
        }
        const content = res.data;
        if (content.type === 'application/json') {
          const fileReader = new FileReader();
          fileReader.onload = function() {
            try {
              // console.log("this.result", this.result);
              const res = JSON.parse(this.result); // 说明是普通对象数据，后台转换失败
              // console.log("res -> ", res);
              if (res.ROOT.BODY.RETURN_CODE !== '0') {
                reject();
              } else {
                resolve();
              }
            } catch (err) { // 解析成对象失败，说明是正常的文件流
              // console.log("解析成对象失败", err);
              downLoadBlobFile(content, filename);
              resolve();
            }
          };
          fileReader.readAsText(content);
        } else {
          // console.log("this.result", this.result);
          downLoadBlobFile(content, filename);
          resolve();
        }
      }).catch(r => {
        console.error(r);
        reject();
      });
    });
  },
  /**
     * @param {type} url---请求地址
     * @param {type} file---要上传的文件对象
     * @param {type} data---除了文件对象外，还要传入后台的其他参数
     * @msg: 文件上传
     */
  upload(url, file, data, callback) {
    const formData = new FormData();
    formData.append('file', file);
    if (data) {
      for (const key in data) {
        formData.append(key, data[key]);
      }
    }
    // return myRequest.post(url, formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // });
    return axios({
      url: url,
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: function(progressEvent) { // 原生获取上传进度的事件
        if (progressEvent.lengthComputable) {
          // 属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
          //             //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
          callback(progressEvent);
        }
      },
      data: formData
    })
  }
}
;

// function formatParams(params) {
//   return {
//     'ROOT': {
//       'HEAD': {},
//       'BODY': params || { 'BUSI_INFO': {}}
//     }
//   };
// }
export default request;
