/*
 * @Author: your name
 * @Date: 2019-03-14 16:05:44
 * @LastEditTime: 2019-11-04 16:48:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vueCounter\src\router.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//
import store from "./store"  // 引入store 对象
//定义组件 引入组件
// import Home from './components/Home.vue';
// // import Login from './components/Login.vue';
// // const Login = ()=>import('./components/Login.vue')
// // import Index from './components/Index.vue';
// import Info from './components/Info.vue';
// import Display from "./components/Display.vue";
// import Increment from "./components/Increment.vue";
// import Test from "./components/Test.vue";
// import Example from "./components/Example1.vue";
// import Menu1 from './components/Menu1'
// import ImgShow from './components/ImgShow'
// //
// // import * as m1 from './menu.json'
// console.log('tag--m1---', m1)

const staticRoute = [
	{path: '/info',component: ()=>import('./components/Info'),name:'首页'},
	{path: '/display',component: ()=>import('./components/Display'),name:'按钮赋权'},
	{path: '/increment',component: ()=>import('./components/Increment'),name:'新闻接口'},
	{path: '/home',component: ()=>import('./components/Home'),name:'获取唐朝古诗词'},
  	{path: '/test',component: ()=>import('./components/Test'),name:'测试'},
  	{path: '/example',component: ()=>import('./components/Example1'),name:'案例'},
  	{path: '/menu',component: ()=>import('./components/Menu1'),name:'菜单'},
	{path: '/login',component: ()=>import('./components/Login')},
	{path: '/imgShow',component: ()=>import('./components/ImgShow'), name:'图片展示'},
	
	{path: '/*', redirect: '/info'}
]
//
const router = new VueRouter({
    mode: 'history',  //去掉url中的#
	routes: staticRoute
});
//
(function initRoute(router){
	router.options.routes.map(v=>{
		if((v.path !=='/*' && v.path !=='/login') ){
			store.commit("setAllNavList", {path:v.path, name:v.name});
		}
	})
})(router)
// 路由跳转前验证
router.beforeEach((to, from, next) => {
	var getUser =(store.state.loginUser);
	if(to.path === '/login'){
		store.commit("removeloginUser");
		next();
		return;
	}
	if(!localStorage.getItem('loginUser')) {
		console.warn('当前未处于登录状态，请登录');
		next({path: "/login", replace: true})
	}else{
		//'当前已经登录状态'
		if(store.state.isLogin){
			if(store.state.tagsView.openedTagNavList.indexOf(to.path) ==-1){
				store.commit("addNavList", to.path);
			}
			next();
		}else{
			next({path: "/login", replace: true})
		}

	}
})

export default router;
