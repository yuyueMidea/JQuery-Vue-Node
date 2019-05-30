import router from '.'
import store from '../store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken, formatRoutes, getProfile, setProfile } from '@/portal/utils/auth' // getToken from cookie
import http from '@/portal/utils/http'

NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = ['/login', '/auth-redirect']// no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (process.env.ENABLE_SSO || getToken()) {
    let profile = getProfile()
    if (profile) {
      goto(to, next)
    } else {
      http({
        url: '/auth/user/getSetProfile',
        method: 'post',
        data: {}
      }).then(data => {
        console.log("profile:" + JSON.stringify(data))
        setProfile(data)
        goto(to, next)
      }).catch(err => {
        // 登录失败后的操作，todo
        console.log(err)
      })
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }

  function goto(to, next) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      try {
        if (store.getters.routerStatus == false) { // 判断当前用户菜单是否已拉取完信息
          store.dispatch('getMenu').then(data => {
            const menuRouts = formatRoutes(data) // 动态添加可访问路由表
            store.dispatch('generateRoutes', menuRouts).then(() => { // 根据roles权限生成可访问的路由表
              router.addRoutes(store.getters.router) // 动态添加可访问路由表
              next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            })
          })
        } else {
          next()
        }
      } catch (err) {
        store.dispatch('fedLogOut').then(() => {
          Message.error(err || 'Verification failed, please login again')
          next({ path: '/' })
        })
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
