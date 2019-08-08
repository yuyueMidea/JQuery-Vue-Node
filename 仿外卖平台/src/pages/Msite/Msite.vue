<template>
  <div class="msite">
    <!-- 首页头部 -->
    <HeaderTop title=" 昌平区北七家宏福科技园(337  省道北)">
      <router-link slot="search" to="/search" class="header_search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link slot="login" to="/login" class="header_login">
        <span class="header_login_text">登录|注册</span>
      </router-link>
    </HeaderTop>
    <!-- <header class="header">
      <a class="header_search"><i class="iconfont icon-sousuo"></i></a>
      <a class="header_title"><span class="header_title_text ellipsis">昌平区北七家宏福科技园(337省道北)</span></a>
      <a class="header_login"><span class="header_login_text">登录|注册</span></a>
    </header> -->
    <!-- 首页导航 -->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <a href="javascript:" class="link_to_food"><div class="food_container"><img src="./images/nav/1.jpg"></div><span>甜品饮品</span></a>
            <a href="javascript:" class="link_to_food"><div class="food_container"><img src="./images/nav/5.jpg"></div><span>商超便利</span></a>
            <a href="javascript:" class="link_to_food"><div class="food_container"><img src="./images/nav/3.jpg"></div><span>美食</span></a>
            <a href="javascript:" class="link_to_food"><div class="food_container"><img src="./images/nav/4.jpg"></div><span>简餐</span></a>
            <a href="javascript:" class="link_to_food"><div class="food_container"><img src="./images/nav/1.jpg"></div><span>甜品饮品</span></a>
            <a href="javascript:" class="link_to_food"><div class="food_container"><img src="./images/nav/5.jpg"></div><span>商超便利</span></a>
            <a href="javascript:" class="link_to_food"><div class="food_container"><img src="./images/nav/3.jpg"></div><span>美食</span></a>
            <a href="javascript:" class="link_to_food"><div class="food_container"><img src="./images/nav/4.jpg"></div><span>简餐</span></a>
          </div>
          <div class="swiper-slide">
            <a href="javascript:" class="link_to_food"><div class="food_container"><img src="./images/nav/1.jpg"></div><span>甜品饮品</span></a>
            <a href="javascript:" class="link_to_food"><div class="food_container"><img src="./images/nav/2.jpg"></div><span>商超便利</span></a>
            <a href="javascript:" class="link_to_food"><div class="food_container"><img src="./images/nav/3.jpg"></div><span>美食</span></a>
            <a href="javascript:" class="link_to_food"><div class="food_container"><img src="./images/nav/4.jpg"></div><span>简餐</span></a>
            <a href="javascript:" class="link_to_food"><div class="food_container"><img src="./images/nav/5.jpg"></div><span>甜品饮品</span></a>
            <a href="javascript:" class="link_to_food"><div class="food_container"><img src="./images/nav/1.jpg"></div><span>商超便利</span></a>
            <a href="javascript:" class="link_to_food"><div class="food_container"><img src="./images/nav/2.jpg"></div><span>美食</span></a>
            <a href="javascript:" class="link_to_food"><div class="food_container"><img src="./images/nav/3.jpg"></div><span>简餐</span></a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!-- 首页附近商家 -->
    <div class="msite_shop_list border-1px">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i><span class="shop_header_title">附近商家</span>
      </div>
      <div class="shop_container">
        <ul class="shop_list">
          <li class="shop_li border-1px"><a>
                <div class="shop_left"><img class="shop_img" src="./images/nav/1.jpg"></div>
                <div class="shop_right">
                  <section class="shop_detail_header">
                    <h4 class="shop_title" >锄禾日当午，汗滴禾下土</h4>
                    <ul class="shop_detail_ul"><li class="supports">保</li><li class="supports">准</li><li class="supports">票</li></ul>
                  </section>
                  <section class="shop_rating_order">
                    <section class="shop_rating_order_left">
                      <div class="star star-24">
                        <span class="star-item on"></span><span class="star-item on"></span>
                        <span class="star-item on"></span><span class="star-item half"></span>
                        <span class="star-item off"></span>
                      </div>
                      <div class="rating_section">3.6</div>
                      <div class="order_section">月售 106 单</div>
                    </section>
                    <section class="shop_rating_order_right">
                      <span class="delivery_style delivery_left">硅谷专送</span><span class="delivery_style delivery_right">准时达</span>
                    </section>
                  </section>
                  <section class="shop_distance">
                    <p class="shop_delivery_msg"><span>¥20 起送</span><span class="segmentation">/</span><span>配送费约¥5</span></p>
                  </section>
                </div>
          </a></li>
          <li class="shop_li border-1px"><a>
                <div class="shop_left"><img class="shop_img" src="./images/nav/2.jpg"></div>
                <div class="shop_right">
                  <section class="shop_detail_header">
                    <h4 class="shop_title" >锄禾日当午，汗滴禾下土</h4>
                    <ul class="shop_detail_ul"><li class="supports">保</li><li class="supports">准</li><li class="supports">票</li></ul>
                  </section>
                  <section class="shop_rating_order">
                    <section class="shop_rating_order_left">
                      <div class="star star-24">
                        <span class="star-item on"></span><span class="star-item on"></span>
                        <span class="star-item on"></span><span class="star-item half"></span>
                        <span class="star-item off"></span>
                      </div>
                      <div class="rating_section">3.6</div>
                      <div class="order_section">月售 106 单</div>
                    </section>
                    <section class="shop_rating_order_right">
                      <span class="delivery_style delivery_left">硅谷专送</span><span class="delivery_style delivery_right">准时达</span>
                    </section>
                  </section>
                  <section class="shop_distance">
                    <p class="shop_delivery_msg"><span>¥20 起送</span><span class="segmentation">/</span><span>配送费约¥5</span></p>
                  </section>
                </div>
          </a></li>
          <li class="shop_li border-1px"><a>
                <div class="shop_left"><img class="shop_img" src="./images/nav/3.jpg"></div>
                <div class="shop_right">
                  <section class="shop_detail_header">
                    <h4 class="shop_title" >锄禾日当午，汗滴禾下土</h4>
                    <ul class="shop_detail_ul"><li class="supports">保</li><li class="supports">准</li><li class="supports">票</li></ul>
                  </section>
                  <section class="shop_rating_order">
                    <section class="shop_rating_order_left">
                      <div class="star star-24">
                        <span class="star-item on"></span><span class="star-item on"></span>
                        <span class="star-item on"></span><span class="star-item half"></span>
                        <span class="star-item off"></span>
                      </div>
                      <div class="rating_section">3.6</div>
                      <div class="order_section">月售 106 单</div>
                    </section>
                    <section class="shop_rating_order_right">
                      <span class="delivery_style delivery_left">硅谷专送</span><span class="delivery_style delivery_right">准时达</span>
                    </section>
                  </section>
                  <section class="shop_distance">
                    <p class="shop_delivery_msg"><span>¥20 起送</span><span class="segmentation">/</span><span>配送费约¥5</span></p>
                  </section>
                </div>
          </a></li>
          <li class="shop_li border-1px"><a>
                <div class="shop_left"><img class="shop_img" src="./images/nav/4.jpg"></div>
                <div class="shop_right">
                  <section class="shop_detail_header">
                    <h4 class="shop_title" >锄禾日当午，汗滴禾下土</h4>
                    <ul class="shop_detail_ul"><li class="supports">保</li><li class="supports">准</li><li class="supports">票</li></ul>
                  </section>
                  <section class="shop_rating_order">
                    <section class="shop_rating_order_left">
                      <div class="star star-24">
                        <span class="star-item on"></span><span class="star-item on"></span>
                        <span class="star-item on"></span><span class="star-item half"></span>
                        <span class="star-item off"></span>
                      </div>
                      <div class="rating_section">3.6</div>
                      <div class="order_section">月售 106 单</div>
                    </section>
                    <section class="shop_rating_order_right">
                      <span class="delivery_style delivery_left">硅谷专送</span><span class="delivery_style delivery_right">准时达</span>
                    </section>
                  </section>
                  <section class="shop_distance">
                    <p class="shop_delivery_msg"><span>¥20 起送</span><span class="segmentation">/</span><span>配送费约¥5</span></p>
                  </section>
                </div>
          </a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'

