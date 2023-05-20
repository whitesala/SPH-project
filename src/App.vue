<template>
  <div>
    <Header></Header>
    <router-link to=""></router-link>
    <!-- 路由组件的页面呈现区域 -->
    <router-view></router-view>
    <!-- 使用不同路由的元信息里的show控制组件的展示与隐藏 -->
    <!-- 注意meta里面定义的属性可以从$route里面调用 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
// 导入对应的组件
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'

export default {
  components: {
    Header,
    Footer
  },
  mounted () {
    // 派发action，向vuex发起ajax请求，将数据存储在仓库中
    this.$store.dispatch('home/categoryList')
  }
}
</script>

<style lang="less" scoped>

</style>
