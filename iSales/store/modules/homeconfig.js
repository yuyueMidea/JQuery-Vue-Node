import commonApi from '@/portal/api/common'

const homeconfig = {
    state: {
        homeconfigs: undefined
    },
    mutations: {
    },
    actions: {
        /**
         * 加载首页配置信息
         * @param {*} state 
         */
        loadHomeConfig({
            state,
            dispatch
        }) {
            return new Promise((resolve, reject) => {
                commonApi.getHomeConifg()
                    .then(data => {
                        state.homeconfigs = data
                        resolve()
                    }).catch(error => {
                    })
            })
        },
        /**
         * 获取对应的首页配置信息
         * @param {*} state 
         */
        getHomeConfig({
            state,
            dispatch
        }) {
            return new Promise(async (resolve, reject) => {
                if (!state.homeconfigs) {
                    await dispatch('loadHomeConfig')
                }
                const homeConfig = state.homeconfigs ? state.homeconfigs : null
                resolve(homeConfig)
            })
        }
    }
}

export default homeconfig
