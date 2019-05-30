import { loginByUsername, getMenu, logout, getUserInfo } from '@/portal/api/login'
import { getToken, setToken, setProfile, getProfile, removeToken, removeProfile } from '@/portal/utils/auth'
import * as types from '../mutaion-types'
import appConfig from '@/portal/appConfig'

const user = {
  state: {
    userInfo: getProfile(),
    token: getToken(),
    roles: [],
    menus: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    [types.SET_TOKEN]: (state, token) => {
      state.token = token
    },
    [types.SET_MENU]: (state, menu) => {
      state.menus = menu
    },
    [types.SET_USER_INFO]: (state, info) => {
      state.userInfo = info
    },
    [types.SET_SETTING]: (state, setting) => {
      state.setting = setting
    },
    [types.SET_ROLES]: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    loginByUsername({ commit }, userInfo) {
      userInfo.username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo).then(data => {
          commit(types.SET_TOKEN, data.__token)
          commit(types.SET_USER_INFO, data)
          setToken(data.__token)
          setProfile(data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    getUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(data => {          
          if (data && data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit(types.SET_ROLES, data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    logOut({ commit, dispatch, state }) {
      const ENABLE_SSO = process.env.ENABLE_SSO
      
      if (ENABLE_SSO === true) {  // 退出单点登录
        const LOGOUT_URL = process.env.LOGOUT_URL
        dispatch('fedLogOut')
        window.location.herf = LOGOUT_URL  // 直接跳转      
      } else {
        // return new Promise((resolve, reject) => {
        //   logout().then(() => {
        //     return dispatch('fedLogOut')
        //   }).catch(error => {
        //     reject(error)
        //   })
        // })
        return dispatch('fedLogOut')
      }
    },

    // 前端 登出
    fedLogOut({ commit }) {
      return new Promise(resolve => {
        commit(types.SET_TOKEN, '')
        commit(types.SET_USER_INFO, {})
        commit(types.SET_ROLES, [])
        removeToken()
        removeProfile()
        resolve()
      })
    },

    // 获取菜单
    getMenu({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        const params = {
          'application': appConfig.APP_NAME,
          'language': 'cn'
        }
        getMenu(params).then(data => {
          commit(types.SET_MENU, data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }

    // 动态修改权限
    /* changeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit(types.SET_TOKEN, role)
        setToken(role)
        getUserInfo(role).then(data => {
          commit(types.SET_ROLES, data.roles)         
          dispatch('generateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }*/
  }
}

export default user
