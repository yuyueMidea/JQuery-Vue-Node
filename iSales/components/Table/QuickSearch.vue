<template>
  <div class="the_quick_search">
    <el-row style="padding: 0;">
      <el-col :span="24" style="position: relative;padding: 0;">
        <el-select
          ref="quickSelectSelect"
          class="the_quick_select"
          :disabled="disabled"
          v-model="inputName"
          clearable
          filterable
          remote
          reserve-keyword
          placeholder
          :remote-method="remoteMethod"
          @change="getSelectData"
          @clear="clearOptions"
        >
          <el-option
            class="option-item"
            value=""
            disabled
            v-if="selectGridData.length>0"
          >
            <el-row>
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
            <el-row>
              <el-col class="border-right" :span="12" :title="item[resetObj[0]]">{{ item[resetObj[0]] }}</el-col>
              <el-col :span="12" :title="item[resetObj[1]]">{{ item[resetObj[1]] }}</el-col>
            </el-row>
          </el-option>
        </el-select>
        <el-button
          :disabled="disabled"
          icon="el-icon-search"
          @click="openDialog"
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
          :height="multiSelect ? 425:360"
          highlight-current-row
          :empty-text="$t('common.noData')"
          @row-dblclick="getLineData"
          @current-change="handleCurrentChange"
          @selection-change="checkChange"
        >
          <el-table-column v-if="multiSelect" width="30" type="selection"/>
          <el-table-column type="index" width="40" align="left"/>
          <template v-for="(col, key) in tableHeader">
            <el-table-column
              v-if="!col.hidden"
              :key="key"
              :prop="col.name"
              :label="col.label"
              :width="col.width"
              align="left"
              :show-overflow-tooltip="true"
            >
              <template slot="header" slot-scope="scope">
                <div style="display: block">{{col.label}}</div>
                <div style="padding-bottom: 5px;">
                  <el-input
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
import { isNull, trim } from "@/portal/utils";
import "@/portal/utils/directives.js";

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
    async remoteMethod(queryStr) {
      if (queryStr) {
        this.showSelect = true;

        await this.getConfigration();
        await this.query('', queryStr);

        // 自动选择
        if (this.selectGridData.length == 1 ) {
          this.getSelectData(this.selectGridData[0]);
          this.$refs.quickSelectSelect.blur();
        }
        if (this.allowInput && (this.selectGridData.length == 0)) {
          this.getSelectData(queryStr);
          this.$refs.quickSelectSelect.blur();
        }
      } else {
        this.selectGridData = [];
      }
    },
    getSelectData(row = {}) {
      //获取选中的值并且赋值
      this.inputName = (this.showKey && row) ? row[this.showKey] : this.inputName;
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
      this.inputName = (this.showKey && row) ? row[this.showKey] : this.inputName;
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
    async openDialog() {

      //添加前置事件---
      this.$emit("before-open", true);
      // 非自动查询下，如果绑定的查询条件有变化，清空列表数据
      if (! this.autoQuery) {
        if ( this.isConditionChanged ){
          this.reset();
        }
      }
      this.showSelect = false;
      this.selectVisible = false;
      await this.getConfigration();
      if (this.autoQuery) { // 自动查询
        this.query();
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
        this.inputName =
          this.showKey && this.currentRow
            ? this.currentRow[this.showKey]
            : this.inputName;
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
        this.resetObj = data.colModel.map(v => v.name);
        this.labelObj = data.colModel.map(v => v.label);
        // this.query();
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
          this.resetObj = data.colModel.map(v => v.name);
          this.labelObj = data.colModel.map(v => v.label);
          //设置缓存数据----去除缓存数据
          this.setCache(this.name, {
            colModel: data.colModel,
            queryData: data.queryData
          });
          // this.query();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 搜索表单参数
    setQueryParams(otherParams) {
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
        loading: true,
        data: paramData
      })
        .then(data => {
          if (this.showSelect) {
            this.selectGridData = data.slice(0);
            if (data.length === 0) {
              this.inputName = "";
              this.setValue();
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
      this.viewIndex = 1;
      this.dataCount = 0;
      this.queryTotal = -1;
    },
    // 空值默认显示值
    setNullValue(value, defaultValue = "") {
      return isNull(value) ? defaultValue : value;
    },
    // 设置属性值
    setValue(row = {}) {
      row = row ? row:{};

      try {
        if (this.scopeData) {
          [this.displayKey, this.valueKey].forEach((item, index) => {
            if (Object.prototype.toString.call(item) == "[object Array]") {
              let [key, mapKey] = item;

              if (key && mapKey) {
                this.scopeData[mapKey] = this.setNullValue(row[key]);
              } else if (key) {
                this.scopeData[key] = this.setNullValue(row[key]);
              }
            } else if (item) {
              this.scopeData[item] = this.setNullValue(row[item]);
            }
          });

          // map 值
          if (Object.prototype.toString.call(this.mapValue) == "[object Array]") {
            for (let item of this.mapValue) {
              let [key, mapKey] = trim(item).split(",");
              if (key && mapKey) {
                this.scopeData[mapKey] = this.setNullValue(row[key]);
              } else if (key) {
                this.scopeData[key] = this.setNullValue(row[key]);
              }
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    // 设置 ExtendQuery
    setExtendQueryData:function()
		{
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
    // 打开弹层是否自动查询
    autoQuery: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    showInput: {
      immediate: true,
      handler: function(e) {
        //区分未打开quicksearch页面---打开quicksearch页面input框的展示
        if (!this.initState) {
          //未打开quicksearch页面
          this.inputName = e;
        } else {
          this.inputName = this.showKey ? this.inputName : e;
        }
      }
    },
    preQueryData:function(n, o) {
      this.isConditionChanged = true;
      this.clearOptions();
    },
    extendQueryData:function(n, o) {
      this.isConditionChanged = true;
      this.clearOptions();
    }
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
</style>
