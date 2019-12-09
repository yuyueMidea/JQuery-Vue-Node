import commonApi from '@/portal/api/common'

const addressconifg = {
    state: {
        addressconfigs: {}
    },
    mutations: {
    },
    actions: {
        /**
         * 加载选址配置信息
         * @param {*} state 
         * @param {*} {code, countryCode}  
         */
        loadAddressConfig({
            state,
            dispatch
        }, {
            code,
            countryCode
        }) {
            return new Promise((resolve, reject) => {
                commonApi.getAddressConifg(code, countryCode)
                    .then(data => {
                        state.addressconfigs[code + countryCode] = data
                        resolve()
                    }).catch(error => {
                        //state.addressconfigs[code + countryCode] = {}    // 避免异常时出现死循环
                        //console.log('error:' + error)
                        // reject(error)
                    })
            })
        },
        /**
         * 获取对应的选址配置信息
         * @param {*} state 
         * @param {*} {code, countryCode} 
         */
        getAddressConfig({
            state,
            dispatch
        }, {
            code,
            countryCode
        }) {
            return new Promise(async (resolve, reject) => {
                if(countryCode === null || countryCode === undefined || countryCode === ''){
                    countryCode = "*"
                }
                if (!state.addressconfigs[code + countryCode]) {
                    await dispatch('loadAddressConfig', {
                        code,
                        countryCode
                    })
                }
                if (!state.addressconfigs[code + countryCode] && countryCode !== '*') {
                    countryCode = '*'
                    if (!state.addressconfigs[code + countryCode]) {
                        await dispatch('loadAddressConfig', {
                            code,
                            countryCode
                        })
                    }
                }
                const addressConfig = state.addressconfigs[code + countryCode] ? state.addressconfigs[code + countryCode] : null
                resolve(addressConfig)
            })
        }
    }
}

export default addressconifg
