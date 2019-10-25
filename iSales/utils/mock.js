// import Mock from 'mockjs'
// import qs from 'qs'

// // 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// // https://github.com/nuysoft/Mock/issues/300
// Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
// Mock.XHR.prototype.send = function() {
//   if (this.custom.xhr) {
//     this.custom.xhr.withCredentials = this.withCredentials || false
//   }
//   this.proxy_send(...arguments)
// }

// // Mock.setup({
// //   timeout: '350-600'
// // })

// /* 装配配置组 */
// const wired = ({ url, type, body }) => ({
//   method: type,
//   params: qs.parse(url.split('?').length > 1 ? url.split('?')[1] : ''),
//   body: JSON.parse(body),
//   url: qs.parse(url.split('?')[0])
// })

// const setup = (path, method, handle) => {
//   Mock.mock(
//     RegExp(path),
//     method,
//     typeof handle === 'function' ? o => handle(wired(o)) : handle
//   )
// }

// const load = (collection) => {
//   collection.map(({ path, method, handle }) => {
//     if (method === '*') {
//       method = [
//         'get',
//         'head',
//         'post',
//         'put',
//         'delete',
//         'connect',
//         'options',
//         'trace',
//         'patch'
//       ]
//     }
//     if (typeof method === 'string' && method.indexOf('|') > -1) method = method.split('|')
//     if (method instanceof Array) {
//       method.map(item => setup(path, item, handle))
//     } else {
//       setup(path, method, handle)
//     }
//   })
// }

// export default { setup, load }
