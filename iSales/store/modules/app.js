import storage from '@/portal/utils/storage'
import commonApi from '@/portal/api/common'
import * as types from '../mutaion-types'

const app = {
  state: {
    sidebar: {
      opened: !+storage.getCookie('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    language: storage.getLanguage(),
    localeLanguage: [],
    size: storage.getCookie('size') || 'medium',
    pageMask: false
  },
  mutations: {
    [types.TOGGLE_SIDEBAR]: state => {
      if (state.sidebar.opened) {
        storage.setCookie('sidebarStatus', 1)
      } else {
        storage.setCookie('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    [types.CLOSE_SIDEBAR]: (state, withoutAnimation) => {
      storage.setCookie('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    [types.TOGGLE_DEVICE]: (state, device) => {
      state.device = device
    },
    [types.SET_LANGUAGE]: (state, language) => {
      state.language = language
      storage.setLanguage(language)
    },
    [types.SET_SIZE]: (state, size) => {
      state.size = size
      storage.setCookie('size', size)
    },
    [types.SET_LOCALE_LANGUAGE]: (state, langs) => {
      state.localeLanguage = langs
    },
    [types.SET_PAGE_MASK]: (state, status) => {
      state.pageMask = !! status
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit(types.TOGGLE_SIDEBAR)
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit(types.CLOSE_SIDEBAR, withoutAnimation)
    },
    toggleDevice({ commit }, device) {
      commit(types.TOGGLE_DEVICE, device)
    },
    setLanguage({ commit }, language) {
      commit(types.SET_LANGUAGE, language)
    },
    setSize({ commit }, size) {
      commit(types.SET_SIZE, size)
    },
    setPageMask({ commit }, status) {
      commit(types.SET_PAGE_MASK, status)
    },
    // 获取语言列表
    getLocaleLanguage({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.localeLanguage.length > 0) {
          resolve()
        } else {
          commonApi.getLocaleLanguage().then(data => {
            commit(types.SET_LOCALE_LANGUAGE, data)
            resolve()
          }).catch(error => {
            reject(error)
          })
        }
      })
    }
  }
}

export default app
