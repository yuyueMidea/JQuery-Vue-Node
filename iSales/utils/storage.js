import Cookies from 'js-cookie'

const storage = window.sessionStorage

export default {
  /**
   * 设置Cookie值
   * @param {*} key
   * @param {*} value
   */
  setCookie(key, value) {
    Cookies.set(key, value)
  },
  /**
   * 获取Cookie值
   * @param {*} key
   */
  getCookie(key) {
    return Cookies.get(key)
  },
  /**
   * 删除Cookie
   * @param {*} key
   */
  removeCookie(key) {
    return Cookies.remove(key)
  },

  /**
   * 设置storage值
   * @param {*} key
   * @param {*} value
   */
  setStorage(key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    storage.setItem(key, value)
  },
  /**
   * 获取sessionStorage值
   * @param {*} key
   */
  getStorage(key) {

    const value = storage.getItem(key) || ''

    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  },
  /**
   * 删除sessionStorage值
   * @param {*} key
   */
  removeStorage(key) {
    storage.removeItem(key)
  },
  /**
   * 获取当前语言
   */
  getCurrentLanguage() {
    let lang = this.getStorage('language')
    if (!lang) {
      lang = 'zh'
      this.setStorage('language', lang)
    }
    return lang
  },
  /**
   * 设置当前语言
   * @param {Sting} language
   */
  setCurrentLanguage(language) {
    this.setStorage('language', language)
  },
  /**
   * 清空当前语言
   */
  removeCurrentLanguage() {
    this.removeStorage('language')
  }
}
