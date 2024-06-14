from django.urls import path
from base.views import product_views as views


urlpatterns = [
    path("category/", views.createCategory, name="create_category"),
    path("categories/", views.getCategories, name="get_categories"),
    path("category/<int:pk>/", views.getCategory, name="get_category"),
    path("categories/delete/<int:pk>/", views.deleteCategory, name="delete_category"),
    path("category/<int:pk>/update/", views.updateCategory, name="update_category"),
    path(
        "categories/<int:category_id>/products/",
        views.getProductsByCategory,
        name="products_by_category",
    ),
    # product
    path("", views.getProducts, name="products"),
    path("create/", views.createProduct, name="create_product"),
    path("upload/", views.uploadImage, name="upload_image"),
    path(
        "<str:pk>/reviewsproduct/", views.getReviewsProduct, name="get_reviews_product"
    ),
    path("reviews/<str:pk>/delete/", views.AdmindeleteReview, name="delete_review"),
    path("<str:pk>/reviews/", views.createProductReview, name="create-review"),
    path("top/", views.getTopProducts, name="top-products"),
    path("<str:pk>/", views.getProduct, name="product"),
    path("update/<str:pk>/", views.updateProduct, name="update_product"),
    path("delete/<str:pk>/", views.deleteProduct, name="delete_product"),
]
