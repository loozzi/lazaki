from typing import List


class AdminController:
    # Đăng nhập Admin
    def login(username: str, password: str):
        pass

    # Lấy danh sách sản phẩm
    def getProducts(page: int, limit: int, sort: str):
        pass

    def getProductDetail(slug: str):
        pass

    # Chỉnh sửa thông tin sản phẩm
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

    # Thêm sản phẩm
    def addProduct(
        productName: str,
        slug: str,
        description: str,
        properties: List[object],
        categories: List[object],
        variations: List[object],
        images: List[str],
    ):
        pass

    # Xóa sản phẩm
    def removeProduct(productId: int):
        pass

    # Lấy danh sách đơn hàng
    def getOrders(page: int, limit: int, sort: str):
        pass

    # Chỉnh sửa đơn hàng
    def editOrder(orderId: int, status: str):
        pass

    # Hủy bỏ đơn hàng
    def cancelOrder(orderId: int):
        pass

    # Chỉnh sửa đơn hàng
    def updateOrder(orderId: int, status: str, shippingName: str, shippingCode: str):
        pass

    # Lấy thông tin tất cả khách hàng
    def getCustomers(page: int, limit: int, sort: str):
        pass

    # Chỉnh sửa thông tin khách hàng
    def editCustomer(customerId: int):
        pass

    # Doanh thu
    def getRevenue():
        pass
