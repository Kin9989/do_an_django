# Django Import
from django.core.exceptions import RequestDataTooBig
from django.shortcuts import render
from datetime import datetime, timedelta
from decimal import Decimal
from rest_framework import status

# Rest Framework Import
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.serializers import Serializer


# Local Import
from base.products import products
from base.models import *
from base.models import Coupon
from base.serializers import ProductSerializer, OrderSerializer
from base.serializers import CouponSerializer

from django.db.models import Count, Sum
from django.utils.timezone import now

# views start from here


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    print(data)
    orderItems = data["orderItems"]

    if orderItems and len(orderItems) == 0:
        return Response(
            {"detail": "No Order Items", "status": status.HTTP_400_BAD_REQUEST}
        )
    else:
        # (1) Create Order
        order = Order.objects.create(
            user=user,
            paymentMethod=data["paymentMethod"],
            taxPrice=data["taxPrice"],
            shippingPrice=data["shippingPrice"],
            totalPrice=data["totalPrice"],
        )

        # (2) Create Shipping Address

        shipping = ShippingAddress.objects.create(
            order=order,
            address=data["shippingAddress"]["address"],
            city=data["shippingAddress"]["city"],
            postalCode=data["shippingAddress"]["postalCode"],
            country=data["shippingAddress"]["country"],
        )

        # (3) Create order items

        for i in orderItems:
            product = Product.objects.get(_id=i["product"])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i["qty"],
                price=i["price"],
                image=product.image.url,
            )

            # (4) Update Stock

            product.countInStock -= item.qty
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.orders.all()  # Use the related_name "orders" here
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user

    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response(
                {"detail": "Not Authorized  to view this order"},
                status=status.HTTP_400_BAD_REQUEST,
            )
    except:
        return Response(
            {"detail": "Order does not exist"}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk)
    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()
    return Response("Order was paid")


@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    order = Order.objects.get(_id=pk)
    order.isDeliver = True
    order.deliveredAt = datetime.now()
    order.save()
    return Response("Order was Delivered")


@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updateOrderStatus(request, pk):
    order = Order.objects.get(_id=pk)

    # Nhận trạng thái mới từ request data
    new_status = request.data.get("new_status", None)
    # Kiểm tra nếu trạng thái mới hợp lệ
    if new_status in [
        "Đã nhận được đơn hàng",
        "Đang soạn đơn",
        "Đã gửi bên vận chuyển",
        "Giao hàng thành công",
        "Boom hàng",
    ]:
        # Cập nhật trạng thái mới và thời gian tương ứng
        order.new_status = new_status  # Thay đổi tên trường thành new_status
        if new_status == "giao hàng thành công":
            order.deliveredAt = datetime.now()
        order.save()
        return Response("Trạng thái đơn hàng đã được cập nhật thành công")
    else:
        return Response("Trạng thái đơn hàng không hợp lệ", status=400)


@api_view(["POST"])
def getToatalFollowDMY(request):
    # Lấy ngày, tháng và năm từ body của yêu cầu POST
    day = request.data.get("day")
    month = request.data.get("month")
    year = request.data.get("year")
    orders_data = []
    # Kiểm tra xem ngày và năm đã được cung cấp hay không

    if day and not (month and year):
        return Response({"error": "Vui lòng nhập tháng và năm"})

    if day and month and year:  # Tính theo ngày, tháng, năm
        orders = Order.objects.filter(
            isPaid=True,
            createdAt__day=day,
            createdAt__month=month,
            createdAt__year=year,
        )
        total_revenue = orders.aggregate(total_revenue=Sum("totalPrice"))[
            "total_revenue"
        ]
        total_orders = orders.count()
    elif month and year:  # Tính theo tháng, năm
        orders = Order.objects.filter(
            createdAt__month=month, createdAt__year=year, isPaid=True
        )
        total_revenue = orders.aggregate(total_revenue=Sum("totalPrice"))[
            "total_revenue"
        ]
        total_orders = orders.count()
    elif year:  # Tính theo năm
        orders = Order.objects.filter(createdAt__year=year, isPaid=True)
        total_revenue = orders.aggregate(total_revenue=Sum("totalPrice"))[
            "total_revenue"
        ]
        total_orders = orders.count()

    else:  # Không có thông tin về ngày, tháng, năm
        return Response({"error": "Please provide at least year"})

    for order in orders:
        orders_data.append(
            {
                "_id": order._id,  # Thêm trường ID của đơn hàng
                "totalPrice": order.totalPrice,
                # "paidAt": order.paidAt,
            }
        )

    return Response(
        {
            "total_orders": total_orders,
            "total_revenue": total_revenue,
            "orders": orders_data,
        }
    )


