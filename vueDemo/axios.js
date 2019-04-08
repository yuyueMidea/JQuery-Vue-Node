import axios from 'axios'

//
import { Loading } from 'element-ui';
let loadingInstance =null;
// this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
//   loadingInstance.close();
// });
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
	if(config.showLoading){
		loadingInstance = Loading.service({
				  lock: true,
				  text: 'Loading',
				  spinner: 'el-icon-loading',
				  background: 'rgba(0, 0, 0, 0.7)'
	    });
	}
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
	if(response.config.showLoading){
		 loadingInstance.close();
	}

    return response;
  }, function (error) {
	  if(error.config.showLoading){
	  	 loadingInstance.close();
	  }
    // Do something with response error
    return Promise.reject(error);
  });
  
export default axios;