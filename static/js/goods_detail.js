$(function(){
	//滑过文本框文字变色
	$("#qty").hover(function(){
		$("#qty").css("color","black");
	},function(){
		$("#qty").css("color","#888");
	})
	
	
	
	
	//获取id
	var para=location.search;
	var str="=";
	var index=para.indexOf(str);
	var id=para.substring(4);
	

	
/*
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
				
				
				//!***** 看79行；如果这里详情页的标题将商品json中的band和into一起插入，下面点加入购物车里面要显示得到这2样可能有问题，所以用标签套着 *****
				var goodsBand=$("<h1><span class='the_band'>" + obj.band + "</span><span class='the_into'>" + obj.into + "</span></h1>")
				$("#goods_chase").append(goodsBand);
				
				var goodsPrice=$("<span>" + "¥" + "<span class='now_price'>" + obj.price + "</span></span>")
				$(".discount").before(goodsPrice);
			}
		}
	});
	
	
*/




	
		
/*
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
*/

	
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
				// console.log("加入购物车成功!")
				flyer.remove();
			}
		});
		console.log(2);
	})
	
	//添加商品
	$('#addgoods').click(function () {
		console.log($(this).attr('goodsid'))
       var goodsid = $(this).attr('goodsid')
    //保存当前点击按钮
        var $that = $(this)
        data = {
            'goodsid':goodsid
        }
        $.get('/mmbox/addcart/',data,function (response) {
            console.log("开始后台添加")
        	if (response.status==0)
            {//未登录
                // window.open(('/mmbox/login/', target = '_self'))
				window.location.href='/mmbox/login/'
            } else if(response.status==1){
        		console.log("mmmmmmmmmmmmmm")
            	$that.prev().val(response.number)
				$that.prev().prev().show()

            }
        })
        })


	// 商品减操作
    $('#subgoods').click(function () {
    	console.log('?????????????')
        var goodsid = $(this).attr('goodsid')
        var $that = $(this)
        data = {
            'goodsid':goodsid
        }
        $.get('/mmbox/subcart/', data, function(response) {
            if (response.status == 1){  // 操作成功
                if (response.number >0) {  // 改变个数
                	console.log("kkkkkk")
					$that.next().val(response.number)
                	// $('#mynumber').html(response.number)

                   /* $that.parent().prev().prev().html(response.number)
                    $that.parent().prev().html(response.simplegoods)
					*/// $('.car_price').html(response.total)
                } else {    // 隐藏减和个数
                    // $that.next().hide()
                   /* $that.parent().prev().prev().html(response.number)
                    $that.parent().prev().html("0")*/
                   $that.next().val("0")
                    $that.hide()
                    console.log("减之后")
                }
            }
        })
    })
	
	
	
	
	 
})
