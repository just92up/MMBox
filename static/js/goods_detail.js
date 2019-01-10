$(function(){
	//滑过文本框文字变色
	$("#qty").hover(function(){
		$("#qty").css("color","black");
	},function(){
		$("#qty").css("color","#888");
	})
	
	
	
	
	//获取id
	var para=location.search;
//	console.log(para);
	var str="=";
	var index=para.indexOf(str);
//	console.log(index);
	var id=para.substring(4);
//	console.log(id);
	
	
	
	
	
	//详情页插入点击商品的json数据
	$.getJSON("json/goods_list.json",function(data){
		//遍历json数据
		for(i=0;i<data.length;i++){
			//json数据id下标从1开始，数组下标从0开始
			var obj=data[i];
			//如果点击商品的id=json中的某个商品id
			if(data[id-1]==obj){
				//将点击商品的json数据生成节点插入页面 (图片、标题、价格)
				var goodsId=$("<i class='the_id'>" + obj.id + "</i>");
				$("#goods_chase").append(goodsId);
				
				var smallImg=$("<img src=" + obj.img + " />");
				var bigImg=$("<img src=" + obj.img + " />");
				var smallPic=$("<img src=" + obj.img + " />");
				$("#small_area").before(smallImg);
				$("#big_img").append(bigImg);
				$("#small_block a").append(smallPic);
				
				
				//***** 看79行；如果这里详情页的标题将商品json中的band和into一起插入，下面点加入购物车里面要显示得到这2样可能有问题，所以用标签套着 *****
				var goodsBand=$("<h1><span class='the_band'>" + obj.band + "</span><span class='the_into'>" + obj.into + "</span></h1>")
				$("#goods_chase").append(goodsBand);
				
				var goodsPrice=$("<span>" + "¥" + "<span class='now_price'>" + obj.price + "</span></span>")
				$(".discount").before(goodsPrice);
			}
		}
	});
	
	
	
/*	//购物车商品点击保存到cookie事件函数
	//(声明变量赋值/不赋值)当前点击商品某父元素下要保存到cookie的html()内容
	//***** (三目)声明存在相同商品的数组变量 *****
	
	//存在相同商品: 遍历商品数组 -- 当商品数组中某个商品id == 上面声明的数组的id值
								//id相同的商品的cookie的num属性值增加
	//不存在相同商品：声明单件商品 -- 声明单件商品 -- 用对象键值保存要保存到cookie的商品的内容
								//将每次的新商品推入数组中
	//将商品数组转化为字符串存入cookie */
	


	//将 *首页商品列表中* 点击的 *当前商品* 保存到cookie中
	
	//点击加入购物车按钮
	$(".addToCart").click(function(){
//		console.log(1)；
		//得到***** 当前点击元素的父元素下要保存到cookie的内容 *****
		//要保存到啊cookie的点击商品的数据内容
		
		//***** id要找对不然是undifine 这样在购物车页面点该商品要跳转会自己找不到id 会跳到空页面 *****
		var goodsId=$(this).parents("#main_content").find(".the_id").html();
		console.log(goodsId);
		var goodsImg=$(this).parents("#main_content").find("#big_img img").attr("src");
		
		//看45行，因为上面我插入页面是将两个数据一起获取一起插入
		var goodsBand=$(this).parents().find(".the_band").html();
		var goodsInto=$(this).parents("#main_content").find(".the_into").html();
		var goodsPrice=$(this).parents("#main_content").find(".now_price").html();
		
		//***** 得到详情页面商品的数量传到购物车的数量文本框 -- 不然没点击一次增加同样的商品 *****
		//***** 看shop_car.jsd 105-108 *****
		//详情页的商品数量是个文本框用val()
		var goodsNum=$(this).parents("#main_content").find("#num_box input").val();
		console.log(typeof(goodsNum));
		
		
		//***** (三目)声明存在相同商品的数组变量 *****
		var goodsList = $.cookie("cart") ? JSON.parse( $.cookie("cart") ) : [];
		
		//声明存在相同商品
		var isExists=false;
		
		//商品已存在 -- 增加他的num属性的值
		
		//遍历cookie数据，当匹配得到的与点击商品id相同的商品
		for(i=0;i<goodsList.length;i++){
			//商品数组中某个商品id == 上面声明的数组的id值
			if(goodsList[i].id == goodsId){
				//id相同的商品的cookie的num属性值增加
				//点击1次相同商品数量+1；但是文本框里面有值怎么让商品数量同步加
				
				//这样写购物车里面的数量只会是详情页文本框的数量，如果单点购物车数量依旧显示详情页的值goodsList[i].num=goodsNum;
				if(goodsNum==1){
					goodsList[i].num++;
				}
				if(goodsNum>1){
					console.log(typeof(goodsList[i].num));
					console.log(goodsList[i].num);
//					goodsList[i].num+=goodsNum;
					goodsList[i].num+=parseInt(goodsNum);
					console.log(typeof(goodsList[i].num));
//					goodsList[i].num+=parseInt(goodsNum);
					console.log(goodsList[i].num);
					
				}
				
				isExists=true;
			}
		}
		
		//不存在相同商品则保存到cookie中
		if(!isExists){
			//声明单件商品 -- 用对象键值保存要保存到cookie的商品的内容
			var goods={
				id:goodsId,
				img:goodsImg,
				band:goodsBand,
				into:goodsInto,
				price:goodsPrice,
				//***** 将详情页面文本框的商品数量传给购物车页面 *****
				num:goodsNum
			}
			//将每次的新商品推入数组中
			goodsList.push(goods);
		}
		
		//将商品数组转化为字符串存入cookie
		$.cookie("cart",JSON.stringify(goodsList),{expires:22,path:"/"});
		console.log($.cookie("cart"))
		
	})
	
	
	//点击侧边栏购物车按钮跳转到购物车页面
	$("#cart").click(function(){
		location.href="shop_car.html";
	})





	
		
	//点击按钮增加、减少商品数量
	//设定初始值
	$("#qty").val(1);
	$("#add").click(function(){
		var count=$("#qty").val();
		count++;
		$("#qty").val(count);
	})
	$("#reduce").click(function(){
		var count=$("#qty").val();
		count--;
		$("#qty").val(count);
		//限定商品最小数量
		if($("#qty").val()<1){
			$("#qty").val(1);
		}
	})
	
	
	//放大镜
	var big_area=$("#big_area");
	var small_area=$("#small_area");
	var big_img=$("#big_img");
	var small_img=$("#small_img")
	//计算小区域_smallArea的宽高
	small_area.width(small_img.width()/big_img.width()*big_area.width());
	small_area.height(small_img.height()/big_img.height()*big_area.height());
	//放大倍数
	var scale=big_img.width()/small_img.width();
	//鼠标移入小图片
	small_img.mousemove(function(e){
		
		small_area.show();
		big_area.show();
		
		var x=e.pageX-small_img.offset().left-small_area.width()/2;
		var y=e.pageY-small_img.offset().top-small_area.height()/2;
		
		if(x<0){
			x=0;
		}else if(x>small_img.width()-small_area.width()){
			x=small_img.width()-small_area.width();
		}
		if(y<0){
			y=0;
		}else if(y>small_img.height()-small_area.height()){
			y=small_img.height()-small_area.height();
		}
		
		small_area.css({left:x,top:y});
		
		big_img.css({left:-x*scale,top:-y*scale})
		
	})
	small_img.mouseout(function(){
		small_area.hide();
		big_area.hide();
	})
	
	
	
	//点击购物车飞
	$(".addToCart").click(function(e){
		//***** 找到当前点击图片的父元素下图片的地址 *****
		var flyImg=$(this).parents("#main_content").find("#small_img img").attr("src");
//		console.log(flyImg);
		
		var flyer = $("<img class='u-flyer'/>");
		flyer.attr("src",flyImg);
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
				flyer.remove();
			}
		});
		console.log(2);
	})
	
	
	
	
	
	
	 
})
