import App from './App'
import Vue from 'vue'
import uView from "uview-ui";
import plugins from './plugins';

import './uni.promisify.adaptor'

Vue.use(uView);
Vue.use(plugins)
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()