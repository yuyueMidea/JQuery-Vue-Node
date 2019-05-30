import vm from '@/main'
import axios from 'axios'
// import { Message } from 'element-ui'
import appConfig from '@/portal/appConfig'
import store from '@/portal/store'
import { getToken } from '@/portal/utils/auth'

let loadInstance  // 页面加载效果

const hideLoading = function() {
  loadInstance && loadInstance.close()
  loadInstance = null
}

// create an axios instance
const instance = axios.create({
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  // api 的 base_url
  // `method` 是请求的方法
  method: 'post', // 默认值
  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function(data) {
    // Do whatever you want to transform the data
    var storeGetters = store.getters
    if (data) {
      data['app'] = appConfig.APP_NAME // 应用名称
      // if (storeGetters.token) data['isc-token'] = storeGetters.token // token值
      if (storeGetters.language && !data.hasOwnProperty('language')) data.language = storeGetters.language // 当前语言
    } else {
      data = {}
    }
    
    return JSON.stringify(data)
  }],
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=utf-8'
  },
  timeout: 50000000 // request timeout
})

// request interceptor
instance.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (!process.env.ENABLE_SSO && store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['isc-token'] = getToken()
    }
    config.headers['isc-app'] = appConfig.APP_NAME
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
instance.interceptors.response.use(
  // response => response.data,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    hideLoading()

    const res = response.data
    // debugger
    switch (res.resultCode) {
      case 'ISC-000':
        return res.data
        break;
      
      case 'ISC-999': // 程序报错，显示more信息       
      default:      
        vm.$mideaMessage({
          msgCode: res.resultCode,
          message: res.resultMsg
        })        
        return Promise.reject(res)
    }    
  },
  error => {
    hideLoading()
    console.log(error) // for debug
    vm.$mideaMessage({
      dangerouslyUseHTMLString: true,
      message: error.message,
      duration: 5 * 1000
    })     
    return Promise.reject(error)
  }
)

export const http = function (options = { loading:false }) {
  // 显示页面加载效果
  if (options.loading === true && ! loadInstance) {
    loadInstance = vm.$pageLoading.open()
  }

  if(process.env.ENV_CONFIG == 'dev'){
    let paths = options.url.split('/')
    let index = options.url.indexOf('/') == 0 ? 1 : 0
    let app = paths[index]
    if(process.env.WHITE_LIST && process.env.WHITE_LIST.length > 0 && process.env.WHITE_LIST.indexOf(app) == -1){
      paths[index] += '-' + process.env.FLAG
      let base = process.env.BASE_API
      if(base.indexOf('web') > -1){
        base = base.substr(0, base.indexOf('web'))
      }
      options['baseURL'] = base
    }else{
      let base = process.env.BASE_API
      if(app.indexOf('isc-') == 0 && base.indexOf('web') > -1){
        base = base.substr(0, base.indexOf('web'))
      }
      options['baseURL'] = base
    }

    options.url = paths.join('/')
    
  }


  try {
    options.loading && (delete options.loading)
  } catch(err) {}
  
  return instance(options)
}

export default http
