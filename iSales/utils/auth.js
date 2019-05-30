import appConfig from '@/portal/appConfig.js'
import storage from './storage'
import _import from './import'
import Layout from '@/portal/views/layout/Layout'
import AppMain from '@/portal/views/layout/components/AppMain'



const TokenName = appConfig.TOKEN_NAME
const ProfileName = appConfig.PROFILE_NAME

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
    let isLast = menu.subMenus.length == 0;//是否最后一层

    if(!isLast){
      menu.subMenus.forEach(m => children.push(makeRoutes(m)));
    }

    let path =  !isLast || null == menu.url || '' == menu.url ?　(Math.random()+""+new Date().getTime()).substring(2): menu.url
    let m = {
      path,
      meta: { title: menu.name, icon: null == menu.icon ? '' : menu.icon,id:menu.menuId, code:menu.code || path},
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

    titles[url][menu.url] = menu.name

    //要去重
    if(isLast && urls.indexOf(menu.url) < 0){
      let rout = {
        path: null == url || '' == url ? (Math.random()+""+new Date().getTime()).substring(2) : url,
        // name: 'm' + menu.url,  // name 须唯一
        name: menu.url,  // name 须唯一
        component: isLast ? _import(url) : AppMain,
        meta: { title: menu.name, icon: null == menu.icon ? '' : menu.icon, titles:titles[url],id:menu.menuId, code:menu.code || menu.url},
        query
      }
      ret.routes[0].children.push(rout)


      urls.push(menu.url)
    }

    return m
  }

  return ret
}
