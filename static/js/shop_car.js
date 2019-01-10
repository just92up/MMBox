$(function(){
	//结算条吸顶
//	$(".sum_price").addClass(".attach");
	$(".sum_price").css({"position":"fixed",bottom:0,margin:0});
	$(window).scroll(function(){
		var scroll_top=$(document).scrollTop();
		var sumTop=$("#sum_block").offset().top-$(window).height();
//		console.log("结算距"+sumTop);
//		console.log(scroll_top);
//		console.log($(window).innerHeight())
		if(scroll_top>=sumTop){
//			$(".sum_price").removeClass(".attach");
			$(".sum_price").css({"position":"static"});
			
		}else{
//			$(".sum_price").addClass(".attach");
		$(".sum_price").css({"position":"fixed",bottom:0,margin:0});
		}
	})	
	
	
	//将cookie里面购物车的内容插入页面
	var goodsList=$.cookie("cart")
	
	if(goodsList){
		
		var goodsList=JSON.parse(goodsList);
		
		for(i=0;i<goodsList.length;i++){
			//赋值得到每个商品
			var goods=goodsList[i];
//			console.log(goodsList.length)
			

			
			
			
			
			
			
			
			
			
			
			
			
			//***** (将商品列表点击的所有商品--点击次数的数量 / 详情页点击的商品--考虑详情页面商品的数量的传数量) *****
			//生成节点插入购物车页面
//			if(i>0){
//				$(".insert_goods").clone().appendTo("tbody");
//			}
			var tr=$("<tr></tr>");
			var td1=$("<td></td>");
			var td2=$("<td></td>");
			var td3=$("<td></td>");
			var td4=$("<td></td>");
			var td5=$("<td></td>");
			var td6=$("<td></td>");
			
			//将点击商品的json数据生成节点插入页面 (id、图片、标题、价格、数量)
			//id
			var goods_id=goods.id;
			var goodsId=$("<i class='goodsId'>" + goods_id + "</i>");
			//图片
			var goodsImg=$("<div class='goods_img'></div>");
			var goodsPic=$("<img class='goodsImg' src=" + goods.img + " />");
			goodsImg.append(goodsPic);
			//标题
			var goodsTitle=$("<div class='goods_title'></div>");
			var goodsMesg=$("<a>" + goods.band + "&nbsp" + goods.into + "</a>");
			goodsTitle.append(goodsMesg);
			td1.append(goodsImg,goodsTitle);
			//规格
			var goodsNorms=$("<p class='goodsNorms'>" + "--" + "</p>");
			td2.html(goodsNorms);
			//价格
			var goods_price=goods.price;
//			console.log(goods_price);
			var goodsPrice=$("<span class='rmb'>" + "¥" + "<span class='unit_price'>" + goods_price + "</span></span>");
			td3.html(goodsPrice);
			
			
			//数量
			var goodsNum=goods.num;
			
			//*****文本框值change改变cookie*****
			
//			$(".amount_box button").click(function(){
//				$(this).siblings(".goods_amounts").val()
//				console.log($(".goods_amounts").val())
//			})
			
			
			var amount_box=$("<div class='amount_box'></div>");
			td4.append(amount_box);
			
			//按钮、文本框
			var substract=$("<button  type='submit' class='substract'>"+ "-" +"</button>");
			var goods_amounts=$("<input type='text' class='goods_amounts' disabled='disabled' value=' " + goodsNum + " '/>");
			var add=$("<button  type='submit' class='add'>"+ "+" +"</button>");
			amount_box.append(substract,goods_amounts,add);
			
			
			//金额=数量*单价
			var totalPrice=goodsNum*goods_price;
			var total_price=$("<span class='price_rmb'>" + "¥"+ "<span class='total_price'>" + totalPrice + "</span></span>");
//			var total_price=$("<span class='price_rmb'>"+ "<span class='total_price'>" + totalPrice + "</span></span>");
//			var total_price=$("<span class='total_price'>" + "¥" + totalPrice + "</span>");
//			console.log(goodsNum+","+goods_price+","+totalPrice+",")
			td5.append(total_price)
			//功能区
			var my_store=$("<a class='my_store'>" + "移入我的收藏" + "</a>");
			var another=$("<br />");
			var del_goods=$("<a class='del_goods'>" + "删除" + "</a>");
			var user_action=$("<div class='user_action'></div>");
			td6.append(user_action);
			user_action.append(my_store,another,del_goods);
			
			//插入页面
			tr.append(td1,td2,td3,td4,td5,td6,goodsId);
			$("tbody").append(tr);
			
			
		}


			//得到所有价格的总值
			depot_money();	
			function depot_money(){
				var arr=[];
				var total;
				var last_price=0;
				//遍历计算得到最终的价格
				for(j=0;j<$(".total_price").length;j++){
//					depot+=total[i]
					total=$(".total_price").eq(j).html();
					total=parseInt(total);
//					console.log(total);
//					arr.push( total );
					//累加价格
					last_price+=total;
				}
//				console.log(arr);
//				console.log(last_price);
				//生成价格节点
				var lastPrice=$("<span>" + "¥" + last_price + "</span>");
//				console.log(lastPrice.html())
				//将价格插入
//				$(".car_price").parents("table").find(".car_price").append(lastPrice);
				$(".car_price").parents("table").find(".car_price").html(lastPrice.html());
//				$(".car_price").parents("table").find(".car_price").html(lastPrice);
				$(".final_price").html(lastPrice);
//				console.log($(".car_price").parents("table").find(".car_price").html())
			}


			//增减商品数量
			$(".amount_box button").click(function(){
				var index=$(this).parent().find(".goods_amounts").index();
				var theNum=$(this).parent().find("input").val();
//				console.log($(this).ClassName)
				if( $(this).hasClass("add") ){
//					console.log($(this).hasClass("add"))
					theNum++;
				}
				if( $(this).hasClass("substract")){
//					console.log($(this).hasClass("substract"));
					theNum--;
					if(theNum<=1){
						theNum=1;
					}
				}
				
				$(this).parent().find("input").val(theNum);
				
				//同步更改金额
				var allPrice=$(this).parent().parent().siblings("td").find(".unit_price").html()*$(this).parent().find(".goods_amounts").val();
				console.log($(this).parent().parent().siblings("td").find(".unit_price").html());
				console.log($(this).parent().find(".goods_amounts").val());
				$(this).parent().parent().siblings("td").find(".total_price").html(allPrice);
				
				
				//同步仓库价格
				depot_money();
				
				
//				$(".car_price").parents("table").find(".car_price").append(lastPrice);
				
				
				
//				depot.push($(this).parents("tbody").find(".total_price").html());
				
//				$(this).parents("table").find("tfoot").find(".car_price").html();
			})
			
			
			
			
			
		
	}
	
				//删除按钮
			
//			for(j=0;j<$(".del_goods").length;j++){
//				console.log($(".del_goods").length)
				$(".del_goods").click(function(){
//					var index=$(this).indexOf();
//				var theId=$(this).parent().parent().siblings(".goodsId").html();
//				console.log(theId)
				
//				console.log(goodsList[parseInt(theId)])
//				if(goodsList[theId]==goods){
//					console.log(goodsList[theId])
//					console.log(5)
//				}
				
							
				

				$(this).parents("tr").remove();
				$.cookie("cart","",{expires:0,path:"/"});
//				var delId=$(this).parents("tr").find(".goodsId").html();
//				console.log(delId);
//				$(goods.id)
				//删除节点后价格同步
				depot_money()
			})
				
				
				
				
//			}
	
	
	//***** 点击购物车商品的名称跳转到相应商品详情 *****
	$(".goods_title").click(function(){
		var jump_id=$(this).parents("tr").find(".goodsId").html();
		console.log(jump_id)
		location.href="goods_detail.html?id="+jump_id;
	})
	
	
	
	//点击去结算 -- 跳转到登录界面
	$(".go_to_calc").click(function(){
//		if(confirm("请先登录！")){
//			location.href="login.html";
//		}
		
		alert("请先登录！");
		location.href="login.html";
	})
	
	
	
})
