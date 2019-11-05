/*
 * @Author: your name
 * @Date: 2019-11-05 09:45:53
 * @LastEditTime: 2019-11-05 10:15:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vueCounter\src\directives.js
 */
import store from './store'

  export const focus={
        inserted(el, bind) {
            el.focus()
        }
  
  }

export const bgColor ={
    bgColor(el, bind){
        el.style.background =bind.value
    }
}

export const drag ={
    bind(el, binding, vnode, oldVnode) {
      
    },
    inserted(el, bind) {
          el.style.width = '100px';
          el.style.height = '100px';
          el.style.background = '#f44';
      el.onmousedown=function(e){
          let l=e.clientX-el.offsetLeft;
          let t=e.clientY-el.offsetTop;
          document.onmousemove=function(e){
              el.style.left=e.clientX-l+'px';
              el.style.top=e.clientY-t+'px';
          };
          el.onmouseup=function(){
              document.onmousemove=null;
              el.onmouseup=null;
          }
      }
    }
  }

export const operationAuth = {
    // 指令名称
      bind(el, bind, vnode) {
        // 从vuex里面取出按钮权限的信息
        let buttonAuths = store.state.buttonAuths.buttonAuths
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
      },
      inserted(el, binding, vnode) {
        // console.log('inserted')
      },
      update(el, binding, vnode) {
        // console.log('updated')
      },
      componentUpdated(el, binding, vnode) { }
  }

  export const demo = {
    bind(el, bind,vnode){
        var s = JSON.stringify
        el.innerHTML = `
            name :${s(bind.name)}<br/>
            value :${s(bind.value)}<br/>
        `
    }
}