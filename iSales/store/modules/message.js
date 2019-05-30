import storage from '@/portal/utils/storage'
import commonApi from '@/portal/api/common'

const message = {
  state: {
    list: {}
  },
  mutations: {
  },
  actions: {
    /**
     * 加载模块语言
     * @param {*} state 
     * @param {*} modules 
     */
    loadModuleMessage({
      state,
      dispatch
    }, modules) {
      return new Promise((resolve, reject) => {        
        commonApi.getModuleMessage(modules)
          .then(data => {            
            let messageList = data[modules] || [];
            messageList.forEach(v => {
              if (!state.list[modules]) {
                state.list[modules] = {}
              }
              state.list[modules][v.msgCode] = {
                type: v.type,
                autoDisappear: v.autoDisappear,
                msgCode: v.msgCode,
                msgContent: v.msgContent
              }
            });
            resolve()
          }).catch(error => {
            state.list[modules] = {}    // 避免异常时出现死循环
            console.log('error:' + error)
            // reject(error)
          })
      })
    },
    /**
     * 获取对应的语言信息
     * @param {*} state 
     * @param {*} {modules, msgCode} 
     */
    getModuleMessage({
      state,
      dispatch
    }, {
      modules,
      msgCode
    }) {      
      return new Promise(async (resolve, reject) => {    
        if (!state.list[modules]) { // 未加载过当前模块语言
          await dispatch('loadModuleMessage', modules)
        }
        const msg = state.list[modules] ? state.list[modules][msgCode] : null
        resolve(msg) 
      })
    }
  }
}

export default message
