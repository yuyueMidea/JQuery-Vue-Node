<template>
  <div>
    
    <h2>使用树形穿梭框组件</h2>
		<hr><br>
		
    <el-transfer filterable v-model="toNameList" :data="fromNameList" @change="handleChange"></el-transfer>
		
  </div>
</template>

<script>
  import treeTransfer from 'el-tree-transfer' // 引入

  export default {
    data(){
      return{
				fromNameList:[
					{
						label:"上海",
						key: "shanghai"
					},
					{
						label:"深圳",
						key: "shenzhen"
					},
					{
						label:"广州",
						key: "guangzhou"
					},
					{
						label:"信阳",
						key: "xinyang"
					},
					{
						label:"郑州",
						key: "zhenzhou"
					}
				],
				toNameList:["shenzhen"]
      }
    },
    methods:{
			handleChange(value, direction, movedlabels) {
        console.log(value,'---', direction, '-----',movedlabels);
      }
    }
  }
</script>

<style scoped="scoped">
.el-transfer{
	margin: 0 auto; width: 90%; height: 300px;
}
</style>
