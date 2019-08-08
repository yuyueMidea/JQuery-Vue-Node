<template>
 <header class="header">
    <slot name="search"></slot>
    <a class="header_title"><span class="header_title_text ellipsis">{{title}}</span></a>
    <slot name="login"></slot>
 </header>   
</template>
<script>
import { returnStatement } from '@babel/types';
export default {
    name:'headerTop',
    data () {
        return {
            
        }
    },
    props: {
        title: String
    }
}
</script>
<style scoped>
.header {
    background: #02a774; position: fixed; top: 0; left: 0; z-index: 100; width: 100%; height: 45px;
}
.header .header_search {
    position: absolute; left: 15px; top: 50%; transform:  translateY(-50%);
    width: 10%; height: 50%;
}
.header .header_search .icon-sousuo {
    font-size: 25px; color: #fff;
}
.header .header_title {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    width: 50%; color: #fff; text-align: center;
}
.header .header_title .header_title_text {
    color: #fff; font-size: 20px; display: block;
}
</style>

