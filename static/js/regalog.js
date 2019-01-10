$(function(){
	
	//logo显示文字
//	$("#topper img").mouseover(function(e){
////		console.log(1)
//		var cue=$("<div>" + "美美箱" + "</div>")
//		$("body").append($(cue));
//		$(cue).addClass("active").css({"left":e.clientX,"top":e.clientY,"width":50,"height":22});
//		
//		console.log($(cue).className)
//	})
	
	
	

	//文本框字体失焦变色
	$(".input_box input").not("#reg").focus(function(){
		$(this).css("color","black")
	})
	$(".input_box input").not("#reg").blur(function(){
		$(this).css("color","#888")
	})
	
	//注册区提示显示
	$("#reg").click(function(){
		
		var phonepat=/^1[358]\d{9}$/;
		var pwdpat=/^[a-zA-Z\d]{6,16}$/;
		var phone=$("#phone").val();
		var pwd=$("#pwd").val();
		var sms=$("#sms").val();
		
		if(phonepat.test(phone)&&pwdpat.test(pwd)){

			
			
			//注册
			var users=$.cookie("users")?JSON.parse($.cookie("users")):[];
			//存在用户
			for(i=0;i<users.length;i++){
				if($("#phone").val()==users[i].name){
					alert("用户名已存在，请重新注册");
					return;
				}
			}
			
			var user={
				name:$("#phone").val(),
				pwd:$("#pwd").val()
			}
			users.push(user);
			
			$.cookie("users",JSON.stringify(users),{espires:10,path:"/"});
			console.log($.cookie("users"));
			console.log(1)


			alert("恭喜您注册成功"+"您的账号为"+phone+"您的密码为"+pwd +",手机长度"+phone.length+",密码长度"+pwd.length);
			location.href="login.html";
		}
		
		
		
		
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
			}else if($("#pwd").val().length>16){
				$("#pwd").css("border-color","#ee001c")
				$(".min_length").hide();
				$(".max_length").show();
			}else{
				$("#pwd").css("border-color","#afafaf")
				$(".min_length").hide();
				$(".max_length").hide();
			}
		}
		
		//短信框
		if($("#sms").val()==""){
			$("#sms").css("border-color","#ee001c")
			$(".wrong_code").hide();
			$(".warm").eq(2).show();
		}
//		else{
//			$("#sms").css("border-color","#afafaf")
//			if($("#sms").length<5){
//				$(".warm").eq(2).hide();
//				$(".wrong_code").show();
//			}
//		}
		else if($("#sms").length<5){
			$(".warm").eq(2).hide();
			$(".wrong_code").show();
		}
		else if($("#sms").length=5){
			$("#sms").css("border-color","#afafaf")
			$(".wrong_code").hide();
		}
		
	
	})
	
	
	
	
})