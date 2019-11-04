/*
 * @Author: your name
 * @Date: 2019-11-04 12:05:47
 * @LastEditTime: 2019-11-04 12:07:06
 * @LastEditors: Please set LastEditors
 * @Description: 混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能
 * @FilePath: \vueCounter\src\mixin.js
 */
export const obj1 ={
    created() {
        this.hello()
    },
    methods: {
        hello() {
            console.log('hello from mixin!')
        }
    },
}