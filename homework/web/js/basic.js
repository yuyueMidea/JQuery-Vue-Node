
/*mui.init()    mui插件初始化

mui.ready()    当DOM准备就绪时，指定一个函数来执行。


mui.plusReady(function(){
     console.log("当前页面URL："+plus.webview.currentWebview().getURL());
});*/

/*dom加载完成*/

mui.ready(function(){
	
	app.init();
	
})

//封装到app对象里面
var app = {
	
	init:function(){
		this.goContent();
		this.getDiscoverListData();
		this.goDiscoverContent();
		this.goLogin();
		this.goRegister();
	},
	  
	goContent:function(){
		//跳转到详情页面		
		
		mui(".mui-control-content").on("tap","#goContent",function(){
//			alert('button');
			
			mui.openWindow({
		    url: 'pages/discoverContent.html', 
		    id:'discovercontent',
		    
		    extras:{
		    	
		    	aid:'1234',		    	
		    	username:'张三'
		    }
		  });

		})
		
	},
	
	//获取发现页面的新闻数据
	getDiscoverListData:function(){
			
			var discoverList=document.getElementById('discover_list');
			
			var url="http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1";
			
			mui.get(url,{},function(data){
					//获得服务器响应
					
//					console.log(JSON.stringify(data.result));

					for(var i=0;i<data.result.length;i++){
						
						var li=document.createElement('li');
						
						li.setAttribute('aid',data.result[i].aid)
						li.className='mui-table-view-cell mui-media';
						
						li.innerHTML="<a href='javascript:;'><img class='mui-media-object mui-pull-left' src='http://www.phonegap100.com/data/attachment/"+data.result[i].pic +"'><div class='mui-media-body'>"+ data.result[i].title +"<p class='mui-ellipsis'></p></div></a>";
		    		       
						discoverList.appendChild(li);
						
					}


			},'json');
		
	},
	
	//
	goDiscoverContent:function(){
		//console.log(22)
		mui("#discover_list").on("tap","li",function(){
			
			var aid = this.getAttribute('aid');
	
			 mui.openWindow({
			    url: 'pages/discoverContent.html', 
			    id:'discovercontent',
			    extras:{
			    	aid:aid
			    }
			  });

			
		})
		
		
	},
	
	goLogin:function(){
		//跳转到登录	
		mui(".mui-control-content").on("tap","#goLogin",function(){
			mui.openWindow({
			    url: 'pages/doLogin.html', 
			    id:'login'
		  	});
		})
	},
	goRegister:function(){
		//跳转到注册
		mui(".mui-control-content").on("tap","#goRegister",function(){
			mui.openWindow({
			    url: 'pages/doRegister.html', 
			    id:'register'
		  	});
		})
	}
	
}






















