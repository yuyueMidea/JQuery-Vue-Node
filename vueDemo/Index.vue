<!-- 首页 -->
<template>
    <div class="index">
		
			<div>
				<div class="sys-header">
					<p class="logo">VueJS模板系统</p>
					<div class="userInfo">
					    <ul>
					        <li style="cursor: pointer;">
					            <el-dropdown @command="userOperation">
					                <span class="user">{{userName}}<i class="el-icon-caret-bottom el-icon--right"></i></span>
					                <el-dropdown-menu slot="dropdown">
					                    <el-dropdown-item command="editPaw">{{$t('login.editpassword')}}</el-dropdown-item>
					                    <el-dropdown-item command="logout">{{$t('login.logout')}}</el-dropdown-item>
					                </el-dropdown-menu>
					            </el-dropdown>
					        </li>
					        <li class="lang">
					            <span :class="{actived:active=='zh'}"  @click="changeLang('zh')">中</span>
					            <span>/</span>
					            <span :class="{actived:active=='en'}"  @click="changeLang('en')">EN</span>
					        </li>
					    </ul>
					</div>
					<el-dialog title="修改密码" :visible.sync="dialogShow" :modal-append-to-body="false" custom-class="editPawDialog">
					    <el-form :model="editPaw"  label-width="100px" >
					        <el-form-item label="旧密码">
					            <el-input v-model="editPaw.oldPaw" readonly></el-input>
					        </el-form-item>
					        <el-form-item label="新密码">
					            <el-input v-model="editPaw.newPaw"></el-input>
					        </el-form-item>
					        <el-form-item label="确认新密码">
					            <el-input v-model="editPaw.confirmNewPaw"></el-input>
					        </el-form-item>
					    </el-form>
					    <div class="textC">
					        <el-button type="primary" @click="editPawSubmit">保存</el-button>
					    </div>
					</el-dialog>
				</div>
				<div class="side-nav-left">
					<ul class="el-menu">
						<router-link v-for="(item,key) in getNavList" :key="key" :to="item.path" tag="li" :class="{isActived: toActived(item)}" class="el-menu-item">{{item.name}}</router-link>
					</ul>
				</div>
				<div class="sys-content-left">
					<div class="tag-nav">
						<p>
							<router-link v-for="(item,key) in tagNavList" :key="key" :to="item" :class="{isActived: toActived2(item)}">
								{{item}}<span class='el-icon-close' @click.prevent.stop="closeTheTag(item, key)"></span>
							</router-link>
						</p>
					</div>
					<div class="sys-page">
						<keep-alive>
						<router-view></router-view>
						</keep-alive>
					</div>
					
				</div>
			</div>
			
    </div>
</template>
<script>
import { mapState } from 'vuex'
	//
    export default {
        components:{

        },
        data(){
            return{
				defaultPage:'/info',
				active: sessionStorage.getItem('language'),
				dialogShow: false,
				editPaw: {
				    oldPaw: '',
				    newPaw: '',
				    confirmNewPaw: ''
				}
            }
        },
		computed:{
			...mapState({
			    getNavList: state => state.NavList,			// 获取该用户的菜单列表
			    userName: state => state.loginUser,
			    tagNavList: state => state.openedTagNavList
			})
		},
		methods:{
			toActived(item){
				 return (item.path ==this.$route.path)
			},
			toActived2(item){
				 return (item ==this.$route.path)
				 
			},
			userOperation(command){
			    switch(command){
			        case 'logout': 
			            this.logout()
			            break
			        case 'editPaw':
			            this.dialogShow = true;
						var getUser = JSON.parse(localStorage.getItem('loginUser'));
						this.editPaw.oldPaw = getUser.password;
			            break
			    }
			},
			logout() {
				//退出登录
			    localStorage.removeItem('loginUser');
				this.$store.commit("removeloginUser");
				this.$router.push('/login');
			},
			changeLang(val){
				if(sessionStorage.getItem('language') ==val){
					this.$message('当前多语言无需切换')
					return;
				}
				this.$confirm(`此操作将切换多语言${val}, 是否继续?`, '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
				  debugger
				  sessionStorage.setItem('language',val);
				  location.reload();
				  this.$message({
					type: 'success',
					message: '切换成功!'
				  });
				}).catch(() => {
				  this.$message({
					type: 'info',
					message: '已取消切换'
				  });          
				});
			},
			editPawSubmit(){
				debugger
				if((this.editPaw.newPaw && this.editPaw.confirmNewPaw) && (this.editPaw.newPaw == this.editPaw.confirmNewPaw)){
					console.log(this.editPaw);
					var getUser = JSON.parse(localStorage.getItem('loginUser'));
					var newUser = {
						name: getUser.name,
						password: this.editPaw.newPaw
					}
					localStorage.setItem('loginUser',JSON.stringify(newUser));
					this.$message({
					  message: '密码修改成功！',
					  type: 'success'
					});
					this.dialogShow = false;
				}
			},
			closeTheTag(item, key){
				debugger
				// 当关闭当前页面的Tag时，则自动加载前一个Tag所属的页面
				// 如果没有前一个Tag，则加载默认页面
				if(this.$store.state.openedTagNavList.indexOf(item) !==-1){
					this.$store.commit("removeTagNav", item);
				}
				if(key){
				    this.$router.push(this.tagNavList[key-1])
				} else {
				    this.$router.push(this.defaultPage)
				}
			}
		}
    };
