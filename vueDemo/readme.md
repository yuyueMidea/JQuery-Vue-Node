**vue.js中created()与activated()的个人使用理解**

- [x] created()：在创建vue对象时，当html渲染之前就触发；但是注意，全局vue.js不强制刷新或者重启时只创建一次，也就是说，created()只会触发一次；
- [x] activated()：在vue对象存活的情况下，进入当前存在activated()函数的页面时，一进入页面就触发；可用于初始化页面数据等

**挂载在vue原型上的属性一般在属性名前加 $ 符号**

- [x] Vue.prototype.$mideaMessage = mideaMessage // 挂载消息统一处理方法
- [x] Vue.prototype.$pageLoading = loading      // 加载动画loading
- [x] Vue.prototype.$loadLocals = loadLocals    // 语言加载方法
- [x] Vue.prototype.$getLovValues = getLovValues

**可以使用 Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式属性**
**Vue 中怎么自定义过滤器**
	Vue.filter('reverse', function (value) {
	  return value.split('').reverse().join('')
	})
	<span v-text="message | reverse"></span>
	
**需要为已有对象赋予多个新属性，比如使用 Object.assign()**

	var app = new Vue({
	  el: '#app',
	  data: {
	    obj:{
	      name:'yuyue'
	    }
	  },
	})

**可以使用 Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式属性**

app.$set(app.obj,'age',27);

//需要为已有对象赋予多个新属性，比如使用 Object.assign()

app.obj=Object.assign({},app.obj,{
	yyyy:2019,mm:5,date:4
})

**父组件改变props，子组件如果直接使用props，会触发子组件更新**
    // 父组件改变props，子组件如果将props放进data中再使用，不会触发子组件更新
    // 父组件改变props，子组件如果将props放进computed中再使用，会触发子组件更新
    // 子组件改变props，父组件会更新，但其他子组件不会更新，故共享的属性需要放到父组件去改变
    
**1.简要介绍Vuex原理**

- [x] Vuex实现了一个单向数据流，在全局拥有一个State存放数据，当组件要更改State中的数据时，必须通过Mutation进行，Mutation同时提供了订阅者模式供外部插件调用获取State数据的更新。而当所有异步操作(常见于调用后端接口异步获取更新数据)或批量的同步操作需要走Action，但Action也是无法直接修改State的，还是需要通过Mutation来修改State的数据。最后，根据State的变化，渲染到视图上。

**2.简要介绍各模块在流程中的功能：**

- [x] Vue Components：Vue组件。HTML页面上，负责接收用户操作等交互行为，执行dispatch方法触发对应action进行回应。
	dispatch：操作行为触发方法，是唯一能执行action的方法。
	actions：操作行为处理模块,由组件中的$store.dispatch('action 名称', data1)来触发。然后由commit()来触发mutation的调用 , 间接更新 state。负责处理Vue Components接收到的所有交互行为。包含同步/异步操作，支持多个同名方法，按照注册的顺序依次触发。向后台API请求的操作就在这个模块中进行，包括触发其他action以及提交mutation的操作。该模块提供了Promise的封装，以支持action的链式触发。
	commit：状态改变提交操作方法。对mutation进行提交，是唯一能执行mutation的方法。
	mutations：状态改变操作方法，由actions中的commit('mutation 名称')来触发。是Vuex修改state的唯一推荐方法。该方法只能进行同步操作，且方法名只能全局唯一。操作之中会有一些hook暴露出来，以进行state的监控等。
	state：页面状态管理容器对象。集中存储Vue components中data对象的零散数据，全局唯一，以进行统一的状态管理。页面显示所需的数据从该对象中进行读取，利用Vue的细粒度数据响应机制来进行高效的状态更新。
	getters：state对象读取方法。图中没有单独列出该模块，应该被包含在了render中，Vue Components通过该方法读取全局state对象。

## 父子组件通信
`常见使用场景可以分为三类：`

- [x] 父子通信：
	父向子传递数据是通过 props，子向父是通过 events（$emit）；通过父链 / 子链也可以通信（$parent / $children）；ref 也可以访问组件实例；provide / inject API；$attrs/$listeners
	兄弟通信：
	Bus；Vuex
	跨级通信：
	Bus；Vuex；provide / inject API、$attrs/$listeners
## 十二、一句话就能回答的面试题

	1.css只在当前组件起作用
	答：在style标签中写入scoped即可 例如：<style scoped></style>

	2.v-if 和 v-show 区别
	答：v-if按照条件是否渲染，v-show是display的block或none；

	3.$route和$router的区别
	答：$route是“路由信息对象”，包括path，params，hash，query，fullPath，matched，name等路由信息参数。而$router是“路由实例”对象包括了路由的跳转方法，钩子函数等。

	4.vue.js的两个核心是什么？
	答：数据驱动、组件系统

	5.vue几种常用的指令
	答：v-for 、 v-if 、v-bind、v-on、v-show、v-else

	6.vue常用的修饰符？
	答：.prevent: 提交事件不再重载页面；.stop: 阻止单击事件冒泡；.self: 当事件发生在该元素本身而不是子元素的时候会触发；.capture: 事件侦听，事件发生的时候会调用

	7.v-on 可以绑定多个方法吗？
	答：可以

	8.vue中 key 值的作用？
	答：当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。key的作用主要是为了高效的更新虚拟DOM。

	9.什么是vue的计算属性？
	答：在模板中放入太多的逻辑会让模板过重且难以维护，在需要对数据进行复杂处理，且可能多次使用的情况下，尽量采取计算属性的方式。好处：①使得数据处理结构清晰；②依赖于数据，数据更新，处理结果自动更新；③计算属性内部this指向vm实例；④在template调用时，直接写计算属性名即可；⑤常用的是getter方法，获取数据，也可以使用set方法改变数据；⑥相较于methods，不管依赖的数据变不变，methods都会重新计算，但是依赖数据不变的时候computed从缓存中获取，不会重新计算。

	10.vue等单页面应用及其优缺点
	答：优点：Vue 的目标是通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件，核心是一个响应的数据绑定系统。MVVM、数据驱动、组件化、轻量、简洁、高效、快速、模块友好。
	缺点：不支持低版本的浏览器，最低只支持到IE9；不利于SEO的优化（如果要支持SEO，建议通过服务端来进行渲染组件）；第一次加载首页耗时相对长一些；不可以使用浏览器的导航按钮需要自行实现前进、后退。

	11.怎么定义 vue-router 的动态路由? 怎么获取传过来的值
	答：在 router 目录下的 index.js 文件中，对 path 属性加上 /:id，使用 router 对象的 params.id 获取。
