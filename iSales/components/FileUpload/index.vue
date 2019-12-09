<template>
  <el-row v-loading="loadingStatus!==null" :element-loading-text="loadingText">
    <el-row>
      <el-upload
        v-if="checkOperations('upload')"
        drag
        :multiple="multiple"
        :disabled="disabled"
        :name="uploadName"
        :accept="accept"
        ref="upload"
        :limit="limit"
        :action="uploadUrl"
        :data="uploadData"
        :headers="headerData"
        :beforeUpload="beforeAvatarUpload"
        :on-exceed="onExceed"
        :onError="uploadErrorDefault"
        :onSuccess="uploadSuccessDefault"
        :onProgress="uploadProgress"
        :auto-upload="true"
        :show-file-list="false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          {{ $t('components.fileupload.dragfile') }}
          <em>{{ $t('components.fileupload.clickupload') }}</em>
        </div>
        <div class="el-upload__tip" slot="tip" v-if="tip.visible">{{tip.msg}}</div>
      </el-upload>
    </el-row>
    <el-row>
      <div
        style="width:100%;height:25px;line-height:25px;font-size:12px;background:#f8f8f8"
      >{{$t('components.fileupload.filelist')}}</div>
      <el-table
        :data="fileList"
        style="width: 100%;"
        :height="tableHeight"
        highlight-current-row
      >
        <el-table-column
          align="center"
          prop="displayName"
          :label="$t('components.fileupload.name')"
        ></el-table-column>
        <el-table-column align="center" prop="fileType" :label="$t('components.fileupload.type')"></el-table-column>
        <el-table-column
          align="center"
          prop="fileSize"
          :label="$t('components.fileupload.size') + '(KB)'"
        >
          <template slot-scope="scope">{{scope.row.fileSize | fileSizeFmt}}</template>
        </el-table-column>
        <el-table-column align="center" prop="createdUserName" :label="$t('components.fileupload.uploadUserName')"></el-table-column>
        <el-table-column align="center" prop="creationDate" :label="$t('components.fileupload.uploadDate')"></el-table-column>
        <el-table-column
          align="center"
          :label="$t('common.preview')"
          v-if="checkOperations('preview')"
        >
          <template slot-scope="scope">
            <el-button
              v-if="checkPreviewType(scope.row.fileType)"
              size="mini"
              type="text"
              @click="previewFile(scope.row)"
            >{{$t('common.preview')}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('common.download')"
          v-if="checkOperations('download')"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="downloadFile(scope.$index, scope.row)"
            >{{$t('common.download')}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('common.delete')"
          v-if="checkOperations('delete')"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="deleteFile(scope.$index, scope.row)"
            >{{$t('common.delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </el-row>
</template>
<script>
import { http } from "@/portal/utils/http"
import appConfig from '@/portal/appConfig'
import { getToken } from '@/portal/utils/auth'
import axios from 'axios'

export default {
  name: 'FileUpload',
  data() {
    return {
      uploadUrl: process.env.BASE_API + '/isc-attachment/uploadFile',
      uploadName: 'file',
      fileList: [],
      headerData: {},
      loadingStatus: null,
      previewFileTypes: ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'jpg', 'bmp', 'gif', 'png', 'jpeg', 'tif', 'psd', 'wmf', 'cdr', 'dwg', 'ai']
    }
  },
  computed: {
    loadingText() {
      if (this.loadingStatus === 'preview') {
        return this.$t('components.fileupload.previewLoading')
      } else if (this.loadingStatus === 'upload') {
        return this.$t('components.fileupload.uploadLoading')
      } else {
        return ''
      }
    }
  },
  props: {
    operations: {  // upload/download/delete
      type: Array,
      default: function () {
        return ['upload', 'download', 'delete', 'preview']
      }
    },
    accept: {
      type: String,
      default: function () {
        return ""
      }
    },
    multiple: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    tip: {
      type: Object,
      default: function () {
        return {
          visible: false,
          msg: ''
        }
      }
    },
    limit: { // 限制文件数量
      type: Number,
      default: function () {
        return 1
      }
    },
    tableHeight: {
      type: Number,
      default: function () {
        return 250
      }
    },
    uploadData: {
      type: Object,
      default: function () {
        return {
          referenceTable: '',
          referenceId: ''
        }
      }
    },
    beforeUpload: {
      type: Function,
      default: (file) => {
        // 可做类型校验
        // if (file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
        //   this.$message.error('只支持jpg、png、gif格式的图片！')
        //   return false
        // }
      }
    },
    onExceed: {
      type: Function,
      default: function (file, fileList) {
        this.$mideaMessage({
          type: 'info',
          message: this.$t('components.fileupload.fileslimit') + ":" + this.limit
        })
      }
    },
    uploadSuccess: {
      type: Function,
      default: function (response, file, fileList) {
      }
    },
    uploadError: {
      type: Function,
      default: function (response, file, fileList) {
        this.$parent.$mideaMessage({
          type: 'error',
          message: this.$t('components.fileupload.uploadFailed')
        })
      }
    }
  },
  methods: {
    // 当设置了取消自动上传的时候，调用此方法开始上传
    // submitUpload () {
    //   this.$refs.upload.submit()
    // },
    checkOperations(op) {
      return this.operations.indexOf(op) > -1;
    },
    downloadFile(index, row) {
      let url = process.env.BASE_API + '/isc-attachment/downloadFile'
      return axios({
        method: 'get',
        url: url,
        params: { attachmentId: row.attachmentId },
        headers: this.headerData, //设置header信息
        responseType: 'blob'
      }).then(res => {
        const a = document.createElement('a')
        a.download = row.displayName + '.' + row.fileType
        a.href = window.URL.createObjectURL(new Blob([res.data]))
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      });
    },
    // 文件预览
    previewFile(row) {
      this.loadingStatus = 'preview'
      return axios({
        method: 'get',
        url: process.env.BASE_API + '/isc-attachment/docx2pdfx',
        params: { attachmentId: row.attachmentId },
        headers: this.headerData, //设置header信息
        responseType: 'blob'
      }).then(res => {
        let newWindow = window.open('/')
        newWindow.onload = () => {
          newWindow.location = window.URL.createObjectURL(res.data)
        }
        this.loadingStatus = null
      }).catch(() => {
        this.loadingStatus = null
      })
    },
    deleteFile(index, row) {
      let _this = this
      this.$mideaMessage({
        type: 'info',
        message: this.$t('common.delRow'),
        callback: (action) => {
          if (action == 'confirm') {
            http({
              url: '/isc-attachment/deleteFile',
              method: 'post',
              data: { attachmentId: row.attachmentId },
              loading: true
            }).then(data => {
              _this.refreshData()
            }).catch(err => {
            })
          }
        }
      }, 'messagebox')
    },
    uploadSuccessDefault(response, file, fileList) {
      this.loadingStatus = null
      switch (response.resultCode) {
        case 'ISC-000':
          this.refreshData()
          break;
        case 'ISC-999': // 程序报错，显示more信息
        default:
          this.$mideaMessage({
            msgCode: response.resultCode,
            message: response.resultMsg
          })
      }
      this.uploadSuccess(response, file, fileList);
    },
    refreshData() {
      let _this = this;
      if (this.$refs.upload) {
        this.$refs.upload.clearFiles()      }
      http({
        url: '/isc-attachment/listFile',
        method: 'post',
        data: this.uploadData,
        loading: true
      }).then(data => {
        // for (var i = 0; i < data.length; i++) {
        //   data[i]['name'] = data[i].displayName + "." + data[i].fileType
        // }
        // _this.fileList = data
        _this.fileList = data
      }).catch(err => {
        console.log(err)
      })
    },
    uploadProgress() {
      this.loadingStatus = 'upload'
    },
    uploadErrorDefault() {
      this.loadingStatus = null
      this.uploadError()
    },
    checkPreviewType(val) {
      for (const type of this.previewFileTypes) {
        if (val === type) {
          return true
        }
      }
      return false
    },
    beforeAvatarUpload(file) {
      const fileSize = parseFloat(file.size) / 1024 / 1024
      if (fileSize <= 0) {
        this.$message({
          message: this.$t('components.fileupload.minSizeUploadError'),
          type: 'warning'
        })
        return false
      }
      if (fileSize > appConfig.uploadMaxFileSize) {
        this.$message({
          message: this.$t('components.fileupload.maxSizeUploadError') + appConfig.uploadMaxFileSize + 'MB',
          type: 'warning'
        })
        return false
      }
      return this.beforeUpload()
    },
    getFileList() {
      return this.fileList
    }
  },
  created() {
    this.headerData = {}
    if (!process.env.ENABLE_SSO) {
      this.headerData["isc-token"] = getToken()
    }
    this.headerData["isc-app"] = appConfig.APP_NAME
    this.refreshData()
  },
  filters: {
    fileSizeFmt: function (value) {
      return Math.floor(parseFloat(value) / 1024 * 100) / 100
    }
  }
}
</script>
