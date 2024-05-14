class OrderController:
    # Tạo đơn hàng
    def createOrder():
        pass

    # Xác nhận đơn hàng
    def confirmOrder(orderId: int):
        pass

    # Xem lịch sử đơn hàng
    def viewOrderHistory():
        pass

    # Xem giỏ hàng
    def viewCart():
        pass

    # Thêm vào giỏ hàng
    def addToShopCart(productId: int, variationId: int, quantity: int):
        pass

    # Xóa khỏi giỏ hàng
    def removeFromCurrentOrder(customerId, variationId: int):
        pass

    # Cập nhật giỏ hàng
    def updateCurrentOrder(orderDetailId: int, quantity: int):
        pass
