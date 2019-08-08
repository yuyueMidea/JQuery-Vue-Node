<template>
  <div class="footerGuide">
      <footer class="footer_guide border-1px">
        <div class="guide_item" @click="goto('/msite')" :class="{on: isCurrent('/msite')}">
          <span class="item_icon"><i class="iconfont icon-icon-waimai"></i></span>
          <span>首页</span>
        </div>
        <div class="guide_item" @click="goto('/search')" :class="{on: isCurrent('/search')}">
          <span class="item_icon"> <i class="iconfont icon-search"></i></span>
          <span>搜索</span>
        </div>
        <div class="guide_item" @click="goto('/order')" :class="{on: isCurrent('/order')}">
          <span class="item_icon"><i class="iconfont icon-icon-"></i></span>
          <span>订单</span>
        </div>
        <div class="guide_item" @click="goto('/profile')" :class="{on: isCurrent('/profile')}">
          <span class="item_icon"> <i class="iconfont icon-ren"></i></span>
          <span>我的</span>
        </div>
      </footer>

  </div>
</template>

<script>
export default {
  name: 'footerGuide',
  data () {
    return {
      msg: 'footerGuide'
    }
  },
  methods: {
    goto(path) {
      this.$router.replace(path)
    },
    isCurrent(path) {
      // console.log(this.$route.path)
      return this.$route.path === path
    }
  }
}
</script>

<style scoped>
.footer_guide{
  border-top: 1px solid #e4e4e4;position: fixed; z-index: 100;
  left: 0; right: 0; bottom: 0;background-color: #fff;
  width: 100%; height: 50px; display: flex;
}
.footer_guide .guide_item{
  display: flex;flex: 1; text-align: center; flex-direction: column; align-items: center;
  margin: 5px; color: #999; 
}
.footer_guide .guide_item span{
  font-size: 12px; margin-top: 2px; margin-bottom: 2px;
}
.footer_guide .guide_item .iconfont{
  font-size: 22px;
}
.footer_guide .on {
  color:  #02a774;
}
</style>
