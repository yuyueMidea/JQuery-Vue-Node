import config from '@/portal/appConfig.js'

const permission = {
  state: {
    routers: [],
    permissionMenus: [],//这个是已经处理过的menus，可以直接塞给nav
    routerStatus: false,// 路由加载状态
    menuStatus: false
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.routers = routers
      state.routerStatus = true
    },
    SET_MENUS: (state, menus) => {
      state.permissionMenus = menus
      state.menuStatus = true
    }
  },
  actions: {
    generateRoutes({ commit }, addRouters) {
      return new Promise(resolve => {
        const unFound = { path: '*', redirect: '/404', hidden: true } // 跳转到404页面，须放在路由最后面  
        let accessedRouters = [].concat(addRouters.routes)
        accessedRouters.push(unFound)
        //把home加进去 打包访问该页面会报错
        // accessedRouters[0].children.push({
        //   path: '/home',
        //   component: () =>import(`@/app/views/${homePage}`),
        //   name: 'Home',
        //   meta: { title: 'home', icon: 'dashboard' }
        // })
        commit('SET_ROUTERS', accessedRouters)
        commit('SET_MENUS', addRouters.menus)
        resolve()
      })
    }
  }
}

export default permission
