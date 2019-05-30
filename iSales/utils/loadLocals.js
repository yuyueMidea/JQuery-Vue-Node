/*
 * @Author: tim
 * @LastEditors: tim
 * @Description: 加载语言包
 * @Date: 2019-03-13 17:09:37
 * @LastEditTime: 2019-05-29 14:03:15
 */

/**
 * 加载视图文件对应的语言包
 * @param {*} file 视图文件路径
 */
const loadLocals = function(file) {  
  try {
    let path = file.split('/'),
        len = path.length

    path.splice(len-1, 0, 'locals')  // 拼接语言包目录
    path = path.join('/')
    
    const lang = this.$i18n.locale;
    const locals = require(`@/${path}_${lang}.js`).default
    this.$i18n.mergeLocaleMessage(this.$i18n.locale, locals)   
    return locals 
  } catch (error) {
    console.log(error)
  }
  
}

export default loadLocals
