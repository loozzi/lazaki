from src import db
from src.controllers.Pagination import Pagination
from src.models.Order import Order
from src.models.OrderDetail import OrderDetail
from src.models.Variation import Variation
from src.services.OrderService import OrderService
from src.utils.enums import OrderStatusEnum
from src.utils.response import Response


class OrderController:
    # Tạo đơn hàng
    def createOrder():
        pass

    # Xác nhận đơn hàng
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
        order = OrderService.getOrder(orderId)
        if order is None:
            return Response(404, "Order not found")

        # Kiểm tra đơn hàng có trạng thái là ORDER (đang trong giỏ hàng)
        if order.status != OrderStatusEnum.ORDER:
            return Response(400, "Cannot confirm order")

        OrderService.confirmOrder(
            orderId,
            fullName,
            email,
            phoneNumber,
            province,
            district,
            ward,
            street,
            paymentMethod,
            note,
        )

        # Tạo giỏ hàng mới sau khi xác nhận
        OrderService.createCart(order.customerId)

        return Response(200, "Order confirmed succesfully", order.serialize())

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
    def addToShopCart(
        customerId: int, orderId: int, variationId: int, productId: int, quantity: int
    ):
        if orderId is None:
            orderId = OrderService.getCart(customerId).id
        data = OrderService.addToShopCart(orderId, variationId, productId, quantity)
        return Response(200, "Success", data)

    # Xóa khỏi giỏ hàng
    def removeFromCurrentOrder(customerId, variationId: int):
        current_order = OrderService.getCart(customerId)
        oderDetail = (
            OrderDetail.query.filter(OrderDetail.orderId == current_order.id)
            .filter(OrderDetail.variationId == variationId)
            .first()
        )
        db.session.delete(oderDetail)
        db.session.commit()
        return Response(200, "Success")

    # Cập nhật giỏ hàng
    def updateCurrentOrder(
        orderDetailId: int, variationId: int, productId: int, quantity: int
    ):
        orderDetail = OrderService.getOrderDetail(orderDetailId)
        if orderDetail is None:
            return Response(404, "Order detail not found")

        # Kiểm tra đơn hàng có trạng thái là ORDER (đang trong giỏ hàng)
        order = Order.query.get(orderDetail.orderId)
        if order.status != OrderStatusEnum.ORDER:
            return Response(400, "Cannot update order detail. Order is not in cart")

        # Kiểm tra thông tin biến thể và sản phẩm
        variation = Variation.query.filter_by(
            id=variationId, productId=productId
        ).first()

        if not variation:
            return Response(400, "Variation does not belong to the specified product")

        # Kiểm tra số lượng còn lại trong kho
        if quantity > variation.quantity:
            return Response(400, "Out of stock")

        # Cập nhật thông tin chi tiết đơn hàng
        orderDetail.variationId = variationId
        orderDetail.quantity = quantity
        orderDetail.price = variation.price
        orderDetail.oldPrice = variation.oldPrice
        orderDetail.productId = productId

        db.session.commit()

        return Response(200, "Success", orderDetail.serialize())

    # Xem chi tiết đơn hàng
    def getDetailOrder(orderId: int):
        order = OrderService.getOrder(orderId)
        if order is None:
            return Response(404, "Order not found")
        return Response(200, "Success", order.serialize())
