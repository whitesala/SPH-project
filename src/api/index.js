// 导入request请求
import apiRequests from './request.js'
// 导入mock
import mockRequests from './mockAjax.js'

// 请求三级分类接口
export const categoryListAPI = () => apiRequests.get('/product/getBaseCategoryList')

// 获取banner首页轮播图接口
// 这里的banners是指向mock文件下、夹下的banners的json文件
export const bannerListAPI = () => mockRequests.get('/banners')

// 获取Search搜索页信息的api接口
export const searchListAPI = (params) => apiRequests.post('/list', params)

// 获取商品详情页的api接口
// 注意这里使用模板字符串的形式
export const goodsInfoAPI = (skuId) => apiRequests.get(`/item/${skuId}`)
