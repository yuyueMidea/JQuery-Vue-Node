/*
 * @Author: your name
 * @Date: 2019-12-20 11:17:02
 * @LastEditTime : 2019-12-20 11:26:09
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \typescript-vue-tutorial\src\index.ts
 */
import Vue from "vue";
import HelloComponent from "./components/Hello.vue"

let v = new Vue({
    el: "#app",
    template: `
    <div>
        <div>Hello {{name}}!</div>
        Name: <input v-model="name" type="text">
        <hello-component :name="name" :initialEnthusiasm="5" />
    </div>`,
    data: {
        name: "World"
    },
    components:{
        HelloComponent
    }
});