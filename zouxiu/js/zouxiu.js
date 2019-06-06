
$(function(){
		//先获取轮播图的数据
		$.get("json/lunbotu.json",function(data){
			var arr = data;
			for(var i=0;i<arr.length;i++){
				var obj = arr[i];
				$("<li><a href='javascript:;'><img src="+ obj.img +"></a></li>").appendTo("#list");
				var li = $("<li></li>").appendTo("#list2");
				if(i==0){
					li.addClass("active");
				}
			}
			//轮播
			lunbo();
		})
		//
		function lunbo(){
			var list1 = $("#list");
			var li1 = $("#list li");
			var list2 = $("#list2");
			var li2 = $("#list2 li");
			//
			li1.first().clone(true).appendTo(list1);
			var size = $("#list li").size();
			list1.width(1200*size);
			//开启定时器
			var i = 0;
			var timer = setInterval(function(){
				i++;
				move();
			}, 2000);
			function move(){
				if(i < 0){
					list1.css("left",-1200*(size-1));
					i = size-2;
				}
				if(i >= size){
					list1.css("left",0);
					i = 1;
				}
				list1.stop().animate({left:-1200*i},500);
				li2.eq(i).addClass("active").siblings().removeClass("active");
				if(i == size-1){
					li2.eq(0).addClass("active").siblings().removeClass("active");
				}
			}
			//
			$("#list").hover(function(){
				clearInterval(timer);
			}, 
			function(){
				timer = setInterval(function(){
					i++;
					move();
				}, 2000);
			})
			//
			li2.mouseenter(function(){
				i = $(this).index();
				move();
			})
			//
		}
				
		//
		$(window).scroll(function(){
			var scrollTop = $(window).scrollTop();
			if( scrollTop>=250 ){
				$("#scr").fadeIn()
			}
			else{
				$("#scr").fadeOut()
			}
			//
			$("#scr").click(function(){
				$(window).scrollTop(0)
			})
		})
		//
		
		
				
})

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	


















