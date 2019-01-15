$(function () {
    var reg1 = /^1[3|5|7|8|9](\d){9}$/
    var reg2 = /^[a-zA-Z\d_]{6}$/
    var temp= true
    $('#username').blur(function () {

        if(reg1.test($('#username').val())){
            $.get('/mmbox/checkphonenum/',{
                'phonenum':$('#username').val()
            },function (response) {
                if(response.status){
                    console.log("**********")

                    $('#err1').html("账号可用")
                    $('.msg1 p').css('color','green')
                    temp = true
                }else{
                    $('#err1').html("已被注册")
                    $('.msg1 p').css('color','orangered')
                    temp = false
                }

            })
        }else{
                    $('#err1').html("请输入正确的手机号")
                    $('.msg1 p').css('color','red')
                    temp = false

        }
    })

    $('#password').blur(function () {

        if(reg2.test($('#password').val())){
            $('#err2').html('密码符合规范')
            $('.msg2 p').css('color','green')
        }else{
            $('#err2').html('密码只能为6位字母数字下划线')
            $('.msg2 p').css('color','red')
        }

    })


    $('#reg').click(function () {
        //便利所有输入框是否正确
        check1 = reg1.test($('#username').val())
        check2 = reg2.test($('#password').val())
        if(check1==true && check2==true && temp==true){
            $('#register').submit()
        }
    })

})