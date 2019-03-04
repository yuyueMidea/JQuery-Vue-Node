<template>
    <div class="child">
        <h2>this is child~</h2>
        <p>{{addnum}}</p>
        <ul v-for="(item,key) in sunny" :key="key">
            <li>{{item}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    name:'child',
    props:{
        sunny:{
            type: Array,
            required:true
        },
        addnum:{
            type:Number,
            required:true
        }
    },
    
    watch:{
        addnum:function(indexVal, oldVal){
            console.log(indexVal, oldVal);
        }
    }
}
</script>
<style>
.child{
    border:1px dotted red; padding: 6px; margin: 3px;
}
</style>


