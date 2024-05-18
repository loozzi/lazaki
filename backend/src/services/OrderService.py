import datetime
from src.models.OrderDetail import OrderDetail
from src.models.Address import Address
from src.models.Order import Order
from src.utils.enums import OrderStatusEnum
from src import db
from src.utils.enums import PaymentMethodEnum
from src.models.Order import Order


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
        order = OrderService.getOrder(orderId)

        # Tìm kiếm địa chỉ hiện có
        address = Address.query.filter_by(
            phoneNumber=phoneNumber,
            province=province,
            district=district,
            ward=ward,
            street=street,
        ).first()

        # Nếu địa chỉ không tồn tại, tạo mới
        if not address:
            address = Address(
                phoneNumber=phoneNumber,
                province=province,
                district=district,
                ward=ward,
                street=street,
            )
            db.session.add(address)
            db.session.flush()

        order.fullName = fullName
        order.status = OrderStatusEnum.PREPARING
        order.addressId = address.id
        order.paymentMethod = PaymentMethodEnum[paymentMethod.upper()]
        order.note = note

        # Tính tổng tiền
        total_amount = 0
        for order_detail in order.orderDetails:
            total_amount += order_detail.quantity * order_detail.price
        order.totalAmount = total_amount
        order.orderDate = datetime.datetime.now()

        db.session.commit()

    # Lấy lịch sử order của khách hàng
    def getOrderHistory(customerId: int):
        return Order.query.filter_by(
            customerId=customerId, status=OrderStatusEnum.SUCCESS
        ).all()

    def getOrders():
        pass

    # Lấy thông tin 1 order
    def getOrder(orderId: int):
        return Order.query.get(orderId)

    def getOrderDetail(orderDetailId: int):
        return OrderDetail.query.get(orderDetailId)

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
