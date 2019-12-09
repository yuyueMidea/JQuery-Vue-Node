<template>
  <el-container direction="vertical" style="min-height: 0;">
    <el-main style="flex-grow: 1;display: flex;flex-direction: column">
      <el-table
        :stripe="stripe"
        border
        :fit="fitTable"
        highlight-current-row
        size="mini"
        @current-change="currentChange"
        @sort-change="sortChange"
        @row-dblclick="rowDblclick"
        @selection-change="checkChange"
        @cell-click="cellclick"
        @row-click="rowClick"
        @select="selectRow"
        :data="tableData"
        v-loading="loading"
        :element-loading-text="$t('common.loading')"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.3)"
        :default-expand-all="expandAll"
        lazy
        :tree-props="treeProps"
        ref="tableGrid"
        style="flex-grow: 1"
        height="100%"
        :header-cell-class-name="headerCellClassName"
        :row-class-name="rowClass"
        :row-key="rowKey"
        :load="load"
      >
        <el-table-column v-if="checkbox" type="selection" :selectable="setSelectable" />
        <el-table-column v-if="rowIndex" type="index" align="center" :fixed="rowIndexFixed"></el-table-column>
        <template v-for="(col, key) in innerHeader">
          <el-table-column
            v-if="!col.hidden"
            :key="key"
            :prop="col.prop"
            :label="generateHeader(col.label)"
            :fixed="col.fixed ? col.fixed:false"
            :min-width="col.minWidth"
            :width="col.width"
            :align="col.align?col.align:'center'"
            :show-overflow-tooltip="true"
          >
            <template slot="header" slot-scope="scope">
              <template v-if="showFilter">
                <el-row style="display:block;">
                  <span style="text-align:center" v-html="generateHeader(col.label)"></span>
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
                  <span v-html="generateHeader(col.label)"></span>
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
              <template v-if="col.showType == 'button'">
                <el-button
                  v-if="col.show ? col.show(scope.row) : true"
                  :type="col.btnStyle ? col.btnStyle : 'primary'"
                  :icon="col.icon"
                  :loading="col.loading"
                  v-html="formatter(scope,col)"
                  @click.stop.prevent="callback(col, scope.row)"
                ></el-button>
              </template>

              <template v-else-if="col.showType == 'buttons'">
                <el-button-group>
                  <template v-for="button in col.buttons">
                    <el-button
                      v-if="button.show ? button.show(scope.row) : true"
                      :type="button.btnStyle ? button.btnStyle : 'primary'"
                      :key="button.text"
                      v-html="formatter(scope,button)"
                      @click="callback(button, scope.row)"
                    ></el-button>
                  </template>
                </el-button-group>
              </template>
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
        :loading="loading"
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
import { formatDate, isNull } from '@/portal/utils/index'
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
      sortField: this.defaultSort.sortField,//这个是表头用的
      sortType: this.defaultSort.sortType,//这个是表头用的
      __sortField: '',//这个是视图用的
      __sortType: '',//这个是视图用的
      dataCount: 0,
      queryTotal: -1,
      viewSize: this.pageSize,
      viewIndex: this.pageIndex,
      innerHeader: [],
      currentRow: null,
      __filters: [],
      showFilter: this.showFilterBar
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
    stripe: {
      type: Boolean,
      default: function () {
        return true
      }
    },
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
        // console.log('default: ' + row + '---' + column + '---' + cell)
      }
    },
    currentChange: { // 选中行改变事件
      type: Function,
      default: (val) => {
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
    },
    //返回row的class方法
    rowClass: {
      type: Function,
      default: function () {
        return true
      }
    },
    //表头样式
    headerCellClassName: {
      type: [Function, String],
      default: null
    },
    treeProps: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // 行数据的 Key，值须唯一
    rowKey: {
      type: String,
      default: null
    },
    // 加载子节点数据的函数
    load: {
      type: Function,
      default: function () {
        return null
      }
    },
    // 返回数据处理
    formatSearchData: {
      type: Function
    },
    expandAll: {
      type: Boolean,
      default: false
    },
    defaultSort: {
      type: Object,
      default: function () {
        return { "sortField": "", "sortType": "" }
      }
    },
    rowIndex: {
      type: Boolean,
      default: true
    },
    rowIndexFixed: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    changeLoading(loading) {
      this.loading = loadings
    },
    generateHeader,
    callback(col, row) {
      if (col.callback) {
        col.callback(row)
      }
    },
    getParam() {
      let param = Object.assign({}, this.preQueryData, this.queryData, this.postQueryData)
      let _this = this

      Object.keys(param).forEach(function (key) {
        _this.tableHeader.forEach(function (v, k) {
          if (v.prop === key && v.filter) {
            if (v.filter.type === 'multiselect') {
              param[key] = param[key].join(',')
            } else if (v.filter.type === 'date' || v.filter.type === 'datetime') {
              if (param[key] && param[key].length > 0) {
                // param[key + "From"] = formatDate(param[key][0], "yyyy-MM-dd hh:mm:ss")
                // param[key + "To"] = formatDate(param[key][1], "yyyy-MM-dd hh:mm:ss")
                param[key + "From"] = param[key][0]
                param[key + "To"] = param[key][1]
                param[key] = null // 传到后台会出现转换错误，数组转date
              }
            }
          }
        })
      })

      let orderFields = {}
      if (this.__sortField) {
        orderFields[this.__sortField] = this.__sortType
      }

      if (this.sortField && this.sortField.length > 0) {
        orderFields[this.sortField] = this.sortType
      }

      if (0 < Object.keys(orderFields).length)
        param['orderFields'] = orderFields

      if (this.pageEnabled) {
        param.__page = this.viewIndex
        param.__pagesize = this.viewSize
      }

      // return param
      return this.formatParam(param)
    },
    getViewsFilter() {
      if (this.__filters && this.__filters.length > 0) {
        return this.__filters
      } else {
        return null
      }
    },
    // 传参转换(prop为多层结构的处理,待优化)
    formatParam(param = {}) {
      let newParam = {}

      for (let key in param) {
        let arr = key.split('.'),
          len = arr.length,
          orderVal = null

        // 排序处理
        // if (key == 'orderFields') {
        //   let orderFields = param[key]
        //   for(let orderKey in orderFields) {
        //     let orderArr = orderKey.split('.')
        //     if (orderArr.length > 1) {
        //       orderVal = orderFields[orderKey]
        //       orderArr.unshift('orderFields')
        //       arr = orderArr
        //       len = arr.length
        //     }
        //     break
        //   }
        // }

        // 值转换
        if (Array.isArray(param[key])) {
          param[key] = param[key].join(',')
        }

        if (len > 1) {
          if (!newParam[arr[0]]) newParam[arr[0]] = {}
          if (!newParam[arr[0]][arr[1]]) newParam[arr[0]][arr[1]] = {}

          if (len >= 2) {
            let n = newParam[arr[0]][arr[1]]
            if (!n) newParam[arr[0]][arr[1]] = {}
            if (len == 2) newParam[arr[0]][arr[1]] = param[key]
          }

          if (len >= 3) {
            let n = newParam[arr[0]][arr[1]][arr[2]]
            if (!n) newParam[arr[0]][arr[1]][arr[2]] = {}
            if (len == 3) newParam[arr[0]][arr[1]][arr[2]] = param[key]
          }
          if (len >= 4) {
            let n = newParam[arr[0]][arr[1]][arr[2]][arr[3]]
            if (!n) newParam[arr[0]][arr[1]][arr[2]][arr[3]] = {}
            if (len == 4) newParam[arr[0]][arr[1]][arr[2]][arr[3]] = orderVal ? orderVal : param[key]
          }
        } else {
          newParam[key] = param[key]
        }
      }

      return newParam
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
      let params = Object.assign({}, this.preQueryData, param)
      if (this.__filters && this.__filters.length > 0) {
        params['__filters'] = this.__filters
      }

      http({
        url: this.url,
        method: 'post',
        data: params
      }).then(data => {
        if (null == data) {
          _this.dataCount = 0;
        } else {
          if (this.formatSearchData) {  // 数据处理
            data = this.formatSearchData(data)
          }

          _this.tableData = data
          _this.dataCount = data.length
        }
        _this.loading = false
        _this.$emit('afterQuery', data);  // afterQuery 事件
      }).catch(err => {
        console.log(err)
        _this.loading = false
        _this.$emit('afterQuery', err);  // afterQuery 事件
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
      let params = Object.assign({}, this.preQueryData, param)
      if (this.__filters && this.__filters.length > 0) {
        params['__filters'] = this.__filters
      }

      http({
        url: this.urlForCount,
        method: 'post',
        data: params
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
        if (this.formatSearchData) {  // 数据处理
          data = this.formatSearchData(data)
        }

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
        _this.loading = false
        _this.$emit('afterQuery', data);  // afterQuery 事件
      }).catch(err => {
        console.log(err)
        _this.loading = false
        _this.$emit('afterQuery', err);  // afterQuery 事件
      })
    },
    formatter(scope, col) {
      let icon = ''
      let text = ''
      if (col.hasOwnProperty('formattor')) {
        text = col.formattor(col.prop ? this.getPropData(scope.row, col) : col.label, scope.row)
      } else {
        text = col.prop ? this.getPropData(scope.row, col) : ''
      }

      if (col.icon) {
        icon = '<i class="' + col.icon + '"></i>'
      }
      if (!isNull(text))
        return icon + '<span>' + text + '</span>'
      else
        return icon
    },
    // 获取属性对应的值
    getPropData(data, col) {
      let props = (col.mapProp || col.prop).split('.'),
        propData = data || {}

      for (let item of props) {
        if (typeof data == 'object') {

          propData = propData[item]
        } else {
          return propData
        }
      }
      return propData
    },
    changeLang(val) {
      this.$refs.pager.changeLang(val)
    },
    setCurrentRow(row) {
      this.$refs.tableGrid.setCurrentRow(row)
    },
    // 返回table实例
    getTableGrid() {
      return this.$refs.tableGrid
    },
    // 获取默认查询条件
    getDefaultQueryData() {
      let queryData = Object.assign({}, this.postQueryData)

      for (let con of this.tableHeader) {

        var conField = con.prop + "Cond"
        if (con.filter) {
          if (con.filter.defaultCon) {
            queryData[conField] = con.filter.defaultCon // 可设置默认过滤比较符号，优先级最高
          } else if (con.filter.conditions && con.filter.conditions.length > 0) {
            queryData[conField] = con.filter.conditions[0] // 自定义比较符列表，再没有设置默认比较符的情况下，默认取第一个
          } else { // 其他情况按字段类型设置默认比较符
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

      return queryData
    },
    // 设置查询条件
    setQueryData(params = {}, append = "after") {
      let defaultQueryData = this.getDefaultQueryData()
      if (append == 'after') {
        this.queryData = Object.assign({}, defaultQueryData, params)
      } else {
        this.queryData = Object.assign({}, params, defaultQueryData)
      }
    },
    // 清空查询条件
    clearQueryData() {
      this.queryData = {}
    },
    rowClick(row, column, event) {
      if (!this.checkbox) return  // 非多选不执行以下操作

      // 排除禁止选择
      let el = event.currentTarget.querySelector("input")
      if (el.hasAttribute("disabled")) return

      // this.$refs.tableGrid.clearSelection()

      // 双击时会出现不是预期的结果
      // if (this.currentRow == row) {
      //   this.currentRow = null
      //   this.$refs.tableGrid.setCurrentRow()
      // } else {
      //   this.currentRow = row
      //   this.$refs.tableGrid.toggleRowSelection(row)
      // }

      this.$refs.tableGrid.toggleRowSelection(row)
    },
    selectRow(selection, row) {
      this.setCurrentRow(row)
    },
    // 清空表格数据
    clearData() {
      this.tableData = []
      this.queryTotal = 0
      this.dataCount = 0
      this.viewIndex = 1
    },
    getColDef() {
      return this.innerHeader
    }
  },
  watch: {
    tableHeader: {
      immediate: true,
      handler: function (n, o) {
        this.innerHeader = []
      },
      deep: true
    },
    showFilterBar: function (data) {
      this.showFilter = data
    }
  },
  computed: {
    /* innerHeader(){
       return JSON.parse(JSON.stringify(this.tableHeader))
     }*/
  },
  beforeUpdate() {
    let defaultQueryData = this.getDefaultQueryData()
    this.queryData = Object.assign({}, defaultQueryData, this.queryData)
  },
  updated() {
    this.innerHeader = this.tableHeader
  }
}
</script>
<style scoped>
.el-table th {
  padding: 0px;
  /* background: blue; */
  text-align: center;
}
.el-table th div {
  line-height: 16px;
}
.el-table th > .cell {
  padding: 0px;
}
.el-table td > .cell {
  white-space: pre;
}
.el-table--mini td {
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

.el-table__body-wrapper {
  z-index: 999 !important;
}
</style>

