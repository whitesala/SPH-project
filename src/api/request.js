// 对axios进行二次封装
import axios from 'axios'
// 引入进度条的组件和其样式组件
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// console.log(nprogress)

// 使用axios的create对象创建axios的示例对象
const request = axios.create({
  // 基础根路径
  baseURL: 'http://gmall-h5-api.atguigu.cn/api',
  // 请求超时的事件
  timeout: 5000
})

// 设置请求拦截器
// 请求拦截器可以在请求发送出去前检测到并做一些事情
request.interceptors.request.use((config) => {
  // 检测到请求发送，进度条开始加载
  nprogress.start()
  // config配置对象,里面包含请求头headers
  return config
})

// 设置响应拦截器
request.interceptors.response.use((res) => {
  nprogress.done()
  // 检测到成功得到响应数据
  return res.data
}, (error) => {
  alert(error.message)
  // 响应失败的回调函数
  return new Promise()
})

export default request
