/*
 * @Author: your name
 * @Date: 2019-12-20 11:21:09
 * @LastEditTime: 2019-12-20 11:21:12
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \typescript-vue-tutorial\src\components\hello.ts
 */
import Vue from "vue";

export default Vue.extend({
    template: `
        <div>
            <div>Hello {{name}}{{exclamationMarks}}</div>
            <button @click="decrement">-</button>
            <button @click="increment">+</button>
        </div>
    `,
    props: ['name', 'initialEnthusiasm'],
    data() {
        return {
            enthusiasm: this.initialEnthusiasm,
        }
    },
    methods: {
        increment() { this.enthusiasm++; },
        decrement() {
            if (this.enthusiasm > 1) {
                this.enthusiasm--;
            }
        },
    },
    computed: {
        exclamationMarks(): string {
            return Array(this.enthusiasm + 1).join('!');
        }
    }
});