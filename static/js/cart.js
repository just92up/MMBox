$(function(){
	//    添加到购物车操作
    $('.addToCart').click(function (e) {

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
                console.log('添加成功')
				// $('.car_price').html(response.total)

            }
        })
        })


	// 商品减操作
    $('.action #subgoods').click(function () {
        console.log('减操作')

        var goodsid = $(this).attr('goodsid')
        var $that = $(this)

        data = {
            'goodsid':goodsid
        }
		console.log('11111')
        $.get('/mmbox/subcart/', data, function (response) {
            console.log(response)
            if (response.status == 1){  // 操作成功
                if (response.number > 0) {  // 改变个数
                    $that.parent().prev().prev().html(response.number)
					// $('.car_price').html(response.total)
                } else {    // 隐藏减和个数
                    $that.next().hide()
                    $that.hide()
                }
            }
        })
    })

	
})
