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
