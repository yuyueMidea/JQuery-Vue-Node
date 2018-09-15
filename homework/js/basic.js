
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
		this.galleryList();
		this.galleryListContent();
		this.getDiscoverListData();
		this.goDiscoverContent();
		this.goLogin();
		this.goRegister();
		this.gofeedback();
		this.slidePicture();
		this.getUser();
		this.gocollection();
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
	//获取首页的轮播图
	slidePicture:function(){
		var slidePic = document.getElementById("slidePicture");
		var apiUrl='http://10.36.142.6:3000/api/picture';
		  
		mui.get(apiUrl,{},function(data){
	
			var firstPic = document.getElementById("firstPic");
			firstPic.innerHTML = "<a href='#'><img src='http://10.36.142.6:3000/"+data.list[3].img+"'></a>"
				
		   for(var i=0;i<4;i++){
		   		var div = document.createElement("div");
				div.className = "mui-slider-item";
				div.innerHTML = "<a href='#'><img src='http://10.36.142.6:3000/"+data.list[i].img+"'></a>"
				slidePic.appendChild(div);
		   }
		    
		    var lastPic = document.getElementById("lastPic");
			lastPic.innerHTML = "<a href='#'><img src='http://10.36.142.6:3000/"+data.list[3].img+"'></a>"
		   
		})
		
	},
	//获取首页的新闻数据
	galleryList:function(){
			
			var gallery=document.getElementById('gallery_list');
			
			var url="http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1";
			
			mui.get(url,{},function(data){
					//获得服务器响应
					
//					console.log(JSON.stringify(data.result));

					for(var i=0;i<data.result.length;i++){
						
						var li=document.createElement('li');
						li.setAttribute('aid',data.result[i].aid)
						li.className='mui-table-view-cell mui-media';
						li.innerHTML="<a href='javascript:;'><img class='mui-media-object mui-pull-left' src='http://www.phonegap100.com/data/attachment/"+data.result[i].pic +"'><div class='mui-media-body'>"+ data.result[i].title +"<p class='mui-ellipsis'></p></div></a>";
						gallery.appendChild(li);
						
					}

			},'json');
		//
		var flag = true;
		var windowHeight = $(window).height();
		$(window).scroll(function(){
			//滚动条下拉的高度			
			var scrollTop=$(this).scrollTop();
			//最后一个元素距离顶部的高度
			var lastHeight = $("#gallery_list li").last().offset().top;
			
			if(windowHeight + scrollTop > lastHeight+40){ /*加载更多*/
				if(flag){
					flag = false;
					var apiUrl='http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=2';
					$.get(apiUrl,function(data){
							
						var res=JSON.parse(data).result;
						var str='';						
						for(var i=0;i<res.length;i++){
							str+='<li class="addClass">'+res[i].title+'</li>';						
						}
						
						$("#gallery_list").append(str);
						
						if(res.length<20){
							flag=false;
							
						}else{
							flag=true;
						}		
					})
					
				}
				
				
			}
			  
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
	
	//首页新闻详情页
	galleryListContent:function(){
		//console.log(22)
		mui("#gallery_list").on("tap","li",function(){
			
			var aid = this.getAttribute('aid');
	
			 mui.openWindow({
			    url: 'pages/galleryContent.html', 
			    id:'gallerycontent',
			    extras:{
			    	aid:aid
			    }
			  });
		})
	},
	//find新闻详情页
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
	},
	gofeedback:function(){
		//跳转feedback
		mui(".mui-control-content").on("tap","#feedback",function(){
			
			mui.openWindow({
			    url: 'pages/feedback.html', 
			    id:'feedback'
		  	});
		})
	},
	gocollection:function(){
		//跳转collection
		mui(".mui-control-content").on("tap","#collections",function(){
			
			mui.openWindow({
			    url: 'pages/collect.html', 
			    id:'collect'
		  	});
		})
	},
	getUser:function(){
		
			var user =JSON.parse( localStorage.getItem('userinfo') )
			if(user){
				document.getElementById("uploadName").innerHTML = user[0].title ;
				/*document.getElementById("uploadName2").innerHTML = user[0].title ;
				document.getElementById("uploadName3").innerHTML = user[0].title ;
				document.getElementById("uploadName4").innerHTML = user[0].title ;*/
			}
			else{
				document.getElementById("uploadName").innerHTML = '请登录' ;
				/*document.getElementById("uploadName2").innerHTML = '请登录' ;
				document.getElementById("uploadName3").innerHTML = '请登录' ;
				document.getElementById("uploadName4").innerHTML = '请登录' ;*/
			}

			
	}
	
}






















