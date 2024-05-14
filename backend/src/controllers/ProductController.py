from typing import List


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
        pass

    # Lấy thông tin sản phẩm
    def getProducts(page: int, limit: int, sort: str):
        pass

    # Lấy thông tin chi tiết sản phẩm
    def getDetailProduct(slug: str):
        pass

    # Lấy thông tin sản phẩm gợi ý
    def recommendProducts():
        pass
