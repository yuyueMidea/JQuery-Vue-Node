## vue.js中created()与activated()的个人使用理解

created()：在创建vue对象时，当html渲染之前就触发；但是注意，全局vue.js不强制刷新或者重启时只创建一次，也就是说，created()只会触发一次；

activated()：在vue对象存活的情况下，进入当前存在activated()函数的页面时，一进入页面就触发；可用于初始化页面数据等

// 挂载在vue原型上的属性一般在属性名前加 $ 符号
Vue.prototype.$mideaMessage = mideaMessage // 挂载消息统一处理方法

Vue.prototype.$pageLoading = loading      // 加载动画loading

Vue.prototype.$loadLocals = loadLocals    // 语言加载方法

Vue.prototype.$getLovValues = getLovValues

## 可以使用 Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式属性
## 需要为已有对象赋予多个新属性，比如使用 Object.assign()
var app = new Vue({
  el: '#app',
  data: {
    obj:{
      name:'yuyue'
    }
  },

})

// 可以使用 Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式属性

app.$set(app.obj,'age',27);

//需要为已有对象赋予多个新属性，比如使用 Object.assign()

app.obj=Object.assign({},app.obj,{
	yyyy:2019,mm:5,date:4
})

## // 父组件改变props，子组件如果直接使用props，会触发子组件更新
    // 父组件改变props，子组件如果将props放进data中再使用，不会触发子组件更新
    // 父组件改变props，子组件如果将props放进computed中再使用，会触发子组件更新
    // 子组件改变props，父组件会更新，但其他子组件不会更新，故共享的属性需要放到父组件去改变
    
## 1.简要介绍Vuex原理
Vuex实现了一个单向数据流，在全局拥有一个State存放数据，当组件要更改State中的数据时，必须通过Mutation进行，Mutation同时提供了订阅者模式供外部插件调用获取State数据的更新。而当所有异步操作(常见于调用后端接口异步获取更新数据)或批量的同步操作需要走Action，但Action也是无法直接修改State的，还是需要通过Mutation来修改State的数据。最后，根据State的变化，渲染到视图上。
2.简要介绍各模块在流程中的功能：

Vue Components：Vue组件。HTML页面上，负责接收用户操作等交互行为，执行dispatch方法触发对应action进行回应。
dispatch：操作行为触发方法，是唯一能执行action的方法。
actions：操作行为处理模块,由组件中的$store.dispatch('action 名称', data1)来触发。然后由commit()来触发mutation的调用 , 间接更新 state。负责处理Vue Components接收到的所有交互行为。包含同步/异步操作，支持多个同名方法，按照注册的顺序依次触发。向后台API请求的操作就在这个模块中进行，包括触发其他action以及提交mutation的操作。该模块提供了Promise的封装，以支持action的链式触发。
commit：状态改变提交操作方法。对mutation进行提交，是唯一能执行mutation的方法。
mutations：状态改变操作方法，由actions中的commit('mutation 名称')来触发。是Vuex修改state的唯一推荐方法。该方法只能进行同步操作，且方法名只能全局唯一。操作之中会有一些hook暴露出来，以进行state的监控等。
state：页面状态管理容器对象。集中存储Vue components中data对象的零散数据，全局唯一，以进行统一的状态管理。页面显示所需的数据从该对象中进行读取，利用Vue的细粒度数据响应机制来进行高效的状态更新。
getters：state对象读取方法。图中没有单独列出该模块，应该被包含在了render中，Vue Components通过该方法读取全局state对象。