@api_view(["POST"])
# @permission_classes([IsAdminUser])
def getToatalDMY(request):
    day_start = request.data.get("day_start")
    day_end = request.data.get("day_end")
    month_start = request.data.get("month_start")
    month_end = request.data.get("month_end")
    year_start = request.data.get("year_start")
    year_end = request.data.get("year_end")
    orders_data = []

    # Chuyển đổi các giá trị thành số nguyên
    try:
        if day_start:
            day_start = int(day_start)
        if day_end:
            day_end = int(day_end)
        if month_start:
            month_start = int(month_start)
        if month_end:
            month_end = int(month_end)
        if year_start:
            year_start = int(year_start)
        if year_end:
            year_end = int(year_end)
    except ValueError:
        return Response({"error": "Invalid date input"})

    # Kiểm tra xem ngày và năm đã được cung cấp hay không
    if (day_start or day_end) and not (
        month_start and month_end and year_start and year_end
    ):
        return Response({"error": "Vui lòng nhập đầy đủ tháng và năm"})

    if day_start and day_end and month_start and month_end and year_start and year_end:
        start_date = datetime(year_start, month_start, day_start)
        end_date = datetime(year_end, month_end, day_end)
        orders = Order.objects.filter(
            isPaid=True,
            createdAt__gte=start_date,
            createdAt__lte=end_date,
        )
        total_revenue = orders.aggregate(total_revenue=Sum("totalPrice"))[
            "total_revenue"
        ]
        total_orders = orders.count()
    elif month_start and month_end and year_start and year_end:
        start_date = datetime(year_start, month_start, 1)
        end_date = datetime(year_end, month_end, 1) + relativedelta(months=1, days=-1)
        orders = Order.objects.filter(
            createdAt__gte=start_date,
            createdAt__lte=end_date,
            isPaid=True,
        )
        total_revenue = orders.aggregate(total_revenue=Sum("totalPrice"))[
            "total_revenue"
        ]
        total_orders = orders.count()
    elif year_start and year_end:
        start_date = datetime(year_start, 1, 1)
        end_date = datetime(year_end, 12, 31)
        orders = Order.objects.filter(
            createdAt__gte=start_date,
            createdAt__lte=end_date,
            isPaid=True,
        )
        total_revenue = orders.aggregate(total_revenue=Sum("totalPrice"))[
            "total_revenue"
        ]
        total_orders = orders.count()
    else:
        return Response({"error": "Please provide at least year range"})

    for order in orders:
        orders_data.append(
            {
                "_id": order._id,
                "totalPrice": order.totalPrice,
            }
        )

    return Response(
        {
            "total_orders": total_orders,
            "total_revenue": total_revenue,
            "orders": orders_data,
        }
    )


