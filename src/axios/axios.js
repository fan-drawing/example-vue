// cnpm install axios
// import Vue from 'vue'
import 'es6-promise/auto' //Vuex 依赖 Promise。如果你支持的浏览器并没有实现 Promise (如 IE)，那么你可以使用一个 polyfill 的库(如  es6-promis)
import axios from 'axios' //引用axios
import {getCookie,delCookie} from './util' //引用刚才我们创建的util.js文件，并使用getCookie方法
import Qs from 'qs';
import {Notification} from 'element-ui'
import router from '@/router'
// axios 配置
axios.defaults.timeout = 10000;
axios.defaults.baseURL = "/api/v1"; //这是调用数据接口
 
// http request 拦截器，通过这个，我们就可以把Cookie传到后台
axios.interceptors.request.use(
  config => {
    const token = getCookie('session'); //获取Cookie
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type':'application/json;charset=UTF-8' //设置跨域头部
    };
    if (token) {
      config.params = {'token': token} //后台接收的参数，后面我们将说明后台如何接收
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
 
var goType = true;
// http response 拦截器
axios.interceptors.response.use(
  response => {
//response.data.errCode是我接口返回的值，如果值为2，说明Cookie丢失，然后跳转到登录页，这里根据大家自己的情况来设定
    if(response.data.errno=='4101'&&goType) {
      goType = false;
      setTimeout(()=>{goType=true;},3000);
      router.push({
        path: '/login',
        // query: {redirect: router.currentRoute.fullPath} //从哪个页面跳转
      })

      
    }
    return response;
  },
  error => {
    Notification.error({
      title: '错误',
      message: '接口数连接用失败'
    });
    return Promise.reject(error.response.data)
  });
 
export default axios;
 
/**
 * fetch 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function fetch(url,params = {},dataType="json") {
  // console.log(params)
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: url,
      params: params,
      responseType: dataType,
    }).then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}
 
/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
  })
}
 
/**
 * patch 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
  })
}
 
/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
  })
}