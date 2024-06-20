# Django Import
from django.core import paginator
from django.shortcuts import render
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from rest_framework import status

# Rest Framework Import
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.serializers import Serializer


# Local Import
from base.products import products
from base.models import *
from base.serializers import ProductSerializer, CategorySerializer, ReviewSerializer

from django.http import Http404

# from base.test import IsSuperUser, IsStaffUser


@api_view(["GET"])
def getProducts(request):
    query = request.query_params.get("keyword")
    if query == None:
        query = ""

    products = Product.objects.filter(name__icontains=query).order_by("-_id")

    page = request.query_params.get("page")
    paginator = Paginator(products, 6)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1
    page = int(page)

    serializer = ProductSerializer(products, many=True)
    return Response(
        {"products": serializer.data, "page": page, "pages": paginator.num_pages}
    )


# Top Products


@api_view(["GET"])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by("-rating")[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


# Get single products
@api_view(["GET"])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


# Create a new Product
from django.core.files.storage import FileSystemStorage


@api_view(["POST"])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    category_id = request.data.get("category", None)
    if category_id is not None:
        try:
            category = Category.objects.get(pk=category_id)
        except Category.DoesNotExist:
            return Response(
                {"detail": "Category does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )
    else:
        return Response(
            {"detail": "Category is required"}, status=status.HTTP_400_BAD_REQUEST
        )

    name = request.data.get("name", None)
    brand = request.data.get("brand", None)
    description = request.data.get("description", None)
    price = request.data.get("price", None)
    countInStock = request.data.get("countInStock", None)
    priceOrigin = request.data.get("priceOrigin", None)
    image_file = request.FILES.get("image")  # Lấy file hình ảnh từ request

    # Kiểm tra xem có hình ảnh được gửi kèm không
    if "image" in request.FILES:
        image_file = request.FILES["image"]
        fs = FileSystemStorage(location="media/images/")
        uploaded_img = fs.save(image_file.name, image_file)
        img_url = fs.url(uploaded_img)
        if "/media/" in img_url:
            # Cắt bỏ phần "/media/" từ đường dẫn
            img_url = img_url.replace("/media/", "images/")
    else:
        img_url = None

    # Tạo sản phẩm với các thông tin nhận được từ request
    product = Product.objects.create(
        user=user,
        name=name,
        brand=brand,
        description=description,
        price=price,
        countInStock=countInStock,
        category=category,
        image=img_url,  # Lưu URL của hình ảnh
        priceOrigin=priceOrigin,
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


# Upload Image
@api_view(["POST"])
def uploadImage(request):
    data = request.data
    product_id = data["product_id"]
    product = Product.objects.get(_id=product_id)
    product.image = request.FILES.get("image")
    product.save()
    return Response("Image was uploaded")


# Update single products
@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    try:
        product = Product.objects.get(_id=pk)
    except Product.DoesNotExist:
        return Response(
            {"detail": "Product does not exist"}, status=status.HTTP_404_NOT_FOUND
        )

    product.name = data.get("name", product.name)
    product.price = data.get("price", product.price)
    product.brand = data.get("brand", product.brand)
    product.countInStock = data.get("countInStock", product.countInStock)

    category_id = data.get("category")
    if category_id:
        try:
            category = Category.objects.get(pk=category_id)
            product.category = category
        except Category.DoesNotExist:
            return Response(
                {"detail": "Category does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    product.description = data.get("description", product.description)

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


# Delete a product
@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response("Product deleted successfully")


from django.shortcuts import get_object_or_404


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = get_object_or_404(Product, _id=pk)
    data = request.data

    # Check if the user has purchased the product
    has_purchased = OrderItem.objects.filter(order__user=user, product=product).exists()

    if not has_purchased:
        content = {"detail": "Bạn cần mua sản phẩm để đánh giá nó."}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # Check if the user has already reviewed the product
    already_exists = product.review_set.filter(user=user).exists()

    if already_exists:
        content = {"detail": "Bạn đã đánh giá sản phẩm."}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # Check for rating value
    if data.get("rating", 0) == 0:
        content = {"detail": "Vui lòng chọn điểm đánh giá."}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # Create the review
    review = Review.objects.create(
        user=user,
        product=product,
        name=user.first_name,
        rating=data["rating"],
        comment=data["comment"],
    )

    # Update product rating
    reviews = product.review_set.all()
    product.numReviews = len(reviews)
    total = sum(review.rating for review in reviews)
    product.rating = total / len(reviews)
    product.save()

    return Response("Thêm đánh giá thành công")


@api_view(["GET"])
def getReviewsProduct(request, pk):
    try:
        reviews = Review.objects.filter(product=pk)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)
    except Review.DoesNotExist:
        raise Http404("No reviews found for this product")


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def AdmindeleteReview(request, pk):
    try:
        review = Review.objects.get(_id=pk)
    except Review.DoesNotExist:
        raise Http404("Review does not exist")

    review.delete()
    return Response("Review deleted successfully")


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createCategory(request):
    data = request.data
    category = Category.objects.create(name=data["name"])
    serializer = CategorySerializer(category, many=False)
    return Response(serializer.data)


@api_view(["GET"])
def getCategories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def getProductsByCategory(request, category_id):
    try:
        category = Category.objects.get(pk=category_id)
    except Category.DoesNotExist:
        return Response({"detail": "Category does not exist"}, status=404)

    products = category.product_set.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def getCategory(request, pk):
    category = Category.objects.get(pk=pk)
    serializer = CategorySerializer(category, many=False)
    return Response(serializer.data)


@api_view(["DELETE"])
def deleteCategory(request, pk):
    try:
        category = Category.objects.get(pk=pk)
    except Category.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "DELETE":
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updateCategory(request, pk):
    try:
        category = Category.objects.get(pk=pk)
    except Category.DoesNotExist:
        return Response(
            {"detail": "Category does not exist"}, status=status.HTTP_404_NOT_FOUND
        )

    data = request.data

    category.name = data.get("name", category.name)
    category.save()

    serializer = CategorySerializer(category, many=False)
    return Response(serializer.data)
