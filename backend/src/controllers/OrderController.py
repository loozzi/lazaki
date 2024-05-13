class OrderController:
    # Tạo đơn hàng
    def createOrder():
        pass

    # Xác nhận đơn hàng
    def confirmOrder(orderId: int):
        pass

    # Xem lịch sử đơn hàng
    def viewOrderHistory(customerId: int):
        pass

    # Xem giỏ hàng
    def viewCart(customerId: int):
        pass

    # Thêm vào giỏ hàng
    def addToShopCart(customerId: int, variationId: int, quantity: int):
        pass

    # Xóa khỏi giỏ hàng
    def removeFromCurrentOrder(customerId, variationId: int):
        pass

    # Cập nhật giỏ hàng
    def updateCurrentOrder(customerId, variationId: int, quantity: int):
        pass

    # Tính tổng tiền
    def total(customerId: int, phone: str, address: str):
        pass
