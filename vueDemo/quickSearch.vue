<template>
  <div class="the_quick_search" >
    <el-row>
      <el-col :span="24" style="position: relative;">
        <el-select class="the_quick_select"
          v-model="inputName" clearable filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" @change="getSelectData" @clear="clearOptions">
          <el-option style="border-bottom: 1px solid #ccc;"
            v-for="item in selectGridData"
            :key="item[resetObj[0]]"
            :label="item[resetObj[0]]"
            :value="item[resetObj[0]]">
            <span style="width: 50%;border-right: 1px solid #ccc;display: inline-block;">{{ item[resetObj[0]] }}</span>
            <span style="width: 50%;display: inline-block;">{{ item[resetObj[1]] }}</span>
          </el-option>
        </el-select>
        <el-button icon="el-icon-search" @click="openDialog" style="position: absolute;top: 2px;right: 2px;"></el-button>
      </el-col>
    </el-row>

    <el-dialog title="快速查询" :visible.sync="dialogTableVisible" width="800px" :close-on-press-escape=false :close-on-click-modal=false>
      <el-form :model="form">
        <el-row>
          <el-col :span="8">
            <el-form-item label="编码" :label-width="formLabelWidth">
              <el-input v-model="form.code" autocomplete="off" @keyup.native.enter="query"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" @keyup.native.enter="query"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="padding-left: 11px">
            <el-button type="primary" size="mini" @click="query">查询</el-button>
          </el-col>
        </el-row>

      </el-form>
      <hr>
      <el-row style="margin-bottom: 5px;">
        <el-col :span="16"><span>查询结果</span></el-col>
        <el-col :span="8" style="padding-left: 11px">
          <el-button type="primary" size="mini" @click="closeDialog">选择</el-button>
        </el-col>
      </el-row>
      <el-table :data="gridData" border style="width: 100%" max-height="330" @row-dblclick="getLineData" highlight-current-row @current-change="handleCurrentChange">
        <el-table-column type="index" width="50" fixed />
        <template v-for="(col, key) in tableHeader">
          <el-table-column
            v-if="!col.hidden"
            :key="key"
            :prop="col.prop"
            :label="col.label"
            :width="col.width"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
        </template>
      </el-table>
      <el-footer class="page-bar" v-if="pageEnabled">
        <pager-bar
          :dataCount="dataCount"
          :queryTotal="queryTotal"
          :pageIndex="viewIndex"
          :pageSize="viewSize"
          :pageCount="pageCount"
          :pageQuery="pageQuery"
          ref="pager"
        ></pager-bar>
      </el-footer>
    </el-dialog>

  </div>
</template>

