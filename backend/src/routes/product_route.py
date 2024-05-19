from flask import Blueprint, request
from src.controllers.ProductController import ProductController
from src.middlewares.AuthMiddleware import customer_middleware
from src.middlewares.PaginationMiddleware import request_pagination
from src.utils.response import Response

product = Blueprint("product", __name__)


@product.route("/all", methods=["GET"])
@request_pagination
def get_products():
    page = request.args.get("page", default=1, type=int)
    limit = request.args.get("limit", default=10, type=int)
    sort = request.args.get("sort", default="asc").strip()
    product_controller = ProductController()
    data = product_controller.getProducts(page, limit, sort)
    return Response(status=200, message="Success", data=data)

@product.route("/search", methods=["GET"])
@request_pagination
def search_products():
    keyword = request.args.get("keyword", default="").strip()
    minPrice = request.args.get("minPrice", default="").strip()
    maxPrice = request.args.get("maxPrice", default="").strip()
    categories = request.args.get("categories", default="").strip()
    if categories != "":
        try:
            categories = eval(categories)
        except Exception as e:
            print(e)
            categories = []
    else:
        categories = []
    page = request.args.get("page", default=1, type=int)
    limit = request.args.get("limit", default=10, type=int)
    sort = request.args.get("sort", default="asc").strip()
    product_controller = ProductController()
    data = product_controller.searchProducts(
        keyword, categories, minPrice, maxPrice, page, limit, sort
    )
    return Response(status=200, message="Success", data=data)


@product.route("/detail/<string:slug>", methods=["GET"])
def detail_product(slug):
    product_controller = ProductController()
    data = product_controller.getDetailProduct(slug)
    return Response(status=200, message="Success", data=data)


@product.route("/suggest", methods=["GET"])
@customer_middleware
@request_pagination
def suggest_products():
    limit = request.pagination["limit"]
    page = request.pagination["page"]
    current_customer = request.customer
    product_controller = ProductController()
    data = product_controller.recommendProducts(limit, page,
                                                current_customer)
    return Response(status=200, message="Success", data=data)
