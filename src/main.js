// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'//引入element
import '../theme/index.css'
import 'element-ui/lib/theme-chalk/index.css'//引入element
//import {server} from './common/service/http-service'//引入API


//Vue.prototype.$server=server;//定义全局变量

Vue.config.productionTip = false
Vue.use(Element,{size:'small'})//使用element
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
