$(function () {
    /*  //结算条吸顶
  //	$(".sum_price").addClass(".attach");
  // 	$(".sum_price").css({"position":"fixed",bottom:0,margin:0});
      $(window).scroll(function () {
          var scroll_top = $(document).scrollTop();
          var sumTop = $("#sum_block").offset().top - $(window).height();
  //		console.log("结算距"+sumTop);
  //		console.log(scroll_top);
  //		console.log($(window).innerHeight())
          if (scroll_top >= sumTop) {
  //			$(".sum_price").removeClass(".attach");
              $(".sum_price").css({"position": "static"});

          } else {
  //			$(".sum_price").addClass(".attach");
              $(".sum_price").css({"position": "fixed", bottom: 0, margin: 0});
          }
      })


      //将cookie里面购物车的内容插入页面
      var goodsList = $.cookie("cart")

      if (goodsList) {

          var goodsList = JSON.parse(goodsList);

          for (i = 0; i < goodsList.length; i++) {
              //赋值得到每个商品
              var goods = goodsList[i];
  //			console.log(goodsList.length)


              //!***** (将商品列表点击的所有商品--点击次数的数量 / 详情页点击的商品--考虑详情页面商品的数量的传数量) *****
              //生成节点插入购物车页面
  //			if(i>0){
  //				$(".insert_goods").clone().appendTo("tbody");
  //			}
              var tr = $("<tr></tr>");
              var td1 = $("<td></td>");
              var td2 = $("<td></td>");
              var td3 = $("<td></td>");
              var td4 = $("<td></td>");
              var td5 = $("<td></td>");
              var td6 = $("<td></td>");

              //将点击商品的json数据生成节点插入页面 (id、图片、标题、价格、数量)
              //id
              var goods_id = goods.id;
              var goodsId = $("<i class='goodsId'>" + goods_id + "</i>");
              //图片
              var goodsImg = $("<div class='goods_img'></div>");
              var goodsPic = $("<img class='goodsImg' src=" + goods.img + " />");
              goodsImg.append(goodsPic);
              //标题
              var goodsTitle = $("<div class='goods_title'></div>");
              var goodsMesg = $("<a>" + goods.band + "&nbsp" + goods.into + "</a>");
              goodsTitle.append(goodsMesg);
              td1.append(goodsImg, goodsTitle);
              //规格
              var goodsNorms = $("<p class='goodsNorms'>" + "--" + "</p>");
              td2.html(goodsNorms);
              //价格
              var goods_price = goods.price;
  //			console.log(goods_price);
              var goodsPrice = $("<span class='rmb'>" + "¥" + "<span class='unit_price'>" + goods_price + "</span></span>");
              td3.html(goodsPrice);


              //数量
              var goodsNum = goods.num;

              //!*****文本框值change改变cookie*****

  //			$(".amount_box button").click(function(){
  //				$(this).siblings(".goods_amounts").val()
  //				console.log($(".goods_amounts").val())
  //			})


              var amount_box = $("<div class='amount_box'></div>");
              td4.append(amount_box);

              //按钮、文本框
              var substract = $("<button  type='submit' class='substract'>" + "-" + "</button>");
              var goods_amounts = $("<input type='text' class='goods_amounts' disabled='disabled' value=' " + goodsNum + " '/>");
              var add = $("<button  type='submit' class='add'>" + "+" + "</button>");
              amount_box.append(substract, goods_amounts, add);


              //金额=数量*单价
              var totalPrice = goodsNum * goods_price;
              var total_price = $("<span class='price_rmb'>" + "¥" + "<span class='total_price'>" + totalPrice + "</span></span>");
  //			var total_price=$("<span class='price_rmb'>"+ "<span class='total_price'>" + totalPrice + "</span></span>");
  //			var total_price=$("<span class='total_price'>" + "¥" + totalPrice + "</span>");
  //			console.log(goodsNum+","+goods_price+","+totalPrice+",")
              td5.append(total_price)
              //功能区
              var my_store = $("<a class='my_store'>" + "移入我的收藏" + "</a>");
              var another = $("<br />");
              var del_goods = $("<a class='del_goods'>" + "删除" + "</a>");
              var user_action = $("<div class='user_action'></div>");
              td6.append(user_action);
              user_action.append(my_store, another, del_goods);

              //插入页面
              tr.append(td1, td2, td3, td4, td5, td6, goodsId);
              $("tbody").append(tr);


          }


          //得到所有价格的总值
          depot_money();

          function depot_money() {
              var arr = [];
              var total;
              var last_price = 0;
              //遍历计算得到最终的价格
              for (j = 0; j < $(".total_price").length; j++) {
  //					depot+=total[i]
                  total = $(".total_price").eq(j).html();
                  total = parseInt(total);
  //					console.log(total);
  //					arr.push( total );
                  //累加价格
                  last_price += total;
              }
  //				console.log(arr);
  //				console.log(last_price);
              //生成价格节点
              var lastPrice = $("<span>" + "¥" + last_price + "</span>");
  //				console.log(lastPrice.html())
              //将价格插入
  //				$(".car_price").parents("table").find(".car_price").append(lastPrice);
              $(".car_price").parents("table").find(".car_price").html(lastPrice.html());
  //				$(".car_price").parents("table").find(".car_price").html(lastPrice);
              $(".final_price").html(lastPrice);
  //				console.log($(".car_price").parents("table").find(".car_price").html())
          }


          //增减商品数量
          $(".amount_box button").click(function () {
              var index = $(this).parent().find(".goods_amounts").index();
              var theNum = $(this).parent().find("input").val();
  //				console.log($(this).ClassName)
              if ($(this).hasClass("add")) {
  //					console.log($(this).hasClass("add"))
                  theNum++;
              }
              if ($(this).hasClass("substract")) {
  //					console.log($(this).hasClass("substract"));
                  theNum--;
                  if (theNum <= 1) {
                      theNum = 1;
                  }
              }

              $(this).parent().find("input").val(theNum);

              //同步更改金额
              var allPrice = $(this).parent().parent().siblings("td").find(".unit_price").html() * $(this).parent().find(".goods_amounts").val();
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
      $(".del_goods").click(function () {
  //					var index=$(this).indexOf();
  //				var theId=$(this).parent().parent().siblings(".goodsId").html();
  //				console.log(theId)

  //				console.log(goodsList[parseInt(theId)])
  //				if(goodsList[theId]==goods){
  //					console.log(goodsList[theId])
  //					console.log(5)
  //				}


          $(this).parents("tr").remove();
          $.cookie("cart", "", {expires: 0, path: "/"});
  //				var delId=$(this).parents("tr").find(".goodsId").html();
  //				console.log(delId);
  //				$(goods.id)
          //删除节点后价格同步
          depot_money()
      })


  //			}


      //!***** 点击购物车商品的名称跳转到相应商品详情 *****
      $(".goods_title").click(function () {
          var jump_id = $(this).parents("tr").find(".goodsId").html();
          console.log(jump_id)
          location.href = "goods_detail.html?id=" + jump_id;
      })


      //点击去结算 -- 跳转到登录界面
      $(".go_to_calc").click(function () {
  //		if(confirm("请先登录！")){
  //			location.href="login.html";
  //		}

          // alert("请先登录！");
          // location.href="../login";
      })*/

    //计算商品总价

    function total() {
        var sum = 0
        $('.mygoods').each(function () {
            var $confirm = $(this).find('.mybut ')
            // var $confirm = $(this).find('#tosuccess ')
            var $num = $(this).find('.num')
            var $content = $(this).find('.myprice')
            console.log("开始进入计算的便利")
            console.log($confirm.find('#tosuccess').length)
            if ($confirm.find('.btn-success').length) {
                console.log("开始计算")
                // var num = $num.attr('num')
                var num = $num.html()
                console.log('num',num)

                var price = $content.attr('myprice')
                console.log('price',price)
                sum += parseInt(num) * parseInt(price)
            }

        })
        console.log(sum)
        $("#selecttotal").html(sum)

    }
    total()

//选中单类商品
    $('.mygoods #myselect').click(function () {
        console.log("jinru fangfa")
        // 谁， 购物车（哪条记录）
        var cartid = $(this).attr('cartid')
        var $span = $(this).find('div')

        data = {
            'cartid': cartid
        }

        // 发起ajax
        $.get('/mmbox/changecartstatus/', data, function (response) {
            console.log(response)
            if (response.status) {
                if (response.isselect) { // 选中
                    $span.removeClass('btn btn-default').addClass('btn btn-success')
                } else {    // 未选中
                    $span.removeClass('btn btn-success').addClass('btn btn-default')
                }

                total()
            }
        })
    })

    //全选
    $('.bill .all').click(function () {

        // 获取
        var isall = $(this).attr('isall')
        // 转换
        isall = (isall == 'true') ? true : false
        // 取反
        console.log("kkkkkkkkkkkkkkkkk")
        isall = !isall
        // 设置回去
        $(this).attr('isall', isall)

        if (isall) {
            $(this).find('span').removeClass('btn btn-default').addClass('btn btn-success')
        } else {
            $(this).find('span').removeClass('btn btn-success').addClass('btn btn-default')
        }

        // true/false
        data = {
            'isall': isall
        }

        $.get('/mmbox/changecartall/', data, function (response) {
            console.log(response)
            if (response.status == 1) {
                $('.mygoods #myselect').each(function () {
                    console.log("++++++++++++++++++++++")
                    if (isall) { // 选中
                        console.log("????????????????????")
                        $(this).find('div').removeClass('btn btn-default').addClass('btn btn-success')
                    } else {    // 取消选中
                        console.log("---------------------")
                        $(this).find('div').removeClass('btn btn-success').addClass('btn btn-default')
                    }
                })

                total()
            }
        })
    })



//    下单
        // 下单
    $('.go_to_calc #generateorder').click(function () {
        console.log("xiadan")
        $.get('/mmbox/generateorder/', function (response) {
            console.log(response)
            if (response.status == 1){  // 订单详情页
               window.location.href=('/mmbox/orderdetail/' + response.identifier + '/')
            }
        })




    })


	//    添加到购物车操作
    $('.addToCart').click(function () {

        var goodsid = $(this).attr('mygoods')
		// console.log(goodsid)
    //    保存当前点击按钮
        var $that = $(this)
        data = {
            'goodsid':goodsid
        }
        $.get('/mmbox/addcart/',data,function (response) {
            if (response.status==0)
            {//未登录
                // window.open(('/mmbox/login/', target = '_self'))
				window.location.href='/mmbox/login/'
            } else if(response.status==1){
                // console.log('添加成功')
                // $('#car_price .car_price').html(response.total)

            }
        })
    })

	$(".addToCart").click(function (e) {

            //***** 找到当前点击图片的父元素下图片的地址 *****
            var flyImg = $(this).parent().parent().find(".picture img").attr("src");

            var flyer = $("<img class='u-flyer'/>");
            flyer.attr("src", flyImg);
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
                onEnd: function () {
                    // console.log("加入购物车成功!")
                    //***** 生成图片后要删除不然图片太多 *****
                    flyer.remove();
                }
            });

        })
	//添加商品
	$('.action #addgoods').click(function () {
	    var goodsid = $(this).attr('goodsid')
		console.log(goodsid)
    //    保存当前点击按钮
        var $that = $(this)
        data = {
            'goodsid':goodsid
        }
        $.get('/mmbox/addcart/',data,function (response) {
            if (response.status==0)
            {//未登录
                // window.open(('/mmbox/login/', target = '_self'))
				window.location.href='/mmbox/login/'
            } else if(response.status==1){
            	$that.parent().prev().prev().html(response.number)
                $that.prev().show()
                $that.parent().prev().html(response.simplegoods)
                console.log('添加成功')

				// $('.car_price').html(response.total)

            }
            total()
        })

        })


	// 商品减操作
    $('.action #subgoods').click(function () {

        var goodsid = $(this).attr('goodsid')
        var $that = $(this)

        data = {
            'goodsid':goodsid
        }
		console.log('11111')
        $.get('/mmbox/subcart/', data, function(response) {
            console.log("????")
            if (response.status == 1){  // 操作成功
                if (response.number >0) {  // 改变个数
                    $that.parent().prev().prev().html(response.number)
                    $that.parent().prev().html(response.simplegoods)
					// $('.car_price').html(response.total)
                    console.log(">>>>>>>>>>>>>>>>>>>>")
                    total()
                } else {    // 隐藏减和个数
                    // $that.next().hide()
                    $that.parent().prev().prev().html(response.number)
                    $that.parent().prev().html("0")
                    $that.hide()
                    console.log("减之后")

                }
                total()
            }
        })


    })



})
