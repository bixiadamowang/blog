import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import axios from 'axios'

Vue.use(Antd);
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$url = 'http://localhost:3000/'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
