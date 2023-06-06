<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="previewCtrl"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="previewImg"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'Zoom',
  data () {
    return {
      showIndex: 0
    }
  },
  props: ['goodsImgList'],
  computed: {
    imgObj () {
      return this.goodsImgList[this.showIndex] || {}
    }
  },
  mounted () {
    this.$bus.$on('changeImgShow', (index) => {
      this.showIndex = index
    })
  },
  methods: {
    previewCtrl (event) {
      // 使用this.$refs获取到对应的标签
      const mask = this.$refs.mask
      const previewImg = this.$refs.previewImg

      // 蒙版左边和顶部距离盒子边缘的距离
      let left = event.offsetX - mask.offsetWidth / 2
      let top = event.offsetY - mask.offsetHeight / 2

      // 边界的判断
      if (left < 0) left = 0
      else if (left > event.target.offsetWidth - mask.offsetWidth) left = event.target.offsetWidth - mask.offsetWidth
      if (top < 0) top = 0
      else if (top > event.target.offsetHeight - mask.offsetHeight) top = event.target.offsetHeight - mask.offsetHeight

      // 控制蒙版跟随鼠标移动
      mask.style.left = left + 'px'
      mask.style.top = top + 'px'

      // 预览区域的放大镜效果实现
      previewImg.style.left = -2 * left + 'px'
      previewImg.style.top = -2 * top + 'px'

      // console.log(event)
      // console.log(mask.offsetWidth)
      // console.log(event.target.offsetWidth)
    }
  }

}
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 40%;
      height: 40%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    // ~表示当鼠标悬浮到event的标签上时，其后面的兄弟节点发生变化
    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>
