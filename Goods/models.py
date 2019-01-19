from django.db import models

#用户信息
class User(models.Model):
    username = models.CharField(max_length=100,unique=True)
    password = models.CharField(max_length=80)
    # phone = models.CharField(max_length=128,default='xxxxxx')
    # email = models.CharField(max_length=128,default='xxx@xx.com')
    token = models.CharField(max_length=255)

    def __str__(self):
        return self.username

#商品购买

class Goods(models.Model):
    #商品名称
    name = models.CharField(max_length=100)
    #价格
    price = models.IntegerField()
    #商品图片
    picture = models.CharField(max_length=128)
    #商品描述及说明
    introduce = models.CharField(max_length=255,default='no introduce')

    user = models.ManyToManyField(User)
    def __str__(self):
        return self.name



#购物车中间表
class Cart(models.Model):
    user = models.ForeignKey(User)
    goods = models.ForeignKey(Goods)
    number = models.IntegerField()
    isselect = models.BooleanField(default=True)

#商品购买
# class GoodsBuy(models.Model):
#     #商品名称
#     name = models.CharField(max_length=100)
#     #价格
#     price = models.IntegerField()
#     #商品图片
#     picture = models.CharField(max_length=128)
#     #商品描述及说明
#     introduce = models.CharField(max_length=255,default='no introduce')
#
#     #声明关系，多对多
#     userbuy = models.ManyToManyField(User)
#
#
#     def __str__(self):
#         return self.name
# #商品收藏
# class GoodsCollect(models.Model):
#     #商品名称
#     name = models.CharField(max_length=100)
#     #价格
#     price = models.IntegerField()
#     #商品图片
#     picture = models.CharField(max_length=128)
#     #商品描述及说明
#     introduce = models.CharField(max_length=255,default='no introduce')
#
#     #声明关系，多对多
#     usercollect = models.ManyToManyField(User)
#
#     def __str__(self):
#         return self.name


#轮播图图片
class Banner(models.Model):
    #轮播图图片地址
    imgaddr = models.CharField(max_length=255)

    def __str__(self):
        return self.imgaddr

#轮播图下广告
class Advert(models.Model):
    imgaddr = models.CharField(max_length=255)

    def __str__(self):
        return self.imgaddr


# 订单 模型类
# 一个用户 对应 多个订单
class Order(models.Model):
    # 用户
    user = models.ForeignKey(User)
    # 状态
    # -2 退款
    # -1 过期
    # 0 未付款
    # 1 已付款，未发货
    # 2 已付款，已发货
    # 3 已签收，未评价
    # 4 已评价
    status = models.IntegerField(default=0)
    # 创建时间
    createtime = models.DateTimeField(auto_now_add=True)
    # 订单号
    identifier = models.CharField(max_length=256)




# 订单商品 模型类
# 一个订单 对应 多个商品
class OrderGoods(models.Model):
    # 订单
    order = models.ForeignKey(Order)
    # 商品
    goods = models.ForeignKey(Goods)
    # 商品规格
    number = models.IntegerField()
