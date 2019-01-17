import hashlib
import random
import time

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect

# Create your views here.
from Goods.models import User, Banner, Advert, Goods, Cart


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
        'mygoosid':good.id
    }
    # print(good.id)
    return render(request,'goods_detail.html',context=data)


#空购物车
def empty_car(request):
    return render(request, 'empty_car.html')

#购物车
def shop_car(request):
    token = request.session.get('token')
    if token:
        user = User.objects.get(token=token)
        carts = Cart.objects.filter(user=user).exclude(number=0)
        username =user.username
        total = 0
        for mygoods in carts:
            total1 = mygoods.number*mygoods.goods.price
            total =total+total1

        data = {
            'carts':carts,
            'username': username,
            'total':total,
        }
        print("jiajiajia")
        return render(request,'shop_car.html',context=data)
    else:
        return redirect('mmbox:login')




#添加商品到购物车
def addcart(request):
    token = request.session.get('token')
    if token:
        user = User.objects.get(token=token)
        goodsid = request.GET.get('goodsid')
        goods = Goods.objects.get(pk=goodsid)

        #初次添加,新增记录;非初次则更新修改number

        #判断商品是否存在
        carts = Cart.objects.filter(user=user).filter(goods=goods)
        if carts.exists():
            cart = carts.first()
            cart.number = cart.number + 1
            cart.save()
        else:
            cart = Cart()
            cart.user = user
            cart.goods = goods
            cart.number = 1
            cart.save()
        simplegoods = 0
        for mygoods in carts:
            total1 = mygoods.number*mygoods.goods.price
            simplegoods =simplegoods+total1
        data = {
            'msg':'-{}添加购物车成功'.format(goods.name),
            'status':1,
            'number':cart.number,
            'simplegoods':simplegoods,
            'mygoodsid':goodsid
        }

        return JsonResponse(data)
    else:#未登录则跳转到登录页面
        data = {
            'msg':'请先登录!',
            'status':0

        }
        return JsonResponse(data)




#从购物车减掉对应商品
def subcart(request):
    print("1111111111111111111")
    token = request.session.get('token')
    user = User.objects.get(token=token)

    goodsid = request.GET.get('goodsid')
    goods = Goods.objects.get(pk=goodsid)
    carts = Cart.objects.filter(user=user).filter(goods=goods)
    cart = Cart.objects.filter(user=user).filter(goods=goods).first()
    cart.number = cart.number - 1
    cart.save()
    simplegoods = 0
    for i in carts:
        total1 = i.number * i.goods.price
        simplegoods = simplegoods+total1
    data = {
        'msg':'{}-商品删减成功'.format(goods.name),
        'status': 1,
        'number': cart.number,
        'simplegoods':simplegoods,
        'mygoodsid':goodsid
    }

    return JsonResponse(data)


#改变购物车商品选中状态
def changecartstatus(request):
    return None

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


