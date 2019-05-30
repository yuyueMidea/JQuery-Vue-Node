import {
  mapState
} from 'vuex'

// 设置 __tabTodo 值
export const tabTodoMixin = {
  methods: {
    // 触发事件
    __setTabTodo(data) {
      if (Object.prototype.toString.call(data) == "[object String]") {
        // 组件名.方法名.传参
        let [name, methods, params] = data.split('.')
        data = {
          name,
          methods,
          params
        }        
      }     

      data.random = Math.random()   // 随机数, 触发改变
      this.$store.commit('SET_NAV_TABS_TODO', data)
    },
    // 关闭页面
    __closeTagsView(route) {
      let tagsView = {
        name:'tagsView',
        methods:'closeSelectedTag',
        params:route || this.$route 
      }

      this.__setTabTodo(tagsView);
    }
  },  
}
// 监听 __tabTodo 值
export const tabTodoWatch = {  
  computed: {
    ...mapState({
      __tabTodo: state => state.navTabs.tabTodo
    })
  },  
  watch: {
    __tabTodo: function (data) {      
      if (data) {
        let { name, methods, params } = data
        console.log('options:', this.$options.name, name)
        if (name == this.$options.name && typeof this[methods] == 'function') {
          this[methods](params)
        } 
      }
    }
  }
}
