import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    count: 5,
		loginUser:'',
		isLogin: false,
		openedTagNavList:[],
		NavList:[]
  },
   // 更改store的状态
  mutations: {
    increment (state) {
      state.count++
    },
    decrement (state) {
      state.count--
    },
		setloginUser(state,val){
			state.loginUser = val;
			state.isLogin = true;
		},
		removeloginUser(state){
			state.loginUser = '';
			state.isLogin = false;
		},
		addNavList(state,val){
			state.openedTagNavList.push(val);
		},
		removeTagNav(state,val){
			var index = state.openedTagNavList.indexOf(val);
			state.openedTagNavList.splice(index,1);
		},
		setAllNavList(state,val){
			state.NavList.push(val);
		},
  },
  // 通过getter 进行数据获取
  // getters: {
  //   getState(state) {
  //     return state.count > 0 ? state.count : 0;
  //   }
  // }
})

export default store