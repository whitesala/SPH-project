// 导入api接口文件

const state = {}
const mutations = {}
const actions = {}
const getters = {}

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
