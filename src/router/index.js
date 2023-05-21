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
  // 主页
  {
    path: '/home', component: Home, meta: { show: true }
  },
  // 登录页
  {
    path: '/login', component: Login, meta: { show: false }
  },
  // 注册页
  {
    path: '/register', component: Register, meta: { show: false }
  },
  // 搜索页
  // 搜索页这里/:keyword是占位
  {
    // ?代表params参数可传可不传
    path: '/search/:keyword?',
    component: Search,
    meta: { show: true },
    name: 'search',
    // 函数的形式传递props数据
    props: ($route) => {
      return {
        keyword: $route.params.keyword,
        k: $route.query.k
      }
    }
  }
]

const router = new VueRouter({
  routes
})

// console.log(router)
// console.log(this)

const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

// 对于VueRouter原型中的push方法进行重写
// resolv和reject分别表示成功和失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => {}, () => {})
  }
}
// 对于VueRouter原型中的replace方法进行重写
// 这里的第一个参数location是告诉push方法跳转的地址（传递哪些参数）
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    // 注意这里call和apply的区别
    // 相同点是都可以调用函数一次，都可以纂改函数的上下文一次
    // 不同点:call传递参数用逗号隔开,apply方法执行传递数组
    // 这里call里面的this保证其指向的上下文还是VueRouter的实例化对象
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => {}, () => {})
  }
}

// 向外共享router
export default router
