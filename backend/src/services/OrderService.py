import datetime
from src.models import Address, Order
from src.utils.enums import OrderStatusEnum


class OrderService:
    # Tạo order
    def createCart(customerId: int):
        address = Address()
        address.save()
        newCart = Order(
            customerId=customerId,
            status=OrderStatusEnum.ORDER,
            addressId=address.id,
            fullName="",
        )
        newCart.save()

    def getCart(customerId: int):
        return Order.query.filter_by(
            customerId=customerId, status=OrderStatusEnum.ORDER
        ).first()

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
        return Order.query.filter_by(
            customerId=customerId, status=OrderStatusEnum.SUCCESS
        ).all()

    def getOrders():
        pass

    # Lấy thông tin 1 order
    def getOrder(orderId: int):
        pass

    def getOrderDetail(orderDetailId: int):
        pass

    # Lấy lịch sử order trên hệ thống theo khoảng thời gian
    def getAllOrderHistory(time: str):
        end_date = datetime.datetime.now()
        if time == "week":
            start_date = end_date - datetime.timedelta(days=7)
        if time == "month":
            start_date = end_date - datetime.timedelta(days=30)

        # Truy vấn toàn bộ order đã hoàn thành trong khoảng thời gian
        orders = Order.query.filter(
            Order.createdAt >= start_date,
            Order.createdAt <= end_date,
        ).all()
        return orders

    # Lấy order hiện tại của khách hàng
    def getCurrentOrder(customerId: int):
        pass

    # Thêm sản phẩm vào giỏ hàng
    def addToShopCart(customerId: int, productId: int, variationId: int, quantity: int):
        pass

    def updateOrder(orderId: int, status: str, shippingName: str, shippingCode: str):
        pass
