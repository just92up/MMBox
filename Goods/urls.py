from django.conf.urls import url

from Goods import views

urlpatterns = [
    url(r'^index/$',views.index,name='index'),
    url(r'^register/$',views.register,name='register'),
    url(r'^login/$',views.login,name='login'),
    url(r'^logout/$',views.logout,name='logout'),
    # url(r'^show_car/$',views.show_car,name='show_car'),
    url(r'^goods_detail/(\d+)/$',views.goods_detail,name='goods_detail'),
    url(r'^shop_car/$',views.shop_car,name='shop_car'),
    url(r'^empty_car/$',views.empty_car,name='empty_car'),
    url(r'^checkphonenum/$',views.checkphonenum,name='checkphonenum')
]