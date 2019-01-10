from django.db import models

#用户信息
class User(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=80)
    # phone = models.CharField(max_length=128,default='xxxxxx')
    # email = models.CharField(max_length=128,default='xxx@xx.com')
    token = models.CharField(max_length=255)

    def __str__(self):
        return self.username

#商品
class Goods(models.Model):
    #商品名称
    name = models.CharField(max_length=100)
    #价格
    price = models.IntegerField()
    #商品图片
    picture = models.CharField(max_length=128)
    #商品描述及说明
    introduce = models.CharField(max_length=255,default='no introduce')

    #声明关系，多对多
    user = models.ManyToManyField(User)

    def __str__(self):
        return self.name

#轮播图图片
class Banner(models.Model):
    #轮播图图片地址
    imgaddr = models.CharField(max_length=255)

    def __str__(self):
        return self.imgaddr