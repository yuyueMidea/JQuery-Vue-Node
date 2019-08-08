<template>
<section class="profile">
  <HeaderTop title=" 我的"/>
  <!-- <header class="header">
    <div class="header_title"><span class="header_title_text">我的</span></div>
  </header> -->
  <section class="profile-number">
    <router-link to="/login" class="profile-link">
      <div class="profile_image"><i class="iconfont icon-person"></i></div>
      <div class="user-info">
        <p class="user-info-top">登录/注册</p>
        <p><span class="user-icon"><i class="iconfont icon-shouji icon-mobile"></i></span>
        <span class="icon-mobile-number">暂无绑定手机号</span></p>
      </div>
      <span class="arrow"><i class="iconfont icon-jiantou1"></i></span>
    </router-link>
  </section>
  <section class="profile_info_data border-1px">
    <ul class="info_data_list">
      <a href="javascript:" class="info_data_link">
    <span class="info_data_top"><span>0.00</span>元</span>
    <span class="info_data_bottom">我的余额</span>
    </a>
    <a href="javascript:" class="info_data_link">
    <span class="info_data_top"><span>0</span>个</span>
    <span class="info_data_bottom">我的优惠</span>
    </a>
    <a href="javascript:" class="info_data_link">
    <span class="info_data_top"><span>0</span>分</span>
    <span class="info_data_bottom">我的积分</span>
    </a>
    </ul>
  </section>
  <section class="profile_my_order border-1px">
    <!-- 我的订单 -->
    <a href='javascript:' class="my_order">
      <span><i class="iconfont icon-order-s"></i></span>
      <div class="my_order_div">
        <span>我的订单</span>
        <span class="my_order_icon"><i class="iconfont icon-jiantou1"></i></span>
      </div>
    </a>
    <!-- 积分商城 -->
    <a href='javascript:' class="my_order">
      <span><i class="iconfont icon-jifen"></i></span>
      <div class="my_order_div">
        <span>积分商城</span>
        <span class="my_order_icon"><i class="iconfont icon-jiantou1"></i></span>
      </div>
    </a>
    <!-- 硅谷外卖会员卡 -->
    <a href="javascript:" class="my_order">
      <span><i class="iconfont icon-vip"></i></span>
      <div class="my_order_div">
        <span>硅谷外卖会员卡</span>
        <span class="my_order_icon"><i class="iconfont icon-jiantou1"></i></span>
      </div>
    </a>
  </section>
  <section class="profile_my_order border-1px">
    <!-- 服务中心 -->
    <a href="javascript:" class="my_order">
      <span><i class="iconfont icon-fuwu"></i></span>
      <div class="my_order_div">
        <span>服务中心</span>
        <span class="my_order_icon"><i class="iconfont icon-jiantou1"></i></span>
      </div>
    </a>
  </section>

</section>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
export default {
  name: 'profile',
  components:{
    HeaderTop
  },
  data () {
    return {
      msg: 'profile'
    }
  }
}
</script>

<style scoped>
.profile {
  width: 100%; 
}
.profile .header {
  background-color: #02a774; position: fixed; left: 0; top: 0; z-index: 100; 
  width: 100%;height: 45px;
}
.profile .header .header_title {
  position: absolute; top: 50%; left: 50%; transform:  translate(-50%, -50%);
  width: 30%; color: #fff; font-size: 22px; text-align: center; 
}
.profile .profile-number {
  margin-top: 45.5px;
}
.profile .profile-number .profile-link {
  position: relative; display: block; background: #02a774; padding: 20px 10px;overflow: hidden;
}
.profile .profile-number .profile-link .profile_image {
  float: left; width: 60px; height: 60px; border-radius: 50%;overflow: hidden; vertical-align: top;
}
.profile .profile-number .profile-link .profile_image .icon-person {
  background: #e4e4e4; font-size: 62px;
}
.profile .profile-number .user-info {
  float: left; margin-top: 8px; margin-left: 15px;
}
.profile .profile-number .user-info p {
  font-weight: 700; font-size: 18px; color: #fff;
}
.profile .profile-number .user-info p .user-info-top {
  padding-bottom: 8px;
}
.profile .profile-number .user-info p .user-icon {
  display: inline-block; margin-left: -15px; margin-right: 5px; width: 20px; height: 20px;
}
.profile .profile-number .user-info p .user-icon .icon-mobile {
  font-size: 30px; vertical-align: text-top;
}
.profile .profile-number .user-info p .icon-mobile-number {
  font-size: 14px; color: #fff;
}
.profile .profile-number .arrow {
  width: 12px; height: 12px; position: absolute; top: 40%; right: 15px;
}
.profile .profile-number .arrow .icon {
  font-size: 5px; color: #fff;
}
.profile .profile_info_data {
  border-bottom: 1px solid #e4e4e4; width: 100%; background: #fff; overflow: hidden;
}
.profile .profile_info_data .info_data_list .info_data_link {
  float: left; width: 33%; text-align: center; border-right: 1px solid #f1f1f1; 
}
.profile .profile_info_data .info_data_list .info_data_link .info_data_top {
  display: block; width: 100%; font-size: 14px; color: #333; padding: 15px 5px 10px;
}
.profile .profile_info_data .info_data_list .info_data_link span {
  display: inline-block; font-size: 30px; font-weight: 700; color: #f90; line-height: 30px;
}
.profile .profile_info_data .info_data_bottom {
  display: inline-block; font-size: 14px; color: #666;font-weight: 400;padding-bottom: 10px;
}
.profile .profile_info_data .info_data_list .info_data_link:nth-of-type(2) .info_data_top span {
  color: #ff5f3e;
}
.profile .profile_info_data .info_data_list .info_data_link:nth-of-type(3) .info_data_top  {
  border: 0;
}
.profile .profile_info_data .info_data_list .info_data_link:nth-of-type(3) .info_data_top span {
  color: #6ac20b;
}
.profile .profile_my_order {
  border-top: 1px solid #e4e4e4; background: #fff; margin-top: 10px;
}
.profile .profile_my_order .my_order {
  display: flex; align-items: center;padding-left: 15px;
}
.profile .profile_my_order .my_order>span {
  display: flex; align-items: center; width: 20px; height: 20px;
}
.profile .profile_my_order .my_order>span>.iconfont {
  margin-left: -10px;font-size: 30px;
}
.profile .profile_my_order .my_order .icon-order-s {
  color: #02a774;
}
.profile .profile_my_order .my_order .icon-jifen {
  color: #ff5f3e;
}
.profile .profile_my_order .my_order .icon-vip {
  color: #f90;
}
.profile .profile_my_order .my_order .icon-fuwu {
  color: #02a774;
}
.profile .profile_my_order .my_order .my_order_div {
  width: 100%; border-bottom: 1px solid #f1f1f1; padding: 18px 10px 18px 0;
  font-size: 16px; color: #333; display: flex; justify-content: space-between;
}
.profile .profile_my_order .my_order .my_order_div span {
  display: inline-block;
}
.profile .profile_my_order .my_order .my_order_div .my_order_icon {
  float: right; width: 10px; height: 10px;
}
.profile .profile_my_order .my_order .my_order_div .my_order_icon .icon-jiantou1 {
  color: #bbb; font-size: 10px;
}

</style>
