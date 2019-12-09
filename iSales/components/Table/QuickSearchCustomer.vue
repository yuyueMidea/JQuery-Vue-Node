<template>
  <div class="the_quick_search">
    <el-row style="padding: 0;">
      <el-col :span="24" style="position: relative;padding: 0;">
        <el-select
          ref="quickSelectSelect"
          class="the_quick_select"
          :disabled="disabled"
          v-model="inputName"
	  maxlength="4"
          clearable
          filterable
          reserve-keyword
          remote
          :allow-create="allowInput"
          :popper-class="selectClass"
          :placeholder = "placeholder"
          :remote-method="remoteMethod"
          :loading="loading"
          :no-data-text="$t('common.noData')"
          :loading-text="$t('common.loading')"
          @change="getSelectData"
          @clear="clearOptions"
          @focus="focus"
          @blur="addStar"
        >
          <el-option
            class="option-item"
            value=""
            disabled
            v-if="selectGridData.length>0"
          >
            <el-row type="flex">
              <el-col class="border-right" :span="12" :title="labelObj[0]">{{ labelObj[0] }}</el-col>
              <el-col :span="12" :title="labelObj[1]">{{ labelObj[1] }}</el-col>
            </el-row>
          </el-option>
          <el-option
            class="option-item"
            v-for="(item, key) in selectGridData"
            :key="key"
            :label="item[resetObj[0]]"
            :value="item"
          >
            <el-row type="flex">
              <el-col class="border-right" :span="12" :title="item[resetObj[0]]">{{ item[resetObj[0]] }}</el-col>
              <el-col :span="12" :title="item[resetObj[1]]">{{ item[resetObj[1]] }}</el-col>
            </el-row>
          </el-option>
        </el-select>
        <el-button
          :disabled="disabled"
          icon="el-icon-search"
          @click="openDialog('click', $event)"
          class="quick-search-btn"
        ></el-button>
      </el-col>
    </el-row>

    <el-dialog
      width="850px"
      v-dialogDrag
      class="the_quick_search_dialog"
      :title="$t('components.quickSearch.title')"
      :visible.sync="dialogTableVisible"
      :close-on-click-modal="false"
      append-to-body
    >
      <el-row style="margin-bottom: 5px;">
        <el-col :span="12">
          <span>{{$t('common.searchResult')}}</span>
        </el-col>
        <el-col class="text-right" :span="12">
          <el-button type="primary" @click="query('enter')">{{$t('common.search')}}</el-button>
          <el-button type="primary" @click="reset()">{{$t('common.reset')}}</el-button>
          <el-button type="primary" @click="closeDialog">{{$t('common.ok')}}</el-button>
        </el-col>
      </el-row>
      <div class="table_wrapper">
        <el-table
          :data="gridData"
          border
          stripe
          style="width: 100%"
          :height="370"
          highlight-current-row
          header-cell-class-name="midea-table-cell"
          :empty-text="$t('common.noData')"
          @row-dblclick="getLineData"
          @current-change="handleCurrentChange"
          @selection-change="checkChange"
        >
          <el-table-column v-if="multiSelect" width="30" type="selection"/>
          <el-table-column type="index" width="40" align="center"/>
          <template v-for="(col, key) in tableHeader">
            <el-table-column
              v-if="!col.hidden"
              :key="key"
              :prop="col.name"
              :label="col.label"
              :min-width="col.width"
              align="left"
              :show-overflow-tooltip="true"
            >
              <template slot="header" slot-scope="scope">
                <div style="display: block">{{col.label}}</div>
                <div style="display: block;padding-bottom: 5px;">
                  <el-input
		    maxlength="4"
                    clearable
                    v-model="form[col.name]"
                    v-if="col.name.toLowerCase() in trnasformSqlObj"
                    placeholder
                    @keyup.native.enter="query('enter')"
                  />
                </div>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
      <el-footer class="page-bar">
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
import { http } from "@/portal/utils/http";
import PagerBar from "@/portal/components/Pager";
import { getProfile } from "@/portal/utils/auth";
import { isNull, isObject, isArray, trim } from "@/portal/utils";

