import datetime

from src import db
from src.models.Address import Address
from src.models.Order import Order
from src.models.OrderDetail import OrderDetail
from src.models import Customer
from src.models.Variation import Variation
from src.utils.enums import OrderStatusEnum, PaymentStatusEnum


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
        order.email = email

        # Tính tổng tiền
        total_amount = 0
        for order_detail in order.orderDetails:
            total_amount += order_detail.quantity * order_detail.price
        order.totalAmount = total_amount

        # Giảm số lượng sản phẩm trong kho và tăng số lượng đã bán
        for order_detail in order.orderDetails:
            variation = Variation.query.filter_by(id=order_detail.variationId).first()
            variation.quantity -= order_detail.quantity
            variation.sold += order_detail.quantity

        # Cập nhật ngày order
        order.orderDate = datetime.datetime.now()

        db.session.commit()

    # Lấy lịch sử order của khách hàng
    def getOrderHistory(customerId: int):
        return Order.query.filter(
            Order.customerId == customerId, Order.status != OrderStatusEnum.ORDER
        ).all()

    def getOrders(sort: str) -> list[dict]:
        order_list = Order.query.all()
        data = []
        for order in order_list:
            dict_order = order.serialize()
            data.append(dict_order)
        if sort == "desc":
            data.sort(key=lambda order: order["id"], reverse=True)
        else:
            data.sort(key=lambda order: order["id"])
        return data

    # Lấy thông tin 1 order
    def getOrder(orderId: int):
        if Order.query.get(orderId) is None:
            return None
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
        orders = (
            Order.query.filter(
                Order.orderDate >= start_date,
                Order.orderDate <= end_date,
            )
            .filter(Order.status != OrderStatusEnum.ORDER)
            .all()
        )
        return orders

    # Lấy order hiện tại của khách hàng
    def getCurrentOrder(customerId: int):
        pass

    # Thêm sản phẩm vào giỏ hàng
    def addToShopCart(orderId: int, variationId: int, productId: int, quantity: int):
        variation = Variation.query.filter_by(id=variationId).first()
        current_order = Order.query.filter_by(id=orderId).first()
        order_detail_exist = OrderDetail.query.filter(
                                OrderDetail.orderId == orderId).filter(
                                    OrderDetail.variationId == variationId).first()
        if order_detail_exist is None:
            order_detail_exist = OrderDetail(
            orderId=orderId,
            productId=productId,
            variationId=variationId,
            quantity=quantity,
            price=variation.price,
            oldPrice=variation.oldPrice,
            )
            db.session.add(order_detail_exist)
            db.session.flush()
        else:
            order_detail_exist.quantity += int(quantity)
            db.session.flush()
        current_order.totalAmount += int(quantity) * int(variation.price)
        db.session.commit()
        data_response = {}
        data_response["id"] = order_detail_exist.id
        data_response["orderId"] = order_detail_exist.orderId
        data_response["productId"] = order_detail_exist.productId
        data_response["variationId"] = order_detail_exist.variationId
        data_response["image"] = variation.image
        data_response["variation"] = variation.getInfo()
        data_response["quantity"] = order_detail_exist.quantity
        data_response["price"] = order_detail_exist.price
        data_response["oldPrice"] = order_detail_exist.oldPrice
        return data_response

    def updateOrderStatus(order: Order, status: str) -> Order:
        for s in OrderStatusEnum:
            if s.value == status.lower():
                order.status = s
        order.update()
        return order

    def updateOrderShipping(
        order: Order, shippingName: str, shippingCode: str
    ) -> Order:
        order.shippingName = shippingName
        order.shippingCode = shippingCode
        order.update()
        return order

    def updateOrderPayment(order: Order, paymentStatus: str) -> Order:
        for s in PaymentStatusEnum:
            if s.value == paymentStatus.lower():
                order.paymentStatus = s
        order.update()
        return order