@api_view(["GET"])
@permission_classes([IsAdminUser])
def get_order_statisticsUP(request):
    # Lấy tất cả các đơn hàng đã thanh toán
    paid_orders = Order.objects.filter(isPaid=True)

    # Lấy top sản phẩm được mua nhiều nhất
    top_product_paid = (
        OrderItem.objects.filter(order__in=paid_orders)
        .values("name")
        .annotate(total_qty=Sum("qty"))
        .order_by("-total_qty")
        .first()
    )

    # Lấy người dùng đã mua nhiều nhất theo số tiền sản phẩm
    user_paid_money_high = (
        paid_orders.values(
            "user_id", "user__username"
        )  # Hoặc "user__email" tùy thuộc vào trường bạn muốn sử dụng
        .annotate(total_money=Sum("totalPrice"))
        .order_by("-total_money")
        .first()
    )
    # Lấy người dùng đã mua nhiều nhất theo số sản phẩm
    user_bought_high = (
        paid_orders.values(
            "user_id",
            "user__username",
        )  # Hoặc "user__email" tùy thuộc vào trường bạn muốn sử dụng
        .annotate(total_orders=Sum(1))
        .order_by("-total_orders")
        .first()
    )

    # Lấy thông tin sản phẩm được mua nhiều nhất và số lượt mua
    rate_product = (
        OrderItem.objects.filter(order__in=paid_orders)
        .values("name")
        .annotate(total_orders=Sum("qty"))
        .order_by("-total_orders")
    )

    # Lấy thông tin người dùng mua nhiều nhất, số lượt mua và tổng tiền
    rate_user = (
        paid_orders.values("user_id", "user__username", "user__first_name")
        .annotate(total_orders=Count("_id"), total_money=Sum("totalPrice"))
        .order_by("-total_money")
    )
    today = datetime.now().date()
    yesterday = today - timedelta(days=1)
    today_revenue = (
        paid_orders.filter(paidAt__date=today).aggregate(
            today_revenue=Sum("totalPrice")
        )["today_revenue"]
        or 0
    )

    yesterday_revenue = (
        Order.objects.filter(isPaid=True, paidAt__date=yesterday).aggregate(
            yesterday_revenue=Sum("totalPrice")
        )["yesterday_revenue"]
        or 0
    )

    if yesterday_revenue == 0:
        if today_revenue == 0:
            percentage_change = 0
            change_symbol = "0%"
        else:
            percentage_change = 100  # Nếu hôm qua không có doanh thu, bất kỳ doanh thu nào hôm nay đều là tăng 100%
            change_symbol = f"+{percentage_change}%"
    else:
        percentage_change = (
            (today_revenue - yesterday_revenue) / yesterday_revenue
        ) * 100
        if percentage_change >= 0:
            change_symbol = f"+{percentage_change:.2f}%"
        else:
            change_symbol = f"{percentage_change:.2f}%"

    total_revenueP = (
        Order.objects.filter(isPaid=True).aggregate(total_revenueP=Sum("totalPrice"))[
            "total_revenueP"
        ]
        or 0
    )

    total_revenueOder = Order.objects.filter(isPaid=True).count() or 0
    return Response(
        {
            "topProductPaid": top_product_paid,
            "userPaidMoneyHigh": user_paid_money_high,
            "userBoughtHigh": user_bought_high,
            "rateProduct": rate_product,
            "rateUser": rate_user,
            "today_revenue": today_revenue,
            "yesterday_revenue": yesterday_revenue,
            "percentageChange": percentage_change,
            "changeSymbol": change_symbol,
            "total_revenueP": total_revenueP,
            "total_revenueOder": total_revenueOder,
        }
    )


@api_view(["GET"])
# @permission_classes([IsAdminUser])
def products_statistics(request):
    # Lấy tất cả các đơn hàng đã thanh toán
    paid_orders = Order.objects.filter(isPaid=True)
    # Lấy thông tin sản phẩm được mua nhiều nhất và số lượt mua
    rate_product = (
        OrderItem.objects.filter(order__in=paid_orders)
        .values("name")
        .annotate(total_orders=Sum("qty"))
        .order_by("-total_orders")
    )
    return Response(
        {
            "rateProduct": rate_product,
        }
    )


@api_view(["POST"])
# @permission_classes([IsAdminUser])
def product_statistics(request):
    # Lấy tên sản phẩm từ dữ liệu POST
    product_name = request.data.get("product_name", None)

    if not product_name:
        return Response({"error": "Tên sản phẩm không được bỏ trống"}, status=400)

    # Lấy thông tin sản phẩm dựa trên tên
    product_info = OrderItem.objects.filter(name__icontains=product_name)

    # Tính tổng số lượng sản phẩm đã bán
    total_sold = product_info.aggregate(total_sold=Sum("qty"))["total_sold"] or 0

    # Tính tổng doanh thu từ sản phẩm
    total_revenue = (
        product_info.aggregate(total_revenue=Sum("price"))["total_revenue"] or 0
    )

    return Response(
        {
            "product_name": product_name,
            "total_sold": total_sold,
            "total_revenue": total_revenue,
        }
    )


