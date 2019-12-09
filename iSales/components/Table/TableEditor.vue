<template>
  <el-container direction="vertical">
    <div style="margin-top: 5px;margin-bottom: 5px;" v-if="showSearch">
      <el-input v-model="searchText" style="width: 150px" @keyup.enter.native="search"/>
      <icon-tip-button @click="search" :tip="$t('common.search')" icon="icon-search"/>
    </div>
    <el-main style="flex-grow: 1;display: flex;flex-direction: column">
      <el-table
        stripe
        border
        :fit="fitTable"
        highlight-current-row
        size="mini"
        @current-change="currentChange"
        @selection-change="selectionChange"
        @row-click="rowClick"
        @row-dblclick="rowDblclick"
        :data="tableData"
        v-loading="loading"
        :element-loading-text="$t('common.loading')"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.3)"
        :cell-class-name="setCellClass"
        :row-class-name="setRowClass"
        height="99%"
        ref="refTable"
        style="flex-grow: 1"
      >
        <el-table-column v-if="checkbox" width="40" type="selection"/>
        <el-table-column v-if="showIndex" width="50" type="index" align="center"/>
        <template v-for="(col, key) in tableHeader">
          <el-table-column
            v-if="col.hidden !== true"
            :key="key"
            :prop="col.prop"
            :render-header="colRenderHeader(col)"
            :min-width="col.minWidth"
            :width="col.width"
            :align="col.align?col.align:'center'"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <table-edit-formatter v-if="typeof(col.formatter)==='function'" :row="scope.row" :column="col" :index="scope.$index"
               :row-editting="!readonly && !col.readonly && checkRow(scope.row,scope.$index) === true && (scope.row.___editting === true || rowEditType === 'ALL')"
              />
              <template v-else-if="!readonly && !col.readonly && checkRow(scope.row,scope.$index) === true && (scope.row.___editting === true || rowEditType === 'ALL')">
                <el-input v-if="col.type === 'input'" v-model="scope.row[col.prop]" @change="changeCell(col, scope.row)" :maxlength="col.maxlength ? col.maxlength : null" style="width: 99%;"/>
                <el-input v-else-if="col.type === 'textarea'" v-model="scope.row[col.prop]" @change="changeCell(col, scope.row)" type="textarea" :autosize="true" :maxlength="col.maxlength ? col.maxlength : null" style="width: 99%;"/>
                <el-input-number v-else-if="col.type === 'number'" v-model="scope.row[col.prop]"  @change="changeCell(col, scope.row)" :precision="col.precision" :step="col.step" :min="col.min" :max="col.max" controls-position="right" style="width: 99%;"/>
                <el-select v-if="col.type === 'select'" v-model="scope.row[col.prop]" @change="changeCell(col, scope.row)" :filterable="col.filterable?col.filterable:false" :clearable="col.clearable?col.clearable:false" placeholder="" style="width: 99%;">
                  <el-option v-for="(o, okey) in col.options" :disabled="o.disabled" :key="okey" :value="o.value" :label="o.label">{{o.label}}</el-option>
                </el-select>
                <el-checkbox v-else-if="col.type === 'checkbox'" v-model="scope.row[col.prop]" @change="changeCell(col, scope.row)" :true-label="col.trueValue?col.trueValue:'Y'" :false-label="col.falseValue?col.falseValue:'N'"/>
                <el-switch v-else-if="col.type === 'switch'" v-model="scope.row[col.prop]" @change="changeCell(col, scope.row)" :active-value="col.trueValue?col.trueValue:'Y'" :inactive-value="col.falseValue?col.falseValue:'N'"/>
                <el-date-picker v-else-if="col.type === 'date'" v-model="scope.row[col.prop]" @change="changeCell(col, scope.row)" :value-format="dateFormat" :format="dateFormat" style="width: 99%;"/>
                <el-time-picker v-else-if="col.type === 'time'" v-model="scope.row[col.prop]" @change="changeCell(col, scope.row)" :value-format="timeFormat" :format="timeFormat" style="width: 99%;"/>
                <el-date-picker v-else-if="col.type === 'datetime'" v-model="scope.row[col.prop]" @change="changeCell(col, scope.row)" type="datetime" :value-format="dateFormat + ' ' + timeFormat" :format="dateFormat + ' ' + timeFormat" style="width: 99%;"/>
              </template>
              <template v-else>
                <el-select v-if="col.type === 'select'" v-model="scope.row[col.prop]" disabled placeholder="" style="width: 99%;">
                  <el-option v-for="(o, okey) in col.options" :disabled="o.disabled" :key="okey" :value="o.value" :label="o.label">{{o.label}}</el-option>
                </el-select>
                <el-checkbox v-else-if="col.type === 'checkbox'" v-model="scope.row[col.prop]" disabled :true-label="col.trueValue?col.trueValue:'Y'" :false-label="col.falseValue?col.falseValue:'N'"/>
                <el-switch v-else-if="col.type === 'switch'" v-model="scope.row[col.prop]" disabled :active-value="col.trueValue?col.trueValue:'Y'" :inactive-value="col.falseValue?col.falseValue:'N'"/>
                <span v-else v-html="scope.row[col.prop]"></span>
              </template>
              <div>
                <el-tag ref="refMessage" type="danger" class="message-div" v-if="formValidated && !validateCheck(col, scope.row)">{{col.rule.message}}</el-tag>
              </div>
            </template>
          </el-table-column>
        </template>
        <el-table-column v-if="!readonly && showOperation" width="90" :render-header="operationColRenderHeader" align="center">
          <template slot-scope="scope">
            <template v-if="checkRow(scope.row,scope.$index) === true">
              <icon-tip-button v-if="simpleMode === false && checkRowSave(scope.row,scope.$index)" @click="saveRow(scope.row,scope.$index)" :tip="$t('common.save')" icon="icon-save"/>
              <icon-tip-button v-if="checkRowDelete(scope.row,scope.$index)" @click="deleteRow(scope.row,scope.$index)" :tip="$t('common.delete')" icon="icon-delete"/>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>
