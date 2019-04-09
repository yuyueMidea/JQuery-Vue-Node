<template>
  <el-container direction="vertical" v-midea-autoheight="autoHeight">
    <el-main>
    <el-table
      stripe
      border
      :fit="fitTable"
      highlight-current-row
      size="mini"
      @current-change="currentChange"
      @sort-change="sortChange"
      @row-dblclick="rowDblclick"
      @selection-change="checkChange"
      @cell-click="cellclick"
      :data="tableData"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.3)"
      height="100%"
      ref="tableGrid"
    >
      <el-table-column v-if="checkbox" type="selection" :selectable="setSelectable" />
      <el-table-column type="index" align="center" fixed></el-table-column>
      <template v-for="(col, key) in innerHeader">
        <el-table-column
          v-if="!col.hidden"
          :key="key"
          :prop="col.prop"
          :label="generateHeader(col.label)"
          :fixed="col.fixed"
          :min-width="col.minWidth"
          :width="col.width"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot="header" slot-scope="scope">
            <template v-if="showFilterBar">
              <el-row style="display:block;padding:2px 5px 0px 5px">
                <span style="text-align:center">{{ generateHeader(col.label) }}</span>
                <header-sort
                  v-if="col.sortable"
                  :columnName="col.prop"
                  :sortData="col.sortData"
                  :sortField="sortField"
                  :sortType="sortType"
                  :changeSort="sortChange"
                ></header-sort>
              </el-row>
              <filter-column :col="col" :queryData="queryData" :onQuery="query"></filter-column>
            </template>
            <template v-else>
              <span>
                <span>{{ generateHeader(col.label) }}</span>
                <el-popover placement="bottom" width="200" trigger="click" v-show="col.filter">
                  <filter-column :col="col" :queryData="queryData" :onQuery="query"></filter-column>
                  <i slot="reference" class="el-icon-search"></i>
                </el-popover>
                <header-sort
                  v-if="col.sortable"
                  :columnName="col.prop"
                  :sortData="col.sortData"
                  :sortField="sortField"
                  :sortType="sortType"
                  :changeSort="sortChange"
                ></header-sort>
              </span>
            </template>
          </template>
          
          <template slot-scope="scope">
            <el-button v-if="col.showType == 'button'" type="primary" v-html="formatter(scope,col)" @click="col.showDialog(scope.row)"></el-button>
            <span v-else v-html="formatter(scope,col)"></span>
          </template>
        </el-table-column>
      </template>
    </el-table>
    </el-main>

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
  </el-container>

