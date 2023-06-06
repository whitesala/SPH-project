// 导入对应的组件
import Home from '@/views/Home/Home.vue'
import Login from '@/views/Login/Login.vue'
import Register from '@/views/Register/Register.vue'
import Search from '@/views/Search/Search.vue'
import Detail from '@/views/Detail/Detail.vue'

// 向外共享路由地址
export default [
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
  },
  // 商品详情页
  {
    path: '/detail/:skuId?', component: Detail, meta: { show: false }
  }
]
