

$(function(){
	//侧商品子导航显示
	$("#side_nav li").hover(function(){
		$(this).find(".side_list").css("display","block").parent().siblings().find(".side_list").css("display","none");
//		console.log(this);
		$("#side_nav li").mouseleave(function(){
			$(this).find(".side_list").css("display","none")
		})
	})
	
	//***** 点击商品跳转到相应页面 *****
	$(".picture,.goods_name").click(function(){
		//找到当前元素的父元素下的id
		var jump_id=$(this).parents(".goods").find(".goods_id").html();
		location.href="goods_detail.html?id="+jump_id;
		
	})
	
	
	
	
})
 





























