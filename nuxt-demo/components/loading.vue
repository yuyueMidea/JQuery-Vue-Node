<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 14:47:05
 * @LastEditTime: 2019-08-14 14:49:14
 * @LastEditors: Please set LastEditors
 -->
<template lang="html">
  <div class="loading-page" v-if="loading">
    <h1>Loading...</h1>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>