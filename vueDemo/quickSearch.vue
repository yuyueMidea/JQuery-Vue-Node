<template>
	<div class="quick_search">
		<el-row>
			<el-col :span="6">
				<el-button icon="el-icon-search" v-on:click="openDialog"></el-button>
			</el-col>
			<el-col :span="18"><span></span></el-col>
		</el-row>
				<el-dialog title="快速查询" :visible.sync="dialogTableVisible" width="600">
					<el-row>
						<el-col :span="8">
							<span>编码</span><el-input v-model="form.code" />
						</el-col>
						<el-col :span="8">
							<span>名称</span><el-input v-model="form.name" />
						</el-col>
						<el-col :span="8">
							<el-button v-on:click="queryBy" type="primary" size="small">查询</el-button>
						</el-col>
					</el-row>
					<hr>
					<el-table :data="gridData" border style="width: 100%;height:333px;overflow-y: auto;" @row-dblclick="getLineData">
						<el-table-column type="index" width="50" />
						<el-table-column property="code" label="编码" width="200"  />
						<el-table-column property="name" label="姓名" />
					</el-table>
				</el-dialog>
	</div>
</template>

<script>
	export default{
		name:'quickSearch',
		data(){
			return{
				formLabelWidth:'120px',
				pageNo:1,
				pageSize:10,
				dialogTableVisible: false,
				form:{
					name:'',
					code:'',
				},
				gridData: [],
			}
		},
		methods: {
			openDialog() {
				this.query();
				this.dialogTableVisible=true;
			},
			query(){
				this.$axios.get('https://www.apiopen.top/journalismApi',{
					showLoading: true
				}).then(v=>{
					let resarr=[];
					// debugger
					v.data.data.toutiao.map(v=>resarr.push({
						code: v.docid,
						name: v.digest
					}));
					this.gridData = resarr;
				}).catch(function (error) {
					console.log(error);
				  })
				  .then(function () {
					// always executed
				  });
			},
			queryBy(){
				
			},
			getLineData(row){
				debugger
				this.$emit("sendData",{code:row.code, name: row.name});
				this.dialogTableVisible=false;
			}
		},
	}
</script>

<style>
.quick_search{
	display: inline-block;
}
.quick_search .el-input{
	width: 70%;
    margin: 0 11px;
}
.quick_search .el-table td{
	padding: 3px 0;
}
</style>
