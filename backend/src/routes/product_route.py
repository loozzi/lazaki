from flask import Blueprint
from flask import request
from src.models.Product import Product
from src.middlewares.AuthMiddleware import customer_middleware
from src.middlewares.PaginationMiddleware import request_pagination
from src.services.ProductService import ProductService
from math import ceil

product = Blueprint("product", __name__)


def _pagination(current_page, total_item, items):
    return {
        "data": items,
        "current_page": current_page,
        "perPage": len(items),
        "total": total_item,
    }


def make_data_to_response_page(list_data):
    limit_page = request.pagination["limit"]
    page_cur = request.pagination["page"]
    start_index = (page_cur - 1) * limit_page
    end_index = min(start_index + limit_page, len(list_data))
    current_page_item = list_data[start_index:end_index]
    data_pagination = _pagination(
        current_page=page_cur,
        total_item=len(list_data),
        items=current_page_item,
        limit=limit_page,
    )
    return data_pagination


@product.route("/all", methods=["GET"])
@request_pagination
def get_products():
    sort = request.args.get("sort", default="asc").strip()
    data = ProductService.getProducts(sort)
    return make_data_to_response_page(data)


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
                                  default=[]).strip()
    if categories != []:
        try:
            categories = eval(categories)
        except Exception as e:
            categories = []
    sort = request.args.get("sort", default="asc").strip()
    data = ProductService.searchProducts(keyword, minPrice,
                                         maxPrice, categories, sort)
    return make_data_to_response_page(data)


@product.route("/<string:slug>", methods=["GET"])
def detail_product(slug):
    data = ProductService.getDetailProduct(slug)
    return data