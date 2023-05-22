import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入三级联动组件
import TypeNav from '@/components/TypeNav/TypeNav.vue'
// 引入分页器组件
import Pagination from '@/components/Pagination/pagination'

// 引入mockjs文件
import '@/mock/mockServer'

// 引入swiper的样式组件
import 'swiper/swiper-bundle.min.css'
// import 'swiper/css'

// 测试
import { categoryListAPI } from '@/api/index'
// import { prototype } from 'core-js/core/dict'
categoryListAPI()

// 全局注册三级联动组件
// 使用TypeNav.name获取到组件的名字
Vue.component(TypeNav.name, TypeNav)
// 全局注册分页器组件
Vue.component(Pagination.name, Pagination)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  // 配置全局事件总线
  beforeCreate () {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
