<template>
  <el-container class="flex-container" direction="vertical">
    <el-main>
      <el-scrollbar class="scroll-container" wrapClass="scrollY">
        <div class="form-container" v-loading="loading">
          <el-form
            :model="view"
            :rules="rules"
            :inline-message="true"
            ref="view"
            label-width="120px"
          >
            <el-row>
              <el-col :span="14">
                <el-form-item :label="$t('components.viewConfig.viewName')" prop="viewName">
                  <el-input v-model="view.viewName" maxlength="50"/>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <span style="width:100%;">
                  <el-checkbox
                    style="margin-left:68px"
                    v-model="view.defaultFlag"
                    true-label="Y"
                    false-label="N"
                  >{{$t('components.viewConfig.defaultFlag')}}</el-checkbox>
                  <el-checkbox
                    v-model="view.appShare"
                    true-label="Y"
                    false-label="N"
                  >{{$t('components.viewConfig.appShare')}}</el-checkbox>
                  <el-checkbox
                    v-model="view.showFilter"
                    true-label="Y"
                    false-label="N"
                  >{{$t('components.viewConfig.showFilter')}}</el-checkbox>
                </span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="14">
                <el-form-item :label="$t('components.viewConfig.pageSize')">
                  <el-select v-model="view.pageSize">
                    <el-option v-for="p in pageOptions" :key="p" :label="p" :value="p"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10"></el-col>
            </el-row>
            <el-row>
              <el-col :span="14">
                <el-form-item :label="$t('components.viewConfig.sortField')">
                  <el-select
                    v-model="view.sortField"
                    @change="sortChange"
                    :clearable="true"
                    :filterable="true"
                  >
                    <el-option
                      v-for="h in headers"
                      :key="h.prop"
                      :label="$t(h.label).replace(/<br >|<br>|<br \/>|<br\/>/g, '')"
                      :value="h.prop"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item :label="$t('components.viewConfig.sortDirection')">
                  <el-select v-model="view.sortDirection" :disabled="sortDirectionDisable">
                    <el-option
                      key="default"
                      :label="$t('components.viewConfig.noSort')"
                      :value="null"
                    ></el-option>
                    <el-option
                      v-for="o in options['sortDirection']"
                      :key="o.value"
                      :label="o.label"
                      :value="o.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <h3>{{$t('components.viewConfig.layout')}}</h3>
            <el-row type="flex" align="middle">
              <el-col :span="6">
                <transfer-panel
                  ref="layout"
                  :filterable="true"
                  :data="innerLayout"
                  style="width:100%"
                ></transfer-panel>
              </el-col>
              <el-col :span="2" align="middle">
                <el-button circle class="el-icon-arrow-right" @click="toLayout"></el-button>
              </el-col>
              <el-col :span="16">
                <table-edit class="debug"
                  :showIndex="false"
                  :multiCommit="true"
                  :auto-query="false"
                  :tableHeader="layoutHeaders"
                  :showFilterBar="true"
                  ref="layoutTable"
                  style="width:100%;height:265px"
                ></table-edit>
              </el-col>
            </el-row>

            <div style="clear:both"></div>
            <h3>{{$t('components.viewConfig.dataSetting')}}</h3>
            <el-row type="flex" align="middle">
              <el-col :span="6">
                <transfer-panel
                  ref="filter"
                  :filterable="true"
                  :data="innerFilter"
                  style="width:100%"
                ></transfer-panel>
              </el-col>
              <el-col :span="2" align="middle">
                <el-button circle class="el-icon-arrow-right" @click="toFilter"></el-button>
              </el-col>
              <el-col :span="16">
                <table-edit class="debug"
                  :showIndex="false"
                  :multiCommit="true"
                  :auto-query="false"
                  :tableHeader="filterHeaders"
                  ref="filterTable"
                  style="width:100%;height:265px"
                ></table-edit>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-scrollbar>
      <div class="dialog-footer">
        <el-button type="primary" @click="commit(false)">{{$t('common.save')}}</el-button>
        <el-button type="primary" @click="apply()">{{$t('common.apply')}}</el-button>
        <el-button type="primary" @click="commit(true)">{{$t('common.save_apply')}}</el-button>
        <el-button @click="close">{{$t('common.cancel')}}</el-button>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { getProfile } from "@/portal/utils/auth";
