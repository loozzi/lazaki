from flask import Blueprint
from flask import request
from src.models.Product import Product
from src.middlewares.AuthMiddleware import customer_middleware
from src.middlewares.PaginationMiddleware import request_pagination
from src.services.ProductService import ProductService
from src.controllers.ProductController import ProductController
from math import ceil

product = Blueprint("product", __name__)


@product.route("/all", methods=["GET"])
@request_pagination
def get_products():
    page = request.args.get("page", default=1, type=int)
    limit = request.args.get("limit", default=10, type=int)
    sort = request.args.get("sort", default="asc").strip()
    return ProductController.getProducts(page, limit, sort)
    


@product.route("/search", methods=["GET"])
@request_pagination
def search_products():
    keyword = request.args.get("keyword", 
                               default="").strip()
    minPrice = request.args.get("minPrice", 
                                default="").strip()
    maxPrice = request.args.get("maxPrice",
                                default="").strip()
    categories = request.args.get("categories",
                                  default="").strip()
    if categories != "":
        try:
            categories = eval(categories)
        except Exception as e:
            categories = []
    else:
        categories = []
    page = request.args.get("page", default=1, type=int)
    limit = request.args.get("limit", default=10, type=int)
    sort = request.args.get("sort", default="asc").strip()
    return ProductController.searchProducts(keyword, categories, minPrice,
                                            maxPrice, page, limit, sort)


@product.route("/<string:slug>", methods=["GET"])
def detail_product(slug):
    return ProductController.getDetailProduct(slug)