<template>
<section class="order">
  <HeaderTop title=" 订单列表"/>
  <!-- <header class="header">
    <a class="header_title">
    <span class="header_title_text">订单列表</span>
    </a>
  </header> -->
  <section class="order_no_login">
    <!-- <img src="./images/nav/1.jpg"> -->
    <h3>登录后查看外卖订单</h3>
    <button>立即登陆</button>
  </section>
</section>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
export default {
  name: 'order',
  components:{
    HeaderTop
  },
  data () {
    return {
      msg: 'order'
    }
  }
}
</script>

<style scoped>
.order {
  width: 100%;
}
.order .header {
  background-color: #02a774; position: fixed; left: 0; top: 0;
  width: 100%; height: 45px;
}
.order .header .header_search {
  position: absolute; left: 15px; top: 50%; transform: translateY(-50%);
  width: 10%; height: 50%;
}
.order .header .header_search .icon-sousuo {
  font-size: 25px; color: #fff;
}
.order .header .header_title {
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  width: 50% ;color: #fff; text-align: center;
}
.order .header .header_title_text {
  display: block;font-size: 20px; color: #fff;
}
.order .header .header_login {
  position: absolute; right: 15px; top: 50%; transform:  translateY(-50%);
  font-size: 14px; color: #fff;
}
.order .header .header_login .header_login_text {
  color: #fff;
}
.order .order_no_login {
  padding-top: 140px; width: 60%; margin: 0 auto; text-align: center;
}
.order .order_no_login>img {
  width: 100%; height: 30%; display: block;
}
.order .order_no_login>h3 {
  padding: 10px 0; color: #6a6a6a; font-size: 17px;
}
.order .order_no_login>button {
  background: #02a774; display: inline; font-size: 14px; color: #fff;
  border: 0; outline: none; border-radius: 5px; padding: 10px 20px;
}
</style>
