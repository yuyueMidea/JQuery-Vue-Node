<template>
    <div>
        <button @click="count++">count is {{count}}</button>
        <button @click="count--">-</button>
    </div>
    
</template>
<script>
export default {
    data(){
        return{
            count: 3
        }
    }
}
</script>

