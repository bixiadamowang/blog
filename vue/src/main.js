import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import axios from 'axios'

Vue.use(Antd)

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://39.109.114.126:9999';

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
