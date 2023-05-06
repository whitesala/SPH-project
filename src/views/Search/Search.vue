<template>

  <div>
    <h1>我是Search组件</h1>
    <h2>params参数============{{ keyword }}</h2>
    <h2>query参数============{{ k }}</h2>
  </div>
</template>

<script>
export default {
  // 接收路由传递过来的组件
  props: ['keyword', 'k']
}
</script>

<style>

</style>
