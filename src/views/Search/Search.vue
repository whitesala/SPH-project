<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i @click="removeCategory">×</i></li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}<i @click="removeKeyword">×</i></li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(':')[1] }}<i @click="removeTrademark">×</i></li>
            <!-- 平台售卖属性的面包屑 -->
            <li class="with-x" v-for="(item,index) in searchParams.props" :key="index">{{ item.split(':')[1] }}<i @click="removeProps(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 通过isOne和isTwo来控制选中排序列表的效果显示，click事件控制点击不同类别后排序逻辑的实现 -->
                <li :class="{active: isOne}" @click="changeOrder('1')">
                  <!-- v-show用来控制选中不同排序类别箭头的显示隐藏 -->
                  <!-- 通过isDesc和isAsc来加载不同箭头图标的样式类别 -->
                  <a >综合 <span v-show="isOne" class="iconfont" :class="{'icon-xiangshang':isAsc,'icon-xiangxia':isDesc}"> </span></a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder('2')">
                  <a>价格  <span v-show="isTwo" class="iconfont" :class="{'icon-xiangshang':isAsc,'icon-xiangxia':isDesc}"> </span></a>
                </li>
                <li>
                  <a>销量</a>
                </li>
                <li>
                  <a>新品</a>
                </li>
                <li>
                  <a>评价</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(goods) in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 声明式导航 -->
                    <!-- 使用模板字符串 -->
                    <router-link :to="`/detail/${goods
                    .id}`">
                      <img :src="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>&nbsp;
                      <i>{{ goods.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="goods.title">{{ goods.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- 分页器组件-->
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Search',

  data () {
    return {
      // 响应式的数据，给服务器发送参数
      searchParams: {
        // 不同分类级别产品id
        category1Id: '',
        category2Id: '',
        category3Id: '',
        // 产品名字
        categoryName: '',
        // 关键字
        keyword: '',
        // 排序'
        order: '1:desc',
        // 页数
        pageNo: 1,
        // 每一页展示条数
        pageSize: 10,
        // 平台属性操作
        props: [],
        // 品牌
        trademark: ''
      }
    }
  },

  components: {
    SearchSelector
  },

  // 在执行前整理参数
  beforeMount () {
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
    // console.log(this)
  },
  mounted () {
    // 只能发一次请求
    this.getSearchData()
  },
  methods: {
    // 封装调用搜索页数据的函数
    getSearchData () {
      // dispatch派发action
      this.$store.dispatch('searchList', this.searchParams)
    },
    removeCategory () {
      // 设为undefined不会将数据发给服务器，如果是空对象则会发送
      this.searchParams.categoryName = undefined
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      this.getSearchData()
      // 清理面包屑后地址栏的相应参数也需要发生改变
      // 这里保留了关键词
      this.$router.push({ name: 'search', params: this.$route.params })
    },
    removeKeyword () {
      // 点击x后将search组件中的keyword为空
      this.searchParams.keyword = undefined
      // 全局事件总线
      this.$bus.$emit('clearKeyword')
      // 清除路径中的params参数,同时需要保留query查询的参数
      this.$router.push({ name: 'search', query: this.$route.query })
      // 重新请求数据,需要重新整理一下searchParams的参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      this.getSearchData()
    },
    removeTrademark () {
      // 设置trademark为undefined
      this.searchParams.trademark = undefined
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      this.getSearchData()
    },
    // 移除平台售卖属性的面包屑
    removeProps (index) {
      // 移除相应点击的索引的面包屑
      this.searchParams.props.splice(index, 1)
      // 重新获取数据
      this.getSearchData()
    },

    // 品牌
    trademarkInfo (trademark) {
      // 按照服务器要求的格式使用模板字符串发送对应的数据
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      // 重新发送请求
      this.getSearchData()
    },
    // 平台售卖属性
    attrInfo (attr, attrValue) {
      // 按照服务器要求的数据格式发送
      const propsData = `${attr.attrId}:${attrValue}:${attr.attrName}`
      // 将点击到的数据推入到props里面
      // this.searchParams.props.push([...new Set(propsData)])
      // 这里是判断是否重复点击一个属性,indexOf为-1表示没有重复点击,则继续下列的操作,否则不执行操作
      if (this.searchParams.props.indexOf(propsData) === -1) {
        this.searchParams.props.push(propsData)
      }
      this.getSearchData()
    },

    // 改变排序
    changeOrder (flag) {
      // 一开始的active
      const originOrder = this.searchParams.order
      const originFlag = originOrder.split(':')[0]
      const originSort = originOrder.split(':')[1]
      // 新的排序
      let newOrder = ''
      // 判断点击的选项是否为当前的选项（这里需要该进，因为只判断了综合和加个两个排序选项）
      if (flag === originFlag) {
        newOrder = `${originFlag}:${originSort === 'desc' ? 'asc' : 'desc'}`
      } else {
        newOrder = `${flag}:${'desc'}`
      }
      // 为searchParams里的order赋值
      this.searchParams.order = newOrder
      // 发请求
      this.getSearchData()
    },

    // 从pagination接收页数
    getPageNo (pageNo) {
      this.searchParams.pageNo = pageNo
      this.getSearchData()
    }
  },
  computed: {
    ...mapGetters(['goodsList']),
    ...mapState({
      total: state => state.search.searchList.total
    }),
    // isActive () {
    //   return this.searchParams.order.indexOf('1') !== -1
    // }
    isOne () {
      return this.searchParams.order.indexOf('1') !== -1
    },
    isTwo () {
      return this.searchParams.order.indexOf('2') !== -1
    },
    isDesc () {
      return this.searchParams.order.indexOf('desc') !== -1
    },
    isAsc () {
      return this.searchParams.order.indexOf('asc') !== -1
    }
  },
  watch: {
    $route (oldVal, newVal) {
      // 整理带给服务器的数据
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      // 重新发送请求
      this.getSearchData()
      // 每一次请求完毕，将对应的一二三级分类的id清空
      this.searchParams.category1Id = ''
      this.searchParams.category2Id = ''
      this.searchParams.category3Id = ''
      // this.searchParams.keyword = ''
    }
  }

}
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>
