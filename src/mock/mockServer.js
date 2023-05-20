import Mock from 'mockjs'
// 注意json、图片文件是自动暴露的，文件中不用写export
import banners from './banners.json'
import floors from './floors.json'

// 提供广告位轮播数据的接口
Mock.mock('/mock/banners', {
  code: 200,
  data: banners
})

// 提供所有楼层数据的接口
Mock.mock('/mock/floors', {
  code: 200,
  data: floors
})
