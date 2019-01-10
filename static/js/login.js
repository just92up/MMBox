$(function(){
	
	//logo显示文字
	$("#topper img").mouseover(function(e){
//		console.log(1)
		var cue=$("<div>" + "美美箱" + "</div>")
		$("body").append($(cue));
		$(cue).addClass("active").css({"left":e.clientX,"top":e.clientY,"width":50,"height":22});
		
		console.log($(cue).className)
	})
	
	
	
	
	//文本框字体失焦变色
	$(".input_box input").not("#login").focus(function(){
		$(this).css("color","black")
	})
	$(".input_box input").not("#login").blur(function(){
		$(this).css("color","#888")
	})
	
	
	//注册区提示显示
	$("#login").click(function(){
		//手机框 
		if($("#phone").val()==""){
			$("#phone").css("border-color","#ee001c")
			$(".warm").eq(0).show();
		}else{
			$("#phone").css("border-color","#afafaf")
			$(".warm").eq(0).hide();
		}
		
		//密码框
		if($("#pwd").val()==""){
			$("#pwd").css("border-color","#ee001c")
			$(".warm").eq(1).show();
		}else{
			$(".warm").eq(1).hide();
			if($("#pwd").val().length<6){
				$("#pwd").css("border-color","#ee001c")
				$(".min_length").show();
			}else{
				$("#pwd").css("border-color","#afafaf")
				$(".min_length").hide();
			}
		}
		
		
		//验证用户
		var users=$.cookie("users");
		
		if(users){
			var users=JSON.parse(users);
			
			var isExists=false;
			for(i=0;i<users.length;i++){
				if($("#phone").val()==users[i].name && $("#pwd").val()==users[i].pwd){
					alert("恭喜您，登录成功");
					
					//登录成功跳转到首页
					location.href="index.html"
					
					
					isExists=true;
				}
			}
			
			if(!isExists){
				alert("账号或密码不正确，请确认后重新填写")
			}	
			
		}
		else{
			alert("用户不存在，请先注册")
		}
		
		console.log($.cookie("users"));
	})
	
	
	
})