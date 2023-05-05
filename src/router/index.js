import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入对应的组件
import Home from '@/views/Home/Home.vue'
import Login from '@/views/Login/Login.vue'
import Register from '@/views/Register/Register.vue'
import Search from '@/views/Search/Search.vue'

Vue.use(VueRouter)

const routes = [
  // 路由重定向
  {
    path: '/', redirect: '/home'
  },
  // 具体组件的路由规则
  {
    path: '/home', component: Home
  },
  {
    path: '/login', component: Login
  },
  {
    path: '/register', component: Register
  },
  {
    path: '/search', component: Search
  }
]

const router = new VueRouter({
  routes
})

// 向外共享router
export default router
