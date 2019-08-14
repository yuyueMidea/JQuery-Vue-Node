<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 17:34:08
 * @LastEditTime: 2019-08-14 13:56:20
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="user">
    <div>
        <h2>test</h2>
        <p>
          <button class="btn btn-info" @click="debu">断点测试</button>
          <button class="btn btn-info" @click="getData">测试接口</button>
        </p>
        <ul>
          <li v-for="(val,key) in routesList" :key="key">
            <span>{{val}}</span>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return{
      routesList:[],
    }
  },
  methods:{
    debu(){
      debugger
    },
    getData(){
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => res.data.map(user => '/users/' + user.username))
        .then(routes => {
          this.routesList = routes;
        })
    }
  }
}
</script>

<style scoped>

</style>
