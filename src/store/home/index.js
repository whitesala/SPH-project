// 按需导入api接口文件
import { categoryListAPI, bannerListAPI } from '@/api/index'

// home模块小仓库
const state = {
  // 一开始不要乱写初始值
  categoryList: [],
  bannerList: []
}

const mutations = {
  // 将action提交的数据存入state里面
  CATEGORYLIST (state, categoryList) {
    state.categoryList = categoryList
  },

  BANNERLIST (state, bannerList) {
    state.bannerList = bannerList
  }
}

const actions = {
  // 通过API里面的接口调用向服务器发请求获取导航类别的服务器数据
  async categoryList ({ commit }) {
    const result = await categoryListAPI()
    if (result.code === 200) {
      // 选取0-16条数据提交到mutations里面
      commit('CATEGORYLIST', result.data.slice(0, 16))
    }
  },

  // 使用的是mock里面的数据模拟获取后台数据
  async bannerList ({ commit }) {
    const result = await bannerListAPI()
    // console.log(result)
    if (result.code === 200) {
      // 提交给mutations
      commit('BANNERLIST', result.data)
    }
  }
}
const getters = {}

export default {
  // 开启命名空间
  namespaced: true,
  // 仓库存储数据的地方
  state,
  // 可以理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
  getters,
  // 修改state的唯一手段
  mutations,
  // 处理action，可以在里面书写自己的业务逻辑，可以将获取到的api数据通过commit提交给mutation里，state再在mutations里面修改state里面的数据，也可以处理异步
  actions

}
