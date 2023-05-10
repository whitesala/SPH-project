// home组件的小仓库
import Vue from 'vue'
import Vuex from 'vuex'

// 需要使用插件一次
Vue.use(Vuex)

export default new Vuex.Store({
  // 仓库存储数据的地方
  state: {
  },
  // 可以理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
  getters: {
  },
  // 修改state的唯一手段
  mutations: {
  },
  // 处理action，可以在里面书写自己的业务逻辑，也可以处理异步
  actions: {
  },
  // 实现vuex仓库模块化开发存储数据
  modules: {
  }
})
