import { Loading } from 'element-ui';
let loadingInstance ={
	open(){
		return Loading.service({
				  lock: true,
				  text: 'Loading',
				  spinner: 'el-icon-loading',
				  background: 'rgba(0, 0, 0, 0.7)'
		});
	},
	close(){
		loadingInstance.close();
	}

}
export default loadingInstance;