from unicodedata import name
from django.urls import path, include

from . import views


urlpatterns =[
    path("",views.index,name="index"),
    path("current_user",views.current_user,name="current"),
    path("register",views.register,name="register"),
    path("login", views.login_view,name="login"),
    path("logout", views.logout_view,name="logout"),
    path("create", views.createlist,name="create"),
    path("inside/<str:product_id>",views.product_inside_view,name="inside"),
    path("add_comment/<str:product_id>", views.add_comment, name="add_comment"),
    path("add_bid/<str:product_id>", views.add_bid, name="add_bid"),
    path("update_watchlist/<str:product_id>", views.update_watchlist, name="update_watchlist"),
    path("close_auction/<str:product_id>", views.close_auction, name="close_auction"),
]