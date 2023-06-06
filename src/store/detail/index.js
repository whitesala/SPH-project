// 导入api接口文件
import { goodsInfoAPI } from '@/api/index'

const state = {
  goodsInfo: {}
}
const mutations = {
  GOODSINFO (state, goodsInfo) {
    state.goodsInfo = goodsInfo
  }
}
const actions = {
  // 这里除了commit外还要传递params，这里的params是载荷，需要通过组件中的dispatch中的第二个参数来传进来
  // 这里默认载荷params为空
  // 因为这里需要发送的是post请求
  async goodsInfo ({ commit }, skuId) {
    const result = await goodsInfoAPI(skuId)
    console.log(result)
    if (result.code === 200) {
      commit('GOODSINFO', result.data)
    }
  }
}

// 在仓库中使用Getter简化组件获取数据的步骤
const getters = {
  // 商品的类别路径
  categoryView (state) {
    return state.goodsInfo.categoryView || {}
  },
  // 当前点击的具体商品的信息
  skuInfo (state) {
    return state.goodsInfo.skuInfo || {}
  },
  // 商品的相关参数属性
  spuSaleAttrList (state) {
    return state.goodsInfo.spuSaleAttrList || []
  }
}

export default {
  // 开启命名空间
  namespaced: true,
  // 仓库存储数据的地方
  state,
  // 可以理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
  getters,
  // 修改state的唯一手段
  mutations,
  // 处理action，可以在里面书写自己的业务逻辑，也可以处理异步
  actions

}
