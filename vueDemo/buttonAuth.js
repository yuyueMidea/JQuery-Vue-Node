/*
 * @Author: your name
 * @Date: 2019-07-18 20:05:59
 * @LastEditTime: 2019-10-28 19:47:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vueCounter\src\directive2.js
 */
import Vue from 'vue';
import store from './store'

Vue.directive('operation-auth', {
  // 指令名称
    bind(el, bind, vnode) {
      // 从vuex里面取出按钮权限的信息
      let buttonAuths = store.state.buttonAuths
      // console.log('tag', buttonAuths)
      let key = bind.value;
      if(!key) return;
      el.style.visibility ='hidden'
      let resource =null
      if(buttonAuths && buttonAuths.length >0) {
        for(const item of buttonAuths) {
          if(item.name===key) {
            resource =item
            break
          }
        }
      }
      // 授权显示
      if(resource && resource.display =='Y') {
        el.style.visibility ='visible'
        if(resource.disabled=='Y'){
          el.setAttribute('disabled', true)
          el.className +=' is-disabled'
        }
      }
      debugger
    },
    inserted(el) {
        debugger
    }
  
})