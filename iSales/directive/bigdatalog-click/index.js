import { sendDetailLog } from '@/portal/utils/bigDataLog'

const bigdatalogClick = {}

const install = function(Vue) {
  Vue.directive('bigdatalog-click', {
    bind: function(el, binding, vnode) {
      function clickHandler(e) {
        sendDetailLog(null,binding.value)
      }
      el.addEventListener('click', clickHandler)
    }
  })
}

bigdatalogClick.install = install
export default bigdatalogClick
