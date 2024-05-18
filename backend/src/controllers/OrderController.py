from src.controllers.Pagination import Pagination
from src.utils.enums import OrderStatusEnum
from src.models.Order import Order
from src.utils.response import Response
from src.services.OrderService import OrderService


class OrderController:
    # Tạo đơn hàng
    def createOrder():
        pass

    # Xác nhận đơn hàng
    def confirmOrder(orderId: int):
        pass

    # Xem lịch sử đơn hàng
    def viewOrderHistory(customerId: int, page: int, limit: int):
        orders = OrderService.getOrderHistory(customerId)
        if orders is None:
            return Response(404, "Order not found")

        # Phân trang
        total_orders = len(orders)
        start = (page - 1) * limit
        end = min(start + limit, total_orders)
        paginated_orders = orders[start:end]

        # Chuẩn bị dữ liệu trả về
        orders_data = []
        for order in paginated_orders:
            order_data = order.getHistory()
            orders_data.append(order_data)

        pagination = Pagination(
            currentPage=page, perPage=limit, total=total_orders, data=orders_data
        )

        return Response(200, "Success", pagination.serialize())

    # Xem giỏ hàng
    def viewCart(customerId: int):
        order = OrderService.getCart(customerId)
        if order is None:
            return Response(404, "Cart not found")
        return Response(200, "Success", order.getCart())

    # Thêm vào giỏ hàng
    def addToShopCart(productId: int, variationId: int, quantity: int):
        pass

    # Xóa khỏi giỏ hàng
    def removeFromCurrentOrder(customerId, variationId: int):
        pass

    # Cập nhật giỏ hàng
    def updateCurrentOrder(orderDetailId: int, quantity: int):
        pass
