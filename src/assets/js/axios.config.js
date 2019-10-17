import axios from 'axios';

// 设置axios请求baseUrl
axios.defaults.baseURL = 'http://api.imooc.hybrid.lgdsunday.club/';

/**
 * 设置拦截器，
 * 所有axios发送的请求，发送前走这里
 * 在这里加上token
 */
axios.interceptors.request.use((config) => {
  if(config.params) {
    config.params.token = 'a44816f0-ef54-11e9-acd3-7b90f1eac841'
  }else{
    config.params = {
      token: 'a44816f0-ef54-11e9-acd3-7b90f1eac841'
    }
  }
  return config;
});

/**
 * 设置拦截器，interceptors相应处理
 * 所有使用axios的请求相应，都会优先回调到拦截器中
 * 请求成功走第一个，错误走第二个
 */

axios.interceptors.response.use((response) => {
  // 统一处理数据
  return response.data;
}, (error) => {
  return Promise.reject(error);
});


export default axios;
