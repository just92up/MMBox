from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request,'index.html')


def register(request):
    return render(request,'register.html')


def login(request):
    return render(request,'login.html')


def logout(request):
    return None


def show_car(request):
    return render(request,'shop_car.html')