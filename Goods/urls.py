from django.conf.urls import url

from Goods import views

urlpatterns = [
    url(r'^index/$',views.index,name='index'),#首页

    url(r'^register/$',views.register,name='register'),#注册
    url(r'^login/$',views.login,name='login'),#登录
    url(r'^logout/$',views.logout,name='logout'),#退出
    # url(r'^show_car/$',views.show_car,name='show_car'),
    url(r'^goods_detail/(\d+)/$',views.goods_detail,name='goods_detail'),#商品详情
    url(r'^shop_car/$',views.shop_car,name='shop_car'), #购物车展示
    url(r'^empty_car/$',views.empty_car,name='empty_car'), #空购物车
    url(r'^checkphonenum/$',views.checkphonenum,name='checkphonenum'), #注册校验
    url(r'^addcart/$',views.addcart,name='addcart'),#添加到购物车
    url(r'^subcart/$',views.subcart,name='subcart'),#从购物车减
    url(r'^changecartstatus/$',views.changecartstatus,name='changecartstatus'),#购物车商品选中状态改变
    url(r'^changecartall/$',views.changecartall,name='changecartall'),


]