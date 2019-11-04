/*
 * @Author: your name
 * @Date: 2019-03-14 14:03:09
 * @LastEditTime: 2019-11-04 15:17:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vueCounter\src\main.js
 */
/*
 * @Author: your name
 * @Date: 2019-03-14 14:03:09
 * @LastEditTime: 2019-11-04 14:55:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vueCounter\src\main.js
 */
import Vue from 'vue'

import Element from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/index.css'

Vue.use(Element);
import 'es6-promise/auto'
import i18n from './lang'		//引入多语言
import App from './App.vue'

import store from "./store"  // 引入store 对象



import './drag.js'
import './buttonAuth.js'
import './inputFormat.js'
import './demo.js'

import message from "./message.js"  // 引入message---消息提示-- 对象
Vue.prototype.$msg = message

import router from './router.js'
import axios from './axios'
// 注册组件到Vue
Vue.prototype.$axios = axios

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
Vue.filter('rev', function(val){
  return val.split('').reverse().join('');
})
//
import loadingInstance from './loading'
Vue.prototype.loading = loadingInstance
//------loadingInstance
// import vcolorpicker from 'vcolorpicker'
// Vue.use(vcolorpicker)
Vue.component('bPost',{
  props:['post'],
  template:`<div class="the_bpost">
    <h2>{{post.title}}</h2>
    <p>{{post.content}}</p>
  </div>`
})
Vue.component('bHeading',{
  props:{
    level:{
      type:String
    },
    content:{
      type:String
    }
  },
  render(h){
    return h(
      'h' + this.level,   // 标签名称
      this.content||this.$slots.default // 子节点数组
    )
  }
})
Vue.component('my-component-name', {
  props:['propTitle'],
  template:`<div class="the-my-component-name">
    <h2>{{propTitle}}</h2>
  </div>`
})
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus',{
  // 当被绑定的元素插入到 DOM 中时……
  inserted(el, bind) {
    el.focus()
  }
})
Vue.directive('bgColor', function(el, bind){
  el.style.background =bind.value
})
import './SmartList.js'

const vm =new Vue({
  el: '#app',
  router,
  i18n,
  store,  // 注入到根实例中	
  render: h => h(App)
})

export default vm;
