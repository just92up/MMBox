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