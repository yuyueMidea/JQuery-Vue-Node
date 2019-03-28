import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//
import store from "./store.js"  // 引入store 对象
//定义组件 引入组件
import Home from './components/Home.vue';
import Login from './components/Login.vue';
// import Index from './components/Index.vue';
import Info from './components/Info.vue';
import Display from "./components/Display.vue";
import Increment from "./components/Increment.vue";
import Transfer from "./components/Transfer.vue";
import Test from "./components/Test.vue";
//
const staticRoute = [
	{path: '/info',component: Info,name:'首页'},
	{path: '/display',component: Display,name:'多语言展示'},
	{path: '/increment',component: Increment,name:'新闻接口'},
	{path: '/home',component: Home,name:'获取唐朝古诗词'},
  {path: '/transfer',component: Transfer,name:'穿梭框'},
  {path: '/test',component: Test,name:'测试'},
	{path: '/login',component: Login},
	{path: '/*', redirect: '/login'}
]
//
const router = new VueRouter({
    mode: 'history',  //去掉url中的#
	routes: staticRoute
});
//
(function initRoute(router){
	debugger
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
			// debugger
			if(store.state.openedTagNavList.indexOf(to.path) ==-1){
				store.commit("addNavList", to.path);
			}
			next();
		}else{
			next({path: "/login", replace: true})
		}

	}
})

export default router;
