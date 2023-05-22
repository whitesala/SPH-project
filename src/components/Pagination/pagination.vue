<template>
  <div class="pagination">
    <!-- 当前页数为1的时候，禁用上一页的功能 -->
    <button :disabled="pageNo === 1" @click="$emit('getPageNo',pageNo - 1)">上一页</button>
    <!-- 当连续页码区的起始页码大于1的时候显示原来的1按钮 -->
    <button v-if="StartAndEnd.start > 1" @click="$emit('getPageNo',1)" :class="{active:pageNo === 1}">1</button>
    <!-- 只有当连续页码区的起始页码大于2的时候显示原来的省略的... -->
    <button v-if="StartAndEnd.start > 2">···</button>

    <!-- 注意v-for除了可以遍历数组外，还可以遍历数字、对象、对象数组 -->
    <button v-for="(page,index) in StartAndEnd.end" :key="index" v-show="page>=StartAndEnd.start" @click="$emit('getPageNo',page)" :class="{active:pageNo === page}">{{ page }}</button>

    <!-- 下半页 -->
    <button v-if="StartAndEnd.end < totalPage - 1">···</button>
    <button v-if="StartAndEnd.end < totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo === totalPage}">{{ totalPage }}</button>
    <!-- 当前页数为总页数的时候禁用下一页的功能 -->
    <button :disabled="pageNo === totalPage" @click="$emit('getPageNo',pageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>

  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  // created () {

  // },
  computed: {
    // 计算总页数
    totalPage () {
      const { total, pageSize } = this
      return Math.ceil(total / pageSize)
    },
    // 计算开始页和结束页
    StartAndEnd () {
      let start = 0
      let end = 0
      // 将分页数据解构出来， 便利的地方：后续不用在数据前使用this
      const { pageNo, totalPage, continues } = this
      // 判断接收到的页面数据中连续的页码和总页面数的关系
      // 当连续的页面数大于总的页面数的时候
      if (continues > totalPage) {
        start = 1
        end = totalPage
      } else {
        // 连续的页面数小于总的页面数的时候
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        // 考虑特殊情况，即当连续的页码中的起始的页数小于1或者当结束页大于总页数的时候
        if (start < 1) {
          start = 1
          end = continues
        } else if (end > totalPage) {
          // continues是连续的页码数
          start = totalPage - continues + 1
          end = totalPage
        }
      }
      return { start, end }
    }
  }
}
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>