</template>
<script>
import FilterColumn from './components/FilterHeaderColumn'
import HeaderSort from './components/HeaderSort'
import PagerBar from '@/portal/components/Pager'
import { http } from '@/portal/utils/http'
import { formatDate } from '@/portal/utils/index'
import { generateHeader } from '@/portal/utils/i18n'
export default {
  name: 'TableView',
  components: { FilterColumn, HeaderSort, PagerBar },
  data() {

    return {
      loading: false,
      queryData: {}, // 查询条件存储
      tableData: [],// 表格数据
      sortData: {},
      sortField: '',
      sortType: '',
      dataCount: 0,
      queryTotal: -1,
      viewSize: this.pageSize,
      viewIndex: this.pageIndex,
      innerHeader:[]
    }
  },
  beforeCreate() {
  },
  created() {
    if (this.autoQuery) {
      this.query();
    }
  },
  props: {
    autoQuery: {
      type: Boolean,
      default: function () {
        return true
      }
    },
    url: { // 查询数据url
      type: String,
      default: function () {
        return ""
      }
    },
    urlForCount: { // 查询总行数url
      type: String,
      default: function () {
        return ""
      }
    },
    fitTable: { // 列自适应
      type: Boolean,
      default: function () {
        return true
      }
    },
    pageEnabled: {
      type: Boolean,
      default: function () {
        return true
      }
    },
    pageIndex: { // 当前页码,从1开始
      type: Number,
      default: function () {
        return 1
      }
    },
    pageSize: { // 一页数量
      type: Number,
      default: function () {
        return 15
      }
    },
    preQueryData: { // 前置查询条件
      type: Object,
      default: function () {
        return {}
      }
    },
    postQueryData: { // 后置查询条件
      type: Object,
      default: function () {
        return {}
      }
    },
    rowDblclick: { // 行双击事件
      type: Function,
      default: (row, event, column) => { console.log('default: ' + row + '---' + event + '---' + column) }
    },
    cellclick: { // 单元格事件
      type: Function,
      default: (row, column, cell, event) => {
        console.log('default: ' + row + '---' + column + '---' + cell)
      }
    },
    currentChange: { // 选中行改变事件
      type: Function,
      default: (val) => {
        //debugger
        //this.currentRow = val;
        //alert("1"); }
      }
    },
    tableHeader: { // 表头数据
      type: Array,
      default: function () {
        return []
      }
    },
    showFilterBar: { // 是否显示过滤行
      type: Boolean,
      default: false
    },
    checkbox: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
    },
    autoHeight: {
      type: Object,
      default: function () {
        return null
      }
    },
    checkChange: {
      type: Function,
      default: function () {
        return null
      }
    },
    // CheckBox 是否可以勾选
    setSelectable: {
      type: Function,
      default: function () {
        return true
      }
    }
  },
  methods: {
    generateHeader,
    getParam() {
      let param = Object.assign({}, this.queryData, this.postQueryData)
      let _this = this
      Object.keys(param).forEach(function (key) {
        _this.tableHeader.forEach(function (v, k) {
          if (v.prop === key) {
            if (v.filter.type === 'multiselect') {
              param[key] = param[key].join(',')
            } else if (v.filter.type === 'date' || v.filter.type === 'datetime') {
              if (param[key]) {
                param[key + "From"] = formatDate(param[key][0], "yyyy-MM-dd hh:mm:ss")
                param[key + "To"] = formatDate(param[key][1], "yyyy-MM-dd hh:mm:ss")
                param[key] = null // 传到后台会出现转换错误，数组转date
              }
            }
          }
        })
      })
      if (this.sortField && this.sortField.length > 0) {
        let orderFields = {}
        orderFields[this.sortField] = this.sortType
        param.orderFields = orderFields
      }
      if (this.pageEnabled) {
        param.__page = this.viewIndex
        param.__pagesize = this.viewSize
      }

      return param
    },
    query() {
      this.viewIndex = 1  // 非分页触发查询，页码跳回首页
      this.queryTotal = -1 // 更新总条数为未知
      let queryParam = this.getParam()
      //console.log(JSON.stringify(queryParam))
      this.find(queryParam)
    },
    find(param) {
      let _this = this
      _this.loading = true
      http({
        url: this.url,
        method: 'post',
        data: param
      }).then(data => {
        _this.loading = false
        if (null == data) {
          _this.dataCount = 0;
        } else {
          _this.tableData = data
          _this.dataCount = data.length
        }
      }).catch(err => {
        console.log(err)
        _this.loading = false
      })
    },
    sortChange(columnName) {
      if (this.sortField == columnName) {
        if (this.sortType == 'desc') {
          this.sortType = 'asc'
        } else if (this.sortType == 'asc') {
          this.sortField = ''
          this.sortType = ''
        }
      } else {
        this.sortField = columnName
        this.sortType = 'desc'
      }
      this.query()
    },
    pageCount() {
      let _this = this
      let param = this.getParam()
      http({
        url: this.urlForCount,
        method: 'post',
        data: param
      }).then(data => {
        if (null != data) {
          _this.queryTotal = data
        }
      }).catch(err => {
        console.log(err)
        _this.loading = false
      })
    },
    pageQuery(opr, size) {
      let queryParam = this.getParam()
      if (opr == "") {
        this.viewSize = size
        queryParam.__pagesize = size
        queryParam.__page = 1
      } else if (opr == "prev") {
        queryParam.__page -= 1
      } else if (opr == "next") {
        queryParam.__page += 1
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
          _this.tableData = data
          _this.dataCount = data.length
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
    formatter(scope, col) {
      if (col.hasOwnProperty('formattor')) {
        return col.formattor(scope.row[col.prop]);
      } else if(col.options){
        if(col.key)
          return col.optionMap[scope.row[col.key]]
        else{
          return col.optionMap[scope.row[col.prop]]
        }
      }else{
        return scope.row[col.prop]
      }
    },
    changeLang(val){
      this.$refs.pager.changeLang(val)
    },
    setCurrentRow(row){
      this.$refs.tableGrid.setCurrentRow(row)
    }
  },
  watch:{
    tableHeader:{
      immediate:true,
      handler:function(e){
        this.innerHeader = []
      }
    }
  },
  beforeUpdate(){
    let queryData = Object.assign({}, this.queryData, this.postQueryData);
    for (let con of this.tableHeader) {

      var conField = con.prop + "Cond"
      if (con.filter) {
        if (con.filter.defaultCon) {  // 可设置默认过滤比较符号
          queryData[conField] = con.filter.defaultCon
        } else {
          if (con.filter.type == "text") {
            queryData[conField] = "cn"
          } else if (con.filter.type == "date" || con.filter.type == "datetime") {
            queryData[conField] = "bt"
          } else if (con.filter.type == "select" || con.filter.type == "number") {
            queryData[conField] = "eq"
          } else if (con.filter.type == "multiselect") {
            queryData[conField] = "me"
          } else {
            queryData[conField] = "eq"
          }
        }
      } else {
        queryData[conField] = "eq"
      }
    }

    this.queryData = queryData
    this.innerHeader = this.tableHeader

    if(undefined == this.optionMap){
      this['headerMap'] = {}
      this.tableHeader.forEach(col =>{
        if(undefined != col.options){
            col['optionMap'] = {}
            col.options.forEach(option =>{
                col['optionMap'][option.value] = option.label ? option.label : option.value
            })
        }

        this['headerMap'][col.prop] = col
      })
    }
  }
}
</script>
<style >
.el-table th {
  padding: 0px;
  /* background: blue; */
  text-align: center;
}
.el-table th div {
  line-height: 20px;
}
.el-table th > .cell {
  padding: 0px;
}
.el-table  td > .cell{
	white-space: pre;
}
.el-table--mini td{
	padding: 3px 0;
}

.el-input-number .el-input {
  padding: 0px;
}

.el-select > .el-input {
  padding: 0px;
}

.el-table th div {
  display: flex;
}
</style>

