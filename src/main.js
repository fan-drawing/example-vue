// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './vuex/index.js'
import {fetch,post} from '@/axios/axios'
import {getCookie,setCookie,delCookie} from '@/axios/util'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;
Vue.prototype.$getCookie = getCookie;
Vue.prototype.$delCookie = delCookie;
Vue.prototype.$setCookie = setCookie;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$fetch = fetch;
Vue.prototype.$post = post;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
