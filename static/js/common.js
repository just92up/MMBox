

$(function(){
	//搜索框焦点变大事件
	$(".search").focus(function(){
		$("#search").css("border-width","2px")
	})
	$(".search").blur(function(){
		$("#search").css("border-width","1px")
	})
	
	//滑过显示下拉
//	$(".slide_list").hover(function(){
//		var index=$(this).index(".slide_list");
//		$(".child_list").eq(index).css({"display":"block"});
//	},function(){
//		var index=$(this).index(".slide_list");
//		$(".child_list").eq(index).css({"display":"none"});
//	})
		//滑过显示下拉
//	$(".slide_list").hover(function(){
//		var index=$(this).index(".slide_list");
//		$(this).next().show();
//	},function(){
//		$(this).next().hide();
//	})
	
	$(".slide_list").mouseover(function(){
		$(this).next().show();
		$(".child_list").mouseover(function(){
			$(this).show();
		})
		$(".child_list").mouseout(function(){
			$(this).hide();
		})
		$(this).mouseout(function(){
			$(this).next().hide();
		})
	})
	
	

	
	
	//搜索框按钮显示
//	$(".logo").mouseenter(function(e){
//		var hiword=$("<div>"+hiword.html($(".logo").name)+"</div>");
//		hiword.css()
//	})

	
	//侧边栏
	
	//一键回到顶部
	$(window).scroll(function(){
		//获取滚轮的距离
		var _scrollTop=$(window).scrollTop();
		//当滚动距离大于200显示一键
		if(_scrollTop>=200){
			$(".top").css("display","block");
			$(".top").click(function(){
				//回到顶部
//				$(".top").scrollTop(0)
//$("#sideBar_bottom li:last").click(function()｛
//)
			})
		}
		else{
			$(".top").css("display","none");
		}
	})
	
	
//	$("#sideBar img").css("opacity","0.5");
	
	
//	$("#sideBar_top li").not(".car").hover(function(){
//		var index=$(this).index();
//		console.log(index);
//////		$(this).animate({"opacity":"0.3"},1000)
////		$(this).find("img").attr("src","img/sperson.png");
//		$(this).find("img").attr("src","img/"+ index +".png")
//	})
	
	
	


	//购物车滑过换图
	$("#sideBar_top .car").hover(function(){
		$(this).find("img").toggle();
		//鼠标移出
	},function(){
		$(this).find("img").toggle();
	})
	
	//侧边栏上边滑过显示
	$("#sideBar_top li").not(".car").hover(function(){
		$("#side_slider").css("display","block");
		var index=$(this).index();
		//滑过出现滑块移动
		$("#slider_top div").eq(index-1).css("display","block");
		$("#slider_top div").eq(index-1).animate({"right":0},300);
		//滑过换背景
		$(this).find("img").toggle();
		//鼠标移出
	},function(){
		$("#side_slider").css("display","none");
		var index=$(this).index();
		$("#slider_top div").eq(index-1).css({"display":"none"});
		$("#slider_top div").eq(index-1).animate({"right":30},300);
		$(this).find("img").toggle();
	})
	
	//侧边栏下边滑过显示
	$("#sideBar_bottom li").hover(function(){
		$("#side_slider").css("display","block");
		var index=$(this).index();
		$("#slider_bottom div").eq(index).css("display","block").animate({"right":0},300);
		$(this).find("img").toggle();
	},function(){
		$("#side_slider").css("display","none");
		var index=$(this).index();
		$("#slider_bottom div").eq(index).css({"display":"none"}).animate({"right":30},300);
		$(this).find("img").toggle();
	})






//	//侧边栏滑过显示
//	$("#sideBar_top li").not(".car").hover(function(){
//		var index=$(this).index();
//		//滑过出现滑块移动
//		$("#slider_top div").eq(index-1).css("display","block").animate({"right":0},30);
//		//滑过换背景
//		$(this).find("img").attr("src","img/"+ index +".png");
//		//鼠标移出
//	},function(){
//		var index=$(this).index();
//		$("#slider_top div").eq(index-1).css({"display":"none"}).animate({"right":30},30);
//	})
//	
//	
//	$("#sideBar_bottom li").hover(function(){
//		var index=$(this).index();
//		$("#slider_bottom div").eq(index).css("display","block").animate({"right":0},30);
//		$(this).mouseout(function(){
//			var index=$(this).index();
//			$("#slider_bottom div").eq(index).css({"display":"none"}).animate({"right":30},30);
//		})
//	})
	
	

	//二维码显示
	$("#chat_tool img").not("#code").hover(function(){
		var index=$(this).index()-1;
//		console.log(index);
		$("#code img").eq(index).css("display","block");
		$(this).mouseout(function(){
			$("#code img").eq(index).css("display","none");
		})
//		
//////		console.log($(this).className)
////		var self=$(this);
////		console.log(self.className)
////		if(self.className=="meme"){
////			console.log(1)
////			console.log(self.className)
////			$(".download").css("display","block");
////		}
	})



})
 





























