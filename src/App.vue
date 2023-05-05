<template>
  <div>
    <Header></Header>
    <router-link to=""></router-link>
    <!-- 路由组件的页面呈现区域 -->
    <router-view></router-view>
    <Footer></Footer>
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
  }
}
</script>

<style lang="less" scoped>

</style>