import { copyObject } from "@/portal/utils/tools";
import TransferPanel from "@/portal/components/TransferPanel";
import { TableEdit } from "@/portal/components/Table";
import pages from '../../Pager/pages'
export default {
  name: "viewSwitcher",
  components: { TransferPanel, TableEdit },
  data() {
    let _this = this;
    return {
      conditions: {
        "date": ["bt"],
        "datetime": ["bt"],
        "select": ["eq", "ne"],
        "multiselect": ["me"],
        "text": ["cn", "eq", "ne", "bw", "ew"],
        "number": ["eq", "ne", "gt", "ge", "lt", "le"],
      },
      view: {
        viewId: "",
        viewName: "",
        loginId: "",
        pageSize: "15",
        showFilter: "Y",
        sortField: null,
        sortDirection: null,
        appShare: "N",
        defaultFlag: "N",
        filters: [],
        layouts: []
      },
      sortDirectionDisable: true,
      selectOptions: {},
      innerFilter: [],
      innerLayout: [],
      sortFields: [],
      loading: false,
      rules: {
        viewName: [
          {
            required: true,
            message: this.$t("components.viewConfig.viewNameRequired"),
            trigger: "blur"
          }
        ]
      },
      pageOptions: pages.pages,
      filterHeaders: [
        {
          prop: "label",
          label: "components.viewConfig.columnName",
          editType: "",
          formattor(val) {
            return val;
          }
        },
        {
          prop: "filterCondition",
          label: "components.viewConfig.condition",
          editType: "add",
          type: "select",
          optionKey: "filterCondition",
          hide(row, option) {
            if (row.origin.origin.filter.conditions && row.origin.origin.filter.conditions.length > 0) {
                return !row.origin.origin.filter || !row.origin.origin.filter.type
                  ? true :
                  (row.origin.origin.filter.conditions.indexOf(option.value) === -1 ||
                  _this.conditions[row.origin.origin.filter.type].indexOf(option.value) === -1)
            }

              return !row.origin.origin.filter || !row.origin.origin.filter.type
                ? true :
                _this.conditions[row.origin.origin.filter.type].indexOf(option.value) === -1
              }
        },
        {
          prop: "filterValue",
          label: "components.viewConfig.value",
          editType: "add",
          getType(row) {
            if (!row.origin.origin.filter || !row.origin.origin.filter.options) {
              return row.origin.origin.filter.type
            }
            this.optionMap = {}
            this.options = {}
            this.options[this.prop] = row.origin.origin.filter.options

            for (let o of row.origin.origin.filter.options) {
              this.optionMap[o.value] = o.label
            }
            return row.origin.origin.filter.type
          }
        },
        {
          prop: "",
          label: "",
          showType: "href",
          editType: "",
          formattor() {
            return '<span style="color:Red">X</span>';
          },
          callback(row) {
            _this.view.filters.splice(_this.view.filters.indexOf(row), 1);

            row.origin.hide = false;
            row.origin.checked = false;
            _this.checkAllIsDisplay('filter')
          },
          width: 50
        }
      ],
      layoutHeaders: [
        {
          prop: "label",
          label: "components.viewConfig.columnName",
          editType: "",
          width: 200,
          formattor(val) {
            return val;
          }
        },
        {
          prop: "filterable",
          label: "components.viewConfig.filterable",
          editType: "add",
          type: "checkbox",
          checkAllIsDisPlay: true,
          isIndeterminate:false,
          checkAll: false
        },
        {
          prop: "seq",
          label: "components.viewConfig.seq",
          type: "number",
          editType: "add",
          min: 1,
          max: 10000,
          step: 1,
          precision: 0
        },
        {
          prop: "sortable",
          label: "components.viewConfig.sortable",
          type: "checkbox",
          editType: "add",
          width: 50,
          checkAllIsDisPlay: true,
          isIndeterminate:false,
          checkAll: false
        },
        {
          prop: "fixed",
          label: "components.viewConfig.fixed",
          type: "select",
          editType: "add",
          optionKey: "fixed",
          width: 100
        },
        {
          prop: "columnWidth",
          label: "components.viewConfig.columnWidth",
          type: "number",
          editType: "add",
          min: 1,
          max: 10000,
          step: 1,
          precision: 0
        },
        {
          prop: "",
          label: "",
          showType: "href",
          editType: "",
          formattor() {
            return '<span style="color:Red">X</span>';
          },
          callback(row) {
            _this.view.layouts.splice(_this.view.layouts.indexOf(row), 1);
            row.origin.hide = false;
            row.origin.checked = false;
            _this.checkAllIsDisplay('layout')
          },
          width: 50
        }
      ]
    };
  },
  methods: {
    sortChange(v) {
      if (null == v) {
        this.sortDirectionDisable = true
        this.view.sortDirection = null
      } else {
        this.sortDirectionDisable = false
        this.view.sortDirection = 'asc'
      }
    },
    newLine(array, header, seq) {
      let ret = copyObject(header);
      ret.seq = seq;
      header.hide = true;
      ret.origin = header;
      array.push = ret;
    },
    remove(array, location) {
      array[location].origin.hide = false;
      array.splice(location, 1);
    },
    checkAllIsDisplay(type) {
      this.$refs[type].checkAllIsDisPlay = false
      for (let o of this.$refs[type].innerData) {
        if (!o.hide) {
          this.$refs[type].checkAllIsDisPlay = true
          this.$refs[type].isIndeterminate = true
          break
        }
      }
    },
    toLayout() {
      let seq = this.view.layouts.length + 1;

      for (let o of this.$refs["layout"].innerData) {
        if (!o.checked || o.hide) {
          continue;
        }

        o.hide = true;
        let tmp = {};

        tmp["columnName"] = o.columnName;
        tmp["label"] = o.label;
        tmp["filterable"] = 'N';
        tmp["sortable"] = 'N';
        tmp["fixed"] = "none";
        tmp["columnWidth"] = 100;
        tmp["seq"] = seq;
        tmp["___editting"] = true; //让table显示编辑状态
        tmp["___add"] = true; //让table显示编辑状态
        tmp["origin"] = o;

        this.view.layouts.push(tmp);
        seq++;
      }

      this.checkAllIsDisplay('layout')
      this.$refs["layoutTable"].setData(this.view.layouts);
    },
    toFilter() {
      for (let o of this.$refs["filter"].innerData) {
        if (!o.checked || o.hide) {
          continue;
        }

        o.hide = true;
        let tmp = {};
        tmp["columnName"] = o.columnName;
        tmp["label"] = o.label;
        tmp["filterValue"] = "";
        tmp["___editting"] = true; //让table显示编辑状态
        tmp["___add"] = true; //让table显示编辑状态

        if (o.origin.filter) {
          if (o.origin.filter.defaultCon) {
            tmp['filterCondition'] = o.origin.filter.defaultCon // 可设置默认过滤比较符号，优先级最高
          } else if (o.origin.filter.conditions && o.origin.filter.conditions.length > 0) {
            tmp['filterCondition'] = o.origin.filter.conditions[0] // 自定义比较符列表，再没有设置默认比较符的情况下，默认取第一个
          } else { // 其他情况按字段类型设置默认比较符
            if (o.origin.filter.type === 'text') {
              tmp['filterCondition'] = 'cn'
            } else if (o.origin.filter.type === 'date' || o.origin.filter.type === 'datetime') {
              tmp['filterCondition'] = 'bt'
            } else if (o.origin.filter.type === 'select' || o.origin.filter.type === 'number') {
              tmp['filterCondition'] = 'eq'
            } else if (o.origin.filter.type === 'multiselect') {
              tmp['filterCondition'] = 'me'
            } else {
              tmp['filterCondition'] = 'eq'
            }
          }
        } else {
          tmp['filterCondition'] = 'eq'
        }

        tmp['origin'] = o;

        this.view.filters.push(tmp);
      }

      this.checkAllIsDisplay('filter')
      this.$refs["filterTable"].setData(this.view.filters);
    },
    apply() {
      this.refresh(this.view)
      this.close()
    },
    commit(apply) {
      let _this = this
      this.$refs.view.validate(valid => {
        if (valid) {
          this.loading = true
          this.view["pageId"] = this.pageId;
          this.view["gridId"] = this.gridId;

          if (this.view.viewId) {
            this.$http({
              url: "/isc-api/view/updateOne",
              method: "post",
              data: this.view,
              uniqueKeyMsg: _this.$t('components.viewConfig.uniqueName')
            }).then(data => {
              if (apply) {
                this.setSelectedViewId(this.view.viewId)
                this.refreshView(this.view.viewId)
              }else if(this.view.viewId == this.selected){
                this.refreshView(this.view.viewId)
              }

              this.$mideaMessage({
                type: "success",
                message: this.$t("common.success")
              })
              this.close()
            }).finally(() => {
              this.loading = false
            })
          } else {
            this.$http({
              url: "/isc-api/view/insertOne",
              method: "post",
              data: this.view,
              uniqueKeyMsg: _this.$t('components.viewConfig.uniqueName')
            }).then(data => {
              this.view['viewId'] = data

              if (!apply) {
                this.addView(this.view)
              } else {
                this.setSelectedViewId(data)
                this.refreshView(data)
              }
              this.$mideaMessage({
                type: "success",
                message: this.$t("common.success")
              })
              this.close()
            }).finally(() => {
              this.loading = false
            })
          }
        } else {
          return false
        }
      })
    }
  },
  created() {
    this.loading = true;
    for (let h of this.headers) {
      let tmp = copyObject(h);
      tmp["hide"] = false;
      tmp["label"] = tmp.label
      this.innerLayout.push(tmp);

      let tmp2 = copyObject(tmp)
      if (tmp2.filter)
        this.innerFilter.push(tmp2);

      let tmp3 = copyObject(tmp);
      this.sortFields.push(tmp3);
    }

    /* if (this.sortFields.length > 0)
       this.view.sortField = this.sortFields[0].prop;*/

    let conditions = []
    let conditionOptions = []
    for (let type in this.conditions) {
      for (let con of this.conditions[type]) {
        if (conditions.indexOf(con) == -1) {
          conditions.push(con)
          let obj = {}
          obj['value'] = con
          obj['label'] = this.$t('components.condition.' + con)

          conditionOptions.push(obj)
        }
      }
    }

    this.selectOptions["filterCondition"] = conditionOptions
    for (let f of this.filterHeaders) {
      if (f.prop == "filterCondition") {
        f["options"] = this.selectOptions
      }
    }
    this.$getLovValues("VIEW_FIXED", "iadmin")
      .then(data => {
        this.selectOptions["fixed"] = data.VIEW_FIXED
        for (let f of this.layoutHeaders) {
          if (f.prop == "fixed") {
            f["options"] = this.selectOptions;
          }
        }

        if (this.viewId) {
          //修改的情況
          let _this = this;
          this.$http({
            method: "post",
            url: "/isc-api/view/getOne",
            data: {
              gridId: _this.gridId,
              pageId: _this.pageId,
              viewId: this.viewId
            },
            loading: true
          }).then(data => {
            for (let i in data) {
              if (typeof data[i] == "object") {
                continue;
              }

              this.view[i] = data[i];
            }

            for (let f of data["filters"]) {
              for (let t of this.$refs["filter"].innerData) {
                if (t.columnName == f.columnName) {
                  f["___editting"] = true; //让table显示编辑状态
                  f["___add"] = true //让table显示编辑状态
                  f["origin"] = t
                  f["label"] = t.label
                  t.hide = true;
                  this.view.filters.push(f)
                  break
                }
              }
            }

            for (let f of data["layouts"]) {
              for (let t of this.$refs["layout"].innerData) {
                if (t.columnName == f.columnName) {
                  f["___editting"] = true //让table显示编辑状态
                  f["___add"] = true //让table显示编辑状态
                  f["origin"] = t
                  f["label"] = t.label
                  t.hide = true
                  this.view.layouts.push(f)
                  break
                }
              }
            }

            this.checkAllIsDisplay('layout')
            this.checkAllIsDisplay('filter')

            if (!data['sortField']) {
              this.view.sortField = null
            }
            this.sortDirectionDisable = null == data.sortDirection
            this.$refs["filterTable"].setData(this.view.filters)
            this.$refs["layoutTable"].setData(this.view.layouts)

            this.loading = false
          })
        }
      }).finally(() => {
        this.loading = false
      })
  },
  mounted() {
    this.$refs["layoutTable"].$forceUpdate();
    this.$refs["filterTable"].$forceUpdate();
  },
  props: {
    pageId: {
      type: String,
      default: () => ""
    },
    gridId: {
      type: String,
      default: () => ""
    },
    headers: {
      type: Array,
      default: () => []
    },
    grid: {
      type: Object,
      default: () => null
    },
    pageSize: {
      type: Number,
      default: () => null
    },
    options: {
      type: Object,
      default: () => { }
    },
    close: {
      type: Function,
      default: () => { }
    },
    viewId: {
      type: Number,
      default: () => null
    },
    selected: {
      type: Number,
      default: () => null
    },
    refresh: {
      type: Function,
      default: () => null
    },
    refreshView: {
      type: Function,
      default: () => null
    },
    addView: {
      type: Function,
      default: () => null
    },
    setSelectedViewId: {
      type: Function,
      default: () => null
    }
  }
};
</script>
<style scoped>
.avatar-wrapper {
  font-size: 14px;
  color: #606266;
  cursor: pointer;
}
.right {
  float: right;
}
.center {
  text-align: center;
}
hr {
  margin: 0;
}

label[role="checkbox"] {
  float: left;
}
</style>

<style scoped lang="scss">
label {
  font-weight: normal;
}
.el-row {
  flex-wrap: wrap;
}
.el-select,
.el-date-editor {
  width: 100%;
}
.el-footer {
  padding-top: 10px;
  text-align: right;
}
.el-dialog__header {
  height: 50px;
}
.el-checkbox__label {
  font-size: 12px !important;
}
.form-container /deep/ {
  .el-form-item__label {
    padding-right: 15px !important;
  }
}
.h200 {
  height: 150px;
}

.flex-container {
  height: 100%;
  .el-main {
    padding: 0;
  }
  .dialog-footer {
    padding-top: 5px;
    padding-right: 27px;
    text-align: right;
  }
}
</style>
<style>
.debug .el-select .el-input .el-select__caret.is-reverse {
    -webkit-transform: rotateZ(180deg);
    transform: rotateZ(180deg);
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
}
</style>