<script>
import { http } from '@/portal/utils/http'
import { generateHeader } from '@/portal/utils/i18n'
import { getProfile } from '@/portal/utils/auth'
import { copyObject, getUUID } from '@/portal/utils/tools'
import TableEditFormatter from './components/TableEditFormatter'

export default {
  name: 'TableEditor',
  components: {
    TableEditFormatter
  },
  props: {
    /**
     * 简易模式
     */
    simpleMode: {
      type: Boolean,
      default: true
    },
    /**
     * 显示序号
     */
    showIndex:{
      type: Boolean,
      default: true
    },
    /**
     * 显示勾选
     */
    checkbox: {
      type: Boolean,
      default: false
    },
    /**
     * 只读
     */
    readonly: {
      type: Boolean,
      default: false
    },
    /**
     * 表头数据
     */
    tableHeader: {
      type: Array,
      default: []
    },
    /**
     * 表单数据
     */
    tableData:{
      type: Array,
      default: []
    },
    /**
     * 行修改类型
     */
    rowEditType: {
      type: String,
      default: 'ALL'
    },
    /**
     * 行是否可修改
     */
    rowCheck: {
      type: Function,
      default: function() {
        return true
      }
    },
    /**
     * 行是否可保存
     */
    rowSaveCheck: {
      type: Function,
      default: function() {
        return true
      }
    },
    /**
     * 行是否可删除
     */
    rowDeleteCheck: {
      type: Function,
      default: function() {
        return true
      }
    },
    /**
     * 自动查询
     */
    autoQuery: {
      type: Boolean,
      default: true
    },
    /**
     * 查询条件
     */
    queryData: {
      type: Object,
      default: function() {
        return {}
      }
    },
    /**
     * 查询url
     */
    queryUrl: {
      type: String,
      default: null
    },
    /**
     * 保存url
     *
     */
    saveUrl: {
      type: String,
      default: null
    },
    /**
     * 删除url
     */
    deleteUrl: {
      type: String,
      default: null
    },
    /**
     * 列自适应
     */
    fitTable: {
      type: Boolean,
      default: true
    },
    /**
     * 是否显示新增按钮
     */
    addButton: {
      type: Boolean,
      default: true
    },
    /**
     * 是否显示搜索栏
     */
    showSearch: {
      type: Boolean,
      default: true
    },
    /**
     * 是否显示操作列
     */
    showOperation: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      tableCacheData: [], //表格缓存数据
      loading: false,
      currentRow:null,
      selectionRows:[],
      dateFormat: getProfile().__dateFormat,
      timeFormat: getProfile().__timeFormat,
      searchText: null,
      formValidated: false
    }
  },
  methods: {
    generateHeader,
    currentChange(currentRow,oldCurrentRow){
      this.currentRow = currentRow
      this.$emit("current-change", currentRow, oldCurrentRow)
    },
    getCurrentRow() {
      return this.currentRow
    },
    setCurrentRow(param) {
      this.$refs.refTable.setCurrentRow()
      this.currentRow = null
      if(param == null || param === ""){
        return
      }
      let rowIndex
      if(!isNaN(param)){
        rowIndex = parseInt(param)
        if(rowIndex >= this.tableData.length){
          return
        }
      }else{
        for(let i=0; i<this.tableData.length; i++){
          if(this.tableData[i] === param){
            rowIndex = i
            break
          }
        }
      }
      this.$refs.refTable.setCurrentRow(this.tableData[rowIndex])
      this.currentRow = this.tableData[rowIndex]
      // 定位显示
      this.$refs.refTable.bodyWrapper.scrollTop = this.$refs.refTable.bodyWrapper.scrollHeight * rowIndex / this.tableData.length;
    },
    selectionChange(selection){
      this.selectionRows = selection
      this.$emit("selection-change", selection)
    },
    getSelectionRows() {
      return this.selectionRows
    },
    rowClick(row) {
      if(this.rowEditType === 'CLICK'){
        row.___editting = true
        for(const item of this.tableData){
          if(item !== row){
            item.___editting = false
          }
        }
      }else if(this.rowEditType === 'CLICK_ALL'){
        row.___editting = true
      }
      this.$emit("row-click", row)
    },
    rowDblclick(row) {
      if(this.rowEditType === 'DBLCLICK'){
        this.$set(row, '___editting', true)
        for(const item of this.tableData){
          if(item !== row){
          this.$set(item, '___editting', false)
          }
        }
      }else if(this.rowEditType === 'DBLCLICK_ALL'){
        this.$set(row, '___editting', true)
      }
      this.$emit("row-dblclick", row)
    },
    changeCell(col,row) {
      if(col.change){
        col.change(row, col.prop, row[col.prop])
      }
    },
    colRenderHeader(col) {
      return function(h, { column, $index }) {
        const label = this.$te(col.label) ? this.$t(col.label) : col.label
        if(col.rule && col.rule.required === true){
          return h('span',{},[h('span',{style:{'color':'red','margin-right':'2px'}},['*']), label])
        }else{
          return label
        }
      }
    },
    operationColRenderHeader(h, { column, $index }) {
      if(this.addButton){
        return h('icon-tip-button', {
          attrs: {
            tip: this.$t('common.add'),
            icon: 'icon-add'
          },
          on: {
            click: () => {
              this.addRow()
            }
          }
        })
      }else{
        return h('span',{},['-'])
      }
    },
    query() {
      if(this.simpleMode === false && this.queryUrl){
        this.loading = true
        http({
          url: this.queryUrl,
          method: 'post',
          data: this.queryData
        }).then(data => {
          this.tableData.splice(0)
          for(const item of data) {
            this.tableData.push(item)
          }
          this.refreshCacheData()
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }
    },
    addRow(item) {
      if(!item){
        item = {}
      }
      for (const col of this.tableHeader) {
        item[col.prop] = col.defaultValue !== undefined ? col.defaultValue : null
      }
      item.___newRow = true
      this.tableData.push(item)
      this.$nextTick(() => {
        this.$refs.refTable.bodyWrapper.scrollTop = this.$refs.refTable.bodyWrapper.scrollHeight;// 滚动到最后一行
      })
      this.$emit('add-row-callback', item)
    },
    saveRow(row) {
      if(this.simpleMode === false){
        if(this.saveUrl && row){
          this.loading = true
          http({
            url: this.saveUrl,
            method: 'post',
            data: row
          }).then(data => {
            this.loading = false
            if(data && typeof(data) === 'object'){
              data.___tmpId = getUUID()
              for(let i=0;i<this.tableData.length;i++){
                if(row === this.tableData[i]){
                  this.tableData[i] = data
                  break
                }
              }
              //移除旧缓存数据
              if(row.___tmpId){
                for(let i=0;i<this.tableCacheData.length;i++){
                  if(row.___tmpId === this.tableCacheData[i].___tmpId){
                    this.tableCacheData.splice(i,1)
                    break
                  }
                }
              }
              //添加缓存数据
              this.tableCacheData.push(copyObject(data))
            }else{
              this.query()
            }
            this.$emit('save-row-callback', data)
          }).catch(() => {
            this.loading = false
          })
        }
      }
    },
    deleteRow(row, index) {
      if(this.simpleMode === false && row.___newRow !== true){
        if(this.deleteUrl && row){
          this.loading = true
          http({
            url: this.deleteUrl,
            method: 'post',
            data: row
          }).then(() => {
            this.loading = false
            this.tableData.splice(index,1)
            this.$emit('delete-row-callback', row)
          }).catch(() => {
            this.loading = false
          })
        }
      }else{
        this.tableData.splice(index,1)
        this.$emit('delete-row-callback', row)
      }
    },
    setCellClass({ row, column, rowIndex, columnIndex }) {
      let cellClass = ''
      if(row.___tmpId){
        for(const item of this.tableCacheData){
          if(row.___tmpId === item.___tmpId && row[column.property] !== item[column.property]){
            cellClass = 'cell-changed'
            break
          }
        }
        if(!row.___editedCellSet){
          row.___editedCellSet = new Set()
        }
        if(cellClass === ''){
          row.___editedCellSet.delete(column.property)
        }else{
          row.___editedCellSet.add(column.property)
        }
        row.___editedRow = row.___editedCellSet.size > 0
      }
      return cellClass
    },
    setRowClass: function ({row, rowIndex}) {
      if (row.___hidden === true) {
        return 'hidden-row';
      }
      return '';
    },
    checkRow(row,index) {
      return this.rowCheck(row,index)
    },
    checkRowSave(row,index) {
      return this.rowSaveCheck(row,index)
    },
    checkRowDelete(row,index) {
      return this.rowDeleteCheck(row,index)
    },
    search() {
      for(const item of this.tableData){
        if(this.searchText){
          let find = false
          for(const col of this.tableHeader){
            if(col.ignoreSearch === true){
              continue
            }
            let value = undefined
            if(col.type === 'input' || col.type === 'textarea' || col.type === 'number' || col.type === 'date' || col.type === 'time' || col.type === 'datetime'){
              value = item[col.prop]
            }else if(col.type === 'select'){
              if(col.options){
                for(const op of col.options){
                  if(op.value === item[col.prop]){
                    value = op.label
                    break
                  }
                }
              }
            }
            if(value && value.toString().indexOf(this.searchText) > -1){
              find = true
              break
            }
          }
          this.$set(item, '___hidden', !find)
        }else{
          this.$set(item, '___hidden', false)
        }
      }
    },
    /**
     * 刷新页面数据缓存
     */
    refreshCacheData() {
      this.$nextTick(() => {
        for(const item of this.tableData){
          item.___tmpId = getUUID()
        }
        this.tableCacheData = copyObject(this.tableData)
      })
    },
    validateCheck(col, row) {
      if(col.rule && col.rule.required === true){
        if(typeof(col.rule.validator) === 'function'){
          return col.rule.validator(row)
        }
        if(!row[col.prop]){
          return false
        }
      }
      return true
    },
    validate(func) {
      this.formValidated = true
      this.$nextTick(() => {
        if(typeof(func)==='function'){
          func(this.$refs.refMessage.length === 0)
        }
      })
    },
    clearValidate() {
      this.formValidated = false
    }
  },
  created() {
    if(this.simpleMode === false){
      if(this.autoQuery){
        this.query()
      }
    }else{
      this.refreshCacheData()
    }
  }
}
</script>
<style lang="scss" scoped>
  /deep/ .cell-changed:before{
    content: "";
    top: -5px;
    left: -5px;
    position: absolute;
    border: 5px solid;
    border-color: transparent #f56c6c transparent transparent;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  /deep/ .hidden-row{
    display: none;
  }

  /deep/ .message-div{
    margin-top: 3px;
    height: 100%;
    white-space:normal;
    word-break: break-all;
    overflow: hidden;
  }
</style>

