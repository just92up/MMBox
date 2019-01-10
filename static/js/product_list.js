$(function(){
	
	$.getJSON("json/products_list.json",function(data){
		//遍历json数据
		for(i=0;i<data.length;i++){
			var obj=data[i];
			//生成节点将遍历的所有相应json信息插入页面
			var id=$("<span class='goods_id'>" + obj.id + "</span>")
			$(".picture").eq(i).append(id);
			
			var img=$("<img src=" + obj.img + " />");
			$(".picture").eq(i).append(img);
			
			var band=$("<h4>" + obj.band + "</h4>")
			$(".goods_name").eq(i).append(band);
			
			var into=$("<h3>" + obj.into + "</h3>")
			$(".goods_name").eq(i).append(into);
			
			var price=$("<span class='cur_price'>" + obj.price + "</span>")
			$(".price").eq(i).append(price);
			
			var meprice=$("<span class='meme_price'>" + obj.meprice + "</span>")
			$(".market_price").eq(i).append(meprice);
			
			var save=$("<span class='save_price'>" + obj.save + "</span>")
			$(".market_price").eq(i).append(save);
		}
		
		
		
		
	})
	
})
