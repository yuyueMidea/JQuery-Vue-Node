<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 17:18:50
 * @LastEditTime: 2019-08-17 17:22:34
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <div class="index">
		
			<div>
				<div class="sys-header">
					<p class="logo">VueJS模板系统</p>
					
				</div>
				<div class="side-nav-left">
          			<ul class="el-menu">
						<nuxt-link v-for="(item,key) in getNavList" :key="key" :to="item.path" tag="li" class="el-menu-item" :class="isActive(item.path)?'active-menu':''"  :title="item.name" ><div @click="setMenu(item)">{{item.name}}</div></nuxt-link>
					</ul>
				</div>
				<div class="sys-content-left">
					<div class="tag-nav">
						<p>
							<nuxt-link v-for="(item,key) in tagNavList" :key="key" :to="item" :class="isActive(item)?'active-tagNav':''">
								{{item}}<span class='el-icon-close' @click.prevent.stop="closeTheTag(item, key)"></span>
							</nuxt-link>
						</p>
					</div>
					<div class="sys-page">
						<keep-alive>
							<!-- <router-view></router-view> -->
              <nuxt />
						</keep-alive>
            
					</div>
					
				</div>
			</div>
			
    </div>
  
    
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
	computed:{
		...mapState({
			// getNavList: state => state.NavList,			// 获取该用户的菜单列表
			tagNavList: state => state.openedTagNavList
		})
	},
	mounted(){
		this.getNavList.map(v=>{
			this.$store.commit("setAllNavList", {path:v.path, name:v.name});
		})
	},
  data(){
    return{
      getNavList:[
        {name:'user', path:'/user'},
        {name:'userList', path:'/user/list'},
        {name:'home', path:'/home'},
        {name:'test', path:'/test'},
        {name:'todos', path:'/todos'},
      ]
    }
  },
  methods:{
	setMenu(to) {
		// debugger
		if(this.$store.state.openedTagNavList.indexOf(to.path) ==-1){
			this.$store.commit("addNavList", to.path);
		}
	},
	isActive(tag){
			return this.$route.path ==tag;
	},
	closeTheTag(item, key){
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
  },
  created(){
    
  },
  
}
</script>
<style scoped>
ul,ol{
	list-style: none;
}
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
	background: #f4f4f4; padding: 0;
}
.side-nav-left .el-menu .el-menu-item{
	height: 56px;
	line-height: 56px;
	font-size: 14px;
	padding:0;
	color: #303133;
	list-style: none;
	cursor: pointer;
	position: relative;
	transition: border-color .3s, background-color .3s, color .3s;
	box-sizing: border-box;
	white-space: nowrap;
}
.side-nav-left .el-menu .el-menu-item >div{
	padding: 0 20px;width:100%;
}
.side-nav-left .el-menu .el-menu-item:hover{
	cursor: pointer;color: #303133;
	background: #52bab561; border-left: 6px solid #3c8dbc;
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
	/* padding: 10px 10px 0 10px; */
}
.sys-page>div{
	padding: 10px;
}
.side-nav-left .el-menu .active-menu{
	color: #303133;
	background: #52bab561;border-left: 6px solid #3c8dbc;
}

.sys-content-left .tag-nav .active-tagNav{
	background-color: #52bab5; color: #fff;
}
.side-nav-left .tag-nav .active-tagNav>span{
	background: #ceebea;
	color: red;
}
</style>
