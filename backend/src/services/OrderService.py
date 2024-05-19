import datetime
from src.models.OrderDetail import OrderDetail
from src.models.Address import Address
from src.models.Order import Order
from src.utils.enums import OrderStatusEnum
from src import db
from src.utils.enums import PaymentMethodEnum
from src.models.Order import Order
from src.models.Product import Product
from src.models.Variation import Variation


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
    def addToShopCart(orderId: int, variationId: int, productId: int, quantity: int):
        variation = Variation.query.filter_by(id=variationId).first()
        new_order_detail = OrderDetail(
            orderId=orderId,
            productId=productId,
            variationId=variationId,
            quantity=quantity,
            price=variation.price,
            oldPrice=variation.oldPrice,
        )
        db.session.add(new_order_detail)
        db.session.flush()
        current_order = Order.query.filter_by(id=orderId).first()
        current_order.totalAmount += int(quantity) * int(variation.price)
        db.session.commit()
        data_response = {}
        data_response["id"] = new_order_detail.id
        data_response["orderId"] = new_order_detail.orderId
        data_response["productId"] = new_order_detail.productId
        data_response["variationId"] = new_order_detail.variationId
        data_response["image"] = variation.image
        data_response["variation"] = variation.getInfo()
        data_response["quantity"] = new_order_detail.quantity
        data_response["price"] = new_order_detail.price
        data_response["oldPrice"] = new_order_detail.oldPrice
        return data_response

    def updateOrder(orderId: int, status: str, shippingName: str, shippingCode: str):
        pass
