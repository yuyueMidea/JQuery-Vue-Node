import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/portal/views/layout/Layout'

/* Router Modules */

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/

export const constantRouterMap = [  
  {
    path: '',
    component: Layout, 
    redirect: 'home',
    children: [
      {
        path: '/home',
        component: () => import('@/portal/views/homepage/index'),
        name: 'Home',
        meta: { title: 'Home', icon: 'home' }
      }
    ]    
  }, 
  {
    path: '/login',
    component: () => import('@/portal/views/login/index'),
    hidden: true
  },
  {
    name: 'notice',
    path: '/notice/view',
    component: () => import('@/portal/components/NoticeView'),
    hidden: true
  },
  {
    name: 'messageDetail',
    path: '/message/detail',
    component: () => import('@/portal/views/site_message/message_detail'),
    hidden: true
  }, 
  {
    path: '/404',
    component: () => import('@/portal/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/portal/views/errorPage/401'),
    hidden: true
  },  
  { 
    path: "/demo", 
    name: 'demo',  // name 须唯一 
    component: Layout, 
    redirect: '/demo/index',
    children: [
      { 
        path: 'index', 
        component: () => import('@/portal/views/demo'), 
        name: 'demoIndex', 
        meta: { title: '示例首页', icon: 'dashboard', noCache: true } 
      }, 
      { 
        path: 'message', 
        component: () => import('@/portal/views/demo/message'), 
        name: 'demoMessage', 
        meta: { title: '提示消息', icon: 'dashboard', noCache: true } 
      },
      { 
        path: 'autoheight', 
        component: () => import('@/portal/views/demo/autoheight'), 
        name: 'demoAutoheight', 
        meta: { title: '自适应-示例1', icon: 'dashboard'} 
      },
      { 
        path: 'autoheight2', 
        component: () => import('@/portal/views/demo/autoheight/index2'), 
        name: 'demoAutoheight2', 
        meta: { title: '自适应-示例2', icon: 'dashboard' } 
      },
      { 
        path: 'autoheight3', 
        component: () => import('@/portal/views/demo/autoheight/index3'), 
        name: 'demoAutoheight3', 
        meta: { title: '自适应-示例3', icon: 'dashboard' } 
      },
      { 
        path: 'scroll', 
        component: () => import('@/portal/views/demo/scroll'), 
        name: 'demoScroll', 
        meta: { title: '页面滚动条', icon: 'dashboard' } 
      }, 
      { 
        path: 'tab', 
        component: () => import('@/portal/views/demo/tabs'), 
        name: 'demoTab', 
        meta: { title: 'tab标签页-示例1', icon: 'dashboard', code: 'demoTab' } 
      },
      { 
        path: 'form', 
        component: () => import('@/portal/views/demo/form'), 
        name: 'demoForm', 
        meta: { title: '表单-单列', icon: 'dashboard', code: 'demoForm' } 
      },
      { 
        path: 'form2', 
        component: () => import('@/portal/views/demo/form/index2'), 
        name: 'demoForm2', 
        meta: { title: '表单-多列', icon: 'dashboard', code: 'demoForm2' } 
      },
      // { 
      //   path: 'table', 
      //   component: () => import('@/portal/views/demo/table'), 
      //   name: 'table', 
      //   meta: { title: 'table渲染', icon: 'dashboard' } 
      // }
    ] 
  }, 
]

const router = new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export default router
