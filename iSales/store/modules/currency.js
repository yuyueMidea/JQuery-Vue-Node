import commonApi from '@/portal/api/common'
import * as types from '../mutaion-types'
import http from '@/portal/utils/http'
const currency = {
  state: {
    formats: [],
    loaded: false
  },
  mutations: {
    [types.SET_CURRENCY_FORMAT] : (state, format) => {
      state.formats.push(format)
    }
  },
  actions: {
    clear({ commit, state }) {
      return new Promise((resolve, reject) => {
        state.formats = []
      })
    },
    getFormatAtion({commit,state},param){
      return new Promise((resolve, reject) => {
          // DEBUG:
          console.log(param)
        //  console.log('getFormatAtion territory =' + territory)
          const cache = this.getters.getFormat(param.currency, param.territory)
          if(cache){
            console.log("cache hit !")
            resolve(cache)
          }else {
              return http({
                url: '/isc-api/currency/getFormat',
                method: 'post',
                params: param
              }).then(format => {
                if (!format.currencySymbol) {
                  console.log('Does not match any format.')
                  resolve('')
                } else {
                  this.commit('SET_CURRENCY_FORMAT',format)
                  resolve(format)
                }
              }).catch(error => {
                reject(error)
              })
          }
      })
    }
  },
  getters: {
    enabledFormats(state, getters) {
      return state.formats.filter(item => item.enabled)
    },
    enabledFormatsCount(state, getters) {
      return getters.enabledFormats.length
    },
    getFormat(state) {
      var myfun = function(currency,territory) {
        if(currency && territory)
          return state.formats.find(format => format.territoryCode == territory && format.currencyCode == currency)
        if(currency)
          return state.formats.find(format => format.currencyCode == currency)
      }
      return myfun
    }
  }
}

export default currency
