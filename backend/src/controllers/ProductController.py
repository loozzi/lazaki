from typing import List
from src.models.Product import Product
from src.services.ProductService import ProductService
from src.controllers.Pagination import Pagination

class ProductController:
    # Tìm kiếm sản phẩm theo từ khóa, giá, danh mục
    def searchProducts(
        keyword: str,
        categories: List[str],
        minPrice: int,
        maxPrice: int,
        page: int,
        limit: int,
        sort: str,
    ):
        if minPrice == "":
            minPrice = 0
        if maxPrice == "":
            maxPrice = 999999999
        if minPrice != 0:
            minPrice = int(minPrice)
        if maxPrice != 999999999:
            maxPrice = int(maxPrice)
        data = ProductService.searchProducts(
            keyword, minPrice, maxPrice,
            categories, sort, limit, page
        )
        return data


    # Lấy thông tin sản phẩm
    def getProducts(page: int, limit: int, sort: str):
        data = ProductService.getProducts(sort, limit, page)
        return data

    # Lấy thông tin chi tiết sản phẩm
    def getDetailProduct(slug: str):
        data = ProductService.getDetailProduct(slug)
        return data

    # Lấy thông tin sản phẩm gợi ý
    def recommendProducts():
        pass
