// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false

//引入iconfont 图标
import './assets/lib/iconfont/iconfont.css';

// import './assets/js/Data/bootstrap-datepicker3.css';
// import './assets/js/Data/bootstrap-datepicker.min.js';
// import './assets/js/Data/bootstrap-datepicker.zh-CN.min.js';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
