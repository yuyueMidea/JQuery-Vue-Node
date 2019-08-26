/*
 * @Description: In User Settings Edit
 * @Author: yuyue
 * @Date: 2019-08-26 10:16:24
 * @LastEditTime: 2019-08-26 11:15:03
 * @LastEditors: Please set LastEditors
 */
import {
    mapState
  } from 'vuex'

  // 设置 state.data3 值
export const pageParamsMixin = {
    methods: {
        setParam(data) {
            this.$store.commit("PARAMS_VALUE", data);
        },
        clearParam(){
            this.$store.commit('PARAMS_VALUE', null)
        }
    },
    computed: {
        ...mapState({
            data3: state => state.data3
        })
      },
}