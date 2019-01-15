import hashlib
import random
import time

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect

# Create your views here.
from Goods.models import User, Banner, Advert, Goods


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
    banner = Banner.objects.all()
    advert = Advert.objects.all()
    goods = Goods.objects.all()
    token = request.session.get('token')

    users = User.objects.filter(token=token)
    if users.count():
        user = users.first()
        username = user.username
    else:
        username = None
    data = {
        'username': username,
        'banner': banner,
        'advert': advert,
        'goods': goods,
    }
    return render(request,'index.html',context=data)






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
            print(users)
            user = users.first()
            user.token = generate_token()
            user.save()

            request.session['token'] = user.token
            request.session.set_expiry(60*60)

            return response
        else:
            return render(request,'login.html',context={'err':'用户名或者密码错误'})


def logout(request):
    response = redirect('mmbox:index')
    request.session.flush()
    return response


def shop_car(request):
    token = request.session.get('token')
    users = User.objects.filter(token=token)
    user_goods = User.objects.get(token=token)

    goods_list = user_goods.goods_set.all()
    print(goods_list)

    if users.count():
        user = users.first()
        username = user.username
        data = {
            'username': username,
            'goods_list': goods_list,
        }
        return render(request, 'shop_car.html', context=data)
    else:
        username = None
        data = {
            'username': username,
            'goods_list': goods_list,
        }
        return render(request, 'empty_car.html', context=data)
        # return HttpResponse('请登录后查看购物车')

#
# def banner(request):
#     banner = Banner.objects.all()
#
#     return render(request,'index.html',)
def goods_detail(request,goodid):
    good = Goods.objects.get(id = goodid)
    name =  good.name
    price = good.price
    picture = good.picture
    introduce = good.introduce
    token = request.session.get('token')
    users = User.objects.filter(token=token)

    if users.count():
        user = users.first()
        username = user.username
    else:
        username = None
    data = {
        'good':good,
        'username':username,
        'name':name,
        'price':price,
        'picture':picture,
        'introduce':introduce,
    }
    print(goodid)
    return render(request,'goods_detail.html',context=data)

#展示购物车
# def shop_car(request,userid):
#     user = User.objects.get(id=userid)
#     good = user.goods_set .all()
#     print("---------------:")
#     sum = 0
#     token = request.session.get('token')
#     users = User.objects.filter(token=token)
#
#     if users.count():
#         user = users.first()
#         username = user.username
#     else:
#         username = None
#
#     for i in good:
#         sum += i.price
#     total = sum
#     data ={
#         'good':good,
#         'username':username,
#         'total':total,
#         'userid':user.id
#     }
#     print("---------------:", data)
#     return render(request, 'shop_car.html',context=data)


def empty_car(request):
    return render(request, 'empty_car.html')

#添加商品到购物车
def addcart(request,userid,goodid):
    user = User.objects.filter(id = userid)
    goods = Goods.objects.filter(id = goodid)

    goods.user.add(user)

    return HttpResponse('添加到购物车成功')

#添加收藏
def addcollect(request,userid,goodid):
    goods = Goods.objects.filter(id=goodid)
    user = User.objects.filter(id=userid)

    goods.user.add(user)

    return HttpResponse('商品收藏成功!')


def checkphonenum(request):
    phonenum = request.GET.get('phonenum')
    users = User.objects.filter(username=phonenum)
    if users.exists():
        return JsonResponse({
            'msg0':'账号已被注册',
            'status':0
        })
    else:
        return JsonResponse({
            'msg1':'账号可用',
            'status':1
        })
