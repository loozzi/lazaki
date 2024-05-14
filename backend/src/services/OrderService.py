class OrderService:
    # Tạo order
    def addOrder(customerId: int):
        pass

    # Xác nhận Order
    def confirmOrder(
        orderId: int,
        fullName: str,
        email: str,
        phoneNumber: str,
        province: str,
        district: str,
        ward: str,
        street: str,
        paymentMethod: str,
        note: str,
    ):
        pass

    # Lấy lịch sử order của khách hàng
    def getOrderHistory(customerId: int):
        pass

    def getOrders():
        pass

    # Lấy thông tin 1 order
    def getOrder(orderId: int):
        pass

    def getOrderDetail(orderDetailId: int):
        pass

    # Lấy toàn bộ lịch sử order trên hệ thống
    def getAllOrderHistory():
        pass

    # Lấy order hiện tại của khách hàng
    def getCurrentOrder(customerId: int):
        pass

    # Thêm sản phẩm vào giỏ hàng
    def addToShopCart(customerId: int, productId: int, variationId: int, quantity: int):
        pass

    def updateOrder(orderId: int, status: str, shippingName: str, shippingCode: str):
        pass
