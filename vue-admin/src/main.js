import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import '@/permission' // 跳转进度条
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import axios from 'axios'
Vue.config.devtools = true

Vue.use(VXETable)
Vue.use(Antd)
Vue.config.productionTip = false
Vue.prototype.axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