export default {
  name: 'msite',
  components:{
    HeaderTop
  },
  data () {
    return {
      msg: 'msite'
    }
  },
  mounted () {
    new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
      },
      loop: true
    })
  }
}
</script>

<style scoped>
.msite {
  width: 100%;
}
.header {
  background-color: #02a774; position: fixed; z-index: 100;
  left: 0; top: 0; width: 100%; height: 45px;
}
.header .header_search {
  position: absolute; left: 15px; top: 50%;
  transform: translateY(-50%); width: 10%; height: 50%;
}
.header .header_search .icon-sousuo {
  font-size: 25px; color: #fff;
}
.header .header_title {
  position: absolute; left: 50%; top: 50%;
  transform: translate(-50%, -50%); width: 50%; color: #fff; text-align: center;
}
.header .header_title_text {
  font-size: 20px; color: #fff; display: block;
}
.header .header_login {
  font-size: 14px; color: #fff;
  position: absolute; top: 50%; right: 15px;
  transform:  translateY(-50%);
}
.header .header_login_text {
  color: #fff;
}
.msite_nav {
  border-bottom: 1px solid #e4e4e4; margin-top: 45px; height: 200px;
  background: #fff;
}
.msite_nav .swiper-container {
  width: 100%; height: 100%;
}
.msite_nav .swiper-container .swiper-wrapper {
  width: 100%; height: 100%;
}
.msite_nav .swiper-container .swiper-slide {
  display: flex; justify-content: center; align-items: flex-start; flex-wrap: wrap;
}
.msite_nav .swiper-container .link_to_food {
  width: 25%;
}
.msite_nav .swiper-container .food_container {
  display: block; width: 100%; text-align: center;
  padding-bottom: 10px; font-size: 0;
}
.msite_nav .swiper-container img {
  display: inline-block; width: 50px; height: 50px;
}
.msite_nav .swiper-container span {
  display: block; widows: 100%; text-align: center; font-size: 13px; color: #666;
}
.msite_nav .swiper-pagination>span.swiper-pagination-bullet-active {
  background: #02a774;
}
.msite .msite_shop_list {
  border-top: 1px solid #e4e4e4; margin-top: 10px; background: #fff;
}
.msite .msite_shop_list .shop_header {
  padding: 10px 10px 0 10px;
}
.msite .msite_shop_list .shop_icon {
  margin-left: 5px; color: #999;
}
.msite .msite_shop_list .shop_header_title {
  color: #999; font-size: 14px; line-height: 20px;
}
.msite .msite_shop_list .shop_container {
  margin-bottom: 50px;
}
.msite .msite_shop_list .shop_list .shop_li {
  border-bottom: 1px solid #f1f1f1; width: 100%;
}
.msite .msite_shop_list .shop_list .shop_li>a {
  display: block; padding: 15px 8px; width: 100%;
  box-sizing: border-box; overflow: hidden;
}
.msite .msite_shop_list .shop_list .shop_li .shop_left {
  float: left; width: 23%; height: 75px; padding-right: 10px;
  box-sizing: border-box;
}
.msite .msite_shop_list .shop_list .shop_li .shop_img {
  width: 100%; height: 100%; display: block;
}
.msite .msite_shop_list .shop_list .shop_li .shop_right {
  float: right; width: 77%;
}
.msite .msite_shop_list .shop_list .shop_li .shop_right .shop_detail_header {
  width: 100%;
}
.msite .msite_shop_list .shop_list .shop_li .shop_right .shop_title {
  width: 200px; float: left; color: #333; font-size: 14px; line-height: 14px;
  font-weight: 700;
}
.msite .msite_shop_list .shop_list .shop_li .shop_right .shop_title::before {
  content: '品牌'; display: inline-block; font-size: 11px; line-height: 11px;
  color: #333; background: #ffd930; padding: 2px; border-radius: 2px; margin-right: 5px;
}
.msite .msite_shop_list .shop_list .shop_li .shop_right .shop_detail_ul {
  float: right; margin-top: 3px;
}
.msite .msite_shop_list .shop_list .shop_li .shop_right .supports {
  float: left; font-size: 10px; color: #999; border: 1px solid #f1f1f1;
  padding: 0 2px; border-radius: 2px;
}
.msite .msite_shop_list .shop_list .shop_rating_order {
  width: 100%; margin-top: 18px; margin-bottom: 8px;
}
.msite .msite_shop_list .shop_list .shop_rating_order .shop_rating_order_left {
  float: left; color: #ff9a0d;
}
.msite .msite_shop_list .shop_list .shop_rating_order .shop_rating_order_left .star {
  float: left; font-size: 0;
}
.msite .msite_shop_list .shop_list .shop_rating_order .shop_rating_order_left .star-item {
  width: 20px; height: 20px; margin-right: 22px; background-size: 20px 20px;
}
.msite .msite_shop_list .shop_list .shop_rating_order .shop_rating_order_left .star-item:last-child {
  margin-right: 0;
}
.msite .msite_shop_list .shop_list .shop_rating_order .rating_section {
  float: left; font-size: 10px; color: #ff6000; margin-left: 4px;
}
.msite .msite_shop_list .shop_list .shop_rating_order .order_section {
  float: left; font-size: 10px; color: #666; transform: scale(.8);
}
.msite .msite_shop_list .shop_list .shop_rating_order .shop_rating_order_right {
  float: right; font-size: 0;
}
.msite .msite_shop_list .shop_list .shop_rating_order .shop_rating_order_right .delivery_style {
  transform-origin: 35px 0; transform:  scale(.7); display: inline-block; font-size: 12px;
  padding: 1px; border-radius: 2px;
}
.msite .msite_shop_list .shop_list .shop_rating_order .shop_rating_order_right .delivery_left {
  color: #fff; margin-right: -10px; background-color: #02a774;
  border: 1px solid #02a774;
}
.msite .msite_shop_list .shop_list .shop_rating_order .shop_rating_order_right .delivery_right {
  color: #02a774; border: 1px solid #02a774;
}
.msite .msite_shop_list .shop_list .shop_rating_order .shop_distance {
  width: 100%; font-size: 12px;
}
.msite .msite_shop_list .shop_list .shop_rating_order .shop_distance .shop_delivery_msg {
  width: 200px; color: #666; float: left;
  transform-origin: 0; transform:  scale(.9);
}
.msite .msite_shop_list .shop_list .shop_rating_order .shop_distance .segmentation {
  color: #ccc;
}

</style>
