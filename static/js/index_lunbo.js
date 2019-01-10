$(function(){
	
	$.getJSON("json/index_lunbo.json",function(data){
		//遍历json数据
		for(i=0;i<data.length;i++){
			var obj=data[i];
//			console.log(data.length);
			//得到***** 轮播json *****里面的图片生成节点插入
			var li=$("<li><img src=" + obj.img + " /></li>");
			
			$("#lunbo_list").append(li);
		}
		
		//生成轮播列表
		
		//获取 轮播图片 轮播标志
		var _list=$("#lunbo_list");
		var _li1=$("#lunbo_list li");
		var _tag=$("#lunbo_tag div");
//		console.log(_li1.length);
		
		_li1.first().clone().appendTo(_list);
		var size=$("#lunbo_list li").length;
//		console.log(size);
		
		//图片下标
		var i=0;
		//定时器
		var timer=window.setInterval(function(){
			i++;
			move();
		},2000);
		
		function move(){
			if(i<0){
				_list.css("left",-(size-1)*1920-328.5);
				i=size-2;
			}
			if(i>=size-1){
				_list.animate({left:-328.5},1500)
				i=0;
			}
			//图片轮播
			_list.stop().animate({left:-i*1920-328.5},500);
//			console.log(1);
//			console.log(size);
			
			//轮播标志添加样式
			_tag.eq(i).removeClass().addClass("active").siblings().removeClass("active");
//			console.log(i)
			//到最后一张让第一张有样式
			if(i==size-1){
//				console.log(size);
				_tag.eq(0).removeClass().addClass("active").siblings().removeClass("active");
			}
		}
		
		
		//点击轮播标志跳转
		$("#lunbo_tag div").click(function(){
			var index=$(this).index();
			i=index;
			move();
		})
		
		
		
	})
	
	
	
	
})
