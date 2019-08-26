<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 17:34:08
 * @LastEditTime: 2019-08-26 11:13:30
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="user">
    <div>
        <h2>home</h2>
        <p><span>{{data3}}</span><button @click="getParam" class="btn btn-info">获取传值param</button></p>
    </div>
  </div>
</template>

<script>
import {pageParamsMixin} from '@/utils/mixins';

export default {
  name:'homepage',
   mixins:[pageParamsMixin],
  data() {
    return{
      
    }
  },
  methods:{
     getParam(){
      console.log('获取传值---', this.data3)
    },
  }
}
</script>

<style scoped>

</style>
