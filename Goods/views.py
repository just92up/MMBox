import hashlib
import random
import time


from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect

# Create your views here.
from django.views.decorators.csrf import csrf_exempt

from Goods.alipay import alipay
from Goods.models import User, Banner, Advert, Goods, Cart, Order, OrderGoods


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
    cartid = request.GET.get('cartid')
    cart = Cart.objects.get(pk=cartid)
    cart.isselect = not cart.isselect
    cart.save()

    data = {
        'msg':'状态修改成功',
        'status':1,
        'isselect':cart.isselect
    }
    return JsonResponse(data)


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


def changecartall(request):
    token = request.session.get('token')
    user = User.objects.get(token=token)

    isall = request.GET.get('isall')
    if isall == 'true':
        isall = True
    else:
        isall = False

    carts = Cart.objects.filter(user=user).update(isselect=isall)
    data = {
        'msg':'状态修改成功',
        'status':1
    }
    return JsonResponse(data)


def orderlist(request):
    token = request.session.get('token')
    users = User.objects.get(token=token)
    username = users.username
    orders = Order.objects.filter(user=users)
    return render(request,'orderlist.html',context={'orders':orders,'username':username})


def orderdetail(request,identifier):
    token = request.session.get('token')
    users = User.objects.get(token=token)
    username = users.username

    order = Order.objects.get(identifier=identifier)
    return render(request, 'orderdetail.html', context={'order': order,'username':username})

# 生成订单号
def generate_identifire():
    tempstr = str(int(time.time())) + str(random.random())
    return tempstr


# 下单
def generateorder(request):
    token = request.session.get('token')
    user = User.objects.get(token=token)

    # 订单
    order = Order()
    order.user = user
    order.identifier = generate_identifire()
    order.save()

    # 订单商品
    carts = Cart.objects.filter(user=user).filter(isselect=True).exclude(number=0)
    # 只有选中的商品，才是添加到订单中，从购物车中删除
    for cart in carts:
        orderGoods = OrderGoods()
        orderGoods.order = order
        orderGoods.goods = cart.goods
        orderGoods.number = cart.number
        orderGoods.save()

        # 从购物车中删除
        cart.delete()

    data = {
        'msg': '下单成功',
        'status': 1,
        'identifier': order.identifier
    }

    return JsonResponse(data)


@csrf_exempt
def appnotify(request):
    # http://112.74.55.3/axf/returnview/?charset=utf-8&out_trade_no=15477988300.6260414050156342&method=alipay.trade.page.pay.return&total_amount=93.00&sign=oaTJZPDeswBfEbQGkBND8w8DDOWGMdz8lw6TlL25Sp73TZtTBqUBx2vazVi5sI6pFLSgfF%2FRsxsiY20S5UzZeCJ5hfrGXp4NCg6ZpZE%2FWS1CsMnI74lO%2F8ttTx1j%2FzfhrJJuTIHJ503Z1wiDZoXHer91ynI%2FCTLn8W0de2fVhnBi5hTo7MJHJBZQnVQ%2BnFJ73cKBB16xdIJ15ISVUrYYi%2FUGJr2jh%2BllGiiTVm4o0maDuYH3ljuGVxAI4yvP%2BevAfo7B2MK%2F1BW3%2FVu8JRLatEIqeyV2Qk87%2F%2FGRndFRjRDuuZMU8zzix0eg0oKYVeBmfOnRPXhMFAs8dGPedC1D2Q%3D%3D&trade_no=2019011822001416700501217055&auth_app_id=2016091800542542&version=1.0&app_id=2016091800542542&sign_type=RSA2&seller_id=2088102176233911&timestamp=2019-01-18+16%3A08%3A08

    # 获取订单号，并且修改订单状态
    if request.method == 'POST':
        from urllib.parse import parse_qs
        body_str = request.body.decode('utf-8')
        post_data = parse_qs(body_str)
        post_dir = {}

        print(body_str)
        print(post_data)
        print(post_data.items())
        for key, value in post_data.items():
            post_dir[key] = value[0]

        out_trade_no = post_dir['out_trade_no']
        print(out_trade_no)

        # 更新状态
        Order.objects.filter(identifier=out_trade_no).update(status=1)

        return JsonResponse({'msg': 'success'})


def returnview(request):
    return redirect('mmbox:index')


def pay(request):
    identifier = request.GET.get('identifier')
    order = Order.objects.get(identifier=identifier)

    sum = 0
    for orderGoods in order.ordergoods_set.all():
        sum += orderGoods.goods.price * orderGoods.number

    # 支付地址
    url = alipay.direct_pay(
        subject='MEIMEIBox - 爆款',  # 支付宝页面显示的标题
        out_trade_no=identifier,  # AXF订单编号
        total_amount=str(sum),  # 订单金额
        return_url='http://47.107.170.114/mmbox/returnview/'
    )

    # 拼接上支付网关
    alipayurl = 'https://openapi.alipaydev.com/gateway.do?{data}'.format(data=url)

    return JsonResponse({'alipayurl': alipayurl, 'status': 1})




