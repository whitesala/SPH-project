import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  // 控制路由组件切换时的页面滚动行为，这里是进入组件后页面滚动到最顶部
  scrollBehavior (to, from, savedPosition) {
    // 返回y为0表示进入组件后滚动到页面的最顶端
    return { y: 0 }
  }
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