</script>
<style scope>
.sys-header{
	width: 100%; height: 60px;
	background-color: #52bab5;
	z-index: 500;
}
.sys-header .logo{
	float: left; height: 60px;line-height: 60px; padding-left: 22px; color: white; font-size: 22px;
}
.sys-header .userInfo{
	height: 60px; float: right;
}
.sys-header .userInfo ul{
	list-style: none;
}
.sys-header .userInfo ul li{
	height: 60px; line-height: 60px; margin-right: 20px; 
	display: inline-block; color: white;
	/* cursor: pointer; */
}
.sys-header .userInfo ul .lang{
	color: #ccc; cursor: pointer; 
}
.sys-header .userInfo ul li .actived{
	color: #fff;
}
.el-dropdown{
	color: white; 
}
.side-nav-left{
	position: absolute; top:60px; left:0;bottom: 0; width: 200px;
	background-color: #f4f4f4; border-right: 1px solid #ccc;
	overflow: auto; overflow-x: hidden !important;
	box-sizing: border-box;
}
.side-nav-left .el-menu{
	background: #f4f4f4;
}
.side-nav-left .el-menu .el-menu-item{
	height: 56px;
	line-height: 56px;
	font-size: 14px;
	color: #303133;
	padding: 0 20px;
	list-style: none;
	cursor: pointer;
	position: relative;
	transition: border-color .3s, background-color .3s, color .3s;
	box-sizing: border-box;
	white-space: nowrap;
}
.side-nav-left .el-menu .isActived{
	color: #fff; background: #52bab5;
}
.sys-content-left{
	position: absolute; top:60px; left:200px;bottom: 0; right:0;
	padding-top: 53px; 
	
}

.sys-content-left .tag-nav{
	position: absolute; top:0; height: 53px; width: 100%;
	background: #fff; padding: 10px; border-bottom: 1px solid #ddd;
	box-shadow: 0 1px 2px #f2f2f2;box-sizing: border-box;
}
.sys-content-left .tag-nav p{
	line-height: 35px; width: 100%;
}
.sys-content-left .tag-nav a{
	display: inline-block;
	position: relative;
	height: 30px;
	line-height: 30px;
	padding: 0 10px;
	margin-right: 10px;
	border: 1px solid rgba(82, 186, 181, 0.2);
	border-radius: 4px;
	background-color: rgba(82, 186, 181, 0.1);color: #52bab5;
	text-decoration: none;
}
.sys-content-left .isActived{
		color: #fff !important; background: #52bab5 !important;
}
.sys-content-left .tag-nav a span{
	width: 16px;
	height: 16px;
	line-height: 16px;
	border-radius: 50%;
	text-align: center;
	vertical-align: middle;
	transition: all .3s ease;
	-webkit-transform-origin: 100% 50%;
	-ms-transform-origin: 100% 50%;
	transform-origin: 100% 50%;
	font-size: 12px;
	color: #52bab5;
}
.sys-content-left .tag-nav a span:hover{
	background-color: #52bab5; color: #fff;
}
.sys-page{
	width: 100%; height: 100%;
	overflow-x: hidden;overflow-y: auto;
}
	
</style>
