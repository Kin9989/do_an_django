# import hashlib
# import hmac
# import json
# import random
# from datetime import datetime

# from django.shortcuts import render, HttpResponse
# from django.conf import settings
# from django.http import JsonResponse
# from django.shortcuts import redirect
# from base.vnpay import vnpay
# from base.forms import PaymentForm


# # Utility function to get client IP address
# def get_client_ip(request):
#     x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
#     if x_forwarded_for:
#         ip = x_forwarded_for.split(",")[0]
#     else:
#         ip = request.META.get("REMOTE_ADDR")
#     return ip


# # Unique request ID generator
# n = random.randint(10**11, 10**12 - 1)
# n_str = str(n)
# while len(n_str) < 12:
#     n_str = "0" + n_str


# # HMAC-SHA512 hash function
# def hmacsha512(key, data):
#     byteKey = key.encode("utf-8")
#     byteData = data.encode("utf-8")
#     return hmac.new(byteKey, byteData, hashlib.sha512).hexdigest()


# # Index view returning JSON data
# def index(request):
#     return JsonResponse({"title": "Danh sách demo"})


# # Payment view processing
# def payment(request):
#     if request.method == "POST":
#         form = PaymentForm(request.POST)
#         if form.is_valid():
#             order_type = form.cleaned_data["order_type"]
#             order_id = form.cleaned_data["order_id"]
#             amount = form.cleaned_data["amount"]
#             order_desc = form.cleaned_data["order_desc"]
#             bank_code = form.cleaned_data["bank_code"]
#             language = form.cleaned_data["language"]
#             ipaddr = get_client_ip(request)

#             vnp = vnpay()
#             vnp.requestData["vnp_Version"] = "2.1.0"
#             vnp.requestData["vnp_Command"] = "pay"
#             vnp.requestData["vnp_TmnCode"] = settings.VNPAY_TMN_CODE
#             vnp.requestData["vnp_Amount"] = amount * 100
#             vnp.requestData["vnp_CurrCode"] = "VND"
#             vnp.requestData["vnp_TxnRef"] = order_id
#             vnp.requestData["vnp_OrderInfo"] = order_desc
#             vnp.requestData["vnp_OrderType"] = order_type
#             vnp.requestData["vnp_Locale"] = language if language else "vn"
#             vnp.requestData["vnp_BankCode"] = bank_code if bank_code else ""
#             vnp.requestData["vnp_CreateDate"] = datetime.now().strftime("%Y%m%d%H%M%S")
#             vnp.requestData["vnp_IpAddr"] = ipaddr
#             vnp.requestData["vnp_ReturnUrl"] = settings.VNPAY_RETURN_URL

#             vnpay_payment_url = vnp.get_payment_url(
#                 settings.VNPAY_PAYMENT_URL, settings.VNPAY_HASH_SECRET_KEY
#             )
#             return JsonResponse({"redirect_url": vnpay_payment_url})
#         else:
#             return JsonResponse({"error": "Form input not valid"}, status=400)
#     else:
#         return JsonResponse({"title": "Thanh toán"})


# # Payment IPN view returning JSON data
# def payment_ipn(request):
#     inputData = request.GET
#     if inputData:
#         vnp = vnpay()
#         vnp.responseData = inputData.dict()
#         order_id = inputData["vnp_TxnRef"]
#         amount = inputData["vnp_Amount"]
#         vnp_ResponseCode = inputData["vnp_ResponseCode"]
#         if vnp.validate_response(settings.VNPAY_HASH_SECRET_KEY):
#             if vnp_ResponseCode == "00":
#                 return JsonResponse({"RspCode": "00", "Message": "Confirm Success"})
#             else:
#                 return JsonResponse({"RspCode": "01", "Message": "Payment Error"})
#         else:
#             return JsonResponse({"RspCode": "97", "Message": "Invalid Signature"})
#     else:
#         return JsonResponse({"RspCode": "99", "Message": "Invalid request"})


# # Payment return view returning JSON data
# def payment_return(request):
#     inputData = request.GET
#     if inputData:
#         vnp = vnpay()
#         vnp.responseData = inputData.dict()
#         order_id = inputData["vnp_TxnRef"]
#         amount = int(inputData["vnp_Amount"]) / 100
#         vnp_ResponseCode = inputData["vnp_ResponseCode"]
#         if vnp.validate_response(settings.VNPAY_HASH_SECRET_KEY):
#             result = "Thành công" if vnp_ResponseCode == "00" else "Lỗi"
#             return JsonResponse(
#                 {
#                     "title": "Kết quả thanh toán",
#                     "result": result,
#                     "order_id": order_id,
#                     "amount": amount,
#                     "vnp_TransactionNo": inputData["vnp_TransactionNo"],
#                     "vnp_ResponseCode": vnp_ResponseCode,
#                 }
#             )
#         else:
#             return JsonResponse(
#                 {
#                     "title": "Kết quả thanh toán",
#                     "result": "Lỗi",
#                     "order_id": order_id,
#                     "amount": amount,
#                     "vnp_TransactionNo": inputData["vnp_TransactionNo"],
#                     "vnp_ResponseCode": vnp_ResponseCode,
#                     "msg": "Sai checksum",
#                 }
#             )
#     else:
#         return JsonResponse({"title": "Kết quả thanh toán", "result": ""})


