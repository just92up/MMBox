$(function(){
				
	$(".addToCart").click(function(e){
//		console.log("---" + $("#cart").offset().left);
//		console.log("---" + $("#cart").offset().top);
//		console.log("===" + e.pageX);
//		console.log("===" + e.pageY);
		
		//***** 找到当前点击图片的父元素下图片的地址 *****
		var flyImg=$(this).parent().parent().find(".picture img").attr("src");
		
		var flyer = $("<img class='u-flyer'/>");
		flyer.attr("src",flyImg);
		//***** 点击位置因为有滚动条所以不能使用page *****
		//最终的位置top也因为有滚动条所以只能给个固定的位置
		flyer.fly({
			start: {
				left: e.clientX,
				top: e.clientY,
				width: 90,
				height: 90				 		
			},
			end: {
				left: $("#cart").offset().left,
				top: 120,
				width: 0,
				height: 0 
			},
			onEnd: function(){
				console.log("加入购物车成功!")
				//***** 生成图片后要删除不然图片太多 *****
				flyer.remove();
			}
		});
		
	})
	
})