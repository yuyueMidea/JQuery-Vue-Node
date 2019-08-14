<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 17:34:08
 * @LastEditTime: 2019-08-14 14:50:49
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="user">
    <div>
        <h2>todos</h2>
        <p><button @click="$store.commit('increment')" class="btn btn-info">{{ $store.state.counter }}</button></p>
        <hr>
        <ul>
          <li v-for="(todo,key) in todoList" :key="key">
            <input type="checkbox" :checked="todo.done" @change="toggle(todo)">
            <span :class="{ done: todo.done }">{{ todo.text }}</span>
          </li>
          <li><input placeholder="What needs to be done?" @keyup.enter="addTodo" class="form-control"></li>
        </ul>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return{
     
    }
  },
  computed:{
    count() {
      return this.$store.state.counter
    },
    todoList() {
      return this.$store.state.list
    }
  },
  methods:{
    addTodo(e) {
      this.$store.commit('add', e.target.value);
      e.target.value='';
    },
    toggle(e) {
      this.$store.commit('togole', e);
    }
  }
}
</script>

<style scoped>
.done {
  text-decoration: line-through;
}
</style>
