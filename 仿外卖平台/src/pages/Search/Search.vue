<template>
  <section class="search">
    <HeaderTop title=" 搜索"/>
    <!-- <header class="header">
      <div class="header_title">
      <span class="header_title_text">搜索</span>
      </div>
    </header> -->
    <form class="search_form" action="#">
      <input type="search" name="search" placeholder=" 请输入商家或美食名称" class="search_input">
      <input type="submit" class="search_submit">
    </form>
  </section>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
export default {
  name: 'search',
  components:{
    HeaderTop
  },
  data () {
    return {
      msg: 'search'
    }
  }
}
</script>

<style scoped>
.search {
  width: 100%; height: 100%;
}
.search .header {
  background-color: #02a774; position: fixed; top: 0; left: 0; z-index: 100;
  width: 100%; height: 45px;
}
.search .header .header_search {
  position: absolute; top: 50%; left: 15px; 
  transform:  translateY(-50%); width: 10% ;height: 50%;
}
.search .header .header_search .iconfont {
  font-size: 22px; color: #fff;
}
.search .header .header_title {
  position: absolute; top: 50%; left: 50%; transform:  translate(-50%, -50%);
  width: 30%; font-size: 22px; color: #fff; text-align: center;
}
.search .search_form {
  margin-top: 45px; background-color: #fff; padding: 12px 8px;
}
.search .search_form input {
  height: 35px; padding: 0 4px; border-radius: 2px; font-weight: bold; outline: none;
}
.search .search_form .search_input {
  float: left; width: 79%; border: 4px solid #f2f2f2; font-size: 14px; color: #333;
  background-color: #f2f2f2;
}
.search .search_form .search_submit {
  float: right; width: 18%; border: 4px solid #02a774; font-size: 16px; color: #fff;
  background-color: #02a774;
}
</style>
