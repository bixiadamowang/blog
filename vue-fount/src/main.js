import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import axios from 'axios'

Vue.use(Antd)

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://141.164.50.57:9998';
// axios.defaults.baseURL = 'http://localhost:9998';

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')