# # Query transaction view returning JSON data
# def query(request):
#     if request.method == "POST":
#         url = settings.VNPAY_API_URL
#         secret_key = settings.VNPAY_HASH_SECRET_KEY
#         vnp_TmnCode = settings.VNPAY_TMN_CODE
#         vnp_Version = "2.1.0"
#         vnp_RequestId = n_str
#         vnp_Command = "querydr"
#         vnp_TxnRef = request.POST["order_id"]
#         vnp_OrderInfo = "kiem tra gd"
#         vnp_TransactionDate = request.POST["trans_date"]
#         vnp_CreateDate = datetime.now().strftime("%Y%m%d%H%M%S")
#         vnp_IpAddr = get_client_ip(request)

#         hash_data = "|".join(
#             [
#                 vnp_RequestId,
#                 vnp_Version,
#                 vnp_Command,
#                 vnp_TmnCode,
#                 vnp_TxnRef,
#                 vnp_TransactionDate,
#                 vnp_CreateDate,
#                 vnp_IpAddr,
#                 vnp_OrderInfo,
#             ]
#         )
#         secure_hash = hmac.new(
#             secret_key.encode(), hash_data.encode(), hashlib.sha512
#         ).hexdigest()

#         data = {
#             "vnp_RequestId": vnp_RequestId,
#             "vnp_TmnCode": vnp_TmnCode,
#             "vnp_Command": vnp_Command,
#             "vnp_TxnRef": vnp_TxnRef,
#             "vnp_OrderInfo": vnp_OrderInfo,
#             "vnp_TransactionDate": vnp_TransactionDate,
#             "vnp_CreateDate": vnp_CreateDate,
#             "vnp_IpAddr": vnp_IpAddr,
#             "vnp_Version": vnp_Version,
#             "vnp_SecureHash": secure_hash,
#         }

#         headers = {"Content-Type": "application/json"}
#         response = requests.post(url, headers=headers, data=json.dumps(data))

#         if response.status_code == 200:
#             response_json = response.json()
#         else:
#             response_json = {
#                 "error": f"Request failed with status code: {response.status_code}"
#             }

#         return JsonResponse(
#             {"title": "Kiểm tra kết quả giao dịch", "response_json": response_json}
#         )
#     else:
#         return JsonResponse({"title": "Kiểm tra kết quả giao dịch"})


# # Refund view returning JSON data
# def refund(request):
#     if request.method == "POST":
#         url = settings.VNPAY_API_URL
#         secret_key = settings.VNPAY_HASH_SECRET_KEY
#         vnp_TmnCode = settings.VNPAY_TMN_CODE
#         vnp_RequestId = n_str
#         vnp_Version = "2.1.0"
#         vnp_Command = "refund"
#         vnp_TransactionType = request.POST["TransactionType"]
#         vnp_TxnRef = request.POST["order_id"]
#         vnp_Amount = request.POST["amount"]
#         vnp_OrderInfo = request.POST["order_desc"]
#         vnp_TransactionNo = "0"
#         vnp_TransactionDate = request.POST["trans_date"]
#         vnp_CreateDate = datetime.now().strftime("%Y%m%d%H%M%S")
#         vnp_CreateBy = "user01"
#         vnp_IpAddr = get_client_ip(request)

#         hash_data = "|".join(
#             [
#                 vnp_RequestId,
#                 vnp_Version,
#                 vnp_Command,
#                 vnp_TmnCode,
#                 vnp_TransactionType,
#                 vnp_TxnRef,
#                 vnp_Amount,
#                 vnp_TransactionNo,
#                 vnp_TransactionDate,
#                 vnp_CreateBy,
#                 vnp_CreateDate,
#                 vnp_IpAddr,
#                 vnp_OrderInfo,
#             ]
#         )
#         secure_hash = hmac.new(
#             secret_key.encode(), hash_data.encode(), hashlib.sha512
#         ).hexdigest()

#         data = {
#             "vnp_RequestId": vnp_RequestId,
#             "vnp_TmnCode": vnp_TmnCode,
#             "vnp_Command": vnp_Command,
#             "vnp_TransactionType": vnp_TransactionType,
#             "vnp_TxnRef": vnp_TxnRef,
#             "vnp_Amount": vnp_Amount,
#             "vnp_OrderInfo": vnp_OrderInfo,
#             "vnp_TransactionNo": vnp_TransactionNo,
#             "vnp_TransactionDate": vnp_TransactionDate,
#             "vnp_CreateDate": vnp_CreateDate,
#             "vnp_CreateBy": vnp_CreateBy,
#             "vnp_IpAddr": vnp_IpAddr,
#             "vnp_Version": vnp_Version,
#             "vnp_SecureHash": secure_hash,
#         }

#         headers = {"Content-Type": "application/json"}
#         response = requests.post(url, headers=headers, data=json.dumps(data))

#         if response.status_code == 200:
#             response_json = response.json()
#         else:
#             response_json = {
#                 "error": f"Request failed with status code: {response.status_code}"
#             }

#         return JsonResponse(
#             {"title": "Hoàn tiền giao dịch VNPAY", "response_json": response_json}
#         )
#     else:
#         return JsonResponse({"title": "Hoàn tiền giao dịch VNPAY"})
