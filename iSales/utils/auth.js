import appConfig from '@/portal/appConfig.js'
import storage from './storage'
import _import from './import'
import Layout from '@/portal/views/layout/Layout'
import AppMain from '@/portal/views/layout/components/AppMain'
import http from './http'
import i18n from '@/portal/lang' // Internationalization

const TokenName = appConfig.TOKEN_NAME
const ProfileName = appConfig.PROFILE_NAME
const LanguageName = appConfig.LANGUAGE_NAME
const PositionName = appConfig.POSITION_NAME
const MenuName = appConfig.MENU_NAME
const ResourceName = appConfig.RESOURCE_NAME

function getRedirectPath(path, level) {
  // let redirectPath = path.split('/', level)
  // return redirectPath.join('/')
  return path
}

export function getToken() {
  return storage.getStorage(TokenName)
}

export function setToken(token) {
  return storage.setStorage(TokenName, token)
}

export function removeToken() {
  return storage.removeStorage(TokenName)
}

export function setProfile(profile) {
  return storage.setStorage(ProfileName, profile)
}

export function getProfile() {
  return storage.getStorage(ProfileName)
}

export function removeProfile() {
  return storage.removeStorage(ProfileName)
}

export function setLanguage(language) {
  return storage.setStorage(LanguageName, language)
}

export function getLanguage() {
  return storage.getStorage(LanguageName)
}

export function removeLanguage() {
  return storage.removeStorage(LanguageName)
}

export function setPosition(position) {
  return storage.setStorage(PositionName, position)
}

export function getPosition() {
  return storage.getStorage(PositionName)
}

export function removePosition() {
  return storage.removeStorage(PositionName)
}

export function setMenu(menu) {
  return storage.setStorage(MenuName, menu)
}

export function getMenu() {
  return storage.getStorage(MenuName)
}

export function removeMenu() {
  return storage.removeStorage(MenuName)
}

export function setResource(resource) {
  return storage.setStorage(ResourceName, resource)
}

export function getResource() {
  return storage.getStorage(ResourceName)
}

export function removeResource() {
  return storage.removeStorage(ResourceName)
}

/**
 * 往profile的__infos添加数据，如果存在key则覆盖
 */
export function getSetInfos(infos){
  http({
    url: '/isc-auth/login/updateProfile',
    method: 'post',
    data: {
      __infos: infos
    }
  }).then(data => {
    const profile = getProfile()
    profile.__infos = data.__infos
    setProfile(profile)
  })
}

export function getSetProfile(){
  return new Promise((resolve, reject) => {
    return http({
      url: '/isc-auth/user/getSetProfile',
      method: 'post',
      data: {}
    }).then(data => {
      setUserSession(data)
      resolve(data)
    }).catch(err => {
      // 登录失败后的操作，todo
      console.log(err)
      reject(err)
    })
  })
}

export function setUserSession(data){
  setToken(data.profile.__token)
  setProfile(data.profile)
  setLanguage(data.locales)
  setPosition(data.positions)
  setMenu(data.menus)
  setResource(data.resources)
  storage.setCurrentLanguage(data.profile.__language)
  i18n.locale = data.profile.__language
}

/**
 * 根据用户菜单返回路由列表
 */
export function formatRoutes(menus) {
  let ret = {
    menus:[],
    routes:[{
      path: "/",
      name: 'm',  // name 须唯一
      component: Layout,
      children: []
    }]
  }

  let titles = {}

  let urls = []

  menus.forEach(menu => {
    ret.menus.push(makeRoutes(menu))
  });

  function makeRoutes(menu){
    let children = [];
    let isLast = menu.subMenus ? menu.subMenus.length === 0 : true;//是否最后一层

    if(!isLast){
      menu.subMenus.forEach(m => children.push(makeRoutes(m)));
    }

    let menuName = menu['localName_' + storage.getCurrentLanguage()]
    if(!menuName){
      menuName = menu.name
    }

    let path =  !isLast || null == menu.url || '' == menu.url ?　(Math.random()+""+new Date().getTime()).substring(2): menu.url
    let m = {
      path,
      meta: { title: menuName, icon: null == menu.icon ? '' : menu.icon,id:menu.menuId, code:menu.code || path},
      children: children,
      hidden:false,
      name: menu.name
    }

    let query = {}
    let url = menu.url;

    if(null != menu.url){
      let urlTmp = menu.url.split('?')
      url = urlTmp[0]

      if(urlTmp.length > 1){
        let params = urlTmp[1].split("&")

        for(let i in params){
          let param = params[i].split('=')

          query[param[0]] = param[1]
        }
      }
    }

    if(!titles[url]){
      titles[url] = {}

    }

    titles[url][menu.url] = menuName

    //要去重
    if(isLast && urls.indexOf(menu.url) < 0){
      let rout = {
        path: null == url || '' == url ? (Math.random()+""+new Date().getTime()).substring(2) : url,
        // name: 'm' + menu.url,  // name 须唯一
        name: menu.url,  // name 须唯一
        component: isLast ? _import(url) : AppMain,
        meta: { title: menuName, icon: null == menu.icon ? '' : menu.icon, titles:titles[url],id:menu.menuId, code:menu.code || menu.url},
        query
      }
      ret.routes[0].children.push(rout)


      urls.push(menu.url)
    }

    return m
  }

  return ret
}
