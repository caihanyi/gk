import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router/index'
import store from './store'
import ElememntUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import * as http from "./netapi/axios";


Vue.prototype.getRequest = http.getRequest    //全局注册，使用方法为:this.$axios
Vue.prototype.postRequest = http.postRequest;
Vue.prototype.postKeyValueRequest = http.postKeyValueRequest;
Vue.prototype.putRequest = http.putRequest;
Vue.prototype.deleteRequest = http.deleteRequest;


Vue.use(ElememntUI)

Vue.config.productionTip = false

console.log('初始化');

new Vue({

  router,
  store,
  render: h => h(App)
}).$mount('#app')
