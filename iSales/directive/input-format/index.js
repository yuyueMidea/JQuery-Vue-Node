/*
 * @Author: tim
 * @LastEditors: tim
 * @Description: input 输入格式化
 * @Date: 2019-04-19 09:27:43
 * @LastEditTime: 2019-06-05 09:34:39
 */

import { isNull, toThousand, toNumber } from '@/portal/utils' 

const mideaInputFormat = {}

const install = function (Vue) {
  /**
   * [handleInput 在输入阶段的处理逻辑]
   * @param  {[DOM]} ele   [当前指令操作的dom对象]
   * @param  {[虚拟节点]} vnode [当前指令渲染的虚拟节点]
   * @param  {[指令信息]} binding [当前指令的传参]
   * @param  {[校验类型]} event  [事件类型]
   * "number": 仅支持输入数字
   * "float": 仅支持数字和小数点
   */
  function handleInput(ele, binding, vnode, event) {
    const bindValue = binding.value || {} 
    // let value = bindValue.data[bindValue.name]
    let value = ele.value

    if ( isNull(value) ) {
      value = ''
    } 
    value = value.toString()
    
    switch (bindValue.type) {
      case 'price': // 价格
        value = toNumber(value)
        if (event == 'onblur' || typeof event == 'undefined') value = toThousand(value, bindValue.scale)
        break

      case 'float': // 浮点型
        value = toNumber(value)
        break

      default: //数字
        value = toNumber(value, 'int')
        if (value) {
          value = parseInt(value)
        } 
    }

    let maxLen = vnode.data.attrs && vnode.data.attrs['max-len'] ? vnode.data.attrs['max-len'] : 0
    if (maxLen > 0) {
      value = value.toString().substr(0, maxLen)
    }
    ele.value = value
    // bindValue.data[bindValue.name] = value
    vnode.componentInstance.$emit('input', value)
  }  

  Vue.directive('mideaInputFormat', {
    bind: function (el, binding, vnode) {
      const ele = el.tagName === 'INPUT' ? el : el.querySelector('input')

      vnode.context.$nextTick(() => {
        handleInput(ele, binding, vnode)
      })
    },

    /**
     * 
     * @param {*} el 
     * @param {*} binding 
     * @param {*} vnode 
     */
    inserted: function (el, binding, vnode) {      
      const ele = el.tagName === 'INPUT' ? el : el.querySelector('input')
      
      if (ele.getAttribute('readonly') || ele.getAttribute('disabled')) {
        return;
      }
      
      if (binding.value.type == 'price') {
         // 获取焦点
        ele.onfocus = function() {
          vnode.context.$nextTick(() => {
            let value = toNumber(ele.value)
            // binding.value.data[binding.value.name] = value
            ele.value = value
            vnode.componentInstance.$emit('input', value)
          }) 
        }
         // 失去焦点
        ele.onblur = function() {
          vnode.context.$nextTick(() => {
            handleInput(ele, binding, vnode, 'onblur')
          }) 
        }
      } else {
        // 输入
        ele.oninput = function () {
          vnode.context.$nextTick(() => {
            handleInput(ele, binding, vnode)
          })        
        }
      }
    },
    update: function (el, binding, vnode) {
      // debugger
    },
    componentUpdated: function (el, binding, vnode) {
      // debugger
    }
  })
}

mideaInputFormat.install = install
export default mideaInputFormat
