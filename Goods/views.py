import hashlib
import random
import time

from django.shortcuts import render, redirect

# Create your views here.
from Goods.models import User

#密码加密
def generate_password(password):
    sha = hashlib.sha256()
    sha.update(password.encode('utf-8'))

    return sha.hexdigest()


#token保持会话
def generate_token():
    token = str(time.time())+str(random.random())
    md5 = hashlib.md5()
    md5.update(token.encode('utf-8'))

    return md5.hexdigest()



def index(request):
    token = request.session.get('token')
    users = User.objects.filter(token=token)
    if users.count():
        user = users.first()
        username = user.username
    else:
        username = None
    return render(request,'index.html',context={'username':username})






def register(request):
    if request.method == 'GET':
        return render(request,'register.html')
    elif request.method == 'POST':
        user = User()
        user.username = request.POST.get('username')
        #对用户密码加密
        user.password = generate_password(request.POST.get('password'))
        user.phone = request.POST.get('phone')
        user.email = request.POST.get('email')

        #生成token
        user.token = generate_token()
        user.save()
        print(user.username)
        response = redirect('mmbox:index')

        #token 状态保持
        request.session['token'] = user.token
        request.session.set_expiry(30)

        return response


def login(request):
    if request.method == 'GET':
        return render(request,'login.html')
    elif request.method == 'POST':
        username = request.POST.get('username')
        password = generate_password(request.POST.get('password'))
        #用户名密码校验
        users = User.objects.filter(username=username).filter(password=password)

        if users.count():
            #成功，重定向到首页，保持登录状态
            response = redirect('mmbox:index')

            user = users.first()
            user.token = generate_token()
            user.save()

            request.session['token'] = user.token
            request.session.set_expiry(60)

            return response
        else:
            return render(request,'login.html',context={'err':'用户名或者密码错误'})


def logout(request):
    response = redirect('mmbox:index')
    request.session.flush()
    return response


def show_car(request):
    return render(request,'shop_car.html')