<template>
  <span class="view-switch-layout">
    <el-dropdown trigger="click" v-loading="loading" @command="change">
      <span class="el-dropdown-link mr20">
        {{selectName}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" style="max-height:300px;overflow-y:scroll">
        <el-dropdown-item class="center">
          <a href="javascript:void(0)">{{ $t('components.viewSwitcher.add') }}</a>
        </el-dropdown-item>
        <el-dropdown-item command="base">
          <i :class="{'el-icon-check' : baseView.selected}" />
          <span class="red1">{{baseView.viewName}}</span>
        </el-dropdown-item>

        <template v-if="selfViews.length > 0">
          <b style="padding-left:15px">{{$t('components.viewSwitcher.my')}}</b>
          <el-dropdown-item v-for="v in selfViews" :key="v.viewId" :command="v.viewId" divided>
            <i :class="{'el-icon-check' : v.selected}" />
            <span class="red1">{{v.viewName}}</span>
            <a
              href="javascript:void(0)"
              class="right red1"
              @click.stop="del(v.viewId)"
            >{{ $t('common.delete') }}</a>
            &nbsp;
            <a
              href="javascript:void(0)"
              class="right red1"
              @click.stop="setting(v.viewId)"
              style="margin-right:5px"
            >{{ $t('components.viewSwitcher.setting') }}</a>
          </el-dropdown-item>
        </template>
        <template v-if="shareViews.length > 0">
          <b style="padding-left:15px">{{$t('components.viewSwitcher.share')}}</b>
          <el-dropdown-item v-for="v in shareViews" :key="v.viewId" :command="v.viewId" divided>
            <i :class="{'el-icon-check' : v.selected}" />
            <span class="red1">{{v.viewName}}</span>
          </el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog
      :visible.sync="showDialog"
      v-if="showDialog"
      :title="$t('common.layout_title')"
      width="86%"
      :append-to-body="true"
      :close-on-click-modal="false"
      custom-class="view-switch-dialog"
    >
      <edit
        :options="selectOptions"
        :close="close"
        :headers="headers"
        :gridId="gridId"
        :pageId="this.page.$options.name"
        :viewId="viewId"
        :selected="selectedViewId"
        :refresh="tableRefresh"
        :refreshView="refreshViews"
        :append-to-body="true"
        :addView="addView"
        :setSelectedViewId="setSelectedViewId"
      />
    </el-dialog>
  </span>
</template>

<script>
import { getProfile } from "@/portal/utils/auth";
import edit from "./edit";
export default {
  name: "viewSwitcher",
  components: { edit },
  data() {
    let _this = this;
    return {
      loading: true,
      shareViews: [],
      selfViews: [],
      baseView: {
        viewName: _this.$t("components.viewSwitcher.base"),
        selected: true
      },
      selectName: "Loading",
      showDialog: false,
      selectOptions: {},
      headerMap: {},
      selectedViewId: -1,
      viewId: null,
      init: true
    };
  },
  methods: {
    setSelectedViewId(viewId) {
      this.selectedViewId = viewId
    },
    del(viewId) {
      let _this = this
      return this.$mideaMessage({
        type: 'warning',
        message: this.$t('common.delete') + "?",
        callback(action) {
          if ('confirm' == action) {
            _this.$http({
              url: '/isc-api/view/deleteOne',
              method: 'post',
              data: { viewId },
              loading: true
            }).then(() => {
              if (viewId != _this.selectedViewId && _this.selectedViewId != null) {
                for (let v in _this.selfViews) {
                  if (viewId == _this.selfViews[v].viewId) {
                    _this.selfViews.splice(v, 1)
                    return
                  }
                }
              } else {
                _this.selectedViewId = null
                _this.loading = true
                _this.refreshViews()
              }
            })
          }
        }
      }, 'messagebox')
    },
    close() {
      this.showDialog = false;
    },
    add() {
      this.showDialog = true;
    },
    setting(viewId) {
      this.viewId = viewId;
      this.add();
    },
    change(type) {
      if (undefined == type) {
        this.viewId = null;
        //添加的情况
        return this.add();
      }

      this.tableRefresh("base" != type ? type : null);
    },
    addView(view) {
      let tmp = {}
      tmp['viewId'] = view.viewId
      tmp['viewName'] = view.viewName
      this.selfViews.push(tmp)
    },
    refreshViews(type) {
      //刷新视图列表并设置当前选中的视图，然后在刷新表格
      let _this = this;
      this.loading = true;

      this.$http({
        method: "post",
        url: "/isc-api/view/list",
        data: { pageId: _this.page.$options.name, gridId: _this.gridId }
      }).then(data => {
        this.views = data
        let name = getProfile().__userName
        this.selfViews = []
        this.shareViews = []

        for (let v of data) {
          v["selected"] = false;
          if (name == v.loginId) {
            this.selfViews.push(v);
          } else {
            this.shareViews.push(v);
          }

          if (undefined == type) {
            //初始化或者删除视图
            if (v.defaultFlag == "Y" && v.loginId == name) {
              v["selected"] = true
              this.selectedViewId = v.viewId
              this.baseView.selected = false;
              this.selectName = v.viewName;
              this.tableRefresh(v.viewId);
            }
          } else if (v.viewId == this.selectedViewId) {
            v["selected"] = true
            this.selectName = v.viewName;
            if (type == this.selectedViewId) {
              //选中的视图是当前保存的就刷新表格
              this.tableRefresh(v.viewId);
            }
          }
        }

        if (this.baseView.selected) {
          this.tableRefresh();
          this.selectName = this.baseView.viewName;
          this.selectedViewId = null
        }

        this.loading = false;
      }).catch(() => {
        this.loading = false;
      })
    },
    tableRefresh(viewId) {
      //刷新表格
      let tableComponent = this.page.$refs[this.gridId];
      if (tableComponent.$options._componentTag != "table-view") {
        return console.error('Grid must be a instance of "TableView"!');
      }

      let _this = this
      this.baseView.selected = false
      if (typeof (viewId) == 'object') {
        this.refreshFromData(viewId)
        this.selectedViewId = viewId ? viewId.viewId : null
      } else if (null != viewId) {
        this.$http({
          method: "post",
          url: "/isc-api/view/getOne",
          data: { gridId: _this.gridId, pageId: _this.page.$options.name, viewId }
        }).then(data => {
          this.refreshFromData(data)
        })
      }

      this.selectedViewId = null
      for (let v of this.shareViews) {
        let tmp = viewId == v.viewId
        v.selected = tmp
        if (tmp) {
          this.selectName = v.viewName
          this.selectedViewId = v.viewId
        }
      }

      if (null == this.selectedViewId) {
        for (let v of this.selfViews) {
          let tmp = viewId == v.viewId
          v.selected = tmp
          if (tmp) {
            this.selectName = v.viewName
            this.selectedViewId = v.viewId
          }
        }
      }
      if (!viewId) {
        //不知道viewId的时候
        this.page[this.headerName] = this.headers
        this.page.$refs[this.gridId].viewSize = this.page.$refs[this.gridId].pageSize
        this.page.$refs[this.gridId].__sortField = null
        this.page.$refs[this.gridId].__sortType = null
        this.baseView.selected = true
        if (this.selectedViewId == null)
          this.selectName = this.baseView.viewName

        if (this.init && !this.page.$refs[this.gridId].autoQuery) {
          //初始化且不自动加载数据的时候
          this.init = false
          return
        }

        this.page.$refs[this.gridId].clearQueryData()
        this.page.$refs[this.gridId].query()

        return
      }
    },
    refreshFromData(data) {
      let headers = []
      if (data) {
        //使用基础视图
        if (data.layouts && data.layouts.length > 0) {
          for (let h of data.layouts) {
            let header = {}
            for (let a in this.headerMap[h.columnName]) {
              header[a] = this.headerMap[h.columnName][a]
            }

            if (h.filterable == "N") {
              delete header.filter;
            }

            header["sortable"] = h.sortable == "Y";
            if (h.fixed == "none") {
              delete header.fixed;
            } else {
              header["fixed"] = h.fixed;
            }

            if (h.columnWidth) {
              header["width"] = h.columnWidth;
            }

            headers.push(header);
          }
        }

        this.page[this.headerName] = headers;
        if (data.filters && data.filters.length > 0) {
          let filters = []
          this.page.$refs[this.gridId].__filters = filters
          for (let f of data.filters) {
            let filter = {}
            filter['columnName'] = f.columnName
            filter['filterCondition'] = f.filterCondition
            filter['filterValue'] = f.filterValue
            filters.push(filter)
          }
        } else {
          this.page.$refs[this.gridId].__filters = []
        }
        this.page.$refs[this.gridId].viewSize = data.pageSize
        this.page.$refs[this.gridId].__sortField = data.sortField
        this.page.$refs[this.gridId].__sortType = data.sortDirection
        this.page.$refs[this.gridId].showFilter = (data.showFilter === 'Y')
      } else {
        //使用基础视图
        this.page[this.headerName] = this.headers;
        this.page.$refs[this.gridId].viewSize = 15
        this.page.$refs[this.gridId].__sortField = null
        this.page.$refs[this.gridId].__sortType = null
        this.page.$refs[this.gridId].__filters = []
        this.page.$refs[this.gridId].showFilter = this.showFilter
      }
      this.page.$refs[this.gridId].clearQueryData()
      if (!this.page.$refs[this.gridId].autoQuery) {
        return
      }
      this.page.$refs[this.gridId].query()
    },
    makeHeaders(headers) {
      // let defaultHeaders = JSON.parse(JSON.stringify(headers ? headers : this.headers));
      let headerMap = {};
      // for (let h in defaultHeaders) {
      //   let prop = defaultHeaders[h].prop
      //   headerMap[prop] = defaultHeaders[h];
      //   for (let o in this.headers[h]) {
      //     if (!headerMap[prop][o] && this.headers[h][o]) {
      //       headerMap[prop][o] = this.headers[h][o]
      //     }
      //   }
      // }

      // 初始表格配置列信息的转换
      for (let h in this.headers) {
        let prop = this.headers[h].prop
        headerMap[prop] = {...this.headers[h]};
      }

      this.headerMap = headerMap;
    }
  },
  created() {
    this.$getLovValues("BASE_ORDER_BY", "iadmin").then(data => {
      this.selectOptions["sortDirection"] = data.BASE_ORDER_BY
      this.refreshViews()
      this.makeHeaders()
    }).catch(() => {
      this.refreshViews();
      this.makeHeaders()
    })
  },
  props: {
    gridId: {
      type: String,
      default: () => ""
    },
    headers: {
      //默认的headers
      type: Array,
      default: () => []
    },
    page: {
      type: Object,
      default: () => null
    },
    showFilter: {
      type: Boolean,
      default: () => true
    },
    headerName: {
      //table实际生效headers的名字
      type: String,
      default: () => null
    }
  },
  watch: {
    headers: {
      handler(newHeader) {
        this.makeHeaders(newHeader)
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style lang="scss" scoped>
.avatar-wrapper {
  font-size: 14px;
  color: #606266;
  cursor: pointer;
}
.right {
  float: right;
}
.red1:hover {
  color: Red;
  text-decoration: underline;
}
.center {
  text-align: center;
}
hr {
  margin: 0;
}
.el-popper {
  min-width: 180px;
}
.el-dialog__wrapper /deep/ {
  .view-switch-dialog {
    top: 30px;
    margin-top: 0 !important;
    .el-dialog__body {
      height: calc(100vh - 110px);
    }
  }
}
</style>

