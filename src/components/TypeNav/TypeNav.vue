<template>
    <div class="type-nav">
      <div class="container">
        <!-- 事件委托 -->
        <!-- 解决移动到全部商品上的时候首个类别的背景颜色消失的问题 -->
        <!-- <div @mouseleave="resetCurrentIndex">
        </div> -->
        <h2 class="all">全部商品分类</h2>
        <nav class="nav">
            <a href="###">服装城</a>
            <a href="###">美妆馆</a>
            <a href="###">尚品汇超市</a>
            <a href="###">全球购</a>
            <a href="###">闪购</a>
            <a href="###">团购</a>
            <a href="###">有趣</a>
            <a href="###">秒杀</a>
        </nav>

        <div class="sort">
            <!--  利用事件委托+编程式导航实现路由的跳转与传递参数 -->
            <div class="all-sort-list2" @click="goSearch">
            <!-- 添加:class="{cur:currentIndex === index}表示如果currentIndex与当前鼠标的索引值相等时添加cur的样式 -->
                <div class="item bo" v-for="(item1,index) in categoryList" :key="item1.categoryId" @mouseenter="changeCurrentIndex(index)" :class="{cur:currentIndex === index}" @mouseleave="resetCurrentIndex">
                    <h3>
                        <a :data-categoryName="item1.categoryName" :data-category1Id="item1.categoryId">{{ item1.categoryName }}</a>
                    </h3>

                    <!-- 二三级商品分类 -->
                    <div class="item-list clearfix" :style="{display:currentIndex === index ? 'block' : 'none'}">
                        <div class="subitem" v-for="item2 in item1.categoryChild" :key="item2.categoryId">
                            <dl class="fore">
                                <dt>
                                    <a :data-categoryName="item2.categoryName" :data-category2Id="item2.categoryId">{{ item2.categoryName }}</a>
                                </dt>
                                <dd>
                                    <em v-for="item3 in item2.categoryChild" :key="item3.categoryId">
                                        <a :data-categoryName="item3.categoryName" :data-category3Id="item3.categoryId">{{ item3.categoryName }}</a>
                                    </em>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
// 按需加载throttle节流函数
import throttle from 'lodash/throttle'
export default {
  data () {
    return {
      // 鼠标经过的一级类别
      currentIndex: -1
    }
  },
  name: 'TypeNav',
  // 组件挂载完毕后向服务器发送请求
  mounted () {
    console.log(this)
    // 通知vuex发送请求，获取数据存储于仓库当中
    // dispatch派发
    this.$store.dispatch('home/categoryList')
  },
  computed: {
    // 1.这里使用命名空间的写法
    ...mapState('home', ['categoryList'])
    // 2.对象形式的写法
    // 注意如果使用对象的写法vuex里面命名空间namespaced不能开启,同时dispath里面的派发路径需要修改为categoryList
    // ...mapState({
    //   categoryList: state => state.home.categoryList
    // })

  },
  methods: {
    // changeCurrentIndex (index) {
    //   // 设置currentIndex数值为当前鼠标所在的类别索引
    //   this.currentIndex = index
    // },
    changeCurrentIndex: throttle(function (index) {
      // 设置currentIndex数值为当前鼠标所在的类别索引
      // 用户过快的浏览行为会导致浏览器没有反应的时间
      this.currentIndex = index
    }, 50),
    // 鼠标离开分类界面的时候移除对应的样式，即将currentIndex设置为-1
    resetCurrentIndex () {
      this.currentIndex = -1
    },
    // 使用event的目的是为了确定当前点击的有元素标签
    goSearch (event) {
      // 事件委托+编程式导航需要解决的问题：
      // 怎么确定点击的子节点是a标签
      // 确定点击的是a标签后如何区分是一二三级分类的标签
      // 利用自定义属性解决
      const element = event.target
      console.log(element)
      //  element.dataset返回的是当前点击标签的一个对象，如果点击的对象是a标签，那么里面就会包含事先设定的自定义标签data-categoryname(注意这里在浏览器中经过处理将后面的Name变为小写)，使用对象解构的形式将categoryname解构出来
      const { categoryname, category1Id, category2Id, category3Id } = element.dataset
      console.log(element.dataset)
      if (categoryname) {
        const location = { name: 'Search' }
        const query = { categoryName: categoryname }
        if (category1Id) {
          query.category1Id = category1Id
        } else if (category2Id) {
          query.category2Id = category2Id
        } else {
          query.category3Id = category3Id
        }
        // 整理完参数，为location添加query属性
        location.query = query
        // 路由跳转
        this.$router.push(location)
      }
    }

  }
}
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    // &:hover {
                    //     .item-list {
                    //         display: block;
                    //     }
                    // }
                }
                .cur{
                    background-color: rgb(205, 114, 114);
                }
            }
        }
    }
}

</style>