export default {
  name: "QuickSearch",
  components: { PagerBar },
  inject: {
    elForm: {
      default: ""
    },

    elFormItem: {
      default: ""
    }
  },
  data() {
    return {
      loading: false,
      tableHeader: [], // 表头数据
      filterQueryArr: [], //查询条件过滤
      isSizeChanged: false,
      dataCount: 0,
      queryTotal: -1, // 共几条 -1就是问号
      viewIndex: 1,
      viewSize: 10,
      queryParam: {
        __page: 1,
        __pagesize: 10
      },
      labelObj: [],
      resetObj: [],
      currentRow: "",
      form: {},
      queryForm: {},
      formLabelWidth: "120px",
      dialogTableVisible: false,
      gridData: [],
      //select下拉data区域
      inputName: "",
      idColumn: '',   // 文本框取值字段,来自数据库配置项
      selectClass: '',  // 下拉样式
      selectVisible: false,
      showSelect: false,
      selectGridData: [],
      multipleSelection: [], //多选表格的行数据
      trnasformSqlObj: {}, //用来转换前端查询字段转换----
      initState: false, // 组件初始化未打开的状态
      isConditionChanged: false,   // 查询条件改变状态
    };
  },

  methods: {
    checkChange(val) {
      this.multipleSelection = val;
      // this.dispatchChange();
    },
    dispatchChange() {
      if (!!this.elFormItem) {
        this.elFormItem.$emit("el.form.change");
      }
    },
    addStar(val,scope){
      if (this.allowInput ) {
        let inputName = this.inputName||"";
      
        if(inputName.length<4)
        {
          var starCount= 4-this.inputName.length;
          var stars="";
          for(var i=0;i<starCount;i++){
                  stars+="*"

          }
          inputName = inputName+stars;
          this.inputName = inputName;
          this.scopeData['subOrgCode4'] =  inputName;
        }
      }

    },
    async remoteMethod(queryStr) {
      if (this.allowInput ) {
      var input=this.$el.firstElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild
input.maxLength=4;
console.dir(input)
        //允许录入的情况下直接赋值-不要再做请求数据
        this.selectClass = 'qs-select-none';
        this.getSelectData(queryStr);
        return;
      }

      this.loading = true;  // 加载状态

      this.selectClass = this.popperClass;

      if (queryStr) {
        this.showSelect = true;

        await this.getConfigration();
        await this.query('', queryStr);

        // 自动选择
        if (this.selectGridData.length == 1 ) {
          this.getSelectData(this.selectGridData[0]);
          this.$refs.quickSelectSelect.blur();
        }
      } else {
        this.selectGridData = [];
      }
      this.loading = false;  // 加载状态
    },
    getSelectData(row = {}) {
      //获取选中的值并且赋值
      this.setValue(row);
      this.$forceUpdate();
      this.$emit("close-quicksearch", row, this.scopeData);
      // this.dispatchChange();
      this.$nextTick().then(() => {
        this.isConditionChanged = false
      });
    },
    getLineData(row = {}) {
      //双击选中行数据
      this.setValue(row);
      this.$emit("close-quicksearch", row, this.scopeData);
      // this.dispatchChange();
      this.$nextTick().then(() => {
        this.isConditionChanged = false
      });
      this.dialogTableVisible = false;
      this.selectVisible = false;
    },
    clearOptions() {
      //清空下拉选的值--------
      this.selectGridData = [];
      // this.dispatchChange();
    },
    closeSelect(isClose) {
    },
    async openDialog(type) {
      //添加前置事件---
      this.$emit("before-open", true);
      // 非自动查询下，如果绑定的查询条件有变化，清空列表数据
      if (! this.autoQuery) {
        if ( this.forceRefresh || this.isConditionChanged ){
          this.reset();
        }
      }
      this.showSelect = false;
      this.selectVisible = false;
      await this.getConfigration();
      if (this.autoQuery || type=='autoQuery') { // 自动查询
        this.formData && Object.assign(this.form, this.formData)
        await this.query();
        // 非点击事件，如果只有一条数据，则自动设值
        if (type=='autoQuery' && this.gridData.length == 1) {
          this.getLineData(this.gridData[0]);
          return;
        }
      }
      this.dialogTableVisible = true;
    },
    closeDialog() {
      if (this.multiSelect) {
        this.$emit("close-quicksearch", this.multipleSelection, this.scopeData);
      } else {
        if (!this.currentRow) {
          this.$mideaMessage({
            type: "error",
            message: this.$t("common.selectRequired")
          });
          return;
        }
        this.setValue(this.currentRow);
        this.$emit("close-quicksearch", this.currentRow, this.scopeData);
      }
      this.dialogTableVisible = false;
      // this.dispatchChange();
    },
    handleCurrentChange(val) {
   
      this.currentRow = val;
    },
    pageQuery(opr, size) {
      // 查询数据的方法
      let allCount = Math.ceil(this.queryTotal / this.viewSize); //总页数---作为判断依据
      if (opr == "prev" && this.queryParam.__page == 1) return;
      if (opr == "next" && this.queryParam.__page == allCount) return;

      switch (opr) {
        case "prev":
          this.queryParam.__page -= 1;
          break;
        case "next":
          this.queryParam.__page += 1;
          break;
        default:
          this.viewSize = size;
          this.viewIndex = 1;
          this.queryParam.__pagesize = size;
          this.queryParam.__page = 1;
      }
      this.isSizeChanged = true;

      this.query(opr);
    },
    pageCount() {
      // 查询共几条的方法
    },
    setCache(key, data) {
      sessionStorage.setItem(
        getProfile().__language + "_QS_" + key,
        JSON.stringify(data)
      );
    },
    getCache(key) {
      var data = sessionStorage.getItem(getProfile().__language + "_QS_" + key);
      return data ? JSON.parse(data) : null;
    },
    getConfigration() {
      if (this.getCache(this.name)) {
        let data = this.getCache(this.name);
        this.tableHeader = data.colModel.slice(0);
        this.filterQueryArr = Object.values(data.queryData.defCols);
        this.trnasformSqlObj = {};
        for (let i in data.queryData.defCols) {
          if (i != "_id_column") {
            let lowerCase = i
              .replace(/t./g, "")
              .replace(/_/g, "")
              .toLowerCase();
            this.trnasformSqlObj[lowerCase] = i;
          }
        }

        this.tableHeader.forEach(v => {
          this.$set(this.form, v.name, '');
          this.resetObj.push(v.name);
          this.labelObj.push(v.label);
        });

        this.idColumn = this.showKey || data.idColumn;
        return Promise.resolve();
      }

      return http({
        //获取配置项---展示在页面上的字段
        url: "/isales-main/mstQuicksearchConfig/getConfig",
        method: "post",
        loading: true,
        data: { name: this.name }
      })
        .then(data => {
          this.tableHeader = data.colModel.slice(0);
          this.filterQueryArr = Object.values(data.queryData.defCols);
          this.trnasformSqlObj = {};
          for (let i in data.queryData.defCols) {
            if (i != "_id_column") {
              let lowerCase = i
                .replace(/t./g, "")
                .replace(/_/g, "")
                .toLowerCase();
              this.trnasformSqlObj[lowerCase] = i;
            }
          }
          this.tableHeader.forEach(v => {
            this.$set(this.form, v.name, '');
            this.resetObj.push(v.name);
            this.labelObj.push(v.label);
          });
          this.idColumn = this.showKey || data.gridData.idColumn;

          //设置缓存数据----去除缓存数据
          this.setCache(this.name, {
            colModel: data.colModel,
            queryData: data.queryData,
            idColumn: data.gridData.idColumn
          });
          // this.query();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 搜索表单参数
    setQueryParams(otherParams) {
      // debugger
      for (let i in this.form) {
        if (!(i.includes("_") || i.includes(".")) && this.form[i]) {
          let upperCase = this.trnasformSqlObj[i.toLowerCase()];
          if (upperCase) this.queryForm[upperCase] = this.form[i];
        }
      }
      otherParams && Object.assign(this.queryForm, otherParams)
    },
    query(opr, queryStr) {
      this.initState = true;
      this.isConditionChanged = false;
      this.queryForm = {};
      if (opr == "enter") {
        //来自于enter事件，先清空form绑定的值，再重新赋值
        this.setQueryParams()
        this.queryParam.__page = 1;  // 重置为1
        this.viewIndex = 1;
      } else {
        //下拉查询条件过滤条件----//展开下拉选择
        if (this.showSelect && this.filterQueryArr && this.filterQueryArr[0]) {
          this.queryForm[this.filterQueryArr[0].name] = queryStr;
          this.queryParam.__page = 1;  // 重置为1
        } else {
          this.setQueryParams()
        }
      }
      if (this.preQueryData) {
        //添加前置查询条件
        this.queryForm = Object.assign({}, this.preQueryData, this.queryForm);
      }
      let formData = JSON.stringify({
        query: JSON.stringify(this.queryForm),
        extendQuery: JSON.stringify(this.setExtendQueryData())
      });
      //
      let selectURL = "/isales-main/mstQuicksearchConfig/queryByFormCondition";

      //是否是下拉查询
      if (this.showSelect) {
        selectURL = "/isales-main/mstQuicksearchConfig/quickSearchQuery";
        formData = JSON.stringify({
          key: this.name,
          value: queryStr,
          isSetValue: JSON.stringify(this.isSetValue),
          extendQuery: JSON.stringify(this.setExtendQueryData())
        });
      }
      let paramData = Object.assign({}, { params: formData }, this.queryParam);

      return http({
        //获取数据---展示在table页面上的数据
        url: selectURL,
        method: "post",
        loading: this.showSelect ? false:true,
        data: paramData
      })
        .then(data => {
          if (this.showSelect) {
            this.selectGridData = data.slice(0);
            if (data.length === 0) {
              this.inputName = "";
              this.setValue();
              this.$emit("close-quicksearch", null, this.scopeData);
            }
            return;
          } else {
            this.gridData = data.data.slice(0);
          }
          //设置显示总条数
          this.queryTotal = data.pagecount;
          this.dataCount = this.gridData.length;
          if (opr) {
            //改变相应的页码展示数
            switch (opr) {
              case "":
                this.viewIndex = 1;
                break;
              case "prev":
                this.viewIndex -= 1;
                break;
              case "next":
                this.viewIndex += 1;
                break;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 重置
    reset() {
      this.form = {};
      this.gridData = [];
      this.selectGridData = [];
      this.labelObj = [];
      this.resetObj = [];
      this.viewIndex = 1;
      this.dataCount = 0;
      this.queryTotal = -1;
    },
    // 空值默认显示值
    setNullValue(value, defaultValue = "") {
      return isNull(value) ? defaultValue : value;
    },
    // 获取行上对应属性的值
    getPropValue(row, key) {
      return isObject(row) ? (row[key] || null) : row
    },
    // 设置属性值
    setValue(row = {}) {
      row = row ? row:{};

      try {
        if (this.scopeData) {
          [this.displayKey, this.valueKey].forEach((item, index) => {
            if (isArray(item)) {
              let [key, mapKey] = item;

              if (key && mapKey) {
                this.scopeData[mapKey] = this.setNullValue(this.getPropValue(row, key));
              } else if (key) {
                this.scopeData[key] = this.setNullValue(this.getPropValue(row, key));
              }
            } else if (item) {
              this.scopeData[item] = this.setNullValue(this.getPropValue(row, item));
            }
          });

          // map 值
          if (isArray(this.mapValue)) {
            for (let item of this.mapValue) {
              let [key, mapKey] = trim(item).split(",");
              if (key && mapKey) {
                this.scopeData[mapKey] = this.setNullValue(this.getPropValue(row, key));
              } else if (key) {
                this.scopeData[key] = this.setNullValue(this.getPropValue(row, key));
              }
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
      // debugger
      // 设置选择后的显示值
      this.inputName = isObject(row) ? (row[this.idColumn] || null) : row
    },
    // 设置 ExtendQuery
    setExtendQueryData() {
      let params = {
        _quickKey: this.name,
        entityId: 10,
        createdBy: getProfile().__userName
      };
      //如果传入companySort--就加上作为查询条件
      if(this.companySort){
        params.companySort = this.companySort;
      }
      let data = {};
      for (let i in this.extendQueryData) {
        data[i] = this.setNullValue(this.extendQueryData[i], '').toString();
      }
      return Object.assign({}, data, params);
    },
    // 焦点事件
    focus() {
      // this.isConditionChanged && this.clearOptions()
      this.clearOptions()
    }
  },

  props: {
    name: {
      // 父页面传值--->配置项
      type: String,
      default: function() {
        return "";
      }
    },
    companySort: {
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
    showKey: {
      //想要展示的字段属性key
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
    allowInput: {
      //允许用户手动录入数据
      type: Boolean,
      default: function() {
        return false;
      }
    },
    isSetValue: {
      //下拉查询是否全匹配-------默认false
      type: Boolean,
      default: function() {
        return false;
      }
    },
    //
    // 展示的字段属性key, 如 {name, code} 中的 name 属性
    displayKey: {
      type: [String, Array],
      default: function() {
        return null;
      }
    },
    // 存储值的字段属性key, 如 {name, code} 中的 code 属性
    valueKey: {
      type: [String, Array],
      default: function() {
        return null;
      }
    },
    // 取值映射
    mapValue: {
      type: Array,
      default: function() {
        return null;
      }
    },
    // 当前行上绑定的 data 对象
    scopeData: {
      type: Object,
      default: function() {
        return null;
      }
    },
    //是否支持多选
    multiSelect: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    preQueryData: {
      // 前置查询条件
      type: Object,
      default: function() {
        return null;
      }
    },
    extendQueryData: {
      // 扩展查询条件
      type: Object,
      default: function() {
        return null;
      }
    },
    formData: {
      type: Object,
      default: null
    },
    // 打开弹层是否自动查询
    autoQuery: {
      type: Boolean,
      default: false
    },
    // 打开弹层强制刷新数据
    forceRefresh: {
      type: Boolean,
      default: false
    },
    // 提示
    placeholder: {
      type: String,
      default: ''
    },
    // Select 下拉框的类名
    popperClass: {
      type: String,
      default: ''
    }
  },
  watch: {
    name: function(n, o) {  // 同个组件实例，不同name的情况（页面通过v-if控制 ）
      if (n != o) {
        this.reset()
      }
    },
    showInput: {
      immediate: true,
      handler: function(val) {
        // debugger
        this.inputName = isObject(val) ? val[this.showKey || this.idColumn] : val
      }
    },
    preQueryData:function(n, o) {
      this.isConditionChanged = true;
      // this.clearOptions();
    },
    extendQueryData:function(n, o) {
      this.isConditionChanged = true;
      // this.clearOptions();
    }
  },
  created() {
  }
};
</script>

<style scoped lang="scss">
.the_quick_search /deep/ {
  position: relative;
  .el-input-group__append {
    padding-right: 8px;
  }
  .the_quick_select {
    display: block;
    padding: 0;
  }
  .the_quick_select .el-input__suffix {
    right: 25px;
  }
  .the_quick_select .el-input__suffix .el-input__icon {
    width: 16px;
  }
  .el-button {
    border: none;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .el-dialog__body {
    padding-top: 10px;
    height: 460px;
  }
  .quick-search-btn {
    position: absolute;
    top: 2px;
    right: 3px;
    padding: 5px;
  }
}
.the_quick_search_dialog /deep/{
  .el-table th div {
    line-height: 16px;
    padding-bottom: 0 !important;
  }
  // 隐藏图标，为何会显示该图标？
  .el-input__validateIcon {
    display: none;
  }
  .el-button{
    padding: 5px 7px;
    vertical-align: middle;
  }
  .el-table .el-table__body tr>td {
    height: 30px;
    line-height: 30px;
  }
}

.option-item {
  border-bottom: 1px solid #ddd;
  padding: 0;
  font-weight: bold;
  .el-col {
    padding: 0 5px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .border-right{
    border-right: 1px solid #ddd;
  }
  &.el-select-dropdown__item.is-disabled {  /*受portal样式的影响，重新定义 */
    display: inherit;
    visibility: inherit;
  }
}
.page-bar {
  height: auto!important;
}
</style>
