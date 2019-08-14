/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 11:00:16
 * @LastEditTime: 2019-08-14 13:31:37
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
      ]
    }),
    mutations: {
      increment (state) {
        state.counter++
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
      }
    }
  })
}

export default createStore