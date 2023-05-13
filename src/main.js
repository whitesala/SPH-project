import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入三级联动组件
import TypeNav from '@/components/TypeNav/TypeNav.vue'

// 测试
import { categoryListAPI } from '@/api/index'
categoryListAPI()

// 全局注册三级联动组件
// 使用TypeNav.name获取到组件的名字
Vue.component(TypeNav.name, TypeNav)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
