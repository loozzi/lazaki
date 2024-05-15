from typing import List


class ProductService:
    # Lấy danh sách sản phẩm
    def getProducts():
        pass

    # Tìm kiếm sản phẩm
    def searchProducts(
        keyword: str, minPrice: int, maxPrice: int, categories: List[str]
    ):
        pass

    # Lấy chi tiết của sản phẩm
    def getDetailProduct(productId: int):
        pass

    # Thêm sản phẩm vào database
    def addProduct(
        productName: str,
        description: str,
        properties: List[object],
        variations: List[object],
        images: List[object],
    ):
        pass

    def editProduct(
        productId: int,
        productName: str,
        slug: str,
        description: str,
        properties: List[object],
        categories: List[object],
        variations: List[object],
        images: List[str],
    ):
        pass

    # Xoá sản phẩm khỏi database
    def removeProduct(productId: int):
        pass

    def generateProducts():
        pass
