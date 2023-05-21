// 导入api接口文件
import { searchListAPI } from '@/api/index'

const state = {
  searchList: {},
  testArray: []
}
const mutations = {
  SEARCHLIST (state, searchList) {
    state.searchList = searchList
  }
}
const actions = {
  // 这里除了commit外还要传递params，这里的params是载荷，需要通过组件中的dispatch中的第二个参数来传进来
  // 这里默认载荷params为空
  // 因为这里需要发送的是post请求
  async searchList ({ commit }, params = {}) {
    const result = await searchListAPI(params)
    console.log(result)
    if (result.code === 200) {
      commit('SEARCHLIST', result.data)
    }
  }
}

// 在仓库中使用Getter简化组件获取数据的步骤
const getters = {
  // 这里的state指代的是当前仓库下的state里面的所有数据,将这些数据整合在一起返回一个对象的形式，比如当前的searchList对象
  goodsList (state) {
    // 这里需要注意的是需要判断当请求失败的时候（如遇到网络的问题时，服务器的数据未能在传递到仓库中，那么仓库中的searchList就是为初始的空对象）
    // 需要考虑searchList为空对象的情况
    // 增添逻辑判断符||
    return state.searchList.goodsList || {}
    // console.log(state)
  },

  // 分类数据
  attrsList (state) {
    return state.searchList.attrsList || {}
  },

  // 品牌商标数据
  trademarkList (state) {
    return state.searchList.trademarkList || {}
  }

}

export default {
  // 开启命名空间
  // namespaced: true,
  // 仓库存储数据的地方
  state,
  // 可以理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
  getters,
  // 修改state的唯一手段
  mutations,
  // 处理action，可以在里面书写自己的业务逻辑，也可以处理异步
  actions

}
