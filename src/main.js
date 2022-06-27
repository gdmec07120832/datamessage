import Vue from 'vue'
import instance from '@/utils/axios';
import App from './App.vue'
import router from './routes/index'
import {Notify} from 'vant';
import '@/assets/styles/index.styl'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

import "echarts/lib/chart/line";
import "echarts/lib/component/legend";
import "echarts/lib/component/tooltip";

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.use(Notify)
Vue.prototype.$axios = instance
Vue.prototype.$EventBus = new Vue()
Vue.config.productionTip = false
Vue.prototype.$message = {
  error: function (message) {
    Notify({
      type: 'danger',
      message: message
    })
  }
}

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
