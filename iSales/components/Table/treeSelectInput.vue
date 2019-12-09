<template>
    <div class="the_tree_select">
      <el-row>
        <el-col :span="24" style="position: relative;padding: 0;">
          <el-input id="subOrgCode4" v-model="subOrgCode4" @clear="clearOptions" @blur="getOrg" clearable :disabled="disabled"/><el-button icon="el-icon-search" class="the_tree_btn" @click="openDialog" :disabled="disabled"/>
        </el-col>
      </el-row>

      <el-dialog v-dialogDrag :title="showTitle" :visible.sync="dialogTableVisible" width="600px" :close-on-press-escape=false :close-on-click-modal=false append-to-body>
        <div class="treeDiv" style="height: 400px;border: 1px solid #ccc;padding: 11px;margin-bottom: 20px;overflow: auto;">
          <el-tree :data="treeData" :props="defaultProps" accordion @node-click="handleNodeClick" :load="loadNode" lazy></el-tree>
        </div>
      </el-dialog>
    </div>

</template>

<script>
  import { http } from '@/portal/utils/http';
  import { debounce } from 'lodash';

export default{
  name: 'treeSelect',
	data(){

		return{
      subOrgCode4:'',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'orgName',
        isLeaf: 'leaf'
      },
      dialogTableVisible:false,
		}
	},
	methods:{
    getOrg: debounce(function(val){
      //if(!this.subOrgCode4) return;


      if(this.subOrgCode4.indexOf("*") != -1){
        return true;
      }
      if(this.subOrgCode4.length<4){
        this.subOrgCode4+="*"
        return true;
      }
      this.setValue(this.subOrgCode4);
      /*if(!this.subOrgCode) {
        this.$mideaMessage({
          type:'info',
          message: `会社を選択して下さい。`
        });
        this.subOrgCode4 ='';
        return;
      }*/
      http({
        url: "/isales-main/mstOrganization/getOrgByOrgCode",
        method: 'post',
        data: {
          "orgCode": this.subOrgCode4,
          "companyShort": this.subOrgCode
        },
        loading: true
      }).then(data => {
        if(data) {
          this.$emit("close-tree", data, this.scopeData);
          this.subOrgCode4 = data.orgCode;
          this.saleOrgName = data.orgName;
        } else {
          //清空數據
          this.subOrgCode4 ='';
          this.$mideaMessage({
            type:'error',
            message: `該当する販売担当課がありません。`
          });
        }
      }).catch(err => {
        console.log(err);
      });
    },800),

    openDialog(val){
      this.treeData =[];
      this.dialogTableVisible = true;
      // if(this.treeData.length !==0) return;
      this.getFirstTreeData();
    },
    // 树形第1层级数据
    getFirstTreeData(val, orgCode){
      http({
        url: "/isales-main/mstOrganization/getOrgForTree",
        method: 'post',
        data: { companyShort:this.subOrgCode },
        loading: true
      }).then(data => {
        if(data.length ===0) return;
        this.treeData = data;
      }).catch(err => {
        console.log(err);
      });
    },
    handleNodeClick(data) {       //节点被点击时的回调---
    // 关闭页面弹框
      // 没有子集时候--获取数据
      if(data.orgLevel==4){
        this.$emit("close-tree", data, this.scopeData);
        this.subOrgCode4 = data.orgCode;
        this.dialogTableVisible = false;
      }
    },
    async loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([]);
      } else {
        if (node.level >=4) {
          return resolve([]);
        }
        await this.getTreeData({ companyShort:this.subOrgCode, parentOrgCodes: [node.data.orgCode] });
        if (node.level ==3){
          for(let i=0;i<this.resData.length;i++){
            this.resData[i].leaf= true
          }
        }
        resolve(this.resData);
      }
    },
    // 树形第N层级数据
    getTreeData(val){
      return http({
        url: "/isales-main/mstOrganization/getOrgForTree",
        method: 'post',
        data: val,
        loading: true
      }).then(data => {
        this.resData = data;
      }).catch(err => {
        console.log(err);
      });
    },
    //清除担当课
    clearOptions(val){
      this.subOrgCode4 = '';
      this.saleOrgName = '';
      this.$emit("close-tree", '');
    },
	},
  beforeCreate() {

  },
  created(){

  },
  watch:{
    showInput: {
      immediate: true,
      handler: function(val) {
        this.subOrgCode4 = val
      }
    },
  },
  //接收父页面传参---
  props: {
    subOrgCode: {
      // 父页面传值--->配置项
      type: String,
      default: function() {
        return "";
      }
    },
    showInput: {
      // 父页面传值input
      type: String,
      default: function() {
        return "";
      }
    },
    showTitle: {
      // 父页面传值弹框标题
      type: String,
      default: function() {
        return "";
      }
    },
    disabled: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    // 当前行上绑定的 data 对象
    scopeData: {
      type: Object,
      default: function() {
        return null;
      }
    },

  },
}
</script>
<style scoped lang="scss">
.the_tree_select /deep/{
  position: relative;
  .el-form-item{
    margin-bottom: 5px !important;
  }
  .the_tree_class .el-input__suffix {
    right: 25px;
  }
  .the_tree_btn{
    position: absolute;top: 2px;
    right: 3px;
    padding: 5px;
    border: none;
  }
}
</style>
