/*
 * @Description: In User Settings Edit
 * @Author: yuyue
 * @Date: 2019-08-14 11:00:16
 * @LastEditTime: 2019-08-26 11:10:45
 * @LastEditors: Please set LastEditors
 */
import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    strict: false,
    state: () => ({
      counter: 4,
      list:[
          {text:'今天休息，学习英语',done: false},
          {text:'今天吃鸡，',done: true},
      ],
      openedTagNavList:[],
      NavList:[],
      data3:''
    }),
    mutations: {
      increment (state) {
        state.counter++
      },
      PARAMS_VALUE(state,data){
        state.data3 =data;
      },
      add(state,text) {
          state.list.push({
            text: text,
            done: false
          })
      },
      remove(state,{todo}) {
          let index = state.list.indexOf(todo)
          state.list.splice(index, 1)
      },
      togole(state, todo) {
          todo.done =!todo.done
      },
      //打开的菜单list
      addNavList(state,val){
        state.openedTagNavList.push(val);
      },
      removeTagNav(state,val){
        var index = state.openedTagNavList.indexOf(val);
        state.openedTagNavList.splice(index,1);
      },
      //设置所有的菜单list
      setAllNavList(state,val){
        state.NavList.push(val);
      },
    }
  })
}

export default createStore