/*
 * @Author: Garmim
 * @LastEditors: Garmim
 * @Description: 按钮权限
 * @Date: 2019-03-12 16:32:20
 * @LastEditTime: 2019-03-25 11:00:56
 */
import { getResource,getNaResource } from '../../utils/auth'

const operationAuth = {}

const install = function(Vue) {
  Vue.directive('operation-auth', {
    bind: function(el, binding, vnode) {
      let key = binding.value
      if(!key){
        return
      }
      el.style.visibility = 'hidden'
      let pageNode = vnode.context
      let menuId = pageNode.$route.meta.id
      //授权列表
      const resources = getResource()
      let resource = null
      //无授权列表
      const naResources = getNaResource()
      let naResource = null
      if(resources && resources[menuId] && resources[menuId].length > 0){
        for (const item of resources[menuId]) {
          if(item.code === key){
            resource = item
            break
          }
        }
      }
      if(resource == null && naResources && naResources[menuId] && naResources[menuId].length > 0){
        for (const item of naResources[menuId]) {
          if(item.code === key){
            naResource = item
            break
          }
        }
      }
      // 有授权
      if(resource!=null){
        // 显示
        if(resource.displayed === 'Y'){
          el.style.visibility = 'visible'
          return
        }
      }
      // 没有授权
      else if(naResource!=null){
        // 禁用
        if (naResource.disabled === 'Y') {
          el.style.visibility = 'visible'
          el.setAttribute('disabled', true)
          el.className = el.className + ' is-disabled'
          return
        }
      }
      // // 删除el-tab头
      // if(el.className.split(' ').indexOf('el-tab-pane')>-1){
      //   const tabEl = document.getElementById(el.getAttribute('aria-labelledby'))
      //   if(tabEl){
      //     tabEl.parentNode.removeChild(tabEl)
      //   }
      // }
      el.parentNode.removeChild(el)
    },
    /**
     *
     * @param {*} el
     * @param {*} binding {enabel:'状态', height:'高度', subHeight:'高度差'}
     * @param {*} vnode
     */
    inserted(el, binding, vnode) {
      // console.log('inserted')
    },
    update(el, binding, vnode) {
      // console.log('updated')
    },
    componentUpdated(el, binding, vnode) {
    }
  })
}

operationAuth.install = install
export default operationAuth
