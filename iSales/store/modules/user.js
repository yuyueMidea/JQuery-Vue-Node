import { loginByUsername, getUserInfo } from '@/portal/api/login'
import {
  getToken,
  getProfile,
  removeToken,
  removeProfile,
  getMenu,
  removeMenu,
  removeResource,
  removeNaResource,
  removeLanguage,
  removePosition,
  setUserSession
} from '@/portal/utils/auth'
import * as types from '../mutaion-types'
import appConfig from '@/portal/appConfig'
import store from '@/portal/store'
import storage from '@/portal/utils/storage'

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
      userInfo.app = appConfig.APP_NAME // 应用名称
      var storeGetters = store.getters
      userInfo.language = storeGetters.language // 当前语言
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo).then(data => {
          setUserSession(data)
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
        dispatch('fedLogOut')
        storage.setStorage("isc-logout-flag", 'Y')
        window.location = process.env.LOGOUT_URL // 直接跳转
      } else {
        // return new Promise((resolve, reject) => {
        //   logout().then(() => {
        //     return dispatch('fedLogOut')
        //   }).catch(error => {
        //     reject(error)
        //   })
        // })
        dispatch('fedLogOut')
        location.reload()
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
        removeLanguage()
        removePosition()
        removeMenu()
        removeResource()
        removeNaResource()
        storage.removeCurrentLanguage()
        resolve()
        storage.removeStorage("isc-logout-flag")
      })
    },

    // 获取菜单
    getMenu({ commit, state }, params) {
      return getMenu()
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
