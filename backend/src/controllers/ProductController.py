from typing import List

from src.models.Customer import Customer
from src.services.OrderService import OrderService
from src.services.ProductService import ProductService
from src.models.Product import Product


class ProductController:
    # Tìm kiếm sản phẩm theo từ khóa, giá, danh mục
    def searchProducts(
        self,
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
        product_service = ProductService()
        data = product_service.searchProducts(
            keyword, minPrice, maxPrice, categories, sort, limit, page
        )
        return data

    # Lấy thông tin sản phẩm
    def getProducts(self, page: int, limit: int, sort: str):
        product_service = ProductService()
        data = product_service.getProducts(sort, limit, page)
        return data

    # Lấy thông tin chi tiết sản phẩm
    def getDetailProduct(self, slug: str):
        product_service = ProductService()
        data = product_service.getDetailProduct(slug)
        return data

    # Lấy thông tin sản phẩm gợi ý
    def recommendProducts(self, limit: int, page: int, current_customer: Customer):
        # khi nào làm xong logger mới đọc được, hiện tại để rỗng
        list_products_id = OrderService.getAllProductId(current_customer.id)

        product_service = ProductService()
        return product_service.generateProducts(list_products_id, limit, page)

    def getSimilarProducts(self, slug: str, limit: int, page: int):
        productService = ProductService()
        product = ProductService.getProductbySlug(slug)
        id = product.id
        return productService.generateProducts([id], limit, page)
