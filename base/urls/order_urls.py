from django.urls import path
from base.views import order_views as views
import base.views.payment_views as views1

urlpatterns = [
    path("get-csrf-token/", views.get_csrf_token, name="get_csrf_token"),
    path("payment/", views.payment, name="payment"),
    path("payment_ipn/", views.payment_ipn, name="payment_ipn"),
    path("payment_return/", views.payment_return, name="payment_return"),
    path("query/", views.query, name="query"),
    path("refund/", views.refund, name="refund"),
    path("coupons/", views.get_coupons, name="get_coupons"),
    path("coupons/<int:pk>/", views.get_coupon_by_id, name="get_coupon_by_id"),
    path("coupons/add/", views.add_coupon, name="add_coupon"),
    path("coupons/<int:pk>/delete/", views.delete_coupon, name="delete_coupon"),
    path("coupons/<int:pk>/update/", views.update_coupon, name="update_coupon"),
    path("check_coupon/", views.check_coupon),
    path("", views.getOrders, name="allorders"),
    path("add/", views.addOrderItems, name="orders-add"),
    path("myorders/", views.getMyOrders, name="myorders"),
    path("<str:pk>/deliver/", views.updateOrderToDelivered, name="delivered"),
    path("<str:pk>/updatestatus/", views.updateOrderStatus, name="update-status"),
    path("<str:pk>/", views.getOrderById, name="user-order"),
    path("<str:pk>/pay/", views.updateOrderToPaid, name="pay"),
    path("stats/total/DMY/", views.getToatalFollowDMY, name="total_DMY"),
    path("stats/totalDMY/", views.getToatalDMY, name="total_DMY"),
    path("stats/UP/", views.get_order_statisticsUP, name="total_UP"),
    path("stats/UP/", views.get_order_statisticsUP, name="total_UP"),
    path("stats/products/", views.product_statistics, name="total_DMY"),
    path("stats/productsOverrall/", views.products_statistics, name="total_DMY"),
]