<script>
  import { http } from '@/portal/utils/http'
  import PagerBar from '@/portal/components/Pager';

    export default {
      name: "QuickSearch",
      components:{ PagerBar },
      data(){
        let resetObj =[];
        this.tableHeader.map(v=>{
          resetObj.push(v.prop);
        });
          return{
            dataCount: 0,
            queryTotal: -1,   // 共几条 -1就是问号
            viewIndex: 1,
            viewSize: 10,
            queryParam: {
              __page: 1,
              __pagesize: 10,
            },
            resetObj: resetObj,
            queryUrl:'',
            currentRow:'',
            form:{
              code:'',
              name:'',
            },
            formLabelWidth: '120px',
            dialogTableVisible:false,
            gridData: [],
            //select下拉data区域
            inputName:'',
            selectVisible: false,
            showSelect:false,
            selectGridData:[],

          }
      },

      methods:{
        remoteMethod(query) {
          if (query) {
            this.showSelect = true;
            this.inputName=query;
            //延时0.5秒查询
            setTimeout(() => {
              this.query();
            }, 500);
          } else {
            this.selectGridData = [];
          }
        },
        getSelectData(val){   //获取选中的值并且赋值
          let resObj = this.selectGridData.find(item=>item[this.resetObj[0]]===val);
          this.$emit("close-quicksearch",{row:resObj});
        },
        clearOptions(){   //清空下拉选的值--------
          this.selectGridData =[];
          // this.$emit("clear-quicksearch");
        },
        openDialog(){
          this.showSelect=false;
          this.selectVisible=false;
          this.query();
          this.form = {code:'', name:''};
          this.dialogTableVisible = true;

        },
        closeDialog(){
          this.dialogTableVisible = false;
          this.$emit("close-quicksearch",{row:this.currentRow});
        },
        handleCurrentChange(val) {
          this.currentRow = val;
        },
        getLineData(row){
          this.dialogTableVisible = false;
          this.selectVisible=false;
          this.inputName=row[this.resetObj[0]];
          this.$emit("close-quicksearch",{row});
        },
        pageQuery(opr, size) {    // 查询数据的方法
          let queryParam = this.queryParam;
          if (opr == "") {
            this.viewSize = size
            queryParam.__pagesize = size
            queryParam.__page = 1
          } else if (opr == "prev") {
            queryParam.__page -= 1;
          } else if (opr == "next") {
            queryParam.__page += 1;
          }
          let _this = this
          _this.loading = true

          http({
            url: this.url,
            method: 'post',
            data: queryParam
          }).then(data => {
            _this.loading = false
            if (null == data || 0 == data.length) {
              _this.dataCount = 0;
            } else {
              _this.dataCount = data.length;
              this.gridData = data.slice(0);
              if (opr == "") {
                _this.viewIndex = 1
              } else if (opr == "prev") {
                _this.viewIndex -= 1
              } else if (opr == "next") {
                _this.viewIndex += 1
              }
            }
          }).catch(err => {
            console.log(err)
            _this.loading = false
          })
        },
        pageCount(){    // 查询共几条的方法
          if(this.queryTotal >0) return;
          let instance = this.$pageLoading.open();
          http({
            url: this.queryUrl,
            method: 'post',
            data: {}
          }).then(data => {
            instance.close();
            this.queryTotal=data.length;
            this.dataCount = data.length;
          }).catch(err => {
            instance.close();
          })
        },
        query(queryStr){
          let paramData = Object.assign({}, this.queryParam);
          paramData[this.resetObj[0]] = this.form.code;
          paramData[this.resetObj[1]] = this.form.name;
          paramData[this.resetObj[0]+'Cond']= "cn";
          paramData[this.resetObj[1]+'Cond']= "cn";
          if(this.showSelect) paramData[this.resetObj[0]] = this.inputName;
          //支持模糊查询---如果有前置查詢條件就加上
          if(Object.keys(this.preQueryData).length >0){
            paramData = Object.assign(paramData,this.preQueryData);
          }
          let instance = this.$pageLoading.open();
          http({
            url: this.queryUrl,
            method: 'post',
            data: paramData
          }).then(data => {
            instance.close();
            if(this.showSelect){
              this.selectGridData = data.slice(0);
            }else {
              this.gridData = data.slice(0);
            }
            this.dataCount = data.length;
          }).catch(err => {
            instance.close();
          })
        }
      },

      props:{
        showInput: { // 父页面传值input
          type: String,
          default: function () {
            return ""
          }
        },
        url: { // 查询数据url
          type: String,
          default: function () {
            return ""
          }
        },
        preQueryData: { // 前置查询条件
          type: Object,
          default: function () {
            return {}
          }
        },
        pageEnabled: {
          type: Boolean,
          default: function () {
            return true
          }
        },
        tableHeader: { // 表头数据
          type: Array,
          default: function () {
            return []
          }
        },
      },
      watch:{
          url:{   //父子页面传参URL
            immediate:true,
            handler:function(e){
              this.queryUrl = e;
            }
          },
        showInput:{
          immediate:true,
          handler:function(e){
            this.inputName=e;
          }
        }
      }
    }
</script>

<style scoped lang="scss">
.the_quick_search /deep/ {
  position: relative;
  .el-input-group__append {
    padding-right: 8px;
  }
  .the_quick_select .el-input__suffix{
    right: 30px;
  }
  .el-button{
    border: none;
  }
  .el-form-item{
    margin-bottom: 0;
  }
  .el-dialog__body{
    padding-top: 10px;
    height: 465px;
  }

}
</style>