# ----------------------coupon ----------------------


@api_view(["GET"])
# @permission_classes([IsAdminUser])
def get_coupons(request):
    coupons = Coupon.objects.all()
    serializer = CouponSerializer(coupons, many=True)
    return Response(serializer.data)


@api_view(["GET"])
# @permission_classes([IsAdminUser])
def get_coupon_by_id(request, pk):
    try:
        coupon = Coupon.objects.get(pk=pk)
    except Coupon.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CouponSerializer(coupon)
    return Response(serializer.data)


@api_view(["POST"])
# @permission_classes([IsAdminUser])
def add_coupon(request):
    serializer = CouponSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
# @permission_classes([IsAdminUser])
def delete_coupon(request, pk):
    try:
        coupon = Coupon.objects.get(pk=pk)
    except Coupon.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    coupon.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["PUT"])
# @permission_classes([IsAdminUser])
def update_coupon(request, pk):
    try:
        coupon = Coupon.objects.get(pk=pk)
    except Coupon.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CouponSerializer(coupon, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def check_coupon(request):
    code = request.data.get("code")
    if not code:
        return Response(
            {"error": "Vui lòng nhập mã khuyến mãi"}, status=status.HTTP_400_BAD_REQUEST
        )

    try:
        coupon = Coupon.objects.get(code=code)
        return Response({"discount": coupon.discount})
    except Coupon.DoesNotExist:
        return Response(
            {"error": "Mã khuyến mãi không tồn tại"}, status=status.HTTP_404_NOT_FOUND
        )


# vnpay
import hashlib
import hmac
import json
import random
from datetime import datetime

from django.shortcuts import render, HttpResponse
from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import redirect
from base.vnpay import vnpay
from base.forms import PaymentForm
from django.views.decorators.csrf import csrf_exempt

from django.middleware.csrf import get_token


@api_view(["GET"])
def get_csrf_token(request):
    csrf_token = get_token(request)
    print("csrf_token: ", csrf_token)
    return JsonResponse({"csrf_token": csrf_token})


def get_client_ip(request):
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        ip = x_forwarded_for.split(",")[0]
    else:
        ip = request.META.get("REMOTE_ADDR")
    return ip


# Unique request ID generator
n = random.randint(10**11, 10**12 - 1)
n_str = str(n)
while len(n_str) < 12:
    n_str = "0" + n_str


# HMAC-SHA512 hash function
def hmacsha512(key, data):
    byteKey = key.encode("utf-8")
    byteData = data.encode("utf-8")
    return hmac.new(byteKey, byteData, hashlib.sha512).hexdigest()


# Index view returning JSON data
def index(request):
    return JsonResponse({"title": "Danh sách demo"})


def payment(request):

    if request.method == "POST":
        # Directly assigning fixed values instead of validating form input
        order_type = request.POST.get("order_type")
        # order_id = request.POST.get("order_id")
        order_id = 48

        amount = 259680
        order_desc = request.POST.get("order_desc")
        bank_code = request.POST.get("bank_code")
        language = request.POST.get("language")
        ipaddr = get_client_ip(request)

        # Build URL Payment
        vnp = vnpay()
        vnp.requestData["vnp_Version"] = "2.1.0"
        vnp.requestData["vnp_Command"] = "pay"
        vnp.requestData["vnp_TmnCode"] = settings.VNPAY_TMN_CODE
        vnp.requestData["vnp_Amount"] = amount * 100
        vnp.requestData["vnp_CurrCode"] = "VND"
        vnp.requestData["vnp_TxnRef"] = order_id
        vnp.requestData["vnp_OrderInfo"] = order_desc
        vnp.requestData["vnp_OrderType"] = order_type

        # Check language, default: vn
        if language and language != "":
            vnp.requestData["vnp_Locale"] = language
        else:
            vnp.requestData["vnp_Locale"] = "vn"

        # Check bank_code, if bank_code is empty, customer will be selected bank on VNPAY
        if bank_code and bank_code != "":
            vnp.requestData["vnp_BankCode"] = bank_code

        vnp.requestData["vnp_CreateDate"] = datetime.now().strftime("%Y%m%d%H%M%S")
        vnp.requestData["vnp_IpAddr"] = ipaddr
        vnp.requestData["vnp_ReturnUrl"] = "http://localhost:3000/#/pay/success"

        vnpay_payment_url = vnp.get_payment_url(
            settings.VNPAY_PAYMENT_URL, settings.VNPAY_HASH_SECRET_KEY
        )
        print("VNPAY Payment URL:", vnpay_payment_url)

        return JsonResponse({"redirect_url": vnpay_payment_url})

    else:
        return JsonResponse({"title": "Thanh toán"})


# Payment IPN view returning JSON data
def payment_ipn(request):
    inputData = request.GET
    if inputData:
        vnp = vnpay()
        vnp.responseData = inputData.dict()
        order_id = inputData["vnp_TxnRef"]
        amount = inputData["vnp_Amount"]
        vnp_ResponseCode = inputData["vnp_ResponseCode"]
        if vnp.validate_response(settings.VNPAY_HASH_SECRET_KEY):
            if vnp_ResponseCode == "00":
                return JsonResponse({"RspCode": "00", "Message": "Confirm Success"})
            else:
                return JsonResponse({"RspCode": "01", "Message": "Payment Error"})
        else:
            return JsonResponse({"RspCode": "97", "Message": "Invalid Signature"})
    else:
        return JsonResponse({"RspCode": "99", "Message": "Invalid request"})


# Payment return view returning JSON data
def payment_return(request):
    inputData = request.GET
    if inputData:
        vnp = vnpay()
        vnp.responseData = inputData.dict()
        order_id = inputData["vnp_TxnRef"]
        amount = int(inputData["vnp_Amount"]) / 100
        order_desc = inputData["vnp_OrderInfo"]
        vnp_TransactionNo = inputData["vnp_TransactionNo"]
        vnp_ResponseCode = inputData["vnp_ResponseCode"]
        vnp_TmnCode = inputData["vnp_TmnCode"]
        vnp_PayDate = inputData["vnp_PayDate"]
        vnp_BankCode = inputData["vnp_BankCode"]
        vnp_CardType = inputData["vnp_CardType"]
        if vnp.validate_response(settings.VNPAY_HASH_SECRET_KEY):
            result = "Thành công" if vnp_ResponseCode == "00" else "Lỗi"
            return JsonResponse(
                {
                    "title": "Kết quả thanh toán",
                    "result": result,
                    "order_id": order_id,
                    "amount": amount,
                    "vnp_TransactionNo": inputData["vnp_TransactionNo"],
                    "vnp_ResponseCode": vnp_ResponseCode,
                }
            )
        else:
            return JsonResponse(
                {
                    "title": "Kết quả thanh toán",
                    "result": "Lỗi",
                    "order_id": order_id,
                    "amount": amount,
                    "vnp_TransactionNo": inputData["vnp_TransactionNo"],
                    "vnp_ResponseCode": vnp_ResponseCode,
                    "msg": "Sai checksum",
                }
            )
    else:
        return JsonResponse({"title": "Kết quả thanh toán", "result": ""})


# Query transaction view returning JSON data
def query(request):
    if request.method == "POST":
        url = settings.VNPAY_API_URL
        secret_key = settings.VNPAY_HASH_SECRET_KEY
        vnp_TmnCode = settings.VNPAY_TMN_CODE
        vnp_Version = "2.1.0"
        vnp_RequestId = n_str
        vnp_Command = "querydr"
        vnp_TxnRef = request.POST["order_id"]
        vnp_OrderInfo = "kiem tra gd"
        vnp_TransactionDate = request.POST["trans_date"]
        vnp_CreateDate = datetime.now().strftime("%Y%m%d%H%M%S")
        vnp_IpAddr = get_client_ip(request)

        hash_data = "|".join(
            [
                vnp_RequestId,
                vnp_Version,
                vnp_Command,
                vnp_TmnCode,
                vnp_TxnRef,
                vnp_TransactionDate,
                vnp_CreateDate,
                vnp_IpAddr,
                vnp_OrderInfo,
            ]
        )
        secure_hash = hmac.new(
            secret_key.encode(), hash_data.encode(), hashlib.sha512
        ).hexdigest()

        data = {
            "vnp_RequestId": vnp_RequestId,
            "vnp_TmnCode": vnp_TmnCode,
            "vnp_Command": vnp_Command,
            "vnp_TxnRef": vnp_TxnRef,
            "vnp_OrderInfo": vnp_OrderInfo,
            "vnp_TransactionDate": vnp_TransactionDate,
            "vnp_CreateDate": vnp_CreateDate,
            "vnp_IpAddr": vnp_IpAddr,
            "vnp_Version": vnp_Version,
            "vnp_SecureHash": secure_hash,
        }

        headers = {"Content-Type": "application/json"}
        response = requests.post(url, headers=headers, data=json.dumps(data))

        if response.status_code == 200:
            response_json = response.json()
        else:
            response_json = {
                "error": f"Request failed with status code: {response.status_code}"
            }

        return JsonResponse(
            {"title": "Kiểm tra kết quả giao dịch", "response_json": response_json}
        )
    else:
        return JsonResponse({"title": "Kiểm tra kết quả giao dịch"})


# Refund view returning JSON data
def refund(request):
    if request.method == "POST":
        url = settings.VNPAY_API_URL
        secret_key = settings.VNPAY_HASH_SECRET_KEY
        vnp_TmnCode = settings.VNPAY_TMN_CODE
        vnp_RequestId = n_str
        vnp_Version = "2.1.0"
        vnp_Command = "refund"
        vnp_TransactionType = request.POST["TransactionType"]
        vnp_TxnRef = request.POST["order_id"]
        vnp_Amount = request.POST["amount"]
        vnp_OrderInfo = request.POST["order_desc"]
        vnp_TransactionNo = "0"
        vnp_TransactionDate = request.POST["trans_date"]
        vnp_CreateDate = datetime.now().strftime("%Y%m%d%H%M%S")
        vnp_CreateBy = "user01"
        vnp_IpAddr = get_client_ip(request)

        hash_data = "|".join(
            [
                vnp_RequestId,
                vnp_Version,
                vnp_Command,
                vnp_TmnCode,
                vnp_TransactionType,
                vnp_TxnRef,
                vnp_Amount,
                vnp_TransactionNo,
                vnp_TransactionDate,
                vnp_CreateBy,
                vnp_CreateDate,
                vnp_IpAddr,
                vnp_OrderInfo,
            ]
        )
        secure_hash = hmac.new(
            secret_key.encode(), hash_data.encode(), hashlib.sha512
        ).hexdigest()

        data = {
            "vnp_RequestId": vnp_RequestId,
            "vnp_TmnCode": vnp_TmnCode,
            "vnp_Command": vnp_Command,
            "vnp_TransactionType": vnp_TransactionType,
            "vnp_TxnRef": vnp_TxnRef,
            "vnp_Amount": vnp_Amount,
            "vnp_OrderInfo": vnp_OrderInfo,
            "vnp_TransactionNo": vnp_TransactionNo,
            "vnp_TransactionDate": vnp_TransactionDate,
            "vnp_CreateDate": vnp_CreateDate,
            "vnp_CreateBy": vnp_CreateBy,
            "vnp_IpAddr": vnp_IpAddr,
            "vnp_Version": vnp_Version,
            "vnp_SecureHash": secure_hash,
        }

        headers = {"Content-Type": "application/json"}
        response = requests.post(url, headers=headers, data=json.dumps(data))

        if response.status_code == 200:
            response_json = response.json()
        else:
            response_json = {
                "error": f"Request failed with status code: {response.status_code}"
            }

        return JsonResponse(
            {"title": "Hoàn tiền giao dịch VNPAY", "response_json": response_json}
        )
    else:
        return JsonResponse({"title": "Hoàn tiền giao dịch VNPAY"})
