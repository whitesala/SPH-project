// 导入request请求
import request from './request.js'

// 请求三级分类接口
export const categoryListAPI = () => request.get('/product/getBaseCategoryList')
