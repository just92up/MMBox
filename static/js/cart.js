$(function(){
	
	
	//购物车商品点击保存到cookie事件函数
		//(声明变量赋值/不赋值)当前点击商品某父元素下要保存到cookie的html()内容
		//***** (三目)声明存在相同商品的数组变量 *****
		
		//存在相同商品: 遍历商品数组 -- 当商品数组中某个商品id == 上面声明的数组的id值
									//id相同的商品的cookie的num属性值增加
		//不存在相同商品：声明单件商品 -- 声明单件商品 -- 用对象键值保存要保存到cookie的商品的内容
									//将每次的新商品推入数组中
		//将商品数组转化为字符串存入cookie
	
	
	
//	console.log(1)

	//将 *首页商品列表中* 点击的 *当前商品* 保存到cookie中
	
	//点击加入购物车按钮
	$(".addToCart").click(function(){
//		console.log(1)；
		//得到***** 当前点击元素的父元素下要保存到cookie的内容 *****
		//要保存到啊cookie的点击商品的数据内容
		var goodsId=$(this).parent().parent().find(".goods_id").html();
		var goodsImg=$(this).parent().parent().find(".picture img").attr("src");
		var goodsBand=$(this).parent().parent().find(".goods_name h4").html();
		var goodsInto=$(this).parent().parent().find(".goods_name h3").html();
		var goodsPrice=$(this).parent().find(".cur_price").html();
		
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
				goodsList[i].num++;
				isExists=true;
			}
		}
		
		//不存在相同商品则保存到cookie中
		if(!isExists){
			//声明单件商品json -- 用对象键值形式保存到cookie的商品的内容
			var goods={
				id:goodsId,
				img:goodsImg,
				band:goodsBand,
				into:goodsInto,
				price:goodsPrice,
				num:1
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
	
	
})